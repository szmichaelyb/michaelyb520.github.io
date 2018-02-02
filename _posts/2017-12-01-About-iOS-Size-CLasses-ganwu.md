---
layout: post
title:  iOS 8 AutoLayout与Size Class自悟
author: Michael
Date: 2017-12-01 10:34:00 +8000
Categories: iOS开发
tags: iOS
---

## 前言

>iOS8和iPhone6发布已经过去蛮久了，广大的果粉终于迎来了大屏iPhone，再也不用纠结为大屏买三星舍苹果了，但是对于iOS开发人员来说，迎来了和`Android开发开发一样的问题—>各种屏幕的适配(是不是可以要求加工资的节奏)`。对于适配，网传各种有关`Size Class`的论点，前段时间太忙，一直没去研究，套用+总的话，苹果在适配方面提供的方法做的比安卓好太多了。自己实测之后，确实很方便(不过，还是想说，适配的核心始终是`AutoLayout`)。

![Size-CLass设置](http://cc.cocimg.com/api/uploads/20141217/1418795367881579.png)

## 概念初探

iOS8之前，公司在开发项目时，先做的**iPhone**版，然后要求开发**iPad**版本，其实内容是完全一样的，只是UI变化了，但是我们就需要建立2个工程来分别对应实现。iOS8推出的`Size Class`，可以让我们在一个工程的`storyboard`中进行所有尺寸屏幕的适配，不仅是`iPhone 4s-5/5s-6-6 Plus`，还包括`iPad`界面。它引入了一种新的概念，抛弃传统意义上我们适配时所谓的具体宽高尺寸，把屏幕的宽和高分别分成两种情况：`Compact-紧凑`，`Regular-正常`(Any-任意，其实就是这2种的组合，所以我没分成3种情况)。搭配起来是`3*3`，也就是无论如何变化，加起来也就9种，如上图。

### 1. 实际应用中，这Compact、Any、Regular如何运用呢?

`w:Any h:Any` 是我们刚建立工程时候默认选择的，算是一切描述的父类。其他的种类描述都是在此基础上变化的，比如：如果`weight`设为`Any`，`height`设置为`Regular`，那么在该状态下的界面元素在只要`height`为`Regular`，无论`weight`是`Regular`还是`Compact`的状态中都会存在。于是：

- w:Compact h:Compact - (**w:Any h:Compact**, **w:Compact h:Any**, **w:Any h:Any**)
- w:Regular h:Compact - (**w:Any h:Compact**, **w:Regular h:Any**, **w:Any h:Any**)
- w:Compact h:Regular - (**w:Any h:Regular**, **w:Compact h:Any**, **w:Any h:Any**)
- w:Regular h:Regular - (**w:Any h:Regular**, **w:Regular h:Any**, **w:Any h:Any**) 

### 2. 再来看一组数据和一张图(国外一位博主给出的，很形象)

- iPhone4S,iPhone5/5s,iPhone6
 * 竖屏：(**w:Compact h:Regular**)
 * 横屏：(**w:Compact h:Compact**)
- iPhone6 Plus
 * 竖屏：(**w:Compact h:Regular**)
 * 横屏：(**w:Regular h:Compact**)
- iPad
 * 竖屏：(**w:Regular h:Regular**)
 * 横屏：(**w:Regular h:Regular**)

![各种Size-Classes](http://cc.cocimg.com/api/uploads/20141217/1418795540826221.png)

### 3. 可以总结为:

- 如果项目不支持横屏显示，使用`w:Compact h:Regular`(或者直接取消使用`Size Class`)
- 如果项目支持横屏显示，使用`w:Compact h:Regular+w:Any h:Compact` 
- 对于一些公有的约束(任意组合中都适用)，一般放在`w:Any h:Any`中设置
- iPad同理

所以，我觉得`Size Class`最大的帮助是，解决横屏适配和`iPhone iPad`共享一个设计板（个人意见）

## 试验反馈一

- **1. 首先，先建立一个工程，展开如下页面**

![实验反馈一](http://cc.cocimg.com/api/uploads/20141217/1418795619564332.png)

>PS：这是iOS8的新特性,真的用到项目里需要等放弃兼容iOS7 。。。显然，目前还是不行的 

- **2. 在Any Any情况下，放置一个Label，并设置约束上-左-下-右为0-0-20-0**

![添加约束1](http://cc.cocimg.com/api/uploads/20141217/1418795649852495.png)

![添加约束2](http://cc.cocimg.com/api/uploads/20141217/1418795676961340.png)

- **3. 在Compact Any情况下，又放置一个Label，并设置约束上为20**

![添加约束3](http://cc.cocimg.com/api/uploads/20141217/1418795705149952.png)

- **4. 继续在Compact Any情况下，来看看横屏状态下的变化**

![添加约束5](http://cc.cocimg.com/api/uploads/20141217/1418795785522114.png)

- **5. 最后切换到Regular Any下，完成6 Plus 的横屏显示**

![添加约束6](http://cc.cocimg.com/api/uploads/20141217/1418795810496572.png)

## 试验反馈二

试验一里面，验证了一下概念中所列举的各个屏幕适用的组合，接下来，算是Size Class 解决横屏的妙用。

![添加约束7](http://cc.cocimg.com/api/uploads/20141217/1418795836776193.png)

![添加约束8](http://cc.cocimg.com/api/uploads/20141217/1418796024741244.png)

![添加约束9](http://cc.cocimg.com/api/uploads/20141217/1418796024510371.png)

![添加约束10](http://cc.cocimg.com/api/uploads/20141217/1418796063111839.png)

>PS：运用于，横屏适配，重新排版竖屏时候的UI布局。

除了改动不同组合下约束，也能改动控件在不同组合下是否显示。

![添加约束11](http://cc.cocimg.com/api/uploads/20141217/1418796117706089.png)

![添加约束12](http://cc.cocimg.com/api/uploads/20141217/1418796117427802.png)

## 试验反馈三

`AutoLayout`这里不给具体如何设置，因为不知道如何写，感觉还是大家多动手去写，去试，最有效了。下面给出AutoLayout设置的图解：

![添加约束13](http://cc.cocimg.com/api/uploads/20141217/1418796203135811.png)

![添加约束14](http://cc.cocimg.com/api/uploads/20141217/1418796203676119.png)

简答测试Demo结果图：

![简答测试Demo结果图](http://cc.cocimg.com/api/uploads/20141217/1418796267535492.png)

如果不横屏，也可以直接取消`Size Classes`（图不一样，不同时间写的…囧）

![取消Size-Class](http://cc.cocimg.com/api/uploads/20141217/1418796274163824.png)

## 最终Demo

[Demo的Github地址](https://github.com/ConanMTHu/Size-Classes-Demo/tree/master)

![最终Demo效果图1](http://cc.cocimg.com/api/uploads/20141217/1418796310127465.gif)

![最终Demo效果图2](http://cc.cocimg.com/api/uploads/20141217/1418796435255360.png)

![最终Demo效果图3](http://cc.cocimg.com/api/uploads/20141217/1418796435901113.png)

## 总结

直接说以后都应该使用`Storyboard＋Autolayout`感觉是不负责的说法，但是深入思考`Autolayout`是很有必要的!

如下情况使用`Autolayout`会有帮助：

- 当需要展示的内容很多并且尺寸不固定；
- 程序需支持屏幕旋转(主要是`iPad`程序，`iPhone`程序横屏的场景有点非主流，也不排除...手游...)；
- 程序通用于iPhone和iPad(最重要的吧)。

但`Storyboard`中使用`Autolayout`有利有弊，好处当然是可视化，实现简单功能很节省时间，但也有弊端，例如不小心移动一个控件就会让弄乱那些约束或者控件一多加上自定义的XXXXXXXX

## 参考资料

- [为iPhone6设计自适应布局(一)](http://www.devtalking.com/articles/adaptive-layout-for-iphone6-1/)
- [为iPhone6设计自适应布局(二)](http://www.devtalking.com/articles/adaptive-layout-for-iphone6-2/)
- [关于自动布局(Autolayout)](http://blog.csdn.net/liangliang103377/article/details/40080071)
- [WWDC 2014 Session笔记 - iOS界面开发的大一统](http://onevcat.com/2014/07/ios-ui-unique/)
- [Auto Layout 进阶](http://blog.csdn.net/ysy441088327/article/details/12558097)


