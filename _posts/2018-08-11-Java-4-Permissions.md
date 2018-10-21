---
layout: post
title:  Java中的四种访问权限
author: Michael
Date: 2018-08-11 10:29:00 +8000
Categories: Java开发
tags: Java基础
---

### Java中4种访问权限的限制如下

| | pubic | protected | default | private |
| :------: | :------: | :------: | :------: | :------: |
| 同一类中的成员 | 是 | 是 | 是 | 是 |
| 同一包中的成员 | 是 | 是 | 是 | 否 |
| 不同包的子类 | 是 | 是 | 否 | 否 |
| 不同包的非子类 | 是 | 否 | 否 | 否 |

### 关于内部类
Java中有一个外部类中可包含多个内部类的概念，这位开发中一些属性安全访问带来了便捷。具体表现如下：
```java
public class OuterClass {
    private int a;
    // 说明一下，内部类，一般都会声明为 private，除非某些特殊情况
    private class InnerClassA {
        private int b;
        private int c;
    }
    
    priivate class InnerClassB {
        private int d;
    }
    
    // 某些情况下，还哦需要将内部类声明为静态内部类，是为了方便在
    // 外部类的静态方法中访问。
    // 因为静态方法中只能访问静态的成员变量、静态方法及静态内部类
    private static class InnerClassC {
        private int e;
    }
}
```

可以这么去理解，内部类其实也相当于外部类的一个成员变量。它和外部类的成员变量是同级别的。只不过，访问内部类的成员变量，需要通过内部类的实例或者类名访问(访问内部类的静态成员变量)。这样理解起来就不会觉得别扭！