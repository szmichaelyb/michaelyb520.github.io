---
layout: post
title: 用一行 CSS 居中并裁剪图片
author: Michael
date: 2018-01-01 09:54:00 +8000
categories: Web前端
tags: Web前端-CSS
---

设置图片的裁剪尺寸非常简单，你只需在 CSS 里使用这行代码：

```css
img {
     object-fit: cover;
}
```
就是这样。不需要语义、包装**div**或者其他没意义的代码。

这种技术能很好地把大小不合适的头像图片裁剪为正方形或者圆形的图片。以下面那只熊的宽图片来举例。一旦把 `object-fit:cover` 技术应用在这种图片上，并且设置好宽和高，图片自己就会进行裁剪和居中。

![裁剪熊并居中](http://ww2.sinaimg.cn/mw690/6941baebgw1eu7yz5gfojj20xp0rswit.jpg)

`object-fit:cover` 的裁剪方式和 `background-size:cover` 的完全相同，不过它是用来为 **imgs**、**videos** 和其他的媒体标签设置样式的，而不是给背景图片设置样式。

[相当多的最新浏览器都支持 **object-fit** 技术](http://caniuse.com/#feat=object-fit)，并且还有[**polyfill项目**](https://github.com/anselmh/object-fit)让你能在更老的浏览器（IE8+）里使用该技术。

对 **object-fit** 的其他属性感兴趣？[来尝试一下](http://codepen.io/chrisnager/pen/XJRRwo?editors=110)。



