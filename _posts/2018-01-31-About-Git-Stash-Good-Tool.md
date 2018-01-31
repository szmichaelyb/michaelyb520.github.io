---
layout: post
title:   使用 git stash 让突如其来的分支切换更加美好～
author: Michael
Date: 2018-01-31 10:34:00 +8000
Categories: 项目管理
tags: 项目管理-SVN与GIT
---

## 为什么我们需要它

不得不说，在知道这个命令的时，以及之后的使用中，我都超级热爱这个命令，因为它真的太好用了。

给大家说一下我使用这个命令的场景：

此时我在 `feature_666` 分支,非常聚精会神加持高专注地实现一个功能 666 模块，简直键盘如飞的编写代码～～～ 然后这时，客户反馈出一个 `bug` , 非常严重，必须立马解决，优先级为 0 ！！！ 于是，我需要去到 `release` 分支去 `checkout` 新的分支去工作了，但是 666 功能还没完成怎么办？ 

此时我面临着一个选择题： 

- A. 提交后切换，代码保存到分支 `feature_666`，却产生一个无意义的提交 
- B. 不提交直接切换，然而这个选项根本没人会选。
 
 > 是不是很难选，此时，别忘记还有 C 选项！

- C. 使用 `git stash`，将当前修改(未提交的代码)存入缓存区，切换分支修改 `bug`，回来再通过 `git stash pop` 取出来。

## 小例子，赶紧来试一下

### 存储修改

OK，上一个 `commit` 的时候，代码快照是这个样子的

```java
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        String s = "大家好，我是段小憨";
    }
}
```

此时的我在写代码如下：

```java
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        String s = "大家好，我是段小憨";
        String s1 = "我现在在写一个超级厉害的功能，但是我还没写完,甚至还有点地方在报错";
    }
}
```

代码到此处，紧急 bug 出现了，一秒都不能等，选择下列操作。

![紧急Bug出现后的操作](http://upload-images.jianshu.io/upload_images/563374-b36ea54e2c7e4cbd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

暂存后的工作区代码会恢复到最后一次提交时的代码：

```java
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        String s = "大家好，我是段小憨";
    }
}
```

### 查看修改

如果你有丢失代码的经历，肯定会对这个之前没接触的新命令不放心，那么怎么确定你操作成功了呢？

```bash
git stash show  # 查看刚才暂存的修改
```

![查看Git修改](http://upload-images.jianshu.io/upload_images/563374-74992c16e8019952.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 取出修改
现在 bug 改完了，要重新回来开发了，取出修改

```bash
git checkout <feture_branch> # 切换刚才功能开发的分支
git stash pop # 取出修改
```

![Git-取出修改](http://upload-images.jianshu.io/upload_images/563374-6e577aadd07f41c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

取出修改后的工作区代码为：

```java
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        String s = "大家好，我是段小憨";
        String s1 = "我现在在写一个超级厉害的功能，但是我还没写完,甚至还有点地方在报错";
    }
}
```

## 关于它更多的细节
相信通过上面的例子，你已经知道如何使用 `git stash` 这个应用了，但是，如果理解它的一些细节的话，相信你会使用的更加灵活和得心应手。

### 修改存储到什么位置了?
当我们使用 `git init`给项目添加版本控制的时候，会在项目路径下生成一个 `.git` 隐藏文件夹。`.git` 中存储着版本管理的所有信息。 
`.git/refs/stash` 中，存储的是最后一个 `stash` 对应的节点指针

![stash节点指针](http://upload-images.jianshu.io/upload_images/563374-db2b455647d4045f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

同样，在 `.git/log/refs/stash` 中可以看到我们全部的 `stash` 记录信息

### 存储多个 stash 的情况
ok，我们来尝试一下修改文件，然后再次使用 `git stash`，此时我们有个两个 暂存修改，那么怎么查看呢？

```bash
git stash list # 查看暂存区的所有暂存修改记录
```

![存储多个 stash 的情况](http://upload-images.jianshu.io/upload_images/563374-11dda903294c950e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

此时你有没有发现，这两个的名称是一样，这是个什么鬼？ 
别怕，名称是一样的，但是指向的修改是不一样的，我们从.git/log/refs/stash 中可以看到 两者的对应的节点指针是不一样的。

想知道名称一样的谜题，往下继续看～

### stash 的存储的名称是怎么来的，可以修改吗？
当使用`git stash` 创建 `stash` 的时候，会给 `stash` 一个默认的名称。

![stash默认的名称](http://upload-images.jianshu.io/upload_images/563374-517504dd43dc88c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

之前有说，`stash` 存储的内容就是，当前工作区距当前分支最后一次提交时的修改。所以，`stash` 的默认命名规则就是：

```bash
WIP on <branch_name> ： <latest_commit_id> <latest_commit_message>
```

其中出现了生僻的单词，解释如下： 
`WIP`，`Work In Progess`的简称，说明代表了工作区进度。 
同样的还有 `Index`，代表的是已经被 `add` 但是还未被提交的进度。

如果在未提交的情况下，执行 `git stash` 两次，就如上图，无法准确分辨两个`stash` 具体修改的是哪些内容，这样用，显的伟大的 `Git` 一点都不智能，怎么可以！。

所以，在这种情况下，给 `stash` 存储的修改起个名字，显然非常重要，方式如下：

```bash
git stash save <message>
```

### 取出也有好几种方式
上面的演示中，取出 `stash` 的方式都是

```bash
git stash pop  # 取出最近一次暂存并删除记录列表中对应记录
```

这是一个非常好用的取出方式，一般使用的频率最高，但并非适用所有情况。

因为 `git stash pop` 是弹出栈顶的一个 `stash`，也就是最后一次存储的 `stash`。在存储多个`stash`，想取出非栈顶的一个的情况下，是不适用的。

这个时候要使用：

```bash
git stash list # 查看暂存区的所有暂存修改
git stash apply stash@{X} # 取出相应的暂存
git stash drop stash@{X} # 将记录列表中取出的对应暂存记录删除
```

## 结语
虽然，所有的 `git` 命令都能从 [Git文档](https://git-scm.com/book/en/v2) 上能查看到，但是总是要自己亲自敲过这些命令，这些技能才能自己掌握。

不得不说，使用命令行真的才是使用 `git` 的正确方式，真的超爽！

最后，世界晚安。

