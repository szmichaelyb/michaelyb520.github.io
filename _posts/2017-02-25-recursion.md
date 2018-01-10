---
title: 编程秘籍之四两拨千斤-递归
layout: post
author: 谢涛
date: '2017-02-25 21:40:24 +0800'
categories: Blog
---
![循环](http://upload-images.jianshu.io/upload_images/1319710-902e959e981bf301.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)
>刷了一段时间剑指offer的算法题，收获了很多，其中对递归的印象尤其深。递归给我一种四两拨千斤的感觉。

## 背景
递归，一种能够装逼的编程技巧。一个过程或函数在其定义或说明中有直接或间接调用自身的一种方法，它通常把一个大型复杂的问题层层转化为一个与原问题相似的规模较小的问题来求解，递归策略只需少量的程序就可描述出解题过程所需要的多次重复计算，大大地减少了程序的代码量，在算法题中有广泛的应用。

![马上开始装逼啦！](http://upload-images.jianshu.io/upload_images/1319710-2506a680d03678bf.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/340)

## 掌握递归的4个要点
写好一个递归算法，主要是把握好如下三个方面：
#### 1.  正确的时机退出。
***递归很容易造成死循环***，而造成死循环的原因就是没有正确地退出递归。

#### 2. 递归调用语句的位置
递归函数中，位于递归调用前的语句和各级被调函数具有相同的顺序．如果在递归调用语句后面的语句，则按逆序执行，下面会有具体讲解。

#### 3. 需要重复执行的逻辑。
***递归的精髓就是loop***，也是递归的核心思想，出现重复逻辑一定是必不可少的。但是重复的逻辑需要抽象。抽象出来一个干净利落的可循环逻辑对程序编写的帮助很大。

#### 4. 控制逻辑边界。
***控制边界保证了程序在正确的范围运行***。因为抽象出来的逻辑在一个正确范围内保证其可以递归执行。写程序也经常因为边界把控的不准确容易留下bug，比如说数组越界会造成Crash。合理控制边界，可以提高递归效率，避免不必要的调用，进一步还可以帮助递归正确退出。

## 如何正确退出递归
在递归调用语句前面加上逻辑判断，在特定情况下不再递归调用，以此结束递归。举个栗子，让程序员写一个按顺序打印数组，普通程序员一般会咔咔咔写下如下代码：

```
std::vector<int>array = {1,2,3,4,5,6,7,8,9};
for (int i = 0; i < array.size() ; i++) {
    printf("%d",array[i]);
}
// 输出结果:123456789
```

上面的代码一目了然，这当然不是我们需要的效果，而文艺程序员是怎么干的？下面的例子使用递归的方式按顺序打印数组，并且准确地在边界处结束递归。

```
int main(int argc, const char * argv[]) {
    std::vector<int>array = {1,2,3,4,5,6,7,8,9};
    printfNumber(array, 0);
    return 0;
}

// 顺序打印 
void printfNumber(std::vector<int>array, int i) {
    if (i == array.size()) return;
    printf("%d",array[i++]);
    printfNumber(array, i);
}
// 输出结果:123456789
```

上面的代码乍一看递归的方式比使用for循环的方式需要更多的代码，但是在比较复杂的调用中，递归才是简洁代码，四两拨千斤的高手。

## 递归调用语句的位置
递归调用语句的位置十分敏感，决定了其他语句什么时候执行，上面我们知道了如何按顺序打印数组，现在我们只需要将printf语句移至递归语句的后面，执行printf语句的顺序将倒置过来。

```
// 逆序打印
void reversePrintfNumber(std::vector<int>array, int i) {    
    if (i == array.size()) return;
    printfNumber(array, ++i);
    printf("%d",array[--i]);
}
// 输出结果reverse:987654321
```

总结下来就是:在循环调用中，递归语句前面的函数都是按顺序执行，递归语句后面的函数都是逆序执行（也就是在最后一个循环的语句反而最先被调用），就是这么简单😂。

![中场休息](http://upload-images.jianshu.io/upload_images/1319710-79fe62d5e14f41ed.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 找出重复执行的逻辑
翻转二叉树很好地诠释了递归的魅力，只需一个临时变量，帮助左右子树交换即可，子树的子树翻转交给下一个递归循环过程。

```
/*
struct TreeNode {
	int val;
	struct TreeNode *left;
	struct TreeNode *right;
	TreeNode(int x) :
			val(x), left(NULL), right(NULL) {
	}
};*/
class Solution {
public:
    // 翻转二叉树
    void Mirror(TreeNode *pRoot) {
        if (pRoot == NULL) return;
        TreeNode *tempNode = pRoot->left;
        pRoot->left = pRoot->right;
        pRoot->right = tempNode;
        // 翻转左子树
        Mirror(pRoot->left);
        // 翻转右子树
        Mirror(pRoot->right);
    }
};
```

## 控制逻辑边界
查找机器人运动范围（剑指offer全文最后一道算法题），每次基于当前点，可以向上下左右四个方向移动，已经走过的路径不再次计数。而下面的例子加入了移动方向进行判断，如果刚刚是走过得位置，则不再去探索，同时已经走过的路径也不再进行探索，这样可以减少不必要的重复操作，提高运行效率，这就是合理控制逻辑边界。这里使用多种逻辑边界组合帮助递归正确退出。

```
#pragma mark - 记录机器人的运动范围
int movingCount(int threshold, int rows, int cols)
{
    for (int i = 0; i < rows; i++) {
        std::vector<int> row;
        for (int j = 0; j < cols; j++) {
            row.push_back(0);
        }
        recordHistory.push_back(row); 
    }
    recordPath(threshold, 2,0,0);
    printf("----%d",count);
    return count;
}

/* 记录路径
 direct
   1
 4 0 2
   3
*/
int count = 0;
std::vector<std::vector<int>> recordHistory;
void recordPath(int threshold, int direct, int positionX, int positionY) {
    if (recordHistory[positionY][positionX] != 1 && getSum(positionX)+getSum(positionY) <= threshold) {
        recordHistory[positionY][positionX] = 1;
        std::vector<int> rowCount = recordHistory[0];
        count++;
        // 上
        if (positionY >= 1 && direct != 3) {
            recordPath(threshold, 1, positionX,positionY-1);
        }
        // 右
        if (positionX < rowCount.size()-1  && direct != 4) {
            recordPath(threshold, 2, positionX+1,positionY);
        }
        // 下
        if (positionY < recordHistory.size()-1  && direct != 1) {
            recordPath(threshold, 3, positionX,positionY+1);
        }
        // 左
        if (positionX >= 1  && direct != 2) {
            recordPath(threshold, 4, positionX-1,positionY);
        }
    }
}

//计算位置的数值
int getSum(int number) {
    int sum=0;
    while(number>0) {
        sum+=number%10;
        number/=10;
    }
    return sum;
}
```


最后，虽然递归有逻辑简单，代码清晰的优点，但是并不建议首先考虑用递归解决问题。好的程序还是需要通过深入解析写出更快捷、更巧妙的算法，而不是把问题交给机器暴力解决。当然递归加剪枝可以避开一些不必要的搜索，不过大部分还是有替代的办法。

![远古老司机](http://upload-images.jianshu.io/upload_images/1319710-a8465cde211ae1d1.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



## 我不认识的某些远古老司机对递归的评价
老司机A：**递归可读性好**这一点，对于初学者可能会反对。实际上递归的代码更清晰，但是从学习的角度要理解递归真正发生的什么，是如何调用的，调用层次和路线，调用堆栈中保存了什么，可能是不容易。但是不可否认递归的代码更简洁。一般来说，一个人可能很容易的写出前中后序的二叉树遍历的递归算法，要写出相应的非递归算法就比较考验水平了，恐怕至少一半的人搞不定。所以说递归代码更简洁明了

老司机B：**递归其实是方便了程序员难为了机器**。它只要得到数学公式就能很方便的写出程序。优点就是易理解，容易编程。但递归是用栈机制实现的（c++），每深入一层，都要占去一块栈数据区域，对嵌套层数深的一些算法，递归会力不从心，空间上会以内存崩溃而告终，而且递归也带来了大量的函数调用，这也有许多额外的时间开销。所以在深度大时，它的时空性就不好了。 


## 重要指示
>我追求的是极限装逼😂，开玩笑啦！以上内容是我自己的理解，仅供参考，现在圈内环境太恶劣，写个文章都有可能被针对，连大神都不能避免，甚至有公开撕逼、针锋相对的，太可怕了🤣。