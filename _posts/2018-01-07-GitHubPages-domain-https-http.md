---
layout: post
title:  开启 Github Pages 自定义域名 HTTPS 和 HTTP/2 支持​
author: Michael
Date: 2018-01-07 14:34:00 +8000
Categories: 博客建设
tags: 博客建设
---

>GitHub Pages 如今已经成为很多 **coder** 和 **designer** 做博客的首选方案，因为 Github Pages 服务相比传统博客有很多吸引用户的点。例如 100% 静态化，轻量级，天然的版本控制，Github 提供免费的服务器资源等等。最近 Github 已经支持了 `*.http://github.io` 强制 `https` 链接，在 `repo` 的设置中可以打开。但是如果我们开启了自定义域名，就无法让博客通过 `https` 来访问了，这篇文章的方法是借助 `Cloudflare` 提供的免费 `CDN` 服务，为 `Github Pages` 博客开启 `HTTPS` 支持，同时也会启用 `HTTP/2` 的支持。按照 Google 的说法，应该会对 SEO 有所帮助，应该 = =#。

## GitHub Pages 自定义域名

首先为 **GitHub Pages** 设置自定义域名，简单来说，就是将你的域名写入一个文件名为 `CNAME` 的文件，放在根目录下并提交到 `Github`。然后在域名提供商里为你的域名添加两条 `A` 记录，分别指向 `192.30.252.153` 和 `192.30.252.154`。需要注意的是，如果开启了自定义域名支持，GitHub 提供的子域名 [`*.github.io`](http://link.zhihu.com/?target=http%3A//github.io) 的 `HTTPS` 就无法生效了。这里放上 `Github` 官方的 `Guide`，[点击打开](http://link.zhihu.com/?target=https%3A//help.github.com/articles/quick-start-setting-up-a-custom-domain/)。

## 设置 Nameserver

每个域名提供商的设置方法可能会有差异，但应该都大同小异。简单来说就是 在你的域名提供商的设置里，将你的域名的 `Nameserver` 指向 **Cloudflare** 提供的 `Nameserver` 一般来说会有两个 `Namerserver`。具体的 服务器地址可以在 **Cloudflare** 的官网上找到。只需要找个这个 **Guide** 去设置就好了。[点击传送门](http://link.zhihu.com/?target=https%3A//www.cloudflare.com/a/add-site)。

配置完成后可能需要等一段时间，等 `DNS` 生效。配置完成后的效果图大致是这样： 

![设置Nameserver](http://upload-images.jianshu.io/upload_images/563374-3a68cd93bd742163.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 开启 SSL

不带小绿锁，怎么提升逼格。那么下面开始配置 `HTTPS` 吧。在 `Cloudflare` 的站点管理页面，切换到 `Crypto` 这个标签页。将 SSL 的模式切换到 `full`。具体情况请看下图： 

![设置SSL](http://upload-images.jianshu.io/upload_images/563374-fa85b8d7629a03e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


现在你的域名应该就可以支持 `https` 访问了，但是你会发现，如果别人输入你的域名，例如 [`http://arithxu.com/`](http://arithxu.com/)，浏览器依旧会以 `http` 协议来访问，并不会跳转到 `https`。

## HTTPS 跳转

看到这里你可能想到了用 `js` 跳转到 `https`，那就太麻烦了，其实我一开始也是这样做的。简单的方法是，`Cloudflare` 提供了一个名叫 `Page Rules` 的页面规则的功能。可以对不同规则的 `URL` 做一些处理。在 `Pages Rules` 标签页，新建一个 `Page Rules` 具体操作如下图：

![设置HTTPS跳转](http://upload-images.jianshu.io/upload_images/563374-7809aa6e750c123d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

完成后点击 `Save and Deploy`，就 OK 了。

