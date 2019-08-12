---
layout: post
title:  iOS开发中的UDID和UUID详解
author: Michael
Date: 2019-05-08 10:13:00 +8000
Categories: iOS开发
tags: iOS开发
---

今天突然想和大家聊聊UDID和UUID的问题，虽然平时我们对这两个东西很忽视，往往也很难区分这两个东西。今天就来好好谈谈。

### UDID

UDID：设备唯一标识符，全名为 **Unique Device Identifier**。从名称上也可以看出，UDID这个东西是和设备有关的，而且是只和设备有关的，有点类似于MAC地址。需要把UDID这个东西添加到Provisoning Profile授权文件中，也就是把设备唯一标识符添加进去，以此来识别某一台设备。

UDID是一个40位十六进制序列，我们可以使用iTunes和Xcode来获取这个值。

#### 1. iTunes获取UDID

把我们的手机连上电脑，然后打开iTunes。

![udid-uuid01.png](https://upload-images.jianshu.io/upload_images/563374-6839bcc0a4ca2c2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

默认这个位置显示的是序列号，只要点击一下序列号的位置，就可以切换为UDID了。

![udid-uuid02.png](https://upload-images.jianshu.io/upload_images/563374-964d6a4388f6cce0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 2. Xcode获取UDID

把手机连上电脑，然后打开Xcode，选择Window —> Devices，就会显示出当前你连接上的所有设备，其中显示的Identifier就是该设备的UDID。

![udid-uuid03.png](https://upload-images.jianshu.io/upload_images/563374-0632f4c0f6d6f5ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![udid-uuid04.png](https://upload-images.jianshu.io/upload_images/563374-39ff6bc28a94a990.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 但是如果我们代码中要用到UDID，那么应该怎么办呢？

很遗憾，自从iOS5之后，苹果就禁止了通过代码访问UDID，在这之前，可以使用`[[UIDevice cuurrent] uniqueIdenfier]`这个方法来获取某设备UDID，现在是不可能了。

对于为什么要禁止访问UDID，我下面会提到。

而在目前的SDK中，苹果提供了一个参数identifierForVendor来替代原来UDID的作用。通过代码实现如下：

```objective-c
NSUUID * uuid = [UIDevice currentDevice].identifierForVendor;
NSLog(@"uuid 1 = %@",uuid.UUIDString);
```

此时打印出的字符串UUIDString这个东西不是真正的UDID，而是一个有一点像的替代品。

如同我上面所说，UDID是只和iOS设备有关的，而这个identifierForVendor是应用和设备两者都有关的，

A应用安装到张三这台设备上，就会产生一个identifierForVendor（比如是：1234）；
A应用安装到李四这台设备上，就会产生另一个identifierForVendor（比如是：5678）；
B应用安装到张三这台设备上，又是一个全新的identifierForVendor（比如是：9999），
B应用安装到李四这台设备上，还是一个全新的identifierForVendor（比如是：7777）。
但是无论A应用安装卸载多少次，产生的是都是1234。

所以我们知道，这个identifierForVendor是一种应用加设备绑定产生的标识符，相当于是：Z(identifierForVendor) = X(某应用) + Y(某设备)。 

当然，和真正的UDID的区别是显而易见的：也就是说App的开发者没有办法去区分某一台设备了，而是只能识别某个应用在某台设备上。

### UUID

UUID：即通用唯一标识符，全名为 **Universally Unique Identifier**。是一个32位的十六进制序列，使用小横线来连接：8-4-4-4-12 。UUID在某一时空下是唯一的。比如在当前这一秒，全世界产生的UUID都是不一样的；当然同一台设备产生的UUID也是不一样的。

我在很早之前的一篇博客中使用了一种现在看起来非常愚蠢的方式来获取当前的UUID，下面也有读者反映了这个情况，现在最简单获取UUID的代码如下：

```objective-c
for (int i = 0; i < 10; i++) {
    NSString * uuid = [NSUUID UUID].UUIDString;
    NSLog(@"uuid 2 = %@",uuid);
}
```

通过运行程序可以发现，循环10次，每一次打印的值都是不一样的，当然循环的再多，这个值永远不会出现两个一样的值。所以从某种程序上来说，UUID跟你的设备没有什么关系了。

UDID被弃用，使用UUID来作为设备的唯一标识。获取到UUID后，如果用NSUserDefaults存储，当程序被卸载后重装时，再获得的UUID和之前就不同了。使用keychain存储可以保证程序卸载重装时，UUID不变。但当刷机或者升级系统后，UUID还是会改变的。但这仍是目前为止最佳的解决办法了，如果有更好的解决办法，欢迎留言。

### 苹果禁用UDID

在很早之前，苹果宣称如果第三方应用开发者继续分享或者使用iPhone、Mac、AppleWatch的UDID的话，那么他们的应用将会禁止上架。为什么苹果要在应用中禁止使用呢？那是因为隐私问题。比如我开发了5款App，很多用户都下载了这5款App并使用。如果我能轻易的获取这些用户的UDID，其实我能拼凑出用户的很多信息。由于UDID本身的隐私属性，之前常常用来做第三方统计和其他的目的。当然现在也有人使用MAC地址来识别设备，因为MAC地址也唯一的识别了一台设备并且不会被修改，不知道以后苹果会对此如何操作。

以下是苹果对于禁用UDID的声明：

![苹果对于禁用UDID的声明](https://upload-images.jianshu.io/upload_images/563374-82c3257a184d5339.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 延伸阅读

- [通过Safari浏览器获取iOS设备UDID(设备唯一标识符)](http://www.skyfox.org/safari-ios-device-udid.html)

- [FCUUID](https://github.com/fabiocaccamo/FCUUID.git)

- [钥匙串管理](https://github.com/kishikawakatsumi/UICKeyChainStore.git)

  
