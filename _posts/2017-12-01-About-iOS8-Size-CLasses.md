---
layout: post
title:  关于 iOS8 Size Classes的理解与使用​
author: Michael
Date: 2017-12-01 09:34:00 +8000
Categories: iOS开发
tags: iOS开发
---

## Size Classes是什么
iOS 8在应用界面的可视化设计上添加了一个新的特性-Size Classes，对于任何设备来说，界面的宽度和高度都只分为两种描述：`正常`和`紧凑`。这样开发者便可以无视设备具体的尺寸，而是对这两类和它们的组合进行适配。这样不论在设计时还是代码上，我们都可以不再受限于具体的尺寸，而是变成遵循尺寸的视觉感官来进行适配。在Xcode中的具体体现如下图：

![Size Classes是什么](http://img.itc.cn/photo/jDaZQU6AEjc)

但是我们看到图中的宽度和高度都是`Any`，`Any`是什么意思呢？如果`weight`设为`Any`，`height`设置为`Regular`，那么在该状态下的界面元素在只要`height`为`Regular`，无论`weight`是`Regular`还是`Compact`的状态中都会存在。这种关系应该叫做继承关系，具体的四种界面描述与可继承的界面描述如下：

- w:Compact h:Compact 继承 (**w:Any h:Compact** , **w:Compact h:Any** , **w:Any h:Any**)
- w:Regular h:Compact 继承 (**w:Any h:Compact** , **w:Regular h:Any** , **w:Any h:Any**)
- w:Compact h:Regular 继承 (**w:Any h:Regular** , **w:Compact h:Any** , **w:Any h:Any**)
- w:Regular h:Regular 继承 (**w:Any h:Regular** , **w:Regular h:Any** , **w:Any h:Any**)

我们知道了iOS 8下面设备界面可以描述为4种，但是这么多设备(iPhone4S,iPhone5/5s,iPhone6,iPhone6 Plus,iPad,Apple Watch)具体对应什么描述呢？经过查看官方文档和具体实践得知具体对应关系如下:

- iPhone4S,iPhone5/5s,iPhone6
 * 竖屏：(**w:Compact h:Regular**)
 * 横屏：(**w:Compact h:Compact**)
- iPhone6 Plus
 * 竖屏：(**w:Compact h:Regular**)
 * 横屏：(**w:Regular h:Compact**)
- iPad
 * 竖屏：(**w:Regular h:Regular**)
 * 横屏：(**w:Regular h:Regular**)
- Apple Watch(猜测)
 * 竖屏：(**w:Compact h:Compact**)
 * 横屏：(**w:Compact h:Compact**)

## Size Classes手写代码
为了表征`Size Classes`，Apple在iOS8中引入了一个新的类，`UITraitCollection`。这个类封装了像水平和竖直方向的Size Class等信息。iOS8的UIKit中大多数UI的基础类(包括UIScreen,UIWindow,UIViewController和UIView)都实现了`UITraitEnvironment`这个接口，通过其中的`traitCollection`这个属性，我们可以拿到对应的`UITraitCollection`对象，从而得知当前的Size Class，并进一步确定界面的布局。和UIKit中的响应者链正好相反，`traitCollection`将会在view hierarchy中自上而下地进行传递。对于没有指定`traitCollection`的UI部件，将使用其父节点的`traitCollection`。这在布局包含`childViewController`的界面的时候会相当有用。在`UITraitEnvironment`这个接口中另一个非常有用的是`-traitCollectionDidChange:`。在`traitCollection`发生变化时，这个方法将被调用。在实际操作时，我们往往会在`ViewController`中重写`-traitCollectionDidChange:`或者`-willTransitionToTraitCollection:withTransitionCoordinator:`方法(对于`ViewController`来说的话，后者也许是更好的选择，因为提供了转场上下文方便进行动画；但是对于普通的**View**来说就只有前面一个方法了)，然后在其中对当前的`traitCollection`进行判断，并进行重新布局以及动画。代码看起来大概会是这个样子：

```objc
- (void)willTransitionToTraitCollection:(UITraitCollection *)newCollection 
              withTransitionCoordinator:(id <UIViewControllerTransitionCoordinator>)coordinator
{
    [super willTransitionToTraitCollection:newCollection 
                 withTransitionCoordinator:coordinator];
    [coordinator animateAlongsideTransition:^(id <UIViewControllerTransitionCoordinatorContext> context) 
    {
        if (newCollection.verticalSizeClass == UIUserInterfaceSizeClassCompact) {
            //To Do: modify something for compact vertical size
        } else {
            //To Do: modify something for other vertical size
        }
        [self.view setNeedsLayout];
    } completion:nil];
}
```

在两个To Do处，我们要手写代码针对不同的状态做调整。

## Size Classes与Interface Builder
Xcode6中`Interface Builder`对`Size Class`有了很强大的支持，xib中可以开启Size Classes如下图：

![XIB中开启Size-Classes](http://img.itc.cn/photo/jDaZQyG9GF0)

在不同的`Size Classes`描述下，界面元素可以选择安装还是不安装，具体操作如图：

![不同size-classes描述下，界面元素安装与否自行选择](http://img.itc.cn/photo/jDaZQbsciH2)

## Size Classes与Image Asset
Xcode6中`Image Asset`也支持了`Size Class`，也就是说，我们可以对不同的`Size Class`指定不同的图片了。在`Image Asset`的编辑面板中选择某张图片，Inspector里现在多了一个`Width`和`Height`的组合，添加我们需要对应的`Size Class`，然后把合适的图拖上去，这样在运行时`SDK`就将从中挑选对应的`Size`的图进行替换了。支持`Size Class`的`Image Asset`编辑效果如下：

![支持Size Class的Image Asset编辑效果](http://img.itc.cn/photo/jDaZQ4Vv1TP)

参考链接
- [What’s New in iOS](https://developer.apple.com/library/ios/releasenotes/General/WhatsNewIniOS/Articles/iOS8.html)
- [WWDC 2014 Session笔记 – iOS界面开发的大一统](http://onevcat.com/2014/07/ios-ui-unique/)
- [iOS8 Size Classes初探](http://blog.sunnyxx.com/2014/09/09/ios8-size-classes/)


