---
layout: post
title:  升级Mac系统自带的git
author: Michael
Date: 2018-02-05 10:37:00 +8000
Categories: MyLayout
tags: 项目管理-SVN与GIT
---

![Git形象描述](/assets/images/2018/branching-git.png)

> Mac系统自带GIT，但是自带的GIT版本很老，也没有自动提示和gitk等功能，如果一个一个去安装非常的费劲。我们采用`brew`安装`git`非常的方便，但是，我们发现安装后没有任何作用，因为默认使用的GIT还是老版本的。

为了解决大家和我一样的问题，我现在写下我的解决办法，希望能够帮助到大家。

1. 先安装brew，然后安装git，brew install git
2. 备份旧的GIT目录，cd /usr/local/bin

	 ```bash
	   ls git*
	   mkdir backup-git
	   mv git* ./backup-git/
	 ```
   
3. 到新的git目录。cd /usr/local/Cellar/git/2.17.1。看到git已经安装成功
4. 更新修改配置文件
	
	```bash
		cd ~
		vim .bash_profile 
		添加 
		export GIT=/usr/local/Cellar/git/2.17.1
		export PATH=$GIT/bin:$PATH
	```
5. 刷新环境变量 source .bash_profile。

到此，就都安装配置成功了，可以体验最新版的GIT功能了。
   


