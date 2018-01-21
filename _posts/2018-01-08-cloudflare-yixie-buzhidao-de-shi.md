---
layout: page
title:  关于CloudFlare一些你不知道的事
author: Michael
Date: 2018-01-08 14:54:00 +8000
Categories: 博客建设
tags: 博客建设
---

## CloudFlare

CloudFlare是个CDN服务商，他提供免费的CDN服务，当然也有付费部分，只是相当不便宜。最便宜的也是20美金一个月。着实负担不起。

这篇文章其实不是个介绍文章，只是我在用CloudFlare时的一些问题与找到的答案，分享给大家：

>PS：下面所指的免费部分，我并不了解收费部分的详细情况。

### 1. Always Online™

CloudFlare提供一个总是在线的服务，当你的伺服器挂掉的时候，你网页的访客依然可以造访到你的网页。严格来说是由CloudFlare缓存的网页。不过这服务是有限制的。似乎并不是每个网页都会被缓存。所以访客依然可能会找不到你的网页。而且这服务似乎也不是及时的。不是注册完就马上不断线，需要一段时间CloudFlare才会为你建立一个不断线的缓存版本。

### 2. 台湾主机需要用CND吗？

这似乎见仁见智，优点是你可以得到不断线服务，避免DDos攻击等等。但缺点也很明显，你网页的访客在造访你网页时会可能会连到国外的主机。这对速度可能会有些许影响。

### 3. 从IP来看似乎并没有连到最近的伺服器

有许多可以判断IP位址所在地的方法，我也不多提。不过我的软体告诉我，我在台湾连到网页居然是连到旧金山的主机？CDN的用处就是用来连到最近的主机，以减少载入时间。连到旧金山我那还有用吗。事实上经过询问CloudFlare公司。CloudFlare的伺服器位置是不能用位址来判断的。正确的判断方式是使用下面的网址：`http://yourdoman.com/cdn-cgi/trace`。譬如说我的网页就应该写成：`http://www.victsao.com/cdn-cgi/trace`。然后网页上会出现类似的下面讯息。


```bash
fl=22f4
h=www.victsao.com
ip=118.160.110.196
ts=1376564062.169
visit_scheme=http
uag=Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36
colo=NRT
spdy=off
```

其中colo就是你的实际连到的伺服器所在地。请对照下表：

<style>
table th {
    width: 300px;
    text-align: center;
}
</style>

| Location code | City/Country |
| :---: | :---: |
|  AMS| Amsterdam, NL |
|  IAD| Ashburn, US |
|  ATL| Atlanta, US |
|  ORD| Chicago, US |
|  DFW| Dallas, US |
|  FRA| Frankfurt, DE |
|  HKG| Hong Kong, HK |
|  LHR| London, GB |
|  LAX| Los Angeles, US |
|  MIA| Miami, US |
|  EWR| Newark, US |
|  CDG| Paris, FR |
|  PRG| Prague, CZ |
|  SJC| San Jose, US |
|  SEA| Seattle, US |
|  ICN| Seoul, KR |
|  SIN| Singapore, SG |
|  ARN| Stockholm, SE |
|  SYD| Sydney, AU |
|  NRT| Tokyo, JP |
|  YYZ| Toronto, CA |
|  VIE| Vienna, AT |
|  WAW| Warsaw, PL |

[CloudFlare的伺服器状态](https://www.cloudflare.com/system-status.html)。

### 3. 如何正确存取cPanel

使用CDN时，连线到cPanel总是怪怪的，事实上CloudFlare可以设定让你绕过CloudFlare去连线，官网说你只要把网页改成 `direct.yourdomain.com` 就可以不经过CloudFlare直接连到原本的伺服器上。(这是最初始的设定值，可能会被你自己改掉)。不过老实说，我在使用上还是会有问题。所以我就直接....用IP连。找到你主机在注册时的E-mail，通常会有一个IP版的cPanel连线位址。

### 4. 网页速度没变快

这很恼人，似乎没有达到最初的目的。试着把`CloudFlare setting`中的优化效能全开：

![CloudFlare网页优化01](http://upload-images.jianshu.io/upload_images/563374-923d5d46b5046808.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![CloudFlare网页优化02](http://upload-images.jianshu.io/upload_images/563374-50447bd8ba49f154.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

不过要注意，效能全开会把一个叫做火箭载入器(Rocket Loader™)的东西启动。这东西是个beta版，可能会有问题。所以有问题记得要关掉。部过我这人觉得，这东西对google 广告有很强的改善效果。所以我还是给他开下去了。

### ~~5. CloudFlare可以切换语系，但有登入问题~~

~~在CloudFlare页面的右下角可以切换网页的语系。很幸运的是它有繁体中文版。不过翻译并不是相当好，感觉像是用翻译软体翻译出来的。还有一个重点是，如果登录页面在繁体中文下(其他没实验过)。是无法正常登录的。就算你帐号密码都打对，试了N次还是登录不进去。不过老实说我并不确认这跟当初注册时网页使用的语系是否有关(在英文页面注册只能在英文页面登入??)，我并没有去做这方面的实验。确认的是，我无法再繁体中文下进行登入。这问题已经解决。~~

### 6. CloudFlare的第4代主机：

CloudFlare最近开始订购第4代主机(G4)了，由台湾的广达吃下订单( 2013年08月03日的新闻)。新一代云端主机在频宽速度上大幅跳升，从1Gbps（Gigabit per second，每秒10亿位元）跳升至10Gbps。希望真的有那么威。也不知道啥时候开始上线。密切注意中。




