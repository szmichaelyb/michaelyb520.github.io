---
layout: post
title:  关于Tomcat访问文件夹(文件目录)出现的404及无法访问中文路径的问题
author: Michael
Date: 2018-10-23 11:13:00 +8000
Categories: Java开发
tags: Tomcat
---

**进行下面配置就可以访问文件夹：**

进入tomcat安装目录下的conf下 --> 打开web.xml --> 搜索listings -->  将其下方param-value属性的false改为true即可。

**处理中文路径：**

进入tomcat安装目录下的conf下 --> 打开server.xml，加入红色属性即可。

```xml
<Connector port="8080" protocol="HTTP/1.1" URIEncoding="utf-8" connectionTimeout="20000" redirectPort="8443" />
```

要注意的一点是：不要让tomcat的安装路径带有空格。

如 D:\Program Files\apache-tomcat-7.0.40，最好不要有Program Files中的空格。