---
layout: post
title:  Mac上Eclipse配置ADT
author: Michael
Date: 2018-10-25 11:14:00 +8000
Categories: Android开发
tags: Eclipse
---



在Mac电脑上搭建Android Eclipse开发环境有如下4步：

1. 先安装JDK，注意不要安装最新的1.9，安装1.8就好

2. 下载Eclipse

3. 在Eclipse上安装ADT 插件

4. 通过 Android SDK Manager安装更新Android SDK工具

![Mac上Eclipse配置ADT](/assets/images/2018/Eclipse/Mac上Eclipse配置ADT.png)

### 详细步骤说明

#### 1. 安装JDK

注意不要安装最新的1.9，安装1.8的就好。我最初安装了1.9，结果各种坑啊，搞了好久才发现是JDK版本的问题，由此说明最新版本不一定是最好的，可能会有兼容性的问题。 
此处有JDK1.8的下载链接，下载这个版本就好（Mac 64位）。 
http://download.oracle.com/otn-pub/java/jdk/8u151-b12/e758a0de34e24606bca991d704f6dcbf/jdk-8u151-macosx-x64.dmg 
如果安装版本出错了，想要删除JDK版本，可参考如下链接删除JDK 
http://blog.csdn.net/haozhugogo/article/details/54809545

#### 2. 下载Eclipse

我选择的版本是Mars，建议大家根据习惯来选择版本。 
Mac版的Eclipse Mars下载链接 
http://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/mars/2/eclipse-cpp-mars-2-macosx-cocoa-x86_64.tar.gz 
Eclipse各个版本的下载链接在这里： 
http://www.eclipse.org/downloads/packages/release/Mars/2

#### 3. 在Eclipse上安装ADT插件

可以先下载ADT，再离线安装ADT。可以参考如下博客 
http://blog.csdn.net/menghuanbeike/article/details/69945871

#### 4. 安装完ADT插件，则可以通过Android SDK Manager安装更新Android SDK工具啦。

Android SDK下载链接如下： 
https://dl.google.com/android/android-sdk_r24.4.1-macosx.zip 
更多Android SDK下载地址： 
http://tools.android-studio.org/index.php/sdk 
下载好Android SDK后，打开Eclipse自动导入SDK目录。可以使用Android SDK Manager更新Android SDK Tools 
步骤如下： 
打开Eclipse，在顶部菜单中选择Window，在下拉菜单中找到Android SDK Manager。 
进入Android SDK Manager后，可根据需要选择下载Android SDK版本，如Android 5.1.1版本。

#### 5. Android各版本SDK下载地址(Mac/Windows/Linux)

- [SDK下载](http://tools.android-studio.org/index.php/sdk)
- [ADT下载](http://tools.android-studio.org/index.php/adt-bundle-plugin)

#### 6. 总结：以上是我自己查找资料找到的方法。希望对你有帮助。

环境的搭建是个比较费时的过程，尤其对于新手来说，不过可以参考的资料也很多，慢慢来，一步一步总会搞定的。 祝你android 学习一路顺风。