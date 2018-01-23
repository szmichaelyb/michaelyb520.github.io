---
layout: post
title: 为什么BootStrap要默认12列
author: Michael
Date: 2018-01-01 10:54:00 +8000
Categories: Web前端
tags: Web前端-BootStrap
---

今天被问了一个问题：<span style="font-weight:bold;color:red;">有没有想过为什么Bootstrap要默认是12列？</span>
呃，好吧，用了Bootstrap一段时间，的确没想过为什么要默认是12列，隐隐约约觉得是因为布局比较方便，常见的分2块，3块，4块，都可以方便分完。

既然有假设，那还是要求证一下。

谷歌上一阵搜索。

>Contrary to the question’s parenthetical, Bootstrap was always at 940px wide, and not 960px, even with the original 16 columns. With the switch to 12 columns in Bootstrap 2, we wanted to simplify the overall grid (16 columns is right on the edge of enough granularity) and make it easier to get three columns.

大致意思就是原来是16列的，后来改成了12列，是为了更容易可以排出三列。 
好，那么问题来了，为什么之前是设计16列呢？ 
继续谷歌。

>16-columns has long been the go-to grid for designers and developers, but we’ve noticed a shift to 12- and 24-columns to offer a more flexible layout. And they’re right for doing so—gridded layouts work best with an odd number of columns (you often see three columns, but four or six are not that popular).

这个是Bootstrap的github bug列表中2011年的一段讨论，题目是问为什么用16列代替了24列。原来16列之前还有24列。大概是说，16列是开发和设计人员的首选，但是12列或者是24列可以更灵活。其中说到就是奇数列的布局更常见，比如经常可以看到三列形式的布局。

这里的话，为什么说16列是开发和设计人员的首选，我并不清楚。但是后面说到三列布局更常见，的确是这样，比如CSDN的首页就是个三列形式的布局。用16列想分3:1或者3:2都不是很方便。

如果你有别的理解，欢迎留言讨论。

### 参考
[Why did Twitter Bootstrap change their grid system from 16 columns to 12 (960px to 940px)](http://www.quora.com/Why-did-Twitter-Bootstrap-change-their-grid-system-from-16-columns-to-12-960px-to-940px)
[Why does Twitter Bootstrap 3 use a 12-column grid system by default?](http://www.quora.com/Why-does-Twitter-Bootstrap-3-use-a-12-column-grid-system-by-default)
[Why a 16 column grid instead of a 24 column grid?](https://github.com/twbs/bootstrap/issues/93)

