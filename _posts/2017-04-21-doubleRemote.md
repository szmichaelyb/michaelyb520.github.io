---
title: 呦~ 玩转Git 多远端的应用
layout: post
author: 谢涛
date: '2017-04-21 15:50:24 +0800'
categories: Git
---

![Git](http://upload-images.jianshu.io/upload_images/1319710-556d3532d7de6bbd.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)
>Git使用小技巧—食之无味，弃之可惜，坚持不铺张浪费的原则。

# 背景
对比``GitHub``和``Bitbucket``各有优劣势(国内的不敢用)，单一使用都是各种限制，比如说GitHub什么都好就是私有仓库要收费，而Bitbucket虽然免费，但是又各种卡，推送和拉取都比较慢，我们的口号是鱼和熊掌兼得，取二者之长。文章结尾处还总结了两点妙用。


|平台|私有仓库|io速度|使用频率|
|-----|-----|-----|
|Github|收费|快|频繁|
|Bitbucket|免费|慢|偶尔|


# 如何各取所长

#### 1.建立远端

首先在``GitHub``和``Bitbucket``各建立一个仓库。使用Git管理工具``SourceTree``上选择新建Remote（远端仓库），建立``GitHub Remote``、``Bitbucket Remote``两个远程仓库。
![新建远程仓库](http://upload-images.jianshu.io/upload_images/1319710-592b6c38229b98cb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/340)

#### 2.建立分支

然后建立常用开发分支``Dev``，敏感信息分支``Secret``等两个分支，将``dev``推送到``GitHub``远端仓库，``Secret``推送至``Bitbucket``远端仓库。
![将分支推送到远端仓库](http://upload-images.jianshu.io/upload_images/1319710-5e03f97ef827f67d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/440)

#### 3.分支的分工明确
平时开发使用``Dev``分支，充分发挥在GitHub上推送拉取快速的优势，定期将``Dev``分支同步到``Secret``分支中。而一些敏感信息直接在``Secret``分支中修改，这样``Secret``分支保证了安全性，``Dev``分支保证了良好的体验。
![远程仓库各自的分支](http://upload-images.jianshu.io/upload_images/1319710-ef34b5bc8654da77.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/440)

# 操作使用

#### 1.推送

在存在多远端的项目中推送代码需要注意选择 **远端仓库** 和 **分支** ,确定后选择提交。
![推送](http://upload-images.jianshu.io/upload_images/1319710-3dd31d758fa187ba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)

#### 2.拉取

拉取更新的时候同样需要注意选择 **远端仓库** 和 **分支** ，还有拉取到的本地分支也要核对，避免出错。例图即是将``GitHub``仓库中的``Dev``分支中的代码同步至``Secret``分支。

![拉取](http://upload-images.jianshu.io/upload_images/1319710-77e6fad6d396e452.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)


# 其他妙用
1.再也不怕因为丢失GitHub密码造成丢失代码节点控制。  
2.权限控制，dev分支相当于开发权限，secret分支相对于管理员权限。