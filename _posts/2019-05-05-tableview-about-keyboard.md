---
layout: post
title:  TableView中键盘弹出，TableView自动上移问题
author: Michael
Date: 2019-05-05 10:13:00 +8000
Categories: iOS开发
tags: iOS开发
---

> 首先在ios4以后，当UITableViewCell里有UITextfield，当输入时键盘遮盖了UITextField，UITableView是会自动上移，当如果要让tableView自动滚动的话，还需要设置一下tableView的contentInset。接下来介绍一下实现步骤：

#### 首先监听键盘出现和消失

```objective-c
// 监听键盘出现和消失 
[[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(keyboardWillShow:) name:UIKeyboardWillShowNotification object:nil];
[[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(keyboardWillHide:) name:UIKeyboardWillHideNotification object:nil];
```

#### 收到通知在方法里面实现

```objective-c
#pragma mark 键盘出现
-(void)keyboardWillShow:(NSNotification*)note
{
    CGRectkeyBoardRect=[note.userInfo[UIKeyboardFrameEndUserInfoKey] CGRectValue];
    self.tableView.contentInset= UIEdgeInsetsMake(0,0, keyBoardRect.size.height,0);
}

#pragma mark 键盘消失
-(void)keyboardWillHide:(NSNotification*)note
{
    self.tableView.contentInset = UIEdgeInsetsZero;
}
```

这样就可以实现自动滚动了，另一种方法是键盘出现的时候把tableView的frame的高度减去键盘的高度，也可以实现，例如：

```objective-c
#pragma mark 键盘出现
-(void)keyboardWillShow:(NSNotification *)note
{
    CGFloat screenW = [UIScreen mainScreen].bounds.size.width;
    CGFloat screenH = [UIScreen mainScreen].bounds.size.height;
    CGRect keyBoardRect = [note.userInfo[UIKeyboardFrameEndUserInfoKey] CGRectValue];
    self.tableView.frame = CGRectMake(0, 64, screenW, screenH - 64 - keyBoardRect.size.height);
}

#pragma mark 键盘消失-(void)keyboardWillHide:(NSNotification *)note
{
    self.tableView.frame = CGRectMake(0, 64, [UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height - 64);
}
```

推荐第一种方法，demo下载地址：[https://github.com/yybchl/yoyo.git](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Fyybchl%2Fyoyo.git) 