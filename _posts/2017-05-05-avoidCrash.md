---
title: iOS - 被赶尽杀绝的Crash
layout: post
author: 谢涛
date: '2017-05-05 15:10:24 +0800'
categories: iOS
---

![](http://upload-images.jianshu.io/upload_images/1319710-a07a36728197181e.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>Crash曾经是折磨我们的梦魇，程序员的头顶的一把铡刀，你永远不知道它什么时候降下来...

# 背景
现在市面上Crash收集做得好的平台已经很多了，比如说听云、Bugly等，听云的功能确实强大、Crash的崩溃轨迹是其他平台上没有看到的，但是其价格有点惊人，而Bugly只记录页面轨迹，但是Bugly是免费的。不管是听云还是Bugly，他们的功能其实都是很好实现的，下面我会一一介绍。

![听云崩溃轨迹](http://upload-images.jianshu.io/upload_images/1319710-4078f424eb4fcb3d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 收集Crash
在``AppDelegate``加入收集Crash的方法，具体监听Crash代码新建一个类目或者建一个单例都可以，看具体场景。
```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [self collectCrash];
    return YES;
}
```
监听代码：
```
@implementation AppDelegate (CollectCrash)

- (void)collectCrash {
    struct sigaction newSignalAction;
    memset(&newSignalAction, 0,sizeof(newSignalAction));
    newSignalAction.sa_handler = &signalHandler;
    sigaction(SIGABRT, &newSignalAction, NULL);
    sigaction(SIGILL, &newSignalAction, NULL);
    sigaction(SIGSEGV, &newSignalAction, NULL);
    sigaction(SIGFPE, &newSignalAction, NULL);
    sigaction(SIGBUS, &newSignalAction, NULL);
    sigaction(SIGPIPE, &newSignalAction, NULL);
    
    //异常时调用的函数
    NSSetUncaughtExceptionHandler(&handleExceptions);
}

void handleExceptions(NSException *exception) {
    CCLog(@"exception = %@",exception);
    CCLog(@"callStackSymbols = %@",[exception callStackSymbols]);
}

void signalHandler(int sig) {}
@end
```
收集效果：
```
2017-05-05 10:00:00.049 CrashDemo[1238:68105] Crash Collect: exception = *** -[__NSArrayI objectAtIndex:]: index 10 beyond bounds [0 .. 2]
2017-05-05 10:00:00.052 CrashDemo[1238:68105] Crash Collect: callStackSymbols = (
	0   CoreFoundation                      0x000000010dc11d4b __exceptionPreprocess + 171
	1   libobjc.A.dylib                     0x000000010d67321e objc_exception_throw + 48
	2   CoreFoundation                      0x000000010db4c2bb -[__NSArrayI objectAtIndex:] + 155
	3   CrashDemo                           0x000000010d08587b -[NSArray(avoidCrash) avoidCrash_arrayI_objectAtIndex:] + 59
	4   CrashDemo                           0x000000010d088021 -[AvoidCrashViewController tableView:didSelectRowAtIndexPath:] + 289
	5   CrashDemo                           0x000000010d08663c -[UITableView(CollectEvent) fd_imp_tableView:didSelectRowAtIndexPath:] + 556
	6   UIKit                               0x000000010e18d3b9 -[UITableView _selectRowAtIndexPath:animated:scrollPosition:notifyDelegate:] + 1848
	7   UIKit                               0x000000010e18d5cd -[UITableView _userSelectRowAtPendingSelectionIndexPath:] + 330
	8   UIKit                               0x000000010e04262f _runAfterCACommitDeferredBlocks + 320
	9   UIKit                               0x000000010e02f273 _cleanUpAfterCAFlushAndRunDeferredBlocks + 566
	10  UIKit                               0x000000010e060746 _afterCACommitHandler + 176
	11  CoreFoundation                      0x000000010dbb6267 __CFRUNLOOP_IS_CALLING_OUT_TO_AN_OBSERVER_CALLBACK_FUNCTION__ + 23
	12  CoreFoundation                      0x000000010dbb61d7 __CFRunLoopDoObservers + 391
	13  CoreFoundation                      0x000000010db9af8e __CFRunLoopRun + 1198
	14  CoreFoundation                      0x000000010db9a884 CFRunLoopRunSpecific + 420
	15  GraphicsServices                    0x0000000111a03a6f GSEventRunModal + 161
	16  UIKit                               0x000000010e035c68 UIApplicationMain + 159
	17  CrashDemo                           0x000000010d08697f main + 111
	18  libdyld.dylib                       0x0000000110a7368d start + 1
)
```

# 收集Crash轨迹
轨迹的收集其实就是要收集到Crash前10秒内的用户操作记录，我的上一篇文章[无埋点数据统计](http://www.jianshu.com/p/a6afc6252965)详细讲解了如何收集到这些数据。选择手动埋点也是可以的，但是毕竟费时费力，并不推荐这种方式。毫无疑问的是，Crash轨迹对快速定位问题的原因有极大的帮助。

# 规避闪退
### 1. 规避常见数据类型异常

[iOS runtime实用篇--和常见崩溃say good-bye！](http://www.jianshu.com/p/5d625f86bd02)，本文含Demo，非常详尽，规避Crash的同时捕捉了异常调用栈。
### 2. Crash全面防护
[黑魔法教你让iOS APP防住Crash](http://www.jianshu.com/p/02157577d4e7)，这一篇文章比较全面地讲解如何规避各种Crash，但是没有Demo，部分细节也不明确。

1. unrecognized selector crash
2. KVO crash
3. NSNotification crash
4. NSTimer crash
5. Container crash（数组越界，插nil等）
6. NSString crash （字符串操作的crash）
7. Bad Access crash （野指针）
8. UI not on Main Thread Crash 

### 3. 规避unrecognized selector crash
由于参考的文章没有Demo，我根据介绍简单地写了一个Demo，检验一下。在这里我手动增加了异常原因和异常调用栈Log(有更好的方式请联系我)，动态添加桩类``AvoidCrashTarget``，再动态给桩类添加了一个方法，该方法绑定了``avoidCrashAction``的``IMP``，将消息转发给桩类实例,最终被调用的方法实际上是``avoidCrashAction``。
```

@implementation NSObject (AvoidCrash)
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wobjc-protocol-method-implementation"
- (id)forwardingTargetForSelector:(SEL)aSelector{
    // 打印报错SEL
    CCLog(@"unrecognized selector crash:%@:%@",NSStringFromClass([self class]),NSStringFromSelector(aSelector));
    // 打印报错调用栈 BSBacktraceLogger
    BSLOG_MAIN

    // 动态添加桩类 将消息转发给桩类实例
    Class class = objc_allocateClassPair(NSClassFromString(@"NSObject"),"AvoidCrashTarget",0);
    class_addMethod(class, aSelector, class_getMethodImplementation([self class], @selector(avoidCrashAction)), "@:");
    id tempObject = [[class alloc] init];
    return tempObject;
}
#pragma clang diagnostic pop
// 重新绑定的IMP
- (NSInteger)avoidCrashAction {
    return 0;
}

```

# 卡顿监控
### 1. 监听主线程Runloop
本文卡顿监控的原理是监听``Runloop``的状态。``Runloop``被唤醒后处理事件，处理完成后进入休眠状态，如果我们监听到``Runloop``被唤醒后，长时间没有进入休眠状态即视为卡顿。结合对``CPU``使用率的综合判断，会更加合理。

![runloop(借来的图)](http://upload-images.jianshu.io/upload_images/1319710-6eda3c4b86203cac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)
监听源码：
```
- (void)addObserver {
    __weak __typeof(&*self)weakSelf = self;
    // 1. 创建监听者
    CFRunLoopObserverRef observer = CFRunLoopObserverCreateWithHandler(kCFAllocatorDefault, kCFRunLoopAllActivities, YES, 0, ^(CFRunLoopObserverRef observer, CFRunLoopActivity activity) {
        switch (activity) {
            case kCFRunLoopEntry:
//                NSLog(@"进入");
                break;
            case kCFRunLoopBeforeTimers:
//                NSLog(@"即将处理Timer事件");
                break;
            case kCFRunLoopBeforeSources:
//                NSLog(@"即将处理Source事件");
                break;
            case kCFRunLoopBeforeWaiting:
                [weakSelf.operationQueue cancelAllOperations];
//                NSLog(@"即将休眠");
                break;
            case kCFRunLoopAfterWaiting:
//                NSLog(@"被唤醒");
                [weakSelf startCountDown];
                break;
            case kCFRunLoopExit:
//                NSLog(@"退出RunLoop");
                break;
            default:
                break;
        }
    });
    
    // 2. 添加监听者
    CFRunLoopAddObserver(CFRunLoopGetCurrent(), observer, kCFRunLoopDefaultMode);
}

```
### 2. 卡顿时间
``Runloop``被唤醒后新建了2个``NSBlockOperation``加入异步队列，``op1``起的是延时作用，如果``Runloop``在``monitLockTimeInterval``时间内进入休眠，``op2``就将被取消，从队列中删除。如果没有在``monitLockTimeInterval``时间内进入休眠，``op2``将被执行，调用``- (void)appearlockAction``方法，打印出卡顿的调用栈。
```
- (void)startCountDown {
    __weak __typeof(&*self)weakSelf = self;
    NSBlockOperation *op1 = [NSBlockOperation blockOperationWithBlock:^{
        sleep(monitLockTimeInterval);
    }];
    NSBlockOperation *op2 = [NSBlockOperation blockOperationWithBlock:^{
        [weakSelf appearlockAction];
    }];
    [op2 addDependency:op1];
    [_operationQueue addOperation:op1];
    [_operationQueue addOperation:op2];
}

- (void)appearlockAction {
    NSLog(@"----------卡顿-----------");
    BSLOG_MAIN;
}
```
新建NSBlockOperation的方式会比较占用资源，待发现更好的方式。

### 3. CADisplayLink监控卡顿
[iOS应用UI线程卡顿监控](http://www.jianshu.com/p/c8ee2103ca92),原理是屏幕在连续的屏幕刷新周期之内无法刷新屏幕内容，即是发生了卡顿。

# 总结
有了这些手段，Crash基本上无处可逃，同时常见的Crash也将被规避，大大地提升用户体验。

[本文Demo](https://github.com/xietao3/CrashCollectionDemo)