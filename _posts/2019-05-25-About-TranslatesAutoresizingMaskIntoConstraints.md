---
layout: post
title:  关于translatesAutoresizingMaskIntoConstraints属性的认知
author: Michael
Date: 2019-05-25 10:29:00 +8000
Categories: iOS开发
tags: iOS开发
---

### translatesAutoresizingMaskIntoConstraints

- 把 autoresizingMask 转换为 Constraints
- 即：可以把 frame ，bouds，center 方式布局的视图自动转化为约束形式。（此时该视图上约束已经足够 不需要手动去添加别的约束）

<hr/>

- 用代码创建的所有view ，  translatesAutoresizingMaskIntoConstraints 默认是 YES
- 用 IB 创建的所有 view ，translatesAutoresizingMaskIntoConstraints 默认是 ~~NO~~ (autoresize 布局:YES , autolayout布局 :NO)

### 如何设置 translatesAutoresizingMaskIntoConstraints

- 视图 使用代码创建，frame 布局 ，不用去管 translatesAutoresizingMaskIntoConstraints
- 视图 使用代码创建，autolayout 布局，translatesAutoresizingMaskIntoConstraints 设置为 NO
- 视图 IB 创建，frame 布局 , translatesAutoresizingMaskIntoConstraints 不用管 (IB 帮我们设置好了：YES)
- 视图 IB 创建，autolayout 布局，translatesAutoresizingMaskIntoConstraints 不用管 (IB 帮我们设置好了，NO)

### 为什么 translatesAutoresizingMaskIntoConstraints 使用约束布局时候，就要设置为 NO？

translatesAutoresizingMaskIntoConstraints 的本意是将 frame 布局 自动转化为 约束布局，转化的结果是为这个视图自动添加所有需要的约束，如果我们这时给视图添加自己创建的约束就一定会约束冲突。

为了避免上面说的约束冲突，我们在代码创建 约束布局 的控件时 直接指定这个视图不能用frame 布局（即translatesAutoresizingMaskIntoConstraints=NO），可以放心的去使用约束了。

### 例子：

> v1是一个不使用autolayout的view，
> v2是一个使用autolayout的view，
> 但v1成为v2的subview时，
> v2需要四条隐含的constraint来确定v1的位置，这些约束都是从v1的frame转化而来：





