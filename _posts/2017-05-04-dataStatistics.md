---
title: iOS无埋点数据统计实践
layout: post
author: 谢涛
date: '2017-05-04 16:50:24 +0800'
categories: iOS
---

![](http://upload-images.jianshu.io/upload_images/1319710-09d59f4594c635e3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>手动埋点太麻烦了，谁用谁知道。

# 背景
``一直以来，大数据紧紧的和埋点技术捆绑在一起，甚至大数据时代也可以说是埋点时代``。这话没毛病，但是埋点一直都存在着效率低下的问题，构建起来费时间，容易出错，每次修改埋点都需要开发手动修改等问题。**无埋点统计技术闪亮登场，很好地解决了这个问题，解放了程序员的双手。**


# 内容概要
本文[Demo](https://github.com/xietao3/CrashCollectionDemo)已经实现以下内容：

|主要功能|备注|
|-|-|
|crash监控|已完成|
|卡顿监控|待完善|
|页面路径监控|已完成|
|UIScrollView delegate|监听 did draging|
|UITableView delegate|监听 did selected|
|UIKit控件touch监控|监听action|
|避免数组越界造成闪退|已完成不可变数组|
|避免``unrecognized selector``造成闪退|已完成|

# 如何实现无埋点
利用运行时机制，将类原生方法替换成用户自定义的方法，相当于强行在原本调用栈中插入一个方法，我们在其中插入一段统计代码即可，需要注意的是不要多次替换，谨防其他代码重复替换。

### 1. 如何替换方法:Method Swizzling

函数的调用涉及到3个重要的点：``Class``、``SEL``、``IMP``，Calss作为类型，``Method``由``SEL``和``IMP``组成。我们通过交换``Method``的``IMP``达到替换被调用函数的目的。

|Type|官方描述|个人见解|
|---|---|---|
|``Class``|``An opaque type that represents an Objective-C class.``||
|``SEL``  |``Method selectors are used to represent the name of a method at runtime.``|就是一个名称。|
|``IMP``|``This data type is a pointer to the start of the function that implements the method. ``|方法实现的具体地址。|

  
![exchange IMP](http://upload-images.jianshu.io/upload_images/1319710-2536b9ce4b300b7a.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/540)


我们新增一个``Hook Action``，通过``Swizzling``方式，通过交换``Hook Action``和``Current Action``的``IMP``，，当``Current Action``被调用时，实际上被调用的是``Hook Action``的``IMP``，然后我们调用``Hook Action``，实际上被调用的是``Current Action``的``IMP``。我们以这种方式将``Hook Action``插入调用链，以下是``Method Swizzling``图解：
![swizzling](http://upload-images.jianshu.io/upload_images/1319710-3f4513923e4ed6c0.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 2. swizzling函数的时机

``+(void)load``函数在你动态加载或者静态引用了这个类的时候，该函数就会被执行，它并不需要你显示的去创建一个类后才会执行，同时它只会执行一次，几乎是完美的swizzling时机。


举个栗子：我们要如何监听页面路径？新建一个``UIViewController+Category``类目，然后在``+(void)load``函数里替换``viewDidLoad``、``viewWillAppear:``、``viewDidAppear:``等函数,这样UIViewController的生命周期事件就替换成我们自定义的``fd_viewDidLoad``、``fd_viewWillAppear:``、``fd_viewDidAppear:``等函数。
```
#import "UIViewController+CollectEvent.h"
+ (void)load {
    // dispatch_once 似乎没有必要，没有考证过
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        // 替换方法
        [self sel_exchangeFirstSel:@selector(viewDidLoad) secondSel:@selector(fd_viewDidLoad)];
        [self sel_exchangeFirstSel:@selector(viewWillAppear:) secondSel:@selector(fd_viewWillAppear:)];
        [self sel_exchangeFirstSel:@selector(viewDidAppear:) secondSel:@selector(fd_viewDidAppear:)];
    });
}
```

除此之外，还有一些特殊的埋点并不适和在``+(void)load``函数进行``swizzling``,比如说Delegate的函数，后面会专门介绍。

### 3. 加入数据统计代码

在swizzling成功后，我们在其中加入统计代码。为了保证响应链的完整，我们还需要调用``[self fd_viewDidLoad]``函数，让事件传递下去，继续调用控制器内部实现的``viewDidLoad``、``viewWillAppear:``、``viewDidAppear:``等函数，这样就不影响控制器的生命周期。
```
//新的viewDidLoad方法
- (void)fd_viewDidLoad {
    CCLog(@"%@ viewDidLoad",NSStringFromClass([self class]));
    // do something 在此加入统计代码
    [self fd_viewDidLoad];
}

//新的viewWillAppear方法
- (void)fd_viewWillAppear:(BOOL)animated {
    CCLog(@"%@ viewWillAppear",NSStringFromClass([self class]));
    // do something
    [self fd_viewWillAppear:animated];
}

//新的viewWillDisappear方法
- (void)fd_viewDidAppear:(BOOL)animated {
    CCLog(@"%@ viewDidAppear",NSStringFromClass([self class]));
    // do something
    [self fd_viewDidAppear:animated];
}
```

# 进阶
除了监控页面路径这一类最基本的统计之外，我们还有其他各种各样的埋点需求，比如说 **用户点击按钮** 、**用户上下滑动scroll view \ table view** 等事件。

### 1. 用户点击事件

iOS大多数可点击UI控件都是基于``UIControl``，而所有的事件也都要通过
``- (void)sendAction:(SEL)action to:(nullable id)target forEvent:(nullable UIEvent *)event``转发，通过此方法我们可以获取该控件所有的信息，包括所在的控制器，坐标系等。

这样我们就有了完美的swizzling对象了。通过该方法，(据我不完全统计)我们可以监听到``UIButton``、``UITextField``、``UISwitch``、``UISegmentedControl``、``UISlider
``、``UIStepper``等控件的Action事件。

```
@implementation UIControl (CollectEvent)

+ (void)load {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{    
        //创建新的sendAction:to:forEvent:方法
        [self sel_exchangeFirstSel:@selector(sendAction:to:forEvent:) secondSel:@selector(fd_sendAction:to:forEvent:)];
    });
}

- (void)fd_sendAction:(SEL)action to:(nullable id)target forEvent:(nullable UIEvent *)event {
    CCLog(@"%@ send action:%@ to:%@ frame:(x:%.2f y:%.2f w:%.2f h:%.2f)",
          [self class],
          NSStringFromSelector(action),
          NSStringFromClass([target class]),
          self.frame.origin.x,
          self.frame.origin.y,
          self.frame.size.width,
          self.frame.size.height);
    // 加入统计代码 
    [self fd_sendAction:action to:target forEvent:event];
}
@end
```

以下点击按钮自动打印的log：
```
2017-05-03 16:06:38.766 CrashDemo[19408:832620] Crash Collect: UIStepper send action:stepperValueDidChange: to:ActionViewController frame:(x:113.00 y:279.00 w:94.00 h:29.00)
2017-05-03 16:06:52.800 CrashDemo[19408:832620] Crash Collect: UISwitch send action:switchValueDidChange: to:ActionViewController frame:(x:135.50 y:160.00 w:51.00 h:31.00)
2017-05-03 16:06:54.927 CrashDemo[19408:832620] Crash Collect: UIButton send action:buttonDidTouchUpInside: to:ActionViewController frame:(x:137.00 y:338.00 w:46.00 h:30.00)
```
注意：UI控件 **拖线** 和 **代码添加** 的事件都可以监听到，如果控件未实现action事件，则无法监听。

### 2. Delegate事件

``+ (void)load``的套路在Delegate这里并不适用，我们要重新选择``swizzling``的时机，经过研究考察后``setDelegate:``脱颖而出，``setDelegate:``只有在需要代理事件的时候才会执行，避免了资源浪费。

首先先替换掉``setDelegate:``
```
@implementation UIScrollView (CollectEvent)
+ (void)load {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        [self sel_exchangeFirstSel:@selector(setDelegate:) secondSel:@selector(fd_setDelegate:)];
    });
}
@end
```

然后再在``setDelegate:``里面替换我们真正想要监听的代理事件。由于setDelegate方法可能被多次调用，所以要判断是否已经swizzling了，防止重复执行。

我们还要保证在每个控制器里都执行一次，所以替换的方法都会加上``class name``的前缀，以示区别。如果是``UITableView``，我们会额外swizzling``tableView:didSelectRowAtIndexPath:``事件，以监听``UITableViewCell``的点击事件。
```
#define GET_CLASS_CUSTOM_SEL(sel,class)  NSSelectorFromString([NSString stringWithFormat:@"%@_%@",NSStringFromClass(class),NSStringFromSelector(sel)])
```
```
- (void)fd_setDelegate:(id<UIScrollViewDelegate>)delegate {
    // 由于setDelegate方法可能被多次调用，所以要判断是否已经swizzling了，防止重复执行。
    if (![self isContainSel:GET_CLASS_CUSTOM_SEL(@selector(scrollViewWillBeginDragging:),[delegate class]) inClass:[delegate class]]) {
        [self swizzling_scrollViewWillBeginDragging:delegate];
    }

    if ([NSStringFromClass([self class]) isEqualToString:@"UITableView"]){
        if (![self isContainSel:GET_CLASS_CUSTOM_SEL(@selector(tableView:didSelectRowAtIndexPath:),[delegate class]) inClass:[delegate class]]) {
            [(UITableView *)self swizzling_tableViewDidSelectRowAtIndexPathInClass:delegate];
        }
    }
    [self fd_setDelegate:delegate];
}
```

我们需要手动添加一个``swizzling delegate method``，绑定``fd_scrollViewWillBeginDragging:``的``IMP``，如果控制器内未实现代理方法，我们也需要手动添加``origin delegate method``，否则将无法swizzling。

![delegate](http://upload-images.jianshu.io/upload_images/1319710-2cd63cf9afe8dca0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)

```
- (void)swizzling_scrollViewWillBeginDragging:(id<UIScrollViewDelegate>)delegate {
    // 为每个含tableView的控件 增加swizzling delegate method
    [self class_addMethod:[delegate class]
                 selector:GET_CLASS_CUSTOM_SEL(@selector(scrollViewWillBeginDragging:),[delegate class])
                      imp:method_getImplementation(class_getInstanceMethod([self class],@selector(fd_scrollViewWillBeginDragging:)))
                    types:"v@:@"];
    
    // 检查页面是否已经实现了origin delegate method  如果没有手动加一个
    if (![self isContainSel:@selector(scrollViewWillBeginDragging:) inClass:[delegate class] ]) {
        [self class_addMethod:[delegate class]
                     selector:@selector(scrollViewWillBeginDragging:)
                          imp:nil
                        types:"v@"];
    }
    
    // 将swizzle delegate method 和 origin delegate method 交换
    [self sel_exchangeClass:[delegate class]
                   FirstSel:@selector(scrollViewWillBeginDragging:)
                  secondSel:GET_CLASS_CUSTOM_SEL(@selector(scrollViewWillBeginDragging:),[delegate class])];
}


/**
 swizzle method IMP
 
 @param scrollView scrollView description
 */
- (void)fd_scrollViewWillBeginDragging:(UIScrollView *)scrollView {
    CCLog(@"%@ scrollViewWillBeginDragging:",NSStringFromClass([self class]));
    SEL sel = GET_CLASS_CUSTOM_SEL(@selector(scrollViewWillBeginDragging:),[self class]);
    if ([self respondsToSelector:sel]) {
        IMP imp = [self methodForSelector:sel];
        void (*func)(id, SEL,id) = (void *)imp;
        func(self, sel,scrollView);
    }
}
```
最终调用链：

![final](http://upload-images.jianshu.io/upload_images/1319710-410595aefddb4296.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)

最终效果Log:
```
2017-05-04 15:40:29.239 CrashDemo[29907:797081] Crash Collect: ScrollViewController scrollViewWillBeginDragging:
2017-05-04 15:40:50.651 CrashDemo[29907:797081] Crash Collect: TableViewController scrollViewWillBeginDragging:
2017-05-04 15:40:52.049 CrashDemo[29907:797081] Crash Collect: TableViewController didSelectRowAtIndexPath:0:5
```

# 拓展
1. UITableView的点击事件也可以通过swizzling ``UITableViewCell`` 的 ``- (void)setSelected:(BOOL)selected animated:(BOOL)animated``的方式实现。
2. 无埋点数据统计结合了crash统计之后，对crash进行事件回溯，可以分析用户在crash前做了哪些行为，更快定位造成crash的真正原因。
3. 还有很多需要监听的事件待完善，本文只列举了其中几项。
4. [Demo在这里](https://github.com/xietao3/CrashCollectionDemo)

>本文有错误的地方欢迎指正，别懟脸😁。