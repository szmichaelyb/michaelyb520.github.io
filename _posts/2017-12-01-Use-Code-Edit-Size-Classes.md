---
layout: post
title:  纯代码sizeclass使用
author: Michael
Date: 2017-12-01 10:35:00 +8000
Categories: iOS开发
tags: iOS开发
---

叫兽又回来了，之前我们讲到了`sizeclass`在`storeboard`和`xib`中的使用，现在大家应该也都会用了。有的人问了`sizeclass`只能与`Interface Builder`一起使用吗?

答案当然是不是喽。

**Apple**公司在**iOS8**引入新的类专门用于纯代码使用`sizeclass`而准备的，这个类叫 <font color='red'><strong>UITraitCollection</strong></font>，可以使用一下几个方法进行初始化：

```objc
1）+ (UITraitCollection *)traitCollectionWithHorizontalSizeClass:(UIUserInterfaceSizeClass)horizontalSizeClass;
2）+ (UITraitCollection *)traitCollectionWithVerticalSizeClass:(UIUserInterfaceSizeClass)verticalSizeClass;
3）+ (UITraitCollection *)traitCollectionWithUserInterfaceIdiom:(UIUserInterfaceIdiom)idiom; 
4）+ (UITraitCollection *)traitCollectionWithDisplayScale:(CGFloat)scale; 
5）+ (UITraitCollection *)traitCollectionWithTraitsFromCollections:(NSArray *)traitCollections;
```

可以先使用前四个方法生成几个你预想设置的`sizeclass`的特性对象，最终通过`方法5`初始化`sizeclass`特性集合。

eg：

```objc
// 垂直方向特征  
UITraitCollection *verticaTrait =   
    [UITraitCollection traitCollectionWithVerticalSizeClass:  
         UIUserInterfaceSizeClassUnspecified];  
// 水平方向特征  
UITraitCollection *horizontalTrait =   
    [UITraitCollection traitCollectionWithHorizontalSizeClass:  
         UIUserInterfaceSizeClassCompact];  
// Device特征设置为iphone  
UITraitCollection *iphoneIdiomTrait =   
    [UITraitCollection traitCollectionWithUserInterfaceIdiom:  
         UIUserInterfaceIdiomPhone];  
// iphone 竖屏sizeclass情况  
UITraitCollection *sizeclassTraitCollection =   
    [UITraitCollection traitCollectionWithTraitsFromCollections:  
         @[iphoneIdiomTarit, horizontalTarit]]; 
```

同时还可以在最终初始化`sizeclass`特性集合之前进行`scale`的设置，这可是个很牛(yin)叉(dang)的技能：

```objc
// Retina屏幕  
UITraitCollection *scaleTraitCollection =   
    [UITraitCollection traitCollectionWithDisplayScale:2.0]; 
```

其中scale = 1.0为普通屏幕，scale = 2.0为Retina屏幕，scale > 2.0为更高的显示比例（dpi大于Retina屏幕的）屏幕。

在开始sizeclass布局界面之前还不得不介绍一下UITraitEnvironment这个协议，iOS8后UIScreen、UIWindow、UIViewController、UIView以及iOS8新出的UIPresentationController都遵守这个协议，使得这些类以及他们的子类都有traitCollection这个只读属性，让我们可以通过这个属性布局不同的sizeclass场景。

eg：

```objc
// 只能在Retina屏幕（326dpi）的iPhone上显示
if ([self.traitCollection containsTraitsInCollection:sizeclassTaritCollection]) {
    UIView *viewTemp = [[UIView alloc] initWithFrame:CGRectMake(100, 100, 100, 100)];
    viewTemp.backgroundColor = [UIColor cyanColor];
    [self.view addSubview:viewTemp];  
} 
```

>注：`traitCollection`使用起来很猥琐，请花点时间把这点儿看完思密达，注意`containsTraitsInCollection:`这个是否包含特征集合的方法，特征集合是否包含另一个特征集合，是一个子集判断，而不是`Interface Builder`里`sizeclass`的`any`包含`compact`和`regular`，请不要将两者混为一谈。

同时候还可以在`UIScreen、UIWindow、UIViewController、UIView、UIPresentationController`里面实现`UITraitEnvironment`协议的`traitCollectionDidChange:`代理方法去监控`sizeclass`特性的转变。

