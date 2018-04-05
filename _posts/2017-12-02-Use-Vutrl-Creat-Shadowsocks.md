---
layout: post
title:  利用Vutrl搭建ShadowSocks科学上网
author: Michael
Date: 2017-12-02 10:37:00 +8000
Categories: 科学上网
tags: 科学上网
---

<div align="center">    
<img src="http://img1.gtimg.com/zj/pics/hv1/124/164/1822/118517494.jpg" width="600px" height="400px" alt="爬墙头">
</div>

>前几天谷歌翻译APP更新了5.8.0版本，并说明对中国优化，手机上终于可以不用挂VPN使用了。但是Google搜索服务目前还是不能使用，我之前是购买的云梯VPN服务，但是觉得不是很好使，有时链接不上，这又刚好到期了，于是就想着自己搭建一个VPS，科学上网。在这里记录一下。

## VPS介绍

- **简介：**VPS 是 Virtual private server（虚拟专用服务器）的缩写，指通过虚拟化技术在独立服务器中运行的专用服务器。每个使用VPS技术的虚拟独立服务器拥有各自独立的公网IP地址、操作系统、硬盘空间、内存空间、CPU资源等，还可以进行安装程序、重启服务器等操作，与运行一台独立服务器完全相同。说简单点，就是可以将一部真实的服务器中分割成多个不同的虚拟服务器，只是它们暴露给用户的感觉就像是一个独立的机器而已。
- **要求：**本地要想科学上网，需要你的VPS能够翻墙，所以可以选择购买香港或者海外的服务器，国外的比如：DigitalOcean、Vutrl、BandwagonHost(搬瓦工)等等。
- **选择：**
 * DigitalOcean的我之前买过一次，选的是新加坡的服务器，ping也不高，但是不稳定，有时候ping不到（可能和我的联通宽带有关系）。
 * 于是这次买了Vutrl的日本VPS，ping100左右，挺稳定的。本文介绍的就是基于这个的。
 * BandwagonHost(搬瓦工)的没有买过不做评价。

>顺便说下：使用我的优惠链接注册并充值**10美元**，可以奖励给我**10美元**，所以如果觉得可以，并且决定要使用的话，可以顺便帮我一下~~

## 创建自己的VPS

- 选择服务器的位置

![服务器地址选择s](http://hanwp.github.io/images/vultr_shadowsocks/%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%9C%B0%E5%9D%80%E9%80%89%E6%8B%A9.png)

- 选择服务器的系统，这里选择CentOS或者Ubuntu的都可以，我选择的是Ubuntu14.04 x64 的系统。

![服务器系统选择](http://hanwp.github.io/images/vultr_shadowsocks/%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%B3%BB%E7%BB%9F%E9%80%89%E6%8B%A9.png)

- 选择服务器的套餐

![服务器套餐选择](http://hanwp.github.io/images/vultr_shadowsocks/%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%A5%97%E9%A4%90%E9%80%89%E6%8B%A9.png)

>个人更推荐第一个套餐（2.5美元一个月），个人使用就足够了，我选的就是这个，但是在我写教程的时候，这个套餐暂时售空了！那好吧，那就买5美元一个月的吧（可以和小伙伴合伙购买）。

- 输入标签然后提交

![服务器确定提交](http://hanwp.github.io/images/vultr_shadowsocks/%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%A1%AE%E5%AE%9A%E6%8F%90%E4%BA%A4.png)

- 好了，在服务器列表就可以看到自己的服务器了！

![服务器列表](http://hanwp.github.io/images/vultr_shadowsocks/%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%88%97%E8%A1%A8.png)

## 搭建服务端ShadowSocks

- 首先Mac可以用终端SSH连接到你的服务器(`ssh root@yourip`)，`win`可以用软件，具体网上找下。
- 然后执行下列命令：
 * **Ubuntu：**
 
 ```bash
 apt-get install python-pip
 pip install shadowsocks
 ```
 
 * **CentOS：**
 
 ```bash
 yum install python-setuptools && easy_install pip
 pip install shadowsocks
 ```

- 创建配置文件

 ```bash
 vi /etc/shadowsock.json
 ```

打开之后按 i 编辑，编辑完成之后，按 `esc`，然后输入 `:wq`，保存退出。

e.g.：

```json
{
    "server":"my_server_ip",
    "server_port":8000,
    "local_address": "127.0.0.1",
    "local_port":1080,
    "password":"mypassword",
    "timeout":300,
    "method":"rc4-md5"
}
```

- 然后运行

 ```bash
 ssserver -c /etc/shadowsocks.json -d start
 ```

 >停止运行： `ssserver -c /etc/shadowsocks.json -d stop`

## 客户端安装

客户端安装比较简单，这里直接推荐`ShadowsocksX-NG`，然后配置：

![客户端配置](http://hanwp.github.io/images/vultr_shadowsocks/%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE.png)

iPhone的话推荐：**Wingy**。

## 锐速加速

锐速（`serverspeeder`），是一款TCP加速程序，能够增强VPS服务器连接的稳定性，且有效的提高服务器的带宽利用率，进而提高访问速度。具体教程参考这里：[Ubuntu 14.04 更换内核以安装锐速](https://blessing.studio/ubuntu-14-04-change-kernel-to-install-serverspeeder/)。

## 搭建VPN

上面只是搭建了SS代理，如果你需要终端也能翻墙，就需要搭建`VPN`了。可以参考这篇文章：[CentOS/Ubuntu一键安装IPSEC/IKEV2 VPN服务器](https://quericy.me/blog/699/)。


