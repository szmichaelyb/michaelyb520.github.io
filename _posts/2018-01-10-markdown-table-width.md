---
layout: page
title: Markdown 表格之调整宽度技巧​
author: Michael
Date: 2018-01-10 14:34:00 +8000
Categories: 博客建设
tags: 博客建设
---

>`<table>` 中表格的宽度由标题的 `<th>` 决定，我们只需要利用上 CSS 操作一番即可达到目的。

例如，我这个表格，最后一行【值】部分内容超出了，非常不美观，而且左边明显宽太多，应该做适当调整： 

![table-01](http://upload-images.jianshu.io/upload_images/563374-be5669a7f818b844.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

从上图，我们可以了解到，只需要调整【名称】1 列的宽度即可，那么怎么做呢？我们可以先在浏览器中看看 `HTML` 是怎样的：
   
   
```html
<table>
    <thead>
        <tr>
            <th>名称</th>
            <th>值</th>
            <th>备注</th>
        </tr>
    </thead>
    <tbody>
       <!-- 省略 tbody 内容 -->
    </tbody>
</table>
```

利用浏览器上的开发者工具我们可以调试一下，把【名称】左边的 `<th>` 改为：
   
   
```html
<th style="width: 100px;">
```

看起来似乎不错。回到 Markdown 上，在原表格前添加 CSS 代码，类似这样：

```css
<style>
table th:first-of-type {
    width: 100px;
}
</style>

<!-- 下方是表格的 Markdown 语法 --!>
名称|值|备注
---|---|---
```

这里需要一点 **CSS** 知识，选择器的问题，首先 `<th>` 存在于 `<table>` 中；其次 `th:first-of-type` 的意思是每个 `<th>` 为其父级的第一个元素，这里指的就是围绕着【名称】的 `<th>`。同理第二、三个使用 `th:nth-of-type(2)`、`th:nth-of-type(3)` 就可以了，以此类推。 

上述的 `th:first-of-type` 等于 `th:nth-of-type(1)`。上图修改完成后的结果： 

![table-02](http://upload-images.jianshu.io/upload_images/563374-5e36efeae8c94fa1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



