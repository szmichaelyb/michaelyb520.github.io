---
layout: post
title:  Tomcat部署项目的几种常见方式
author: Michael
Date: 2018-10-23 11:10:00 +8000
Categories: Java开发
tags: Tomcat
---

> 文章主要介绍了Tomcat部署项目的几种常见方式，文中给大家提到了三种方法，除此之外还有Tomcat热部署的方式。

![tomcat-dir-09](/assets/images/2018/Tomcat/tomcat-dir-09.jpg)

1. **直接将web项目文件件拷贝到webapps目录中**

   这是最常用的方式，Tomcat的Webapps目录是Tomcat默认的应用目录，当服务器启动时，会加载所有这个目录下的应用。如果你想要修改这个默认目录，可以在conf下的server.xml文件里修改Host标签里的appBase值。

   这个方法实际上和在IDE开发环境里部署项目是一样的。

   用此方法的访问路径为<http://localhost:8080/webname>

2. **修改Server.xml文件**

   在conf下的server.xml文件里找到Host标签，在里面添加如下代码：

   ```xml
   <Context path="/jfinal_demo" docBase="F:workjfinal_demoWebRoot" reloadable ="true" debug="0" privileged="true"> 
   </Context>  
   ```

   - path：是访问时的根地址，表示访问的路径，可以自定义，如上述例子中，访问该应用程序地址如下：<http://localhost:8080/jfinal_demo>;
   - docbase：表示应用程序的路径，docBase可以使用绝对路径，也可以使用相对路径，相对路径相对于webapps ;
   - reloadable：表示可以在运行时在classes与lib文件夹下自动加载类包。这个属性在开发阶段通常都设为true，方便开发;在发布阶段应该设置为false，提高应用程序的访问速度 ;
   - 其他属性参见相关文档。

3. **在confCatalinalocalhost 目录下添加xml配置文件**

   新建名为jfinal_demo.xml文件，文件内容配置如下：

   ```xml
   <Context path="/jfinal_demo" docBase="F:workjfinal_demoWebRoot" reloadable ="true" debug="0" privileged="true"> 
    </Context> 
   ```

   Catalinalocalhost目录tomcat下载下来默认是没有的，首次启动会自动创建，也可以手动创建;

   配置中可以去掉path属性，因为访问项目时的根路径只取决于XML文件的名称，如上述例子中，访问该应用程序地址如下：<http://localhost:8080/jfinal_demo> ;

   推荐使用第三种方式，因为不需要修改tomcat默认配置，对Tomcat的侵入性最小，并且如果想取消部署，直接删除xml配置文件即可。

   以上几种方法都经过本人测试，除此之外还有Tomcat热部署的方式 。

