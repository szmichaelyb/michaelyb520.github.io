---
layout: post
title:  Mac安装Telnet
author: Michael
Date: 2018-10-23 10:10:00 +8000
Categories: Mac终端
tags: Mac终端
---

在10.12及以下版本，都内置了telnet命令，但是在10.13中，已经取消了。

![Mac-Telnet-01](/assets/images/2018/Mac/Mac-Telnet-01.jpeg)

接下来给大家介绍下如何安装telnet命令：

1. 打开“终端”，输入：/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"，接着输入密码，一路回车就完成了。

   ![Mac-Telnet-02](/assets/images/2018/Mac/Mac-Telnet-02.jpeg)

2. 完成后输入：brew help，正确输出命令提示就完成安装了。接下来我们继续安装telnet命令：

3. 输入：brew install telnet，等待完成，然后输入命令测试：telnet toutiao.com 80。

   ![Mac-Telnet-03](/assets/images/2018/Mac/Mac-Telnet-03.png)

   通过上图可以看出来，已经成功安装，至于为什么头条返回400，是因为 我只发送了个Hello，Michael，不是http协议的标准头。

### 补充：MAC OS 如何安装命令行工具 Command Line Tools

有时候，我们Mac电脑没有安装Xcode，运行某些程序时，提示需要安装Command Line Tools工具。

1. 打开终端输入：`xcode-select —install` 回车。

   ![Mac-Telnet-04](/assets/images/2018/Mac/Mac-Telnet-04.png)

2. 安装完后，可以输入 `gcc -v`命令检验。

   ![Mac-Telnet-05](/assets/images/2018/Mac/Mac-Telnet-05.png)

