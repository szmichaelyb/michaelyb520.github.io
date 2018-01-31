---
layout: post
title:  关于 git stash和git stash pop
author: Michael
Date: 2018-01-31 14:34:00 +8000
Categories: 项目管理
tags: 项目管理-SVN与GIT
---

git stash 可用来暂存当前正在进行的工作， 比如想`pull`最新代码， 又不想加新`commit`， 或者另外一种情况，为了`fix`一个紧急的`bug`，先`stash`，使返回到自己上一个`commit`，改完`bug`之后再`stash pop`，继续原来的工作。
基础命令：

```bash
$ git stash
$ do some work
$ git stash pop
```

进阶：

```bash
git stash save "work in progress for foo feature"
```

当你多次使用`git stash`命令后，你的栈里将充满了未提交的代码，这时候你会对将哪个版本应用回来有些困惑，`git stash list` 命令可以将当前的Git栈信息打印出来，你只需要将找到对应的版本号，例如使用`git stash apply stash@{1}`就可以将你指定版本号为`stash@{1}`的工作取出来，当你将所有的栈都应用回来的时候，可以使用`git stash clear`来将栈清空。

```bash
git stash          # save uncommitted changes
# pull, edit, etc.
git stash list     # list stashed changes in this git
git show stash@{0} # see the last stash 
git stash pop      # apply last stash and remove it from the list

git stash --help   # for more info
```


