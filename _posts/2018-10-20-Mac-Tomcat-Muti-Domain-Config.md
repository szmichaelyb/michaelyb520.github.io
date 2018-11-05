---
layout: post
title:  Tomcat多域名配置(多个项目共用80端口)
author: Michael
Date: 2018-10-20 10:49:00 +8000
Categories: Java开发
tags: Tomcat
---

> 今天在做项目时，需要用已申请好的三个二级域名（公司不可能每个项目都申请一个顶级域名，所以这里解析的三个二级域名），分别配置到三个项目，网上搜了一堆，感觉看的不明不白，故在此记录下。

**总体步骤是：申请域名 >> 配置tomcat >> 域名绑定IP。**

这里主要说明配置Tomcat(我的服务器是windows，lilux下同理修改)。

1. 首先保证三个项目正常部署在同一个tomcat里，默认端口号是都是80，这时候访问的url均为`http://IP地址/各自项目名/XXX`，如下图：

   ![tomcat-port-05](/assets/images/2018/Tomcat/tomcat-port-05.png)


2. 然后修改tomcat配置，将原本的host配置注释掉，新增三个host。

   ```xml
   <Host name="域名"  appBase="webapps"  unpackWARs="true" autoDeploy="true" xmlValidation="false" xmlNamespaceAware="false">
       <Context path="" docBase="项目名" debug="0" reloadable="true"/> 
   </Host>
   ```

   配置如图：

   ![tomcat-port-06](/assets/images/2018/Tomcat/tomcat-port-06.png)

   三个host配置的name对应三个域名，下面的context节点的docBase分别对应三个项目路径，lilux下直接对应项目名即可。

3. 最后重启tomcat，在万网里（其他网同理，可对应bd搜索）将二级域名绑定为当前服务器的IP，绑定时不需要加端口号80。

**附录**
- [万网域名解析](http://jingyan.baidu.com/article/495ba841f2e92638b30ede1a.html)
- [二级域名解析](http://jingyan.baidu.com/article/ceb9fb10ed6ef08cad2ba08f.html)
- [通过ip地址直接访问tomcat下的某一个默认项目](https://blog.csdn.net/sessionsong/article/details/9668231)
