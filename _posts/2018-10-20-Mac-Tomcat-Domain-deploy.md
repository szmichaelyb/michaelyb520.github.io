---
layout: post
title:  如何将域名部署到Tomcat中，用域名访问服务器
author: Michael
Date: 2018-10-20 10:29:00 +8000
Categories: Java开发
tags: Tomcat
---

> **前提：我的域名是www.xxxx.top**

1. 打开Tomcat所在文件夹，找到conf文件夹下的server.xml文件,打开编辑它；

2. 将下面的8080端口改为80端口。

   ```xml
   <Connector port="8080" protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8443" />
   ```

   *修改后的截图* 

   ![tomcat-port-01](/assets/images/2018/Tomcat/tomcat-port-01.png)

3. 将下面的localhost修改为你的域名。

   ```xml
   <Engine name="Catalina" defaultHost="localhost">

   <!--For clustering, please take a look at documentation at:
             /docs/cluster-howto.html  (simple how to)
             /docs/config/cluster.html (reference documentation) -->
   ```

   *修改后的截图* 

   ![tomcat-port-02](/assets/images/2018/Tomcat/tomcat-port-02.png)

4. 第一行的name=”localhost”中的localhost改为你的域名在最后Host关闭标签前加上下面这句话，里面的docBase里面放你发布的项目的名字。

   ```xm
   <Context docBase="com.weiXin" path="" reloadable="true" ></Context>
   ```

   Host的配置：

   ```xml
   <Host appBase="webapps" autoDeploy="true" name="localhost" unpackWARs="true">
       <!-- SingleSignOn valve, share authentication between web applications Documentation at: /docs/config/valve.html -->
       <!-- <Valve className="org.apache.catalina.authenticator.SingleSignOn" /> -->
       <!-- Access log processes all example.
   		Documentation at: /docs/config/valve.html
   		Note: The pattern used is equivalent to using pattern="common" -->
       <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs" pattern="%h %l %u %t &quot;%r&quot; %s %b" prefix="localhost_access_log" suffix=".txt"/>
       
       <Context docBase="D:\apache-tomcat-8.0.46\webapps\com.weiXin" path="/com.weiXin" reloadable="true" source="org.eclipse.jst.jee.server:com.weiXin"/>
       <Context docBase="D:\apache-tomcat-8.0.46\webapps\com.CDSN" path="/com.CDSN" reloadable="true" source="org.eclipse.jst.jee.server:com.CDSN"/>
   </Host>
   ```

   *修改后的截图* 

   ![tomcat-port-03](/assets/images/2018/Tomcat/tomcat-port-03.png)

这里一定要注意后面加上的Context标签，它是一个闭合的标签，不闭合会导致Tomcat启动闪退，我看了很多教程博客上都是开放的，结果就是Tomcat启动闪退。

如果你闭合启动还闪退那就是环境问题，参考文章：[TomCat服务器闪退问题](http://blog.csdn.net/qq_36330228/article/details/77898512)


