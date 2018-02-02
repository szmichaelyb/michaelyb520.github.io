---
layout: post
title:  关于 iOS “[App] if we're in the real....
author: Michael
Date: 2017-12-02 10:35:00 +8000
Categories: Xcode编译错误
tags: Xcode编译错误
---


## 错误描述
>iOS “[App] if we're in the real pre-commit handler we can't actually add any new fences due

最近运行APP，发现了这个问题，本着宁可错看，不可放过的原则，上[stackoverFlow学习了一下](http://stackoverflow.com/questions/38458170/ios-10-app-if-were-in-the-real-pre-commit-handler-we-cant-actually-add-any)：

```
----- “[App] if we're in the real pre-commit handler we can't actually add any new fences due ”
```

翻译：

```
-----“[应用]如果我们在真实预提交处理我们不能添加任何新的围栏，由于CA限购”
```

才知道这个问题其实是xcode 编译器设置的问题，其实并不影响app使用:

```
"-------it comes from +[UIWindow _synchronizeDrawingAcrossProcessesOverPort:withPreCommitHandler:] via os_log API. It doesn't depend from another components/frameworks that you are using(only from UIKit) - it reproduces in clean single view application project on changing interface orientation.
This method consists from 2 parts:
adding passed precommit handler to list of handlers;
do some work, that depends on current finite state machine state.
When second part fails (looks like prohibited transition), it prints message above to error log. However, I think that this problem is not fatal: there are 2 additional assert cases in this method, that will lead to crash in debug.---"
```

翻译：

```
----它来自+ [ UIWindow _synchronizedrawingacrossprocessesoverport：withprecommithandler：]通过os_log API。它不取决于另一个组件/框架，您使用的是（从UIKit）-再现清洁单视图应用程序项目改变界面取向。
该方法由2部分组成：
并通过预提交处理程序处理程序列表；
做一些工作，这取决于当前的有限状态机状态。
当第二部分失败（看起来像被禁止的过渡）时，它将上面的消息打印到错误日志上。然而，我认为这个问题不是致命的：有2个额外的断言在这种方法的情况下，这将导致崩溃在调试
```

----------------------------华丽的分割线-------------------------------------

解决方法：

```
in your Xcode:

Click on your active scheme name right next to the Stop button
Click on Edit Scheme....
in Run (Debug) select the Arguments tab
in Environment Variables click +
add variable: OS_ACTIVITY_MODE = disable
```

其实这好像是老版xcode 的，其实点击Xcode的product就可以找到（OS_ACTIVITY_MODE是name，disable 是值）。

![Xcode错误解决](http://img.blog.csdn.net/20161028160636902?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



