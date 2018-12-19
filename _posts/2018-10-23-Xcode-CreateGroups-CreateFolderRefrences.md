---
layout: post
title:  Xcodde Create Groups 与 Create Folder References的却别，选哪个？
author: Michael
Date: 2018-10-23 11:10:00 +8000
Categories: iOS开发
tags: iOS开发
---

> 当我们xcode开发中，如何正确添加文件等资源？
>
> 可能很多人只是拖入文件资源，但是忘记勾选【create groups】这时候出现错误，找不到文件，或者.h头文件无法引用？

### 一. 案例介绍演示

![iOS开发001](/assets/images/2018/iOS/iOS开发001.gif)

1. **步骤提示：**

   - 拖入第三方文件，选项为【create folder references】时候，error报错显示，找不到引用的第三方文件【“ ‘XXXXX.h’ file not found”】。
   - 删除此第三方（【move  to trash】完全删除，删除所有的引用）
   - 重新拖入第三方文件，选项为【create groups】时候，success啦！

2. **正确截图提示：**

   ![iOS开发002](/assets/images/2018/iOS/iOS开发002.png)

   所以：**拖入新的文件等资源时候记得勾选：【Copy items if needed】和【Create Groups】**

### 二. 浅析：【Create groups】与【create folder references】区别与联系？

1. 如果选择了Create groups方式添加了一个文件，我们会发现被添加进来的文件，文件夹是黄色的

2. 选择了 Create folder references方式添加进来的文件的文件夹是蓝色的，如图：

   ![iOS开发003](/assets/images/2018/iOS/iOS开发003.png)

### 三. 深析【create groups】 与 【create folder reference】及【copy item if needed】区别与联系？

1. **使用Create groups**

   ![iOS开发004](/assets/images/2018/iOS/iOS开发004.png)

   为任何新增加的文件夹创建组，组的概念也许我们并不陌生，我们在项目中完全可以手动添加一个groups（右键点击选择New Group），但是手动添加的groups实际上并不会存在于项目的目录中，你会发现被添加进groups中的文件仍在位于它原来所在的位置，但是从外部引入进来的groups并不会如此，正如我们刚才那样。groups一旦被创建或添加，都是以黄色文件夹的形式存在的，当你想要使用文件夹中的某个类的头文件时，你可以直接添加它的引用，例如

   **#include xxx.h**

   因为groups下的cpp文件是会被编译的。

   **所以：建议✔️使用【Create groups】**

2. **使用Create folder references方法**

   ![iOS开发005](/assets/images/2018/iOS/iOS开发005.png)

   只是将文件单纯的创建了引用，这些文件不会被编译，所以在使用的时候需要加入其路径，比如在我们想要使用上图中的myScripts文件夹下面有某个头文件，则需要按照下面的方法添加声明：

   **#include myScripts/xxx.h**

   否则编译器就会告诉你找不到xxx.h文件。

   这就是项目中黄色文件夹与蓝色文件夹的区别以及使用方法

   **所以：不建议❌使用【Create folder references】**

3. **至于Destination对应【copy item if needed】 选项**

   ![iOS开发006](/assets/images/2018/iOS/iOS开发006.png)

   当你选择了这个选项时，如果你想要引入的文件不在你的项目文件的目录下，Xcode则会自动将这个文件复制一份拷贝到你的项目的目录下

   如果你不选择，并且这个文件也并不在你的项目目录下，那么这个文件仍然可以被使用，但是一旦你将项目拷贝到了别的地方时，这个文件就会找不到了。因为这个文件在你的电脑中，而不在你的项目中。

   **所以：建议✔️使用【copy item if needed】**

### 四. 最后总结

- **建议✔️使用【Create groups】**
- **不建议❌使用【Create folder references】**
- **建议✔️使用【copy item if needed】**

![iOS开发007](/assets/images/2018/iOS/iOS开发007.png)

- 其他参考：[Xcode 中 Create groups 与 Create folder references](https://www.jianshu.com/p/7c77ac2a3fe7?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)

  ​

