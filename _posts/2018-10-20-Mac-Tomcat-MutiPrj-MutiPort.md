---
layout: post
title:  Tomcat多项目共用80端口，不同域名映射不同项目
author: Michael
Date: 2018-10-20 10:39:00 +8000
Categories: Java开发
tags: Tomcat
---

废话不多说，直接进入主题。

#### 准备工作：

- jdk1.8（配好环境变量）
- tomcat8

#### 在tomcat中添加项目

在webapps中添加3个项目，这3个都是很简单的项目，只有index.html和web.xml。
index.html只有一个h1标签，里面写了web1、web2和web3用于区分3个项目。

![tomcat-mutiport-01](/assets/images/2018/Tomcat/tomcat-mutiport-01.png)

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ok</title>
</head>
<body>
<h1>web1</h1>
</body>
</html>
```

**web.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                      http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
  version="3.1"
  metadata-complete="true">
  
</web-app>
```

**配置tomcat**

打开`tomcat_home/conf/server.xml`，修改端口为`80`，添加3个host映射。

这里需要注意的是，tomcat原来有一个host，新添加host要放在该host的前面。为方便查看，已删除掉无用注释。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Server port="8005" shutdown="SHUTDOWN">
  <Listener className="org.apache.catalina.startup.VersionLoggerListener" />
  <Listener className="org.apache.catalina.core.AprLifecycleListener" SSLEngine="on" />
  <Listener className="org.apache.catalina.core.JreMemoryLeakPreventionListener" />
  <Listener className="org.apache.catalina.mbeans.GlobalResourcesLifecycleListener" />
  <Listener className="org.apache.catalina.core.ThreadLocalLeakPreventionListener" />
  <GlobalNamingResources>
    <Resource name="UserDatabase" auth="Container"
              type="org.apache.catalina.UserDatabase"
              description="User database that can be updated and saved"
              factory="org.apache.catalina.users.MemoryUserDatabaseFactory"
              pathname="conf/tomcat-users.xml" />
  </GlobalNamingResources>
  <Service name="Catalina">
	<!-- 修改端口 -->
    <Connector port="80" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
    
    <Connector port="8009" protocol="AJP/1.3" redirectPort="8443" />    
    <Engine name="Catalina" defaultHost="localhost">
      <Realm className="org.apache.catalina.realm.LockOutRealm">
        <Realm className="org.apache.catalina.realm.UserDatabaseRealm"
               resourceName="UserDatabase"/>
      </Realm>
		<!--  添加3个域名映射 -->
		<Host name="web1.com" appBase="webapps" unpackWARs="true" autoDeploy="true">
			<Context path="" docBase="web1" />
		</Host>
		<Host name="web2.com" appBase="webapps" unpackWARs="true" autoDeploy="true">
			<Context path="" docBase="web2" />
		</Host>
		<Host name="web3.com" appBase="webapps" unpackWARs="true" autoDeploy="true">
			<Context path="" docBase="web3" />
		</Host>
		<Host name="localhost"  appBase="webapps" unpackWARs="true" autoDeploy="true">
        <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log" suffix=".txt"
               pattern="%h %l %u %t "%r" %s %b" />
      </Host>
    </Engine>
  </Service>
</Server>
```

**配置host**

由于是在本机测试，需要修改host后才能使域名映射到本机。

打开`C:\Windows\System32\drivers\etc\host`文件。

在后面添加3个域名：

```xml
127.0.0.1 web1.com
127.0.0.1 web2.com
127.0.0.1 web3.com 
```

**启动项目后测试**

![tomcat-mutiport-02](/assets/images/2018/Tomcat/tomcat-mutiport-02.png)

------------------------------------------------

![tomcat-mutiport-03](/assets/images/2018/Tomcat/tomcat-mutiport-03.png)

----------------------------------------------------------

![tomcat-mutiport-04](/assets/images/2018/Tomcat/tomcat-mutiport-04.png)

### 其他参考

- [tomcat多域名绑定(server.xml配置)](https://blog.csdn.net/qq_33530388/article/details/64944672)