---
layout: post
title:  tomcat 文件夹设置目录浏览模式
author: Michael
Date: 2018-10-22 10:09:00 +8000
Categories: Java开发
tags: Tomcat
---

在项目开发过程中，有时候我们需要一个简易的文件下载功能，即直接通过url将文件下载。但是有时候会报404错误，这个只要设置一个地方即可。

找到tomcat服务器安装目录，进入conf文件夹，找到web.xml文件，打开。

![tomcat-dir-01](/Users/Michael/Desktop/GIT_LOCAL/Michael-Blog/assets/images/2018/Tomcat/tomcat-dir-01.png)

打开之后搜索listings关键字，找到如下位置

![tomcat-dir-02](/Users/Michael/Desktop/GIT_LOCAL/Michael-Blog/assets/images/2018/Tomcat/tomcat-dir-02.png)

将绿色区域的false改为true，然后重启tomcat，即可。