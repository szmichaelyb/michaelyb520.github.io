---
layout: post
title:  Tomcat配置虚拟目录（目录+文件）
author: Michael
Date: 2018-10-23 11:13:00 +8000
Categories: Java开发
tags: Tomcat
---

### 1. server.xml设置

打开Tomcat安装目录，在server.xml中`<Host>`标签中，增加`<Context docBase="硬盘目录" path="虚拟路径" reloadable="true"/>`。

例如：`<Context docBase="D:/myWebDoc" path="/myWebPath" reloadable="true"/>`或`<Context docBase="mlsc-ecs" path="/myWebDoc" reloadable="true" source="org.eclipse.jst.jee.server:myWeb"/>`。

![tomcat-dir-10](/assets/images/2018/Tomcat/tomcat-dir-10.png)

 说明：

> path： 为空代表网站根目录
>
> docBase：可以设置绝对路径，也可设置相对路径，相对路径是相对 appBase 属性所设的目录而言的

### 2. 访问配置路径中的文件

设置完1，启动web项目，通过http://localhost:端口/myWebPath可以访问D:/myWebDoc中的具体文件；

### 3. 访问配置路径目录

若要访问目录，则还需要在web.xml中增加设置，再打开Tomcat安装目录,打开conf/web.xml 文件，在其中找到。

```xml
<init-param>\
    <param-name>listings</param-name>
    <param-value>false</param-value>
</init-param>
```

将false设成true保存。

### 4. 启动Tomcat，通过http://localhost:端口/myWebPath可以访问D:/myWebDoc文件夹。

![tomcat-dir-11](/assets/images/2018/Tomcat/tomcat-dir-11.png)