---
layout: post
title:  Android中WebView无法打开HTTPS链接
author: Michael
Date: 2018-08-08 10:47:00 +8000
Categories: Android开发
tags: Android-WebView
---

### Android使用WebView加载https地址打不开的问题

> 在做项目的时候遇到了 `webview` 怎么也访问不来https的接口，找了半天原因，上网查了帖子才知道，现在把原因分析写出来，和解决办法，让大家以后尽量避免这样的问题。
在 `Android` 中，`WebView`是用来  load `http` 和 `https` 网页到本地应用的控件。
在默认情况下，通过`loadUrl(String url)`方法，可以顺利load诸如，http://www.baidu.com 之类的页面。但是，当load有ssl层的https页面时，如 https://money.183.com.cn/， 如果这个网站的安全证书在 `Android` 无法得到认证，`WebView` 就会变成一个空白页，而并不会像PC浏览器中那样跳出一个风险提示框。因此，我们必须针对这种情况进行处理。

### 解决办法

```java
WebView webview = (WebView) findViewById(R.id.webview);
webView.setWebViewClient(new WebViewClient() {
    @Override
    public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
        // handler.cancel();// Android默认的处理方式，WebView变成空白页
        handler.proceed();  // 接受所有网站的证书
        // handleMessage(Message msg); // 进行其他处理
    }
});
```

注意：在重写 `WebViewClient` 的 `onReceivedSslError` 方法时，一定要去除`onReceivedSslError` 方法的 `super.onReceivedSslError(view, handler, error);`，否则设置无效。

代码中已经添加了这个方法，但是还是加载不成功，求高人解惑...

#### 后台提示：
```bash
EventHub.removeMessages(int what = 107) is not supported before the WebViewCore is set up.
```

#### 前台提示：
```bash
ssl server requires client certificate
```

### 解决方案

```java
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
    webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW); 
}
```