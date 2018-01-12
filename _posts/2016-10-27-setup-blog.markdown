---
title: Jekyll + Github Pages构建个人技术博客
layout: post
author: 谢涛
date: '2016-10-27 17:31:24 +0800'
categories: Blog
---

>写技术博客可以积累并且巩固所学的知识，温故知新，还能传播知识，帮助他人解决问题。

## 前言

搭建专属于自己的博客，是每一个码农都会想要去实现的，以前自己也曾想要搭建，但是总有无从下手的感觉，随着知识阅历的提升，知道了一些搭建的方式，时机成熟，买下了梦寐已久的域名，便开始动手搭建。

## 参考
+ [这里是官方介绍](http://jekyllcn.com/docs/quickstart/)
+ [如何快速给自己构建一个温馨的"家"——用Jekyll搭建静态博客](http://www.jianshu.com/p/9a6bc31d329d)
+ [喵神的Vno Jekyll](http://vno.onevcat.com/2016/02/hello-world-vno/)

## 安装Jekyll
<pre>
//打开命令行 使用gem安装Jekyll
gem install jekyll
</pre>


## 启动Jekyll服务
<pre>
//使用Jekyll创建你的博客站点
jekyll new blogname
</br>
//进入blog目录
cd blogname 
</br>
//在blog文件夹内 开启Jekyll服务
jekyll serve
</br>
//启动成功会提示站点地址,一般是[127.0.0.1:4000](http://127.0.0.1:4000),打开后就可以看到自己新建的站点
</pre>

## 下载模板
<pre>
// 过程中缺什么工具灵活安装
// 下载模板
$ git clone https://github.com/onevcat/vno-jekyll.git your_site
</br>
// 切换到模板所在的目录下
$ cd your_site
</br>
// 安装打包工具
$ bundler install
</br>
// 启动服务（此后启动站点服务都用👇这句，能实时加载新文章和页面改动，而不用重新启动服务）
$ bundler exec jekyll serve
</pre>

## 模板内容

###### 1. 需要调整的文件：

  + ``_config.yml``--------博客配置文件，需要根据自身的情况修改
  + ``_posts``-------------新文章扔进这里	
  + ``_includes``----------页眉页脚等模板放在这里，根据自身的情况修改
  + ``css``----------------各种页面配置
  + ``assets``-------------favicon、头像、首页背景图在这里面，可以直接替换
  + ``CNAME``--------------自定义域名放在这里面
  + ``README.md``----------Github说明，需要根据自身的情况修改
  + ``feed.xml``-----------订阅
  +  ``_site``--------------自动生成的博客内容,``index.html``需要根据情况修改


###### 2. 以下文件不建议修改：


+ ``_layouts``-----------文章模板
+ ``index.html``---------首页模板
+ ``js``-----------------存放js文件

###### 3. 更多jekyll模板
 + [更多jekyll模板](http://jekyllthemes.org/)，使用方式同上。
</br>


## 套用模板：
<pre>
直接将修改后的模板内容copy到其他文件夹,再执行下面两句命令：
$ bundler install
$ bundler exec jekyll serve
即可运行成功
</pre>

## 提交至Github Pages
1. 在Github上``Create a new repository``
+ 填写``Repository name``的格式为``username.github.io``(需要严格遵守)，其中``username``用自己取的名字的替换
+ 设置自定义域名``Settings ``->``Custom domain``，或者本地目录创建``CNAME``亦可
+ 把本地的文件夹提交至改项目即可在``username.github.io``该网页看到自己的博客了
+ 这里是我的博客地址：[xietao3.com](http://xietao3.com) 以供参考

## 结语
>虽然写出来只有这么短短的一篇，背后其实花了不少心血；
在搭建过程中，我也遇到过很多问题，遇到问题的时候不要轻易放弃，希望各位也是如此；
>其次写下这篇总结，由于我是先搭建完成然后再写的总结，具体按步骤实施下来出现种种问题，希望读者多多包容和提点。