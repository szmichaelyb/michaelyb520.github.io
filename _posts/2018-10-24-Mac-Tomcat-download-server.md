---
layout: post
title:  Tomcat文件下载服务器
author: Michael
Date: 2018-10-23 11:12:00 +8000
Categories: Java开发
tags: Tomcat
---

> 因为需要从服务器上下载某些文件，也为了偷懒不需要插拔硬盘，可以通过tomcat自带的一些功能实现一个简单的文件下载服务器，如此一来只需要将文件放置在某个文件夹中便可以实现该功能。

首先需要简单修改apache-tomcat/conf目录下的web.xml文件，修改内容如下：

```xml
<servlet>
     <servlet-name>default</servlet-name>
     <servlet-class>org.apache.catalina.servlets.DefaultServlet</servlet-class>
     <init-param>
          <param-name>debug</param-name>
          <param-value>0</param-value>
     </init-param>
     <init-param>
          <param-name>listings</param-name>
          <param-value>true</param-value>
     </init-param>
     <init-param>
          <param-name>contextXsltFile</param-name>
          <param-value>/load.xsl</param-value>
     </init-param>
     <load-on-startup>1</load-on-startup>
</servlet>
```

其中修改了：

```xml
<param-name>listings</param-name>
<param-value>true</param-value>
```

将原本的false改为了true，使其能够生成列表，此时可以将需要下载的文件夹（以download为例）放置到tomcat/webapps下，此时在网页中输入localhost:8080/download时便会出现下载列表，其实到这一步一个简单的文件下载服务器就已经完成了，只不过此时的列表名称等信息都是默认的，接下来就要修改这些信息，也就是我们上面web.xml中增加了一些内容：

```xml
<init-param>
     <param-name>contextXsltFile</param-name>
     <param-value>/load.xsl</param-value>
</init-param>
```

它会告诉tomcat去哪里加载配置文件，其实这里就是自定义了web的内容，与此同时需要创建一个load.xsl文件，该文件便是自定义了网页中的内容。**load.xsl**文件内容如下：

```xml
<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
     <xsl:output method="html" encoding="UTF-8" indent="no"/>
     <xsl:template match="listing">
    <html>
        <head>
             <title> 此处是标题
             <xsl:value-of select="@directory"/>
             </title>

       <style>
            h1 {font-family:Tahoma,Arial,sans-serif; color:white; background-color:#525D76; font-size:22px;}
            h2 {font-family:Tahoma,Arial,sans-serif; color:white; background-color:#525D76; font-size:16px;}
            h3 {font-family:Tahoma,Arial,sans-serif; color:white; background-color:#525D76; font-size:14px;}
            body {font-family:Tahoma,Arial,sans-serif; color:black; background-color:white;}
            b {font-family:Tahoma,Arial,sans-serif; color:white;background-color:#525D76;}
            p {font-family:Tahoma,Arial,sans-serif; background:white;color:black; font-size:12px;}
            a {color : black;}
            a.name {color:black;}
            hr {color : #525D76;}
            table tr:nth-child(2n){background-color:#eeeeee}
       </style>
         </head>

         <body>
              <h1>此处是列表名
              <xsl:value-of select="@directory"/>
              </h1>

              <hr size="1" noshade="noshade" />

              <table cellspacing="0" width="100%" cellpadding="5" align="center">
              <tr>
                   <td align="left"><font size="+1"><strong>Filename</strong></font></td>
                   <td align="center"><font size="+1"><strong>Size</strong></font></td>
       <td align="right"><font size="+1"><strong>Last Modified</strong></font></td>
  </tr>
              <xsl:apply-templates select="entries"/>
              </table>
              <xsl:apply-templates select="readme"/>
              <hr size="1" noshade="noshade" />
              <h3>此处是表尾名</h3>
         </body>
    </html>
     </xsl:template>

     <xsl:template match="entries">
          <xsl:apply-templates select="entry"/>
     </xsl:template>

     <xsl:template match="readme">
    <hr size="1" noshade="noshade" />
    <pre><xsl:apply-templates/></pre>
     </xsl:template>

     <xsl:template match="entry">
          <tr>
               <td align="left">
                    <xsl:variable name="urlPath" select="@urlPath"/>
                    <a href="{$urlPath}"><tt><xsl:apply-templates/></tt></a>
               </td>
               <td align="right"><tt><xsl:value-of select="@size"/></tt></td>
               <td align="right"><tt><xsl:value-of select="@date"/></tt></td>
          </tr>
     </xsl:template>
</xsl:stylesheet>
```

然后将该文件放置在download文件夹中，此时重启tomcat再打开网页，或许现在没有太大的变化，那是因为在配置文件中很多参数和默认的是一样的，可以根据个人喜好修改，这样就可以明显看出差别来了。

当然tomcat也支持自定义文件路径，也就是说你想把download文件放在任何地方都可以，只需要在tomcat中告诉它你放在哪里了就可以了，具体如下：

创建一个文件（此处以download.xml为例）:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Context reloadable="true" docBase="C:\Users\用户名\Desktop\download" crossContext="true">
</Context>
```

然后将该文件放置到`tomcat/conf/Catalina/localhost`下面，然后重启tomcat就搞定了，tomcat会到相应的路径下面去找你的文件夹，当然这里的网址依然是`localhost:8080/download`。