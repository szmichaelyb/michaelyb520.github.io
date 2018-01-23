---
layout: post
title:  为什么我们要使用HTTP Strict Transport Security
author: Michael
Date: 2018-01-07 12:54:00 +8000
Categories: 博客建设
tags: 博客建设
---

> <font color='green'>HTTP Strict Transport Security (通常简称为HSTS) 是一个安全功能，它告诉浏览器只能通过HTTPS访问当前资源, 禁止HTTP方式。</font>

## 一. Freebuf百科：什么是Strict-Transport-Security

我摘自owasp上的一段定义：

```text
HTTP Strict Transport Security (HSTS) is an opt-in security enhancement that is specified by a web application through the use of a special response header. Once a supported browser receives this header that browser will prevent any communications from being sent over HTTP to the specified domain and will instead send all communications over HTTPS. It also prevents HTTPS click through prompts on browsers.
The specification has been released and published end of 2012 as RFC 6797 (HTTP Strict Transport Security (HSTS)) by the IETF. (Reference see in the links at the bottom.)
```

一个网站接受一个HTTP的请求，然后跳转到 `HTTPS` ，用户可能在开始跳转前，通过没有加密的方式和服务器对话，比如，用户输入`http://foo.com` 或者直接 `foo.com`。这样存在中间人攻击潜在威胁，跳转过程可能被恶意网站利用来直接接触用户信息，而不是原来的加密信息。网站通过`HTTP Strict Transport Security`通知浏览器，这个网站禁止使用 `HTTP` 方式加载，浏览器应该自动把所有尝试使用 `HTTP` 的请求自动替换为 `HTTPS` 请求。

## 二. 我们为什么需要开启Strict-Transport-Security  

想想这样一种场景：

有的网站开启了https，但为了照顾用户的使用体验（因为用户总是很赖的，一般不会主动键入https，而是直接输入域名, 直接输入域名访问，默认就是http访问）同时也支持http访问，当用户http访问的时候，就会返回给用户一个302重定向，重定向到https的地址，然后后续的访问都使用https传输,这种通信模式看起来貌似没有问题，但细致分析，就会发现种通信模式也存在一个风险，那就是这个302重定向可能会被劫持篡改，如果被改成一个恶意的或者钓鱼的https站点，然后，你懂得，一旦落入钓鱼站点，数据还有安全可言吗？

对于 `篡改302的攻击`，建议服务器开启 `HTTP Strict Transport Security` 功能，这个功能的含义是：

><font color='CadetBlue'>当用户已经安全的登录开启过 **htst** 功能的网站 (支持hsts功能的站点会在响应头中插入：**Strict-Transport-Security**) 之后，支持htst的浏览器(比如 **chrome / firefox** )会自动将这个域名加入到HSTS列表，下次即使用户使用 **http** 访问这个网站，支持 **htst** 功能的浏览器就会自动发送 **https** 请求（前提是用户没有清空缓存，如果清空了缓存第一次访问还是明文，后续浏览器接收到服务器响应头中的 **Strict-Transport-Security** ，就会把域名加入到 **hsts** 缓存中，然后才会在发送请求前将 **http** 内部转换成 **https** ），而不是先发送 **http** ，然后重定向到 **https**，这样就能避免中途的`302重定向URL被篡改`。进一步提高通信的安全性。</font>

上面是我自己的理解，下面是owasp中文站点关于hsts的描述：

>HSTS的作用是强制客户端（如浏览器）使用HTTPS与服务器创建连接。服务器开启HSTS的方法是，当客户端通过HTTPS发出请求时，在服务器返回的超文本传输协议响应头中包含Strict-Transport-Security字段。非加密传输时设置的HSTS字段无效。

比如，`https://example.com/` 的响应头含有`Strict-Transport-Security: max-age=31536000; includeSubDomains`。这意味着两点：

在接下来的一年（即31536000秒）中，浏览器只要向`example.com`或其子域名发送`HTTP`请求时，必须采用`HTTPS`来发起连接。比如，用户点击超链接或在地址栏输入 `http://www.example.com/` ，浏览器应当自动将 `http` 转写成 `https`，然后直接向 `https://www.example.com/` 发送请求。

在接下来的一年中，如果 `example.com` 服务器发送的TLS证书无效，用户不能忽略浏览器警告继续访问网站。

**HSTS可以用来抵御SSL剥离攻击**。**SSL** 剥离攻击是中间人攻击的一种，由Moxie Marlinspike于2009年发明。他在当年的黑帽大会上发表的题为<font color='red'>“New Tricks For Defeating SSL In Practice”</font>的演讲中将这种攻击方式公开。SSL剥离的实施方法是阻止浏览器与服务器创建`HTTPS`连接。它的前提是用户很少直接在地址栏输入`https://`，用户总是通过点击链接或3xx重定向，从 `HTTP` 页面进入 `HTTPS` 页面。所以攻击者可以在用户访问 `HTTP` 页面时替换所有 `https://` 开头的链接为 `http://` ，达到阻止 `HTTPS` 的目的。

<font color='green'>**HSTS** 可以很大程度上解决 **SSL** 剥离攻击，因为只要浏览器曾经与服务器创建过一次安全连接，之后浏览器会强制使用 **HTTPS**，即使链接被换成了 **HTTP**。</font>

<font color='Chocolate'>另外，如果中间人使用自己的自签名证书来进行攻击，浏览器会给出警告，但是许多用户会忽略警告。HSTS解决了这一问题，一旦服务器发送了 **HSTS** 字段，用户将不再允许忽略警告。</font>

