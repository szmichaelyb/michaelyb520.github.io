---
layout: post
title: 主线程问题:提醒Main Thread Checker,关于UI API called on a background thread的解释
author: Michael
Date: 2019-05-26 10:29:00 +8000
Categories: iOS开发
tags: iOS开发
---

### 主线程问题:提醒Main Thread Checker: UI API called on a background thread的解释

> 一般做服务端的人基本没有MainThread和 BackgroundThread的概念，但是这个概念在客户端中是非常重要的，因为客户端不管安卓还是iOS，UI刷新需要始终占用主线程去刷新，如果一旦占用bg线程，虽然不会发生致命错误，但是也会提示这种warning级别的报错； 同样，如果我们把一些本应该在bg中执行的网络请求放在了Main中，那么会导致UI停止刷新，双方执行了sync操作，体验非常差，这是不规范的操作。

**所以**

```bash
Main Thread Checker: UI API called on a background thread...
Xcode 9 [UIView initWithFrame:] must be used from main thread only
```

这种错误就是需要查看你代码中有没有UI刷新操作没有强制主线程更新的。

**解决方法**

```objective-c
dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    UIImage * snapShot = [self generateShadowImage];
    dispatch_async(dispatch_get_main_queue(), ^{
        imageView.image = snapShot;
    });
});

...

- (UIImage *)generateShadowImage
{
    // It crashes here:
    UIView * shadowView = [[UIView alloc] initWithFrame:CGRectZero];
    ...
}
```

**官网解决方法**：http://quabr.com/46362641/xcode-9-uiview-initwithframe-must-be-used-from-main-thread-only

