---
layout: post
title:  Tomcat目录文件列表功能和定制化
author: Michael
Date: 2018-10-22 10:10:00 +8000
Categories: Java开发
tags: Tomcat
---

没有需求，就没有折腾。不过我还是喜欢折腾，只要有目的，就要嗨起来。

先说一下背景。

> 某天，产品小伙伴过来提了一个需求：能不能把公司的需求文档以列表的方式展示出来，当开发者需要哪个的时候，自己在目录中寻找并点击进入（需要哪个点哪个，so easy），也就不用记录那么多文档url了。

另外说明一下，公司的需求文档是以文件夹和html组织形式部署在tomcat的，版本8，这是前提。

听完需求，格子的脑袋就开始运转起来，这不是分分钟能搞定的事吗，袖子撸起来，说做咱做。

众(Java)所(程序猿)周知，一般访问Tomcat某个目录时，如果没有设置欢迎文件的话，是会报找不到的异常的（也就是传说中的404），如果你开心的话，是可以设置欢迎文件来防止404，显然这个方法是解决不了我们的需求的，确切来说，是没办法简单解决。（如果非要解决，思路无非是这样，设置欢迎文件，在欢迎文件里读取当前目录，并将目录下的子目录遍历作为列表展示给访问者，这里不做讨论，爱咋咋地）。

![tomcat-dir-04](/assets/images/2018/Tomcat/tomcat-dir-04.png)

片头结束，开始正片，**Tomcat是提供目录访问功能的**，请不要眨眼观看下列实验步骤。

### 1. 在webapp下新建目录，并启动Tomcat

- 目录结构

    ```bash
    #目录结构
    /webapps
        /zoro
            /dir1
            /dir2
            /dir3
            /dir4
            /dir5
            /dir6
    ```

- 启动Tomcat
    ```bash
    #启动tomcat

    #如果是Windows请执行startup.bat
    →startup.bat(双击运行)

    #如果是linux请执行startup.sh
    cd $CATALINA_BASE/bin
    chmod *.sh (如果已赋权，请忽略)
    ./bin/startup.sh
    ```
    接下来，访问http://localhost/zoro观看效果，是不是看到了，甩手就是一个404。

    ![tomcat-dir-05](/assets/images/2018/Tomcat/tomcat-dir-05.png)


### 2. 修改tomcat配置
- 编辑tomcat配置目录下的web的xml文件

  ```bash
  #编辑tomcat配置目录下的web的xml文件
  vim $CATALINA_BASE/conf/web.xml
  ```

- 大概在100来行，可以看到如下一串神秘代码

  ```xml
  <!--大概在100来行，可以看到如下一串神秘代码-->
  <servlet>
      <servlet-name>default</servlet-name>
      <servlet-class>org.apache.catalina.servlets.DefaultServlet</servlet-class>
          <init-param>
              <param-name>debug</param-name>
              <param-value>0</param-value>
          </init-param>
          <init-param>
              <param-name>listings</param-name>
              <param-value>false</param-value>
          </init-param>
          <load-on-startup>1</load-on-startup>
  </servlet>
  ```

  把上面的listings的值改为`true`，然后重启tomcat查看效果。

  ![tomcat-dir-06](/assets/images/2018/Tomcat/tomcat-dir-06.png)

  是不是很丑，我也觉得很丑，对于我这种颜控来说，简直不忍直视，看不下去了，那就开始整容。
### 3. 定制目录列表

- 在web.xml的90几行(上面那串神秘代码之上），有这样一些注释。

  ```xml
    <!-- ================== Built In Servlet Definitions ==================== -->
    <!-- The default servlet for all web applications, that serves static     -->
    <!-- resources.  It processes all requests that are not mapped to other   -->
    <!-- servlets with servlet mappings (defined either here or in your own   -->
    <!-- web.xml file).  This servlet supports the following initialization   -->
    <!-- parameters (default values are in square brackets):                  -->
    <!--                                                                      -->
    <!--   debug               Debugging detail level for messages logged     -->
    <!--                       by this servlet.  [0]                          -->
    <!--                                                                      -->
    <!--   fileEncoding        Encoding to be used to read static resources   -->
    <!--                       [platform default]                             -->
    <!--                                                                      -->
    <!--   input               Input buffer size (in bytes) when reading      -->
    <!--                       resources to be served.  [2048]                -->
    <!--                                                                      -->
    <!--   listings            Should directory listings be produced if there -->
    <!--                       is no welcome file in this directory?  [false] -->
    <!--                       WARNING: Listings for directories with many    -->
    <!--                       entries can be slow and may consume            -->
    <!--                       significant proportions of server resources.   -->
    <!--                                                                      -->
    <!--   output              Output buffer size (in bytes) when writing     -->
    <!--                       resources to be served.  [2048]                -->
    <!--                                                                      -->
    <!--   readonly            Is this context "read only", so HTTP           -->
    <!--                       commands like PUT and DELETE are               -->
    <!--                       rejected?  [true]                              -->
    <!--                                                                      -->
    <!--   readmeFile          File to display together with the directory    -->
    <!--                       contents. [null]                               -->
    <!--                                                                      -->
    <!--   sendfileSize        If the connector used supports sendfile, this  -->
    <!--                       represents the minimal file size in KB for     -->
    <!--                       which sendfile will be used. Use a negative    -->
    <!--                       value to always disable sendfile.  [48]        -->
    <!--                                                                      -->
    <!--   useAcceptRanges     Should the Accept-Ranges header be included    -->
    <!--                       in responses where appropriate? [true]         -->
    <!--                                                                      -->
    <!--  For directory listing customization. Checks localXsltFile, then     -->
    <!--  globalXsltFile, then defaults to original behavior.                 -->
    <!--                                                                      -->
    <!--   localXsltFile       Make directory listings an XML doc and         -->
    <!--                       pass the result to this style sheet residing   -->
    <!--                       in that directory. This overrides              -->
    <!--                       contextXsltFile and globalXsltFile[null]       -->
    <!--                                                                      -->
    <!--   contextXsltFile     Make directory listings an XML doc and         -->
    <!--                       pass the result to this style sheet which is   -->
    <!--                       relative to the context root. This overrides   -->
    <!--                       globalXsltFile[null]                           -->
    <!--                                                                      -->
    <!--   globalXsltFile      Site wide configuration version of             -->
    <!--                       localXsltFile. This argument must either be an -->
    <!--                       absolute or relative (to either                -->
    <!--                       $CATALINA_BASE/conf or $CATALINA_HOME/conf)    -->
    <!--                       path that points to a location below either    -->
    <!--                       $CATALINA_BASE/conf (checked first) or         -->
    <!--                       $CATALINA_HOME/conf (checked second).[null]    -->
    <!--                                                                      -->
    <!--   showServerInfo      Should server information be presented in the  -->
    <!--                       response sent to clients when directory        -->
    <!--                       listings is enabled? [true]                    -->
  ```

- 参数解释

  | 属性 | 描述 |
  | :----: | :------ |
  | debug | 调试级别，如果不是 tomcat 开发人员，则没有什么太大的用处。截止本文写作时，有用的值是 0、1、11、1000。默认值为0。 |
  | listings | 如果没有欢迎文件，要不要显示目录列表？值可以是true 或 false。欢迎文件是servlet api的一部分。警告：目录列表中含有的很多项目都是非常消耗服务性能的，如果对大型目录列表多次进行请求，会严重消耗服务器资源。 |
  | gzip | 如果某个文件存在gzip格式的文件（带有gz后缀名的文件通常就在原始文件旁边）。如果用户代理支持 gzip 格式，并且启用了该选项，Tomcat 就会提供该格式文件的服务。默认为 false。如果直接请求带有 gz 后缀名的文件，是可以访问它们的，所以如果原始资源受安全挟制的保护，则 gzip 文件也同样是受保护的。 |
  | readmeFile | 如果提供了目录列表，那么可能也会提供随带的 readme 文件。这个文件是被插入的，因此可能会包含 HTML。 |
  | globalXsltFile | 如果你希望定制目录列表，你可以使用一个 XSL 转换）。这个值是一个可用于所有目录列表的相对路径文件名（既相对于 CATALINA_BASE/conf/ 也相对于 $CATALINA_HOME/conf/）。可参看下面介绍的 contextXsltFile 和 localXsltFile。该 xml 文件的格式会在下文介绍。 |
  | contextXsltFile | 你可以通过contextXsltFile 来定制你的目录列表。这必须是一个上下文相对路径（例如：/path/to/context.xslt），相对于带有 .xsl 或 .xslt 扩展名的文件。它将覆盖 globalXsltFile。如果提供了该值，但相对文件却不存在，则将使用 globalXsltFile。如果 globalXsltFile 也不存在，则显示默认的目录列表。 |
  | localXsltFile | 你还可以在每个目录通过配置 localXsltFile 定制你的目录列表。它应该是在产生列表的目录里的一个相对路径文件名。它覆盖 globalXsltFile 和 contextXsltFile。如果该值存在，但是文件不存在，那么就使用 contextXsltFile。如果contextXsltFile 也不存在，那么就会使用 globalXsltFile。如果 globalXsltFile 也不存在，那么默认的目录列表就会被显示出来。 |
  | showServerInfo | 当使用目录列表，服务器信息是否应该提供给发往客户端的响应中。默认为 true。 |

  上述来源：[tomcat官网](https://link.jianshu.com/?t=http%3A%2F%2Ftomcat.apache.org%2Ftomcat-8.0-doc%2Fdefault-servlet.html)。

  看完上面的文档，应该对定制自己的目录列表有一些思路了。

  定制目录列表需要自己定义globalXsltFile/contextXsltFile/localXsltFile，tomcat提供了定制的example。

  话不多说，动手吧，如果诸位看官需要对所有目录进行同样的定制，那么可以采用globalXsltFile，如果跟格子一样，只需要特定目录下的，那么建议采用`localXstlFile`，先用tomcat提供的示例看下效果。

  在特定目录下（格子这里是$CALINA_BASE/webapps/zoro）下新建文件zoro.xslt(or .xsl后缀名要对),然后把下面的代码拷贝进去~

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="3.0">
      <xsl:output method="html" html-version="5.0" encoding="UTF-8" indent="no" doctype-system="about:legacy-compat"/>
      <xsl:template match="listing">
          <html>
              <head>
                  <title>Sample Directory Listing For<xsl:value-of select="@directory"/></title>
                  <style>
                      h1 {color : white;background-color : #0086b2;}
                      h3 {color : white;background-color : #0086b2;}
                      body {font-family : sans-serif,Arial,Tahoma; color : black;background-color : white;}
                      b {color : white;background-color : #0086b2;}
                      a {color : black;} HR{color : #0086b2;}
                      table td { padding: 5px; }
                  </style>
              </head>
              <body>
                  <h1>Sample Directory Listing For<xsl:value-of select="@directory"/></h1>
                  <hr style="height: 1px;" />
                  <table style="width: 100%;">
                      <tr>
                          <th style="text-align: left;">Filename</th>
                          <th style="text-align: center;">Size</th>
                          <th style="text-align: right;">Last Modified</th>
                      </tr>
                      <xsl:apply-templates select="entries"/>
                  </table>
                  xsl:apply-templates select="readme"/>
                  <hr style="height: 1px;" />
                  <h3>Apache Tomcat/<version-major-minor/></h3>
              </body>
          </html>
      </xsl:template>
      
      <xsl:template match="entries">
          <xsl:apply-templates select="entry"/>
      </xsl:template>
      
      <xsl:template match="readme">
          <hr style="height: 1px;" />
          <pre><xsl:apply-templates/></pre>
      </xsl:template>
      
      <xsl:template match="entry">
          <tr>
              <td style="text-align: left;">
                  <xsl:variable name="urlPath" select="@urlPath"/>
                  <a href="{$urlPath}"><pre><xsl:apply-templates/></pre></a>
              </td>
              <td style="text-align: right;">
                  <pre><xsl:value-of select="@size"/></pre>
              </td>
              <td style="text-align: right;">
                  <pre><xsl:value-of select="@date"/></pre>
              </td>
          </tr>
      </xsl:template>
  </xsl:stylesheet>
  ```

  保存上面文件后，修改web.xml的神秘代码。

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
      <!--看这里-->
      <init-param>
          <param-name>localXsltFile</param-name>
          <param-value>zoro.xslt</param-value>
      </init-param>
      <load-on-startup>1</load-on-startup>
  </servlet>
  ```

  重启tomcat，看效果。

  ![tomcat-dir-07](/assets/images/2018/Tomcat/tomcat-dir-07.png)

  是不是好了一些了，但是还是一般般，毕竟是官网提供的示例，也没办法漂亮到哪里去，不过定制的方法已经提供，剩下的就是html美化了，各位可以自行发挥。

  格子这边用bootstrap的表格改了一版，如图。

  ![tomcat-dir-08](/assets/images/2018/Tomcat/tomcat-dir-08.png)

### 5. 再啰嗦几句

在进行定制化的时候，难免有些特殊需求，虽然繁琐但是还是可以实现的。
比如格子这边需要对目录进行截取，可以在xslt文件中，利用substring函数来实现。

```xml
<xsl:variable name="urlPath" select="substring(@urlPath,12)"/>
```

当然，还有很多其他的函数，或者通过java/javasrcipt方式来扩展，毕竟不是本文主题，不做赘述，需要的自行[百度](https://link.jianshu.com/?t=https%3A%2F%2Fwww.baidu.com%2Fs%3Fwd%3Dxslt%2520%25E5%2587%25BD%25E6%2595%25B0%26rsv_spt%3D1%26rsv_iqid%3D0xe289548b000099ed%26issp%3D1%26f%3D8%26rsv_bp%3D1%26rsv_idx%3D2%26ie%3Dutf-8%26rqlang%3Dcn%26tn%3Dbaiduhome_pg%26rsv_enter%3D1%26oq%3Dxslt%252520%2525E5%252587%2525BD%2525E6%252595%2525B0%26rsv_t%3D2577CzDgz4Kf9tObFCWvutq2WBkDfJnLbAi9O57mcovqHglKSR8FjjaFR4v8J0DCM8II%26inputT%3D3%26rsv_sug3%3D10%26rsv_sug1%3D7%26rsv_sug7%3D100%26rsv_sug2%3D0%26rsv_pq%3Dc119ffd8000093be%26rsv_sug4%3D271)。




​    






