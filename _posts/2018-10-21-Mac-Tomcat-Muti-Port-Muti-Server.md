---
layout: post
title:  在一个tomcat下，一域名对应多端口，一端口对应多域名;在多个tomcat下，不同域名对应不同端口的配置
author: Michael
Date: 2018-10-21 09:29:00 +8000
Categories: Java开发
tags: Tomcat
---

### 同一个tomcat下，一个域名对应多个端口号

编辑`server.xml`文件，在`<Service></Service>`标签中添加

![tomcat-port-07](/assets/images/2018/Tomcat/tomcat-port-07.png)

添加多个这个就可以了。只需要修改这里面的port其他参数不需要修改。

例如：

![tomcat-port-08](/assets/images/2018/Tomcat/tomcat-port-08.png)

### 同一个tomcat下，多个域名对应一个端口号（或多个端口号）

```xml
<Host name="tsm.melifego.com"  appBase="webapps" unpackWARs="true" autoDeploy="true">
    <!-- SingleSignOn valve, share authentication between web applications
		Documentation at: /docs/config/valve.html -->
    <!-- <Valve className="org.apache.catalina.authenticator.SingleSignOn" /> -->
    <!-- Access log processes all example.
		Documentation at: /docs/config/valve.html
		Note: The pattern used is equivalent to using pattern="common" -->
    <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
           prefix="localhost_access_log" suffix=".txt" 
           pattern="%h %l %u %t &quot;%r&quot; %s %b" />
    <Context docBase="E:\tagen_wy\data\upload" path="/resources" />
    <!--
	<Context docBase="E:\tagen_wy\data\property-management" path="/property-management" />
	<Context docBase="E:\tagen_wy\data\property-wechat-service" path="/property-wechat-service"  />
	<Context docBase="E:\tagen_wy\data\property-wechat-wap" path="/property-wechat-wap" />
    -->
    <Context docBase="E:\tagen_wy\data\st-imgs" path="/st-imgs"  />
</Host>
<!-- 默认域名 -->
<Host name="wechat.tagen-pm.com"  appBase="webapps" unpackWARs="true" autoDeploy="true">
    <!-- SingleSignOn valve, share authentication between web applications
		Documentation at: /docs/config/valve.html -->
    <!-- <Valve className="org.apache.catalina.authenticator.SingleSignOn" /> -->
    <!-- Access log processes all example.
		Documentation at: /docs/config/valve.html
		Note: The pattern used is equivalent to using pattern="common" --> 
    <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs" prefix="localhost_access_log" suffix=".txt" pattern="%h %l %u %t &quot;%r&quot; %s %b" />
    <Context docBase="E:\tagen_wy\data\upload" path="/resources" />
    <!--
	<Context docBase="E:\tagen_wy\data\property-management" path="/property-management" />
	<Context docBase="E:\tagen_wy\data\property-wechat-service" path="/property-wechat-service"  />
	<Context docBase="E:\tagen_wy\data\property-wechat-wap" path="/property-wechat-wap" />
	-->
    <Context docBase="E:\tagen_wy\data\st-imgs" path="/st-imgs"  />
</Host>
```

添加多个域名，在编辑`server.xml`文件，在`<Service></Service>`标签中再添加一个`<Host></Host>` ,如上面即可。另外，多个tomcat的安装参考我的另一篇文章：[**nginx与tomcat的简单集群**](https://blog.csdn.net/qq_23145857/article/details/79420200)。