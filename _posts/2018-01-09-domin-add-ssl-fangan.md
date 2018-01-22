---
layout: post
title:  为自定义域名的GitHub Pages添加SSL 完整方案
author: Michael
Date: 2018-01-09 14:34:00 +8000
Categories: 博客建设
tags: 博客建设
---

>Google宣布了，从2017年1月份正式发布的Chrome 56开始，Google将把某些包含敏感内容的https页面标记为“不安全”。

## 为什么使用Cloudflare提供的免费SSL

收费的SSL服务总是比免费的更加周到，一般收费的SSL都会提供端到端的加密。但是价格不菲，对于个人博客来说，这是一笔不必要的开销。我只是需要看到网站地址栏有绿色的锁头，那就证明我们的网站相对安全了。

此外，使用https之后，谷歌、百度等搜索排名权值（PR等）也会有相对提升。

还有其他的一些，例如Cloudflare还提供免费的CDN和缓存技术，让浏览者有更好的体验~~

好了，说了那么多，直接看教程~~

## 创建CloudFlare帐户，并添加网站

首先你已经有自己的自定义域名的 `GitHub Pages` ，我的 `GitHub Pages CNAME`文件写的是 `yicodes.com`

>实现目标：当访客输入 `yicodes.com` 强制跳转使用 **https** ，访问 `wwww` 也会跳转到[`https://yicodes.com`](https://yicodes.com)

- 如果你还没有Cloudflare账号，[点击注册](https://www.cloudflare.com/a/sign-up)。
- 登陆后，点击这里 增加你的域名，如下图，输入你的域名，例如 `yicodes.com` 并点击 **Begin Scan**。

 >注意不要写 `WWW` 前缀，大约60秒即可完成域名解析扫描。完成后点击 `Continue Setup` 继续下一步。

 ![Add WebSite](http://upload-images.jianshu.io/upload_images/563374-ba1e1c4714d27acd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 你看到**DNS记录**（包括子域）列表之后，按照下图提示设置后，其中`cname`是为了重定向`www`准备的，点击 **Continue** 下一步。

 ![设置DNS](http://upload-images.jianshu.io/upload_images/563374-48fd235719bd6217.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 选择免费计划，然后下一步~

 ![免费计划](http://upload-images.jianshu.io/upload_images/563374-2276dc6154c21f51.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- 到你域名控制面板修改 **Cloudflare** 给出的域名服务器，我这里以 `Godaddy` 为例

 ![修改域名服务器01](http://upload-images.jianshu.io/upload_images/563374-0973d9ad7bb3342e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

 ![修改域名服务器02](http://upload-images.jianshu.io/upload_images/563374-f05cfd6d4ff8d3a5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

 ![修改域名服务器03](http://upload-images.jianshu.io/upload_images/563374-3b2854e9bab36e2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

 >注：官方说明，域名服务器修改<font color='red'>**最长需要72小时生效**</font>，用了两个域名测试，大约 `需要5~30分钟`，看到 `Status: Active` 即可。

 ![修改域名服务器04-激活状态](http://upload-images.jianshu.io/upload_images/563374-c602d6db4f0abd65.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



## 设置SSL

- 点击 `crypto` 菜单 , 然后设置 `Flexible SSL` ，如下图：

 ![设置SSL01](http://upload-images.jianshu.io/upload_images/563374-0bac6287c04d4269.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 添加 `www` 重定向到[`https://yicodes.com`](https://yicodes.com)。
 
 ![设置SSL02](http://upload-images.jianshu.io/upload_images/563374-576b4bc6e0662fb2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 添加自动重定向到 `SSL页面`。

 ![设置SSL03](http://upload-images.jianshu.io/upload_images/563374-5c89ffa3ca891b6f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


添加SSL的教程就此完成，**一般需要5~30分钟生效**！！！ 如果你有疑问，欢迎到我博客留言


## 参考资料

1. [Cloudflare官方使用指南](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/)
2. [goyllo Blog](https://www.goyllo.com/github/pages/free-cloudflare-ssl-for-custom-domain/)
3. [keanulee Blog](https://blog.keanulee.com/2014/10/11/setting-up-ssl-on-github-pages.html)
4. [sheharyar Blog](https://sheharyar.me/blog/free-ssl-for-github-pages-with-custom-domains/)





