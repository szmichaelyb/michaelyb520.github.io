---
layout: post
title:  Android 8.0 的填坑（透明的activity崩溃）
author: Michael
Date: 2018-08-10 10:29:00 +8000
Categories: Android开发
tags: Android开发
---

### 透明的activity 不能继续使用

> java.lang.RuntimeException:Unable to start activity ComponentInfo{net.maipeijian.xiaobihuan/com.etop.EtoVinActivity}: java.lang.IllegalStateException: Only fullscreen activities can request orientation

#### 原因是：

sdk27版本使用

> if targetSdkVersion is >=27 ( > android.os.Build.VERSION_CODES.O) you get this error, they have changed[ActivityRecord](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Faosp-mirror%2Fplatform_frameworks_base%2Fblob%2Fmaster%2Fservices%2Fcore%2Fjava%2Fcom%2Fandroid%2Fserver%2Fam%2FActivityRecord.java)in latest Android version adding this:

```java
void setRequestedOrientation(int requestedOrientation) {
	if (ActivityInfo.isFixedOrientation(requestedOrientation) && !fullscreen && appInfo.targetSdkVersion > O) {
		throw new IllegalStateException("Only fullscreen activities can request orientation");
		....
	}
}
```

#### 解决办法：

1. **targetSdkVersion <=26 即可**

   原因是sdk27版本使用：

   > if targetSdkVersion is >=27 ( > android.os.Build.VERSION_CODES.O) you get this error, they have changed [ActivityRecord](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Faosp-mirror%2Fplatform_frameworks_base%2Fblob%2Fmaster%2Fservices%2Fcore%2Fjava%2Fcom%2Fandroid%2Fserver%2Fam%2FActivityRecord.java) in latest Android version adding this:

   ```java
   void setRequestedOrientation(int requestedOrientation) {
   	if (ActivityInfo.isFixedOrientation(requestedOrientation) && !fullscreen && appInfo.targetSdkVersion > O) {
   		throw new IllegalStateException("Only fullscreen activities can request orientation");
   		....
   	}
   }
   ```

2. **不需要使用坚屏的不要使用如下代码**

   设置锁定坚屏`setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);`  或者  `android:screenOrientation="portrait"`。

3. **这种方式有点low  可是暂时过渡方案（判断版本号设置主题）**

   ```java
   // 8.1不能使用透明主题
   if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES. O) {
   	this.setTheme(R.style.A); // 不透明
   } else {
   	this.setTheme(R.style.B); // 透明主题
   }
   ```

   如果使用该方法：

   - 设置主题代码放在  onCreate方法中的：`super.onCreate(savedInstanceState);`
   - 设置主题代码（setTheme）:`setContentView(R.layout.activity);`
   - manifest 中activity不要使用设置主题代码：`android:theme="@style/NoTitleDialog"`

源码移步[我的GitHub](https://github.com/guodu/PersonDemo)