## 三. Strict-Transport-Security的一些不足

用户首次访问某网站是不受HSTS保护的。这是因为首次访问时，浏览器还未收到HSTS，所以仍有可能通过明文HTTP来访问。**解决这个不足目前有两种方案，<font color='red'>一是浏览器预置HSTS域名列表</font>，Google Chrome、Firefox、Internet Explorer和Spartan实现了这一方案。<font color='red'>二是将HSTS信息加入到域名系统记录中</font>。但这需要保证DNS的安全性，也就是需要部署域名系统安全扩展。截至2014年这一方案没有大规模部署。**

由于HSTS会在一定时间后失效（有效期由max-age指定），所以浏览器是否强制HSTS策略取决于当前系统时间。部分操作系统经常通过网络时间协议更新系统时间，如Ubuntu每次连接网络时，OS X Lion每隔9分钟会自动连接时间服务器。攻击者可以通过伪造NTP信息，设置错误时间来绕过HSTS。**解决方法是认证NTP信息，或者禁止NTP大幅度增减时间。比如Windows 8每7天更新一次时间，并且要求每次NTP设置的时间与当前时间不得超过15小时**。


## 四. 我的一些测试

### 1. 测试1

目标域名：`portal.fraudmetrix.cn`（这个站点不支持hsts功能）同盾科技的风险控制管理系统（打个软广，同盾科技，基于大数据，专注反欺诈）。

第一次访问：在浏览器地址栏键入：`portal.fraudmetrix.cn`。

![HSTS对HTTP重定向01](http://upload-images.jianshu.io/upload_images/563374-ef977e0276e6c9f9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到:

这个域名并不在chrome浏览器的hsts的缓存中，也不在hsts中的preload list中（像facebook、twitter等网站已经内置在preload list中，所以每次请求这些站点的时候浏览器都会自动将http 转换成htttps），所以不会在发送请求前将http转换成https请求。

我们来把这个站点手动加入到chrome浏览器的hsts缓存中：

![HSTS重定向02](http://upload-images.jianshu.io/upload_images/563374-3dbfbf797107dea7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在未清空chrome浏览器历史记录的前提下，我们再次访问这个站点：

![HSTS重定向03-实现HTTP转HTTPS](http://upload-images.jianshu.io/upload_images/563374-3d792ee90f9b5492.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到，一个 307 响应码，这是chrome浏览器的内部转换，将http转换成https后再发送请求。

**问题：为什么我们要求在未清空chrome浏览器的缓存前访问呢？**

>因为如果清空了chrome浏览器的缓存之后，我们手动加入到hsts缓存中的域名就会被清除，也就不会看到预期的效果了。

### 2. 测试2

我们先清空chrome浏览器的缓存，然后在浏览器的地址栏中键入 `www.alipay.com` 。

![HSTS重定向04-清空浏览器缓存](http://upload-images.jianshu.io/upload_images/563374-b9235b87c7bef26e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到([支付宝](www.alipay.com))这个站点并没有在 chrome 浏览器的内置的`preload list`中，所以第一次访问的时候，chrome浏览器并不会将http转换成https。

而是由前端的F5的负载均衡(BigIP)器将http请求重定向到https请求。

我们继续看看这次请求的其他响应：

![HSTS重定向05-其他响应](http://upload-images.jianshu.io/upload_images/563374-6fe28e4cd6d6f06d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到支付宝站点服务器是支持 **hsts** 功能的，在其响应头中插入了：**Strict-Transport-Security**，并且设置这个头部的有效期，只要不手动清空缓存，那么在这个有效期内，chrome浏览器都会将所有发送这个站点的 `http` 请求在内部转换成 `https` 再发送出去。

浏览器在收到带有 **Strict-Transport-Security** 响应头的报文后，就会将这个站点加入到hsts缓存中，下次以http访问的时候就会被自动转换成https。

我们这时查看以下 `hsts` 的缓存中是不是有了 `www.alipay.com`。

![HSTS重定向06-查看缓存](http://upload-images.jianshu.io/upload_images/563374-e4572155e1e99cf5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

正如你所见：`www.alipay.com` 已经被加入到了`chrome`浏览器的缓存中。
这时候在未清空浏览器缓存的前提下再次访问 `www.alipay.com` 。

![HSTS重定向07-查看缓存](http://upload-images.jianshu.io/upload_images/563374-a8d018c0696648f5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

看到了吧，熟悉的307响应码，浏览器做了内部转换，将http转换成https。

### 3. 其他 

[脸书](www.facebook.com)是已经加入到chrome浏览器`hsts preload list`中的。

![HSTS重定向08](http://upload-images.jianshu.io/upload_images/563374-d2071a78afaa8f8d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

注意到没，信息很详细哦！看看我大百度呢？清空chrome浏览器缓存，在地址栏键入**www.baidu.com**。

![HSTS重定向09-缓存](http://upload-images.jianshu.io/upload_images/563374-dc7024a9f47077b5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![HSTS重定向10-缓存](http://upload-images.jianshu.io/upload_images/563374-ba1cca935dc9e17e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

很遗憾，我大百度也不在`chrome hsts preload list`中。在看看这次请求中的其他响应报文呢：

![HSTS重定向11-其他响应](http://upload-images.jianshu.io/upload_images/563374-866c5b80e1e5c627.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

也没有看到 Strict-Transport-Security的影子

