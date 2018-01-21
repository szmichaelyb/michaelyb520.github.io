---
layout: page
title: 用 Bootstrap 3 制作高度相同的 div (column)
author: Michael
Date: 2018-01-01 10:54:00 +8000
Categories: Web前端
tags: Web前端-BootStarp
---

排版网页时，常常会碰到的一个需求，就是希望左右栏位的高度可以相同。而让栏位的高度相同已经不是什麽新奇的事了，所以今天要分享的是，当你使用 `Bootstrap Grid` 制作作网页时，该如何将这个效果套用在 `Bootstrap` 里。

会想分享这样的内容，也是因为之前在上 [RWD入门与实战时](http://muki.tw/course/rwd-basic-course/)，有同学问过这样的问题。所以就写成一篇文章分享给大家萝！

## 使用 flex 让 column 高度相同

第一个最简单的方法，就是使用`display: flex`让所有栏位的高度相同。但`flex`有一个令人哀伤的事实：他不支援 IE9 以下的浏览器。但我想`flex`一定是未来排版的主流，所以一样分享给大家。

**html代码**

```html
<header>
  Bootstrap3 same height for multi columns (DEMO I)<br/>
  <a href="http://muki.tw/tech/bootstrap-3-same-height-div-column" target="_blank">(http://muki.tw/tech/bootstrap-3-same-height-div-column)</a>
</header>

<section>
  <h2>Before</h2>
  <div class="row row-demo">
    <div class="col-xs-4">
      this is column1
    </div>
    <div class="col-xs-4">
      this is column2
    </div>
    <div class="col-xs-4">
      this is column3<br />
      this is column3<br />
      this is column3<br />
      this is column3<br />
      this is column3<br />
      this is column3
    </div>
  </div>
  <hr />
  <h2>After</h2>
  <div class="row row-demo row-same-height">
    <div class="col-xs-4">
      this is column1
    </div>
    <div class="col-xs-4">
      this is column2
    </div>
    <div class="col-xs-4">
      this is column3<br />
      this is column3<br />
      this is column3<br />
      this is column3<br />
      this is column3<br />
      this is column3
    </div>
  </div>
</section>
```
**SCSS代码**

```scss
@import "compass/css3";

/**
Bootstrap3 same height for multi columns
Autohr: Muki Wu
Article: http://muki.tw/tech/bootstrap-3-same-height-div-column
**/

/* basic layout start (you can skip it) */
body {
  background: #333;
  font-size: 16px;
  color: #f0f0f0;
  line-height: 1.1em;
}

a {
  text-decoration: none;
  color: #313131;
  &:hover {
    color: #000;
  }
}

section {
  width: 500px;
  margin: 0 auto;
  background: #555;
  padding: 1em;
  div {
    margin: 0 0 2em 0;
  }
}

header {
  background: #d9444a;
  text-align: center;
  color: #fff;
  padding: .7em 0;
  a {
    color: rgba(255,255,255,.6);
    @include text-shadow(1px 1px 1px #973735);
  }
  &:after {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: #d9444a transparent transparent transparent;
    top: 53px;
    left: 50%;
  }
}

h2 {
  font-size: 1em;
  margin: 0 0 .5em 0;
  background: #444;
  display: inline-block;
  padding: .5em 1.2em;
  position: relative;
  left: -1em;
}

/* demo code start */
.row {
  /* no continaer class, so remove margin setting*/
  margin-right: 0;
  margin-left: 0;
}

.row-demo .col-xs-4 {
  background: rgba(255, 255, 255, .6);
  color: #000;
}

.row-same-height {
  display: flex;
}
```
**效果图**

![使用bootstarp制作高度相同的列01.png](http://upload-images.jianshu.io/upload_images/563374-9988cd2d51e8d5a6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![使用bootstarp制作高度相同的列02.png](http://upload-images.jianshu.io/upload_images/563374-f63548aa397d9fa7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

你可以从范例中的 **Before** 以及 **After** 看到前后差异。

而我只有在 `row` 里面加上一行语法，即可做到该效果：


```css
.row {
    display: flex;
}
```

正常情況下，<font color='red'>**Bootstrap** </font>一行最多容纳 `12 columns`，但如果使用`display: flex`，同一個 **row** 的 `col-*` 总数超過了 12 ，他們一样会维持在同一行內，宽度也会自动均分。这是除了浏览器相容外，还需要特別注意的一件事。

## 使用 table 让 column 高度相同

古早以前如果希望栏位的高度相同，用table不失為一个好方法，虽然现在我们不再使用表格做排版，但依然可以使用 `display: table` 将所有标签的型态作转换。

此外 `display: table` 的浏览器支持度很好，虽然语法较多，但是考量到 IE9 以下的兼容的话，推荐大家使用该方法。

**html代码**

```html
<header>
  Bootstrap3 same height for multi columns (DEMO II)<br />
  <a href="http://muki.tw/tech/bootstrap-3-same-height-div-column" target="_blank">(http://muki.tw/tech/bootstrap-3-same-height-div-column)</a>
</header>

<section>
  <h2>Before</h2>
  <div class="row row-demo">
    <div class="col-xs-4">
      this is column1
    </div>
    <div class="col-xs-4">
      this is column2
    </div>
    <div class="col-xs-4">
      this is column3<br />
      this is column3<br />
      this is column3<br />
      this is column3<br />
      this is column3<br />
      this is column3
    </div>
  </div>
  <hr />
  <h2>After</h2>
  <div class="row row-demo row-same-height">
    <div class="col-xs-4">
      this is column1
    </div>
    <div class="col-xs-4">
      this is column2
    </div>
    <div class="col-xs-4">
      this is column3<br />
      this is column3<br />
      this is column3<br />
      this is column3<br />
      this is column3<br />
      this is column3
    </div>
  </div>
</section>
```

**SCSS代码**

```scss
@import "compass/css3";

/**
Bootstrap3 same height for multi columns
Autohr: Muki Wu
Article: http://muki.tw/tech/bootstrap-3-same-height-div-column
**/

/* basic layout start (you can skip it) */
body {
  background: #333;
  font-size: 16px;
  color: #f0f0f0;
  line-height: 1.1em;
}

a {
  text-decoration: none;
  color: #313131;
  &:hover {
    color: #000;
  }
}

section {
  width: 500px;
  margin: 0 auto;
  background: #555;
  padding: 1em;
  div {
    margin: 0 0 2em 0;
  }
}

header {
  background: #d9444a;
  text-align: center;
  color: #fff;
  padding: .7em 0;
  a {
    color: rgba(255,255,255,.6);
    @include text-shadow(1px 1px 1px #973735);
  }
  &:after {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: #d9444a transparent transparent transparent;
    top: 53px;
    left: 50%;
  }
}

h2 {
  font-size: 1em;
  margin: 0 0 .5em 0;
  background: #444;
  display: inline-block;
  padding: .5em 1.2em;
  position: relative;
  left: -1em;
}

/* demo code start */
.row {
  /* no continaer class, so remove margin setting*/
  margin-right: 0;
  margin-left: 0;
}

.row-demo .col-xs-4 {
  background: rgba(255, 255, 255, .6);
  color: #000;
}

.row-same-height {
  display: table;
  width: 100%;
}

.row-same-height [class^=col-] {
  display: table-cell;
  float: none;
}
```

**效果图**：略，同上面。

**Bootstrap** 有 `row` 以及 `column` 的设定，所以在结构上很适合加入 `display: table `，不需要再给予多餘的 DIV：


```css
.row {
  display: table;
  width: 100%;
}

.row [class^=col-] {
  display: table-cell;
  float: none;
}
```

> - 使用 `display: table` 之后，宽度会等於行内元素(<font color='green'>inline elements</font>)，因此记得要加上`width: 100%;` 让宽度等於父层的宽度。
- 记得在 `col-*` 将所有浮动给移除( `float: none` )，不然 `display: table` 不会有作用。

<hr/>

以上两种方法好记又方便，如果搭配 Bootstrap，也不需要增加额外的 DIV 标签，希望大家会喜欢啦～


