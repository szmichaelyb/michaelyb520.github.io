---
layout: post
title:  Tomcat设置不需要项目名便可访问项目（直接用域名或者ip和端口访问）
author: Michael
Date: 2018-10-20 10:19:00 +8000
Categories: Java开发
tags: Tomcat
---

> 实际生产中往往访问web项目要求直接使用ip+端口或者使用域名便可直接访问项目，不加/项目名称。配置起来其实是非常简单的。

在`tomcat\conf`目录下找到`server.xml`，在`<Host></Host>`配置里面添加一行配置。

```xml
<Context docBase="D:\apache-tomcat-8.0.36-windows-x64\apache-tomcat-8.0.36\webapps\waGong" path="/" reloadable="true" />
```

`docBase`是项目的物理路径（项目不必非要放在`tomcat`下面，可以放在磁盘的任意位置，只要此处物理路径配置正确，`tomcat`能找到项目位置就可以），`path`是虚拟路径。将path设置成/便可不需要项目名称便可访问项目。

`<Host></Host>`里面可以设置多个项目，每个项目一行`Context`设置。

配置完成后打开浏览器访问下`http://localhost:80`效果如下。

![tomcat-port-04](/assets/images/2018/Tomcat/tomcat-port-04.png)

项目上线的时候，将`Host`的`name`属性从默认的`localhost`修改为域名。项目便可直接通过域名访问。

**server.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Server port="8005" shutdown="SHUTDOWN">
  <Listener className="org.apache.catalina.startup.VersionLoggerListener"/>
  <Listener SSLEngine="on" className="org.apache.catalina.core.AprLifecycleListener"/>
  <Listener className="org.apache.catalina.core.JreMemoryLeakPreventionListener"/>
  <Listener className="org.apache.catalina.mbeans.GlobalResourcesLifecycleListener"/>
  <Listener className="org.apache.catalina.core.ThreadLocalLeakPreventionListener"/>
  <Resource auth="Container" description="User database that can be updated and saved" factory="org.apache.catalina.users.MemoryUserDatabaseFactory" name="UserDatabase" pathname="conf/tomcat-users.xml" type="org.apache.catalina.UserDatabase"/>
  </GlobalNamingResources>
  <Service name="Catalina">
 
    <Connector connectionTimeout="20000" port="8080" protocol="HTTP/1.1" redirectPort="8443"/>
    <Connector port="8009" protocol="AJP/1.3" redirectPort="8443"/>
    <Engine defaultHost="localhost" name="Catalina">
      <Realm className="org.apache.catalina.realm.LockOutRealm">
        <Realm className="org.apache.catalina.realm.UserDatabaseRealm" resourceName="UserDatabase"/>
      </Realm>
 
      <Host appBase="webapps" autoDeploy="true" name="localhost" unpackWARs="true">
        <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs" pattern="%h %l %u %t &quot;%r&quot; %s %b" prefix="localhost_access_log" suffix=".txt"/>
 
         <Context docBase="D:\apache-tomcat-8.0.36-windows-x64\apache-tomcat-8.0.36\wtpwebapps\weike" path="/weike" reloadable="true" source="org.eclipse.jst.jee.server:weike"/>
 
         <Context docBase="D:\apache-tomcat-8.0.36-windows-x64\apache-tomcat-8.0.36\webapps\waGong" path="/" reloadable="true" />
      </Host>
    </Engine>
  </Service>
</Server>
```

