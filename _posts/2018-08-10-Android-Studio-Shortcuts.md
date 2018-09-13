---
layout: post
title:  Android Studio常用快捷键汇总（Mac）
author: Michael
Date: 2018-08-10 10:29:00 +8000
Categories: Android开发
tags: Android-Studio
---

### Mac上按键符号

- ⌥ : `option / alt`
- ⇧ : `shift`
- ⌃ : `control`
- ⌘ : `command`
- ⎋ : `esc`

### (一) 查找/查看相关

- #### 搜索任意内容
```bash
    双击 sft
```

- #### 当前文件查找/替换
```bash
    cmd + F / cmd + R
```
使用`cmd + G`，`sft + cmd + G`，跳到下一个/上一个高亮的变量

- #### 全局查找/替换
```bash
    sft + cmd + F / sft + cmd + R
```

- #### 全局搜索类
```bash
    cmd + O
```

- #### 全局搜索类/方法/参数
```bash
    opt + cmd + O
```

- #### 打开最近访问的文件列表
```bash
    cmd + E
```

- #### 类/方法在全局项目中引用情况
```bash
    opt + fn + F7 / cmd + 鼠标点击
```

- #### 类/方法在当前文件中引用情况
```bash
    cmd + fn + F7
```

- #### 方法被调用层级结构
```bash
	ctr + opt + H
```

- #### 查看接口的实现
```bash
    opt + cmd + B
```

- #### 跳转至超类的方法
```bash
    cmd + U
```

- #### 跳转至第几行
```bash
    cmd + L
```

- #### 返回到上次编辑位置
```bash
    cmd + [ / ]
    opt + cmd + ← / →
```

- #### 当前编辑的文件中结构快速导航
```bash
    cmd + fn + F12
```

- #### 列出函数方法一系列的有效参数
```bash
    cmd + P
```

- #### 跳转至错误或警告
```bash
    fn + F2
```

- #### 查看类／方法的注释文档
```bash
    fn + F1
```

### (二) 控制操作相关

- #### Surround with快速调出if,for,try…catch,while等环绕代码
```bash
    opt + cmd + T
```

- #### 快速生成模版代码块，如if,while,return
```bash
    cmd + J
```

- #### 快速生成getter／setter方法，构造方法，toString()方法等
```bash
    cmd + N
```

- #### 行尾自动添加分号，if后面自动加“(){ }”
```bash
    sft + cmd + enter
```

- #### 引入重写父类的方法
```bash
    ctr + O
```

- #### 引入接口或抽象类方法的实现
```bash
    ctr + I
```

- #### 下一步意图猜测
```bash
    opt + return
```

- #### 将最近使用的剪贴板内容选择插入到文本
```bash
    sft + cmd + V
```

- #### 注释与取消注释，注释效果 //…
```bash
    cmd + /
```

- #### 注释与取消注释，注释效果 /…/
```bash
    opt + cmd + /
```

- #### 上下移动代码
```bash
    opt + sft + up/down
```

- #### 上下代码行换位
```bash
    cmd + sft + up/down
```

- #### 单词间或驼峰间跳转
```bash
    Alt + ← / →
```

- #### 切换大小写
```bash
    sft + cmd + U
```

- #### 切换文件
```bash
    ctr + tab
```

- #### 选择区域
```bash
    opt + up/down
```
  注：如果光标停留在大括号处，则选中整个大括号区域

- #### 局部代码块展开/收缩
```bash
    cmd + + / cmd + -
```

- #### 全部代码块展开/收缩
```bash
    sft + cmd + + / sft + cmd + -
```

- #### 撤销/取消撤销
```bash
    cmd + Z / sft + cmd +Z
```

- #### 删除行
```bash
    cmd + C / cmd + delete
```

- #### 复制行
```bash
    cmd + D
```

- #### 合并行
```bash
    sft + ctr + J
```

- #### 列编辑
```bash
    Alt + 鼠标框选  
```

- #### 格式化代码
```bash
    opt + cmd + L
```

- #### 自动缩进对齐
```bash
    ctr + alt + I
```

- #### 清除无效包引用
```bash
    opt + ctr + O
```

- #### 打开设置
```bash
    cmd + ,
```

- #### 隐藏窗口
```bash
    sft + esc
```

### (三) 代码重构相关

- #### 类名／方法名／变量名 重命名操作
```bash
    sft + fn + F6
```

- #### 方法重构，方法抽离
```bash
    opt + cmd + M
```

- #### 抽离成方法参数
```bash
    opt + cmd + P
```

- #### 抽离为局部变量
```bash
    opt + cmd + V
```

- #### 抽离为成员变量
```bash
    opt + cmd + F
```

### (四) 编译运行调试
- #### 编译源码
```bash
    cmd + fn + F9
```

- #### 运行
```bash
    ctr + R
```

- #### 调试
```bash
    ctr + B
```

- #### Step Into（进入到代码）
```bash
    fn + F7
```

- #### Step Over（跳到下一步）
```bash
    fn + F8
```

- #### 直接运行
```bash
    opt + cmd + R
```

- #### 退出调试
```bash
    cmd + fn + F2
```

### (五) 版本控制
- #### 打开git操作列表
```bash
    ctr + V
```

- #### 提交修改
```bash
    cmd + K
```

- #### 推到服务器
```bash
    sft + cmd + K
```

### (六) vim插件

- #### [vim使用参考1](http://kidneyball.iteye.com/blog/1828427)
- #### [vim使用参考2](http://ghui.me/post/2013/08/vim/)
- #### [vim使用参考3](http://gold.xitu.io/entry/57ae98217db2a2005416394d)

### 深入学习

- [Android Studio 最全快捷键以及演示](http://gold.xitu.io/entry/5799735c165abd0061e581d2)
- [Android studio 上非常好用的快捷键](http://gold.xitu.io/entry/579973e4a633bd0060d905ff)
- [AndroidStudio快捷键汇总](http://gold.xitu.io/entry/579973e4a633bd0060d905ff)
- [Android Studio五分钟带你从菜鸟到高级调试](http://blog.csdn.net/u013132758/article/details/51915575)
- [AS技巧合集「常用技巧篇」](http://mp.weixin.qq.com/s?__biz=MzA4NTQwNDcyMA==&mid=402416974&idx=1&sn=a8fd70a65ff3973758e4a7975c361139&scene=21#wechat_redirect)