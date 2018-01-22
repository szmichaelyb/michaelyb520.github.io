---
layout: post
title:  Github Pages + Jekyll 独立博客一小时快速搭建&上线指南
author: Michael
Date: 2018-01-08 16:54:00 +8000
Categories: 博客建设
tags: 博客建设
---

## 只要一小时？！
>人生道路上布满了坑，于是有了人生导师。 
美丽的地球上布满了坑，于是有了Google Earth。 
使用Github Pages搭建独立博客的过程中布满了坑，所以有了这篇指南。

我在自己查找资料搭建的过程中发现了许多大大小小的坑，大部分是因为软件版本、技术的升级、网络环境的影响、设计方案的变化、操作顺序的不当而引起，于是想整理一篇快速而准确的攻略以供各种同我一样的小白也能轻松获取知识，搭建自己知识分享的平台。

这篇文章能帮助你一小时快速上线（当然要在网络环境良好的情况下，有时候网络环境不好可能需要自备梯子），如果不想自己折腾，直接fork模版，就可以写文章了，如果想把自己的博客打理得更符合自己的口味儿，大家还需要多多学习和实践。

此篇攻略尽力做到清晰明了，但也必有不足之处，遇到问题欢迎大家多多留言交流提问~^_^~。

## 一、Why Github Pages + Jekyll

### 1. Git & Github

Git是一种分布式版本控制系统，由大名鼎鼎的Linux操作系统创建人Linus Torvalds编写，当时的目的是用来管理Linux内核的源码。 
Github是全球知名的使用Git系统的一个免费远程仓库（Repository），倡导开源理念，若要将自己的代码仓库私有则需付费。

### 2. GitHub Pages

托管在Github上的项目页面看上去往往是这样： 

![关于Jekyll仓库](http://upload-images.jianshu.io/upload_images/563374-5f3cf1b045e5eea0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### What does the geek say?!

对于非专业人士看到这样的页面有80%只能默默点叉了。

于是GitHub Pages诞生了。它是Github提供给托管项目的开发者一个更个性化展示自己项目的方法，使用GitHub Pages服务可以编写同样是托管在Github上的静态网页。

比如上面Jekyll项目的GitHub Pages长成这样： 

![Jekyll项目的GithubPagese](http://upload-images.jianshu.io/upload_images/563374-e30828485e183622.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

Github Pages分为用户、组织、项目三种网站，我们的Blog要用到的是 [User Pages site](https://help.github.com/articles/user-organization-and-project-pages/) ，即用户网站。

### 3. Jekyll

下面是来自 [Jekyll中文文档站](http://jekyll.bootcss.com/) 的介绍：

>将纯文本转化为静态网站和博客。 
简单 – 无需数据库、评论功能，不需要不断的更新版本——只用关心你的博客内容。 
静态 – 只用 Markdown (或Textile)、Liquid、HTML & CSS 就可以构建可部署的静态网站。

我们遵循Jekyll规范编写网站源码，上传到Github上，Github会自动进行编译出最终的网站文件，给你一个新世界！

**Tips**：如果本地[安装Jekyll编译环境](http://blog.csdn.net/suburbiax79/article/details/50987974#jekyll-1)，便可实时预览网站，不必每修改一点都要经过上传刷新才能看到结果，大大方便了我们的调试。

### 4. Github Pages + Jekyll 方案适合我吗？

Github Pages + Jekyll 方案的优点：

>Github免费托管源文件，自动编译符合Jekyll规范的网站。 
引入版本管理，修改网站更加安全方便。 
支持 Markdown ，编写具有优美排版的文章。

Github Pages + Jekyll 方案的不足：

>需要学习一些基础的Git命令。 
若要自己全权制作主题的话需要懂一点网页开发。 
由于生成的是静态网页，若要使用动态功能，如评论功能（下文解决），则要使用第三方服务。

所以，如果你只是想做一个分享见闻心得的博客，这个方案非常适合你。

## 二、[]([]([]()))注册Github

到 [Github的官方网站](https://github.com/) 注册账户，记住自己的用户名，后面会常用到。

**Tips**: 有时网络状况不好可以喝杯牛奶再来。

## 三、关于域名

### 1. 符合下面条件，可以跳过此部分：

- 1.1 已有域名。
- 1.2 不想使用独立域名，直接使用Github Pages提供的域名访问：

```html
http://{username}.github.io         //用你的Github用户名替换网址中的{username}
```

### 2. 购买域名

之所以把购买域名放在前面，是因为购买和DNS配置过后可能会有服务延迟，为了让大家尽快看到自己的成果，可以先买域名。

大家可以自由选择域名注册商，这里介绍GoDaddy上的购买流程。

进入[GoDaddy中文网站](https://sg.godaddy.com/zh/)（当然英文也可以），在搜索框输入一个霸气的名字，点击“域名搜索”。 

![GoDaddy中文网站](http://upload-images.jianshu.io/upload_images/563374-0bf3bb04ef2f1eb3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果幸运的话，还没有人注册过这个域名。 
我们只需购买一个 `.com` 域名即可，点击第一个“**选择**”，再点击“**进入购物车**”。 

![GoDaddy购买域名](http://upload-images.jianshu.io/upload_images/563374-80e67bc8cfb38f87.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

出现GoDaddy的增值服务，我们不需要的话，直接点击右上角的“**进入购物车**”。 

![Godaddy增值服务](http://upload-images.jianshu.io/upload_images/563374-47854e7b54217d36.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

到了购买页面，可以自由选择购买期限，默认两年，不同时间优惠不同。 
注意这里右侧有个地方可以添加“促销码”，大家可以用搜索引擎找找，有很多可用的优惠，不同的促销码可能会对支付方式和年份等有所限制（无限制时可以使用支付宝、信用卡、银联银行卡等）。 

![GoDaddy付款](http://upload-images.jianshu.io/upload_images/563374-c41e37e047f817d7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

认真核对好购买项目和金额后，点击“**去付款**”，进行信息注册和结算。 

注意！邮箱名字很重要，后期激活和修改密码都必须通过邮箱，请确保无误，可不要让银子白白流走啊。 
购买完成后去刚才填写的邮箱收信激活。

### 3. 设置DNS

重新登录你刚注册的帐号，点击右上角用户中心里的“**我的产品**”。

![设置DNS](http://upload-images.jianshu.io/upload_images/563374-c75503c0897963b2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) 

此时已经可以看到我们购买的域名了。

为了防止不可控因素导致GoDaddy的域名服务器无法访问，我们可以把域名解析的任务转给国内稳定的域名服务商。 这里推荐使用 [DNSPod](https://www.dnspod.cn/) 的服务，稳定且免费。

在“**我的产品**”界面找到刚才注册的域名，点击“**管理DNS**”。 

![国内DNSPod服务](http://upload-images.jianshu.io/upload_images/563374-7fae478005d8cf5c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在“**域名服务器**” 处点击“**管理**”。 

![域名服务器点击管理](http://upload-images.jianshu.io/upload_images/563374-4007235985f91f96.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

按照下图设置好DNSPod的域名服务器。 

![buy-domain-08](http://upload-images.jianshu.io/upload_images/563374-81b6e33bda052039.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

设置好后进入 [DNSPod ](https://www.dnspod.cn/)

注册帐号后登录，进入“**域名解析**”，点击“**添加域名**”。 

![set-dns-01](http://upload-images.jianshu.io/upload_images/563374-09965506e46411d6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

添加好之前购买的域名，点击你的域名进入记录管理。按照下图添加每条记录。 

![set-dns-02](http://upload-images.jianshu.io/upload_images/563374-879f9de04df89bd6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

前两条`A型`记录值 `192.30.252.153` 和 `192.30.252.154` 是`GitHub`的服务器地址，可以在[这里](https://help.github.com/articles/troubleshooting-custom-domains/#dns-configuration-errors)查到。 
`NS类型`记录是默认不可变的。 
`CNAME类型`的记录值填写 `{username}.github.io` 
**Tips**：用你的Github用户名替换上面的 `{username}`。

## 四、安装Git环境

> 本文主要介绍windows环境下的安装，其他环境可参考[廖大神的教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137396287703354d8c6c01c904c7d9ff056ae23da865a000)。

### 1. 安装git for windows

[进入下载页面](https://git-for-windows.github.io/) ，安装好以后在开始菜单中找到Git Bash并打开。

安装好以后在开始菜单中找到Git Bash并打开。 

![setup-git](http://upload-images.jianshu.io/upload_images/563374-ce7278beb6c865e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在打开的命令行窗口（`Shell`）内执行以下命令，设置你的git用户名和邮箱：

```bash
$ git config --global user.name "{username}"          // 用你的用户名替换{username}
$ git config --global user.email "{name@site.com}"    // 用你的邮箱替换{name@site.com}
```

### 2. SSH配置

为了和Github的远程仓库进行传输，需要进行SSH加密设置。在刚才打开的 `Shell` 内执行：

```bash
$ ssh-keygen -t rsa -C"{name@site.com}"    // 用你的邮箱替换{name@site.com}
```

可以不输入其他信息，一直敲回车直到命令完成。 这时你的用户目录（win7以上系统默认在 `C:\Users\你的计算机用户名`）内会出现名为 `.ssh` 的文件夹，点进去能看到 `id_rsa` 和 `id_rsa.pub` 两个文件，其中 `id_rsa` 是私钥，不能让怪人拿走，`id_rsa.pub` 是公钥，无需保密（原理请自行参看密码学…………………………我相信你也不会看）。

接下来用你的浏览器登录`Github`，点击右上角的“**Settings**”： 

![set-ssh-01](http://upload-images.jianshu.io/upload_images/563374-185cbde3ccbdadcf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)``

用文字处理软件打开刚才的 `id_rsa.pub` 文件，复制全部内容。 
点击“**SSH Keys**”，“**Add SSH Key**”，将复制的内容粘贴在 `Key` 中，点“**Add Key**”确定。 

![set-ssh-02set-ssh-03 ](http://upload-images.jianshu.io/upload_images/563374-bbf7df27b92757d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

至此SSH配置完毕。

## 五、建立个人 GitHub Pages

建立基于Jekyll的个人Github Pages有两条路线： 

>1. 自己学习Jekyll教程和网页设计，设计绝对自我基因的网页。 
2. Fork（Git系统的创建分支，简单来说是把当前仓库复制一份到你的仓库，你可以进行修改，因为你的仓库是原来仓库的新的分支）已有的开源博客仓库，在巨人的肩膀上进行符合自我的创作。

建议和我一样的小白们可以从第二条路线学起。

### 1. 挑选“模版”

[Jekyll项目的wiki页面](https://github.com/jekyll/jekyll/wiki/sites)给出了大量优秀的风格各异的网站，这里以 [Panxw’s blog](https://www.panxw.com/) 为例讲解（[GitHub源码](https://github.com/panxw/panxw.github.com)）。

进入wiki页，点击**Panxw’s blog**右边的**source**链接，进入到作者的模版仓库。 

![fork-01](http://upload-images.jianshu.io/upload_images/563374-e9572953838857d3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

点击右上角的“**Fork**”。 

![fork-02](http://upload-images.jianshu.io/upload_images/563374-2cdbf3ecb176d46f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后在你的主页里找到你刚才**Fork**的分支，点进去： 

![fork-03](http://upload-images.jianshu.io/upload_images/563374-53c96887dbb1070c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

点击“**Settings**”，将“**Repository name**”改为 `{你的Github用户名}.github.io`，点击“**Rename**”。 

![fork-04](http://upload-images.jianshu.io/upload_images/563374-f8d5c26232f61d32.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

此时你会发现已经可以通过 `http://{你的Github用户名}.github.io` 访问你**Fork**下来的网站啦！

### 2. 绑定域名

接下来让你能用之前购买的域名来访问你的网站。在你的代码仓库中找到 `CNAME` 文件，点击它： 

![fork-05](http://upload-images.jianshu.io/upload_images/563374-116f58c5e14d486a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

点击右方的铅笔图标，把文件内容改成你购买的域名，比如 `www.awesome.com`，这样你就可以用自己的域名访问你的 `Github Pages` 啦！ 

![fork-06](http://upload-images.jianshu.io/upload_images/563374-37ed7db149a2e567.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 六、写博客

### 1. 同步仓库

我们不可能一切编写都像刚才更改 `CNAME` 那样在网页上直接进行，那样会十分受限及效率低下，我们需要把托管在 `Github` 上的仓库同步到本地计算机来。

再次打开 `Git Bash`，输入以下命令切换到你想放置本地代码仓库的位置：

```bash
$ cd {本地路径}     // 比如：cd e:/workspace
```

**clone**（克隆）你自己的远程仓库：

```bash
$ git clone https://github.com/{username}/{username}.github.io.git     // 用你的Github用户名替换{username}
```

结果如下： 

![clone git](http://upload-images.jianshu.io/upload_images/563374-77e67b73817379e6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这时所有远程仓库里的源码都拷贝到 `e:/workspace/{username}.github.io` 这个文件夹里来了。 
**Tips**：如果clone失败有可能是网络原因，可以过一个时段再试，或者寻找梯子。

### 2. 撰写博文

打开本地仓库的 `_posts` 文件夹，你的所有博文都将放在这里，写新博文只需要新建一个标准文件名的文件，在文件中编写文章内容。比如我们**fork**的模版中 `_posts` 文件夹里有一篇 `2016-03-23-hello-world.markdown`，你的文件命名也要严格遵循 `年-月-日-文章标题.文档格式` 这样的格式，**尤其要注意月份和日期一定是两位数**。

推荐使用Markdown语言写文章，Windows下推荐MarkdownPad这个软件编写Markdown文本。最开始写可以直接模仿别人的博文语法，更多Markdown语法可参考[认识与入门Markdown](http://sspai.com/25137)。

### 3. 简单Git命令

>这里只介绍快速修改上传博客的方法，详细的Git学习可以参考文末给出的扩展阅读。

当你使用Git Bash对你的本地仓库进行操作时，先用 cd 命令将你的工作目录设置到你要操作的本地仓库

```bash
$ cd {你刚才clone下来的项目文件夹路径}
```

每当你对本地仓库里的文件进行了修改，只需在Bash中依次执行以下三个命令即可将修改同步到Github，刷新网站页面就能看到修改后的网页：

```bash
$ git add .
$ git commit -m "statement"   //此处statement填写此次提交修改的内容，作为日后查阅
$ git push origin master
```

到此你已经可以发表文章到你的个人博客啦！！如有更多需求，可以继续看下面的进阶部分。

## 七、进阶：安装Jekyll本地编译环境

每次修改了本地文件，都要至少经过三个命令和服务器延迟刷新才能看到修改的效果，是不是有点疼？如果你觉得“疼！” 那么这部分就是你的解药。

### 1. 环境安装

>本文主要介绍windows环境下的安装，Mac和Linux环境下可以使用自带的包管理器进行安装，可参考这篇文章。

#### 1.1 安装 [Ruby](http://rubyinstaller.org/downloads/) 

![install-ruby-01](http://upload-images.jianshu.io/upload_images/563374-c62f16bfa3e8b407.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

注意：这里一定要勾选添加到环境变量<font color='red'>**PATH**</font>！ 

![install-ruby-02](http://upload-images.jianshu.io/upload_images/563374-6200cc8a2f2bce3d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 1.2 安装 [RubyGems](https://rubygems.org/pages/download)

Windows下下载ZIP格式较为方便，下好后解压到本地任意路径，下面以 `{unzip-path}` 代替你解压的路径。打开Windows的cmd终端（按 `Win+R` 快捷键打开 “**运行**” ，输入`cmd`，确定），输入命令:

```bash
$ cd {unzip-path}  //如果你没有解压在C盘，windows的终端切换到其他盘需要写为 cd /d {unzip-path}
$ ruby setup.rb
```

#### 1.3 安装Jekyll

在终端里输入

```bash
$ gem install jekyll
```

#### 1.4 安装jekyll-paginate

在终端里输入

```bash
$ gem install jekyll-paginate
```

如遇到以下错误，说明网络不通：

```bash
ERROR:  While executing gem ... (Gem::RemoteFetcher::FetchError)
Errno::ECONNRESET: An existing connection was forcibly closed by the remote host.
```

这时候有三种解决方法： 
> 1. 等天气好的时候再来 
2. 架梯子 
3. [推荐] 更换为[Ruby China](https://gems.ruby-china.org/)源，点进去会有详细的设置方法。（感谢 @mortred 博友告知淘宝源已不可用，建议使用Ruby China的源，上不去的话换个时间就好。）

### 2. 开启本地实时预览

上一小节的安装都完成以后，在终端中输入命令

```bash
$ cd {local repository} // {local repository}替换成你的本地仓库的目录
$ jekyll serve
```

##### 2.1 如遇到以下错误，在仓库文件 `_config.yml` 中加入一句 `gems: [jekyll-paginate]` 即可。

```bash
Deprecation: You appear to have pagination turned on, but you haven't included the `jekyll-paginate` gem. Ensure you have `gems: [jekyll-paginate]` in your configuration file. 
```

##### 2.2 如遇到以下错误

```bash
jekyll 3.1.2 | Error:  Permission denied - bind(2) for 127.0.0.1:4000
```

说明有程序在占用这个本地端口，这时候输入命令

```bash
$ netstat -ano
```

可以看到如下进程与所占用端口的对应情况，找到本地地址为 `127.0.0.1:4000` 的记录，看到该条记录的**PID**为**6668** (当然你的和我的不一样)。 

![jekyll-serve-fail-01](http://upload-images.jianshu.io/upload_images/563374-bb627f203fc371a0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

输入命令

```bash
$ tasklist /svc /FI "PID eq 6668"
```

该进程的名称就会显示出来：

![jekyll-serve-fail-02](http://upload-images.jianshu.io/upload_images/563374-c095e632bb2feef9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

打开Windows的任务管理器，结束它： 

![jekyll-serve-fail-03](http://upload-images.jianshu.io/upload_images/563374-376bde94bfe3a948.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

再次运行 `jekyll serve` 就可以了。

如果一切顺利，通过在浏览器地址栏输入 `http://localhost:4000/` 回车就已经可以看到自己网站的模样啦。只要 `jekyll serve` 服务开着，你的本地仓库文件有任何更新，本地网站刷新都能马上看到，欧耶！

### 3. 编写符合Jekyll规范的网站

如要自己修改fork下来的主题，可以参考以下资料： 

- [使用Github Pages建独立博客](http://beiyuu.com/github-pages/) 
- [搭建一个免费的，无限流量的Blog—-github Pages和Jekyll入门](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html) 
- [Jekyll中文文档](http://jekyll.bootcss.com/)

## 八、进阶：添加评论、分享功能

常见的第三方评论系统有： [Disqus](https://disqus.com/)，[来比力](https://livere.com/)，[多说](http://dev.duoshuo.com/)（已经倒闭不能用了）。
简单来说是在html文件中嵌入Javascript代码，注册网站后都有较好的指导，并不困难。

## 九、扩展阅读：

[1][Github Pages](https://pages.github.com/) 
[2][Git教程 - 廖雪峰](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000) 
[3][Jekyll中文文档](http://jekyll.bootcss.com/) 
[4][认识与入门Markdown](http://sspai.com/2513) 
[5][Ruby和Gem](http://blacktha.com/2015/07/06/tech/Ruby/) 
[6][使用Github Pages建独立博客](http://beiyuu.com/github-pages) 
[7][搭建一个免费的，无限流量的Blog—-github Pages和Jekyll入门](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)
[8][域名+解析+GitHub来搭建自己的个人网站](http://www.blankspace.cn/2016/11/build-up-one-website/)
[9][域名+解析+GitHub来搭建自己的个人网站](http://blog.csdn.net/icurious/article/details/53142450)

