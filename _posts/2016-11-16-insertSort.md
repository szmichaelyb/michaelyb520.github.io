---
title: 算法-插入排序
layout: post
author: 谢涛
date: '2016-11-16 10:00:24 +0800'
categories: Blog
---
>生活总是充满了惊喜，无论是惊还是喜。

## 核心思想
有一个已经有序的数据序列，要求在这个已经排好的数据序列中插入一个数，但要求插入后此数据序列仍然有序，这个时候就要用到一种新的排序方法——插入排序法,插入排序的基本操作就是将一个数据插入到已经排好序的有序数据中，从而得到一个新的、个数加一的有序数据，算法适用于少量数据的排序。

## 示例
对于长度为n的数组，全部完成排序需要经过n-1轮的查找,首先我们从第二个数开始，向前比较，如果比前面的数小，则继续向前对比，直至遇见大于前置位数字时，或者到了数组的最前端，选择正确的位置插入。下面是图解：
![插入排序-第一轮.png](http://upload-images.jianshu.io/upload_images/1319710-20b00914560746ba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

经过第一轮，前面两个数据已经有序，第二轮从第三个值开始：
![插入排序-第二轮.png](http://upload-images.jianshu.io/upload_images/1319710-5924d04d84354474.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
每一轮都是从后向前对比，找到合适的位置插入，其中被越过的数值向后移一位，第三轮：
![插入排序-第三轮.png](http://upload-images.jianshu.io/upload_images/1319710-5860e7eafd3567b8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

整个排序过程：
<pre>
原始长度10
100	5	3	11	33	6	8	7	1	3	
第2轮
5	100	3	11	33	6	8	7	1	3	
第3轮
3	5	100	11	33	6	8	7	1	3	
第4轮
3	5	11	100	33	6	8	7	1	3	
第5轮
3	5	11	33	100	6	8	7	1	3	
第6轮
3	5	6	11	33	100	8	7	1	3	
第7轮
3	5	6	8	11	33	100	7	1	3	
第8轮
3	5	6	7	8	11	33	100	1	3	
第9轮
1	3	5	6	7	8	11	33	100	3	
第10轮
1	3	3	5	6	7	8	11	33	100	
</pre>

## C语言代码
<pre><code>#pragma mark - 插入排序
void insertSort(int arr[] ,int len) {
    printf("原始长度%d\n",len);
    printfArr(arr, len);
    for (int i = 1; i < len; i++) {
        printf("第%d轮\n",i+1);
        // 顺序不对 需要进行移位
        if (arr[i] < arr[i-1]) {
            int currentNum = arr[i];
            int target = i;
            for (int j = i; j >= 0; j--) {
                int compareNum = arr[j-1];
                if (currentNum < compareNum) {
                    arr[j] = arr[j-1];
                    target = j-1;
                }else{
                    break;
                }
            }
            arr[target] = currentNum;
        }
        printfArr(arr, len);
    }
}
</code></pre>
## 时间复杂度
插入排序使用了两层循环来进行排序，因此时间复杂度仍为 O ( n^2 )

## 结语
由于最前方的有序区本身是有序的，在寻找插入位置的逻辑上还有优化的空间，所以插入排序还有个升级版：折半插入排序(⊙o⊙)…，折中插入不同的地方在于：和有序区对比的时候是从有序区中间的值开始对比的，根据对比结果来决定往左半区或者右半区继续使用同样的折半查找，直至找到相应位置。