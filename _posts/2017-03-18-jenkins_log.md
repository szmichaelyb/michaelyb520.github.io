---
title: Jenkins+fir 上传更新日志
layout: post
author: 谢涛
date: '2017-03-17 14:50:24 +0800'
categories: Blog
---
![Jenkins](http://upload-images.jianshu.io/upload_images/1319710-3cc4a32689f5ba94.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
>iOS开发自动打包应该很多人用了，但是其中还有一些地方不够完美，比如说打包上传成功fir和邮件没有更新日志内容，嗯，我要说的就是这个。

# 背景
在日常开发中持续集成可以节省开发者很多时间和精力，fir下载地址和邮件没有更新日志内容，这样无法通知测试人员具体修改内容，造成了很多不便，所以有了这个需求，下面贴一张没有更新日志和有更新日志对比图。

![对比.png](http://upload-images.jianshu.io/upload_images/1319710-3b9cb213f181cbed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/840)


# 步骤
**前提**：首先你得先折腾好打包工具吧，现在的教程都已经很多了，贴一下当时我看的教程：
[1.Jenkins+GitHub+Xcode+fir自动打包教程](http://xuanyiliu.com/2016/09/22/Jenkins+GitHub+Xcode+fir/)  
[2.我在集成中遇到的一些问题和解决方案](http://blog.csdn.net/xietao3/article/details/52415256)


1. 首先安装插件：``Environment Injector Plugin``,这里是[下载地址](http://updates.jenkins-ci.org/download/plugins/envinject/)，下载成功后``打开Jenkins``->``系统管理``->``管理插件``->``高级``->``拖至页面底部上传插件``->``选中文件点击上传``，提示成功后返回首页。
![上传插件.png](http://upload-images.jianshu.io/upload_images/1319710-fea298ade7e67c96.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/240)

2. 进入现有的项目，输出commit日志内容：``增加构建步骤``->``Execute shell``->在``Command``输入以下内容（注意替换username和password）：
```
CHANGELOG=$(curl -u username:password "http://localhost:8080/job/$JOB_NAME/$BUILD_NUMBER/api/xml?wrapper=changes&xpath=//changeSet//comment" | sed -e "s/<\/comment>//g; s/<comment>//g; s/<\/*changes>//g" | sed '/^$/d;G')
echo CHANGELOG=$CHANGELOG > change_log_vars
```
![输出日志](http://upload-images.jianshu.io/upload_images/1319710-856bdc4e26e3821b.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)

3. 设置commit日志保存路径：``增加构建步骤``->``Inject environment variables``->在``Properties File Path``输入``change_log_vars``。
![日志路径](http://upload-images.jianshu.io/upload_images/1319710-328e1e06773a8a4c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)

4. 输出commit日志发布者:``增加构建步骤``->``Execute shell``->在``Command``输入以下内容（注意替换username和password）：
```
CHANGEAUTHOR=$(curl -u username:password "http://localhost:8080/job/$JOB_NAME/$BUILD_NUMBER/api/xml?wrapper=changes&xpath=//changeSet//fullName" | sed -e "s/<\/fullName>//g; s/<fullName>//g; s/<\/*changes>//g" | sed '/^$/d;G')
echo CHANGEAUTHOR=$CHANGEAUTHOR > change_author_vars
```
![输出用户名](http://upload-images.jianshu.io/upload_images/1319710-656cce0c30a9ff09.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)

5. 设置commit日志发布者保存路径：``增加构建步骤``->``Inject environment variables``->在``Properties File Path``输入``change_author_vars``。
![用户名路径](http://upload-images.jianshu.io/upload_images/1319710-6748236f6af49291.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)

6. 获取到commit日志后发给fir:``增加构建后操作步骤``->``Upload to fir.im``->在``fir.im Token``中输入你从fir获得的token，然后在``Build Notes``中输入:
```
$CHANGELOG
by $CHANGEAUTHOR
```

注：如果没有安装fir插件[点击这里下载](http://7xju1s.com1.z0.glb.clouddn.com/fir-plugin-1.9.5.hpi)，和步骤1一样安装即可。
![fir](http://upload-images.jianshu.io/upload_images/1319710-9048fbd7b2340d54.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)


# 结语
虽然是个小细节的东西，但是很实用。