---
layout: post
title: 使用Jekyll搭建自己的博客-全教程
author: Michael
date: 2018-01-16 11:50:11.000000000 +08:00
tags: 个人博客
---

> Jekyll是一款Blog生成器，不需要数据库的支持。jekyll用于发行生成静态网页发行。

## 1. 文件结构

- `_config.yml`：用于保存配置。（jekyll会自动加载这些配置）
- `_includes文件夹`：存放可以重复利用的文件，可以被其他的文件包含（方法：`{  % include 文件名 %  }`）
- `_layouts文件夹`：存放模板文件（标签 `{  { content }  }`，将content插入页面中）。
- `_posts文件夹`：存放实际的博客文章内容（文件名格式：`年-月-日-标题.md`）。
- `_site文件夹`：存放最终生成的文件（其他的目录都会被拷贝到最终文件的目录下。所以`css`，`images`等目录都可以放在根目录下）。
- `YAML头信息`（可选的）：（文章只要包含YAML头，Jekyll就会将其转换成html文件）设置一些预定义的变量，或你自己定义的变量。

![Jekyll文件结构-预定义的变量](https://upload-images.jianshu.io/upload_images/1416611-5d485de0f4484e3d.JPG?imageMogr2/auto-orient/)

也可定义自己的变量：比如`title`，在文中使用的方法：`{ { page.title } }`。

## 2. 常用命令（命令行输入）

```bash
# 当前文件夹中的内容将会生成到`./site`文件夹中
$ jekyll build

# 当前文件夹中的内容会生成到指定文件夹中
$ jekyll build --destination <destination>

# 将指定源文件夹中的内容生成到指定文件夹中
$ jekyll build --source <source>--destination <destination>

# 查看更改，再生成
$ jekyll build --watch

# 启动服务器（jekyll集成了一个服务器），使用本地预览，运行在`http://localhost:4000/
$ jekyll serve

# 先查看变更在启动服务器**
$ jekyll serve --watch
```

可以在`_config.yml`文件中添加配置，`jekyll`会自动获取其中的配置，例如：

```jekyll
source: _source
destination: _deploy
```

等同于命令：`jekyll build --source _source --destination _deploy`。

## 3. Jekyll原理

### Jekyll使用Liquid语言

```html
题外话：
{ { ..... } }  是Jekyll中的固定于法，因此，这里必须不能让两个大括号({)挨在一起。
```

> `Liquid语言`使用2种标记（Output和Tag）：Output：`{ { content } }`，Tag：`{ % content % }`<br/>
  `Liquid过滤器`：将左边字符串通过过滤器得到想要的结果并输出。

![过滤器示例](https://upload-images.jianshu.io/upload_images/1416611-0139bdb4ca40bbe0.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/360)

### Liquid的标准过滤器：
```html
date - 格式化日期
capitalize - 将输入语句的首字母大写
downcase - 将输入字符串转为小写
upcase - 将输入字符串转为大写
first - 得到传递数组的第一个元素
last - 得到传递数组的最后一个元素
join - 将数组中的元素连成一串，中间通过某些字符分隔
sort - 对数组元素进行排序
map - 从一个给定属性中映射/收集一个数组
size - 返回一个数组或字符串的大小
escape - 对一串字符串进行编码
escape_once - 返回一个转义的html版本，而不影响现有的转义文本

strip_html - 去除一串字符串中的所有html标签
strip_newlines - 从字符串中去除所有换行符(`\n`)
newline_to_br - 将所有的换行符(`\n`)换成 html 的换行标记

replace - 匹配每一处指定字符串并替换，如`{ { 'foofoo' | replace:'foo','bar' } } #=> 'barbar'`
replace_first - 匹配第一处指定的字符串并替换，如`{ { 'barbar' | replace_first:'bar','foo' } } #=> 'foobar'`

remove - 删除每一处匹配字符串，如`{ { 'foobarfoobar' | remove:'foo' } } #=> 'barbar'`
remove_first - 删除第一处匹配的字符串，如`{ { 'barbar' | remove_first:'bar' } } #=> 'bar'`

truncate - 将一串字符串截断为x个字符
truncatewords - 将一串字符串截断为x个单词
prepend - 在一串字符串前面加上指定字符串，如`{ { 'bar' | prepend:'foo' } } #=> 'foobar'`
append - 在一串字符串后面加上指定字符串，如`{ { 'foo' | append:'bar' } } #=> 'foobar'`

minus - 减，如`{ { 4 | minus:2 } } #=> 2`
plus - 加，如`{ { '1' | plus:'1' } } #=> '11', { { 1 | plus:1 } } #=> 2`
times - 乘，如`{ { 5 | times:4 }} #=> 20`
divided_by - 除，如`{ { 10 | divided_by:2 } } #=> 5`
split - 将一串字符串根据匹配模式分割成数组，如`{ { "a~b" | split:~ } } #=> \['a','b'\]`
modulo - 余数，如`{ { 3 | modulo:2 } } #=> 1`
```

### tag标签：

```html
`assign` - 创建一个变量
`capture` - 块标记，把一些文本捕捉到一个变量中（如：把一系列字符串连接为一个字符串，并将其存储到变量中）
`case` - 块标记，标准的 case 语句
`comment` - 块标记，将一块文本作为注释
`if` - 标准的 if/else 块
`unless` - if 语句的简版
`include` - 包含其他的模板
`raw` - 暂时性的禁用的标签的解析（展示一些可能产生冲突的内容）
`cycle`- 用于循环轮换值，如颜色或 DOM 类
`for` - 用于循环 For loop（for ... in ... 。limit:int使你可以限制接受的循环项个数；offset:int可以可以让你从循环集合的第 n 项开始；reversed让你可以翻转循环）
```

### Jekyll新增的过滤器：

```html
`date_to_string` - 日期转化为短格式
`date_to_long_string` - 日期转化为长格式
`number_of_words` - 统计字数（`{ { page.content | number_of_words } }`）
`array_to_sentence_string` - 数组转换为句子（列举标签时：`{ { page.tags | array_to_sentence_string } }`）
`markdownify` - 将makedown格式字符串转换成HTML
`jsonify` - data to JSON
```

### Jekyll新增标签：
```html
`highlight` 语言 `linenos`（行号，可选）- 块标签，代码高亮 
`post_url` - 使用某篇博文的超链接（不需要写文件后缀）
`gist` - github gist显示代码（gist的介绍和使用 ）（`{ % gist 5555251 % }`）
``` 

## 4. 书写博客
引用图片或其他资源：新建一个文件夹存放，在博文中的引用方式：`{ { site.url } }`表示站点的根目录。

![书写博客-添加截图](https://upload-images.jianshu.io/upload_images/1416611-bd1d86500ad87f04.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/490)

其他的资源引用也是一样的。

## 5. 创建博文目录
一个简单的例子，使用的是Liquid模板语言。

![创建目录](https://upload-images.jianshu.io/upload_images/1416611-8b37bd5ed660a438.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/613)

## 6. 分页
在`_config.yml`里边加一行，并填写每页需要几行：

```html
paginate: 5
// 对需要带有分页页面的配置
paginate_path:"blog/page:num"
```

`blog/index.html`将会读取这个设置，把他传给每个分页页面，然后从第2页开始输出到`blog/page:num`，`:num`是页码。
如果有 12 篇文章并且做如下配置`paginate: 5`，Jekyll会将前 5 篇文章写入`blog/index.html`，把接下来的 5 篇文章写入`blog/page2/index.html`，最后 2 篇写入`blog/page3/index.html`。

更多可查看Jekyll官方的[分页教程](https://link.jianshu.com/?t=http://jekyll.bootcss.com/docs/pagination/)。

## 7. [草稿](https://link.jianshu.com/?t=http://jekyll.bootcss.com/docs/pagination/)

草稿是你还在创作中不想发表的文章。创建一个名为`_drafts`的文件夹。

## 8. 部署到github

[Jekyll教程文档(中文)](http://jekyll.bootcss.com/docs/github-pages/)

克隆仓库到本地：

```bash
git clone https://github.com/用户名/用户名.github.com.git
```

在本地启动服务：

```bash
cd 用户名.github.com
jekyll serve -B
```

提交代码到线上：

```bash
# 添加到暂存区
$ git add --all

# 提交到本地仓库                        
$ git commit -m "提交jekyll默认页面"

# 线上的站点是部署在master下面的
$ git push origin master
```
