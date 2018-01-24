---
layout: post
title:  Bootstrap栅格系统使用方法
author: Michael
cate: 2018-01-03 10:54:00 +8000
categories: Web前端
tags: Web前端-BootStarp
---

如果你以前使用过 **Bootstrap2** 或者了解过[响应式技术](http://www.yeahzan.com/blog/item/42-77.html)，那么肯定对 **Bootstrap栅格系统** 并不陌生，由于栅格系统的引入，使得 [Bootstrap](http://www.yeahzan.com/zanblog) 的跨设备布局显示变得可能。

## 什么是栅格系统

<span style="font-weight:bold;color:red;">栅格系统</span>是指，将页面布局划分为等宽的列，然后通过列数的定义来模块化页面布局。**Bootstrap** 的栅格系统采用了<span style="font-weight:bold;color:red;"> 1-12 </span>列的模式，并且通过比例计算来设置你定义的列宽。

例如你这一行想要采用两列的布局模式，那么每列的宽度都为外容器的50%，不管你用什么设备浏览，它都会采用这样的比例进行展示。不过如果当设备宽度小于你设定的最小宽度，那么这两列就会并排成为一列。

## Bootstrap的栅格系统

在 **Bootstrap** 中使用栅格系统非常简单方便，只需要在你的 **div** 中引入它们已经定义好的类即可。我们先看看 **Bootstrap** 有几种栅格类可以使用：

1. `.col-xs-*` 这是超小屏幕类（<768px），类似手机等设备。
2. `.col-sm-*` 这是小屏幕设备类（≥768px且<992px），类似平板设备。
3. `.col-md-*` 这是中型设备类（≥992px且<1200px）。
4. `.col-lg-*` 这是大型设备类（≥1200px）。

## 如何使用Bootstrap栅格系统

你可以通过使用这些对应设备的栅格类来决定自己应用在不同设备上的布局样式。例如：

```html
<div class="col-xs-6 col-md-12"></div><div class="col-xs-6 col-md-12"></div>
```

这种编码的结果就是，这两个 **DIV** 在 **PC** 端浏览起来是两行（每行都占据 12 列栅格），而在手机端浏览器来是一行两列（每列占据 6 列栅格）。通过这种形式，就能很方便地使用栅格系统定制自己的应用布局了。

## 其他信息

除了以上的使用方法之外，还能使用“列偏移类”来快速对自己的栅格进行定位，使用方法类似：

```html
<div class=".col-md-8 .col-md-offset-3"></div>
```

按照这样的写法，这个 **DIV** 就会在 **PC** 端向右偏移 3 列。


