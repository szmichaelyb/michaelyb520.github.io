---
layout: post
title:  在同一台服务器上配置多个Tomcat的方法
author: Michael
Date: 2018-10-21 09:19:00 +8000
Categories: Java开发
tags: Tomcat
---

> 如果要在一台服务器上配置多个Tomcat，主要就是要避免Tomcat服务器的端口冲突的问题。只需要修改CATALINA_HOME\conf\server.xml中的启动端口和连接端口就OK了！

下面我们把配置的详细过程写在下面，以供参考：（此例以配置三个Tomcat为例）

1. 下载apache-tomcat-7.0.63，下载下来的文件为apache-tomcat-7.0.63.zip。[下载地址]（http://tomcat.apache.org/download-70.cgi)

2. 解压该压缩包到D:/div/目录下。

3. 修改解压文件夹名字为：tomcat7-8080

4. 在D:/div/目录下创建该文件夹的两个副本，分别更名为：tomcat7-8081、tomcat7-8082

5. 添加环境变量：右键单击我的电脑 —> 选择属性 —> 选择高级 —> 选择环境变量 —> 添加系统变量。

   ```xml
   CATALINA_HOME_8080，其值为：D:\div\tomcat7-8080；
   CATALINA_HOME_8081，其值为：D:\div\tomcat7-8081；
   CATALINA_HOME_8082，其值为：D:\div\tomcat7-8082；
   ```


6. 修改启动端口和关闭端口：

   进入`D:\div\tomcat7-8081\conf\`目录，打开`server.xml`文件，修改下面两个地方：

   - (1) 修改关闭端口号：

     ```xml
     <Server port="8006" shutdown="SHUTDOWN">
     ```

     修改这个port=”8006”，原来默认的为：8005，使得它的关闭端口和另一个关闭端口不发生冲突。

   - (2) 修改访问端口号：

     ```xml
     <Connector port="8081" maxHttpHeaderSize="8192" 
                maxThreads="150" minSpareThreads="25" maxSpareThreads="75" 
                enableLookups="false" redirectPort="8443" acceptCount="100" 
                connectionTimeout="20000" disableUploadTimeout="true" />
     ```

     修改port=”8081”，原来默认的为“8080”，使得它的连接端口和另一个不冲突。

   - (3) 修改协议端口号： 

     ```xml
     <Connector port="8009" protocol="AJP/1.3" redirectPort="8443" />
     ```

     修改这个port=”8010”，原来默认的为：8009，AJP 1.3 Connector定义的地方。

7. 修改startup.bat和catalina.bat文件内容：
   - (1) 打开`D:\div\tomcat7-8081\bin\startup.bat`文件，把其中所有`CATALINA_HOME`替换为`CATALINA_HOME_8081`。
   - (2) 打开`D:\div\tomcat7-8081\bin\catalina.bat`文件，把其中所有`CATALINA_HOME`替换为`CATALINA_HOME_8081`。`tomcat7-8082`配置方法跟配置`tomcat7-8081`步骤一样的。

8. 启动Tomcat，在命令行下分别进入三个不同的Tomcat安装目录下，执行startup.bat，分别启动三个Tomcat。然后在浏览器中输入：

   ```xml
   http://localhost:8080
   http://localhost:8081 
   http://localhost:8082
   ```

9. 至此，我们已经在一台服务器上配置了三个Tomcat。