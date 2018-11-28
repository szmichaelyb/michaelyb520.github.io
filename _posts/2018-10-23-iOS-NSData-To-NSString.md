---
layout: post
title:  iOS NSString 与NSData转化
author: Michael
Date: 2018-10-23 10:10:00 +8000
Categories: iOS开发
tags: iOS开发
---

1. NSString 转 NSData

   ```objective-c
   NSString * str = @"str"; 
   NSData *data = [str dataUsingEncoding:NSUTF8StringEncoding];
   ```

2. NSData 转 NSString

   ```objective-c
   NSString * str  =[[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
   ```

3. data 转 char

   ```objective-c
   NSData * data; 
   char * haha = [data bytes]; 
   ```

4. char 转 data 

   ```objective-c
   byte * byteData = malloc(sizeof(byte)*16); 
   NSData *content=[NSData dataWithBytes:byteData length:16];
   ```

