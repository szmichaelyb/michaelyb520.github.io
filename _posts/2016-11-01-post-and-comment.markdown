---
title: Jekyll发布文章+评论模块
layout: post
author: 谢涛
date: '2016-11-01 23:16:24 +0800'
categories: Blog
---
>我想成为聪明的人，所以我在学习。

### 前言
在搭建好博客之后，又给自己增加的评论模块，还建了一个我自己比较喜欢关于页面，简单地介绍了下自己。

### 参考
[Jekyll + Github Pages构建个人技术博客](http://xietao3.com/2016/10/setup-blog/)

### 写作环境
+ 使用Macbook，我一般是使用[Mou](http://25.io/mou/)写，实时预览功能很好用,``Help -> Mou Help``打开语法提示
+ 在Windows下，我直接在简书上写，也有实时预览效果，而且会实时保存，需要联网

### Markdown
+ Markdown上手还是很快的，使用简便，语法简单[Markdown语法介绍](http://www.appinn.com/markdown/)，写一篇练手文章就差不多能掌握了

### 文字发布
+ 文章标题遵守``YYYY-MM-DD-文章标题.markdown``格式，``.md``结尾也是可以的
+ 文章顶部加入：
<pre>---
title: 这个是标题
date: 2016-04-16 11:11:11.000000000 +09:00
tags: Jekyll
author: xx
layout: post
---</pre>
+  按照上面指定格式保存好文章之后，放进``_posts``文件夹里
+ 执行``$ bundler exec jekyll serve``后就能在博客里看到自己的文字了


### 增加评论模块
1. 在[多说](http://duoshuo.com/)注册好帐号，注册好之后``点击右上角 用户名->工具->获取代码->复制代码``
+  打开``_config.yml``编辑：
<pre>
# Comment
comment:
 duoshuo: 约定的Name
</pre>
+ 按以上方法设置保存，随便打开一篇文章，如果能看到评论模块即成功，如果不能继续按照下面几步执行
+ 打开``_includes``文件夹，编辑``comments.html``文件，输入复制代码，可以在这里[查看我的相关代码]()
+ 重新打开文章详情页，底部就出现评论模块啦！
 
 **注：多说于2017年6月1日关闭服务。**



### 结语
> 在修改[关于我页面](http://xietao3.com/about/index.html)UI的时候，因为不懂CSS，花费了大量时间去找对应的参数，不放弃不将就，最终全部修改成自己希望看到的样子。