---
layout: post
title:  Android中HTTP网络请求相关问题
author: Michael
Date: 2018-08-09 10:27:00 +8000
Categories: Android开发
tags: Android-HTTP
---

> Google表示，为保证用户数据和设备的安全，针对下一代 Android 系统(Android P) 的应用程序，将要求默认使用加密连接，这意味着 Android P 将禁止 App 使用所有未加密的连接，因此运行 Android P 系统的安卓设备无论是接收或者发送流量，未来都不能明码传输，需要使用下一代(Transport Layer Security)传输层安全协议，而 Android Nougat 和 Oreo 则不受影响。

因此在Android 中 使用HttpUrlConnection进行http请求会出现以下异常：

```bash
W/System.err: java.io.IOException: Cleartext HTTP traffic to **** not permitted
```

使用OKHttp请求则出现：

```bash
java.net.UnknownServiceException: CLEARTEXT communication ** not permitted by network security policy
```

在Android P系统的设备上，如果应用使用的是非加密的明文流量的http网络请求，则会导致该应用无法进行网络请求，https则不会受影响，同样地，如果应用嵌套了webview，webview也只能使用https请求。

有人认为 Android P 上所有的 App 都需要使用 TLS 加密会降低上网体验，事实上这是一种误解，至于 App 对于少数旧服务器的连接如果非要使用明码传输，开发者需要更改 App 的网络安全配置以允许此类连接。

### 有以下三种解决方案

- APP改用https请求

- argetSdkVersion 降到27以下

- 在 res 下新增一个 xml 目录，然后创建一个名为：network_security_config.xml 文件（名字自定） ，内容如下，大概意思就是允许开启http请求。

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <network-security-config>
      <base-config cleartextTrafficPermitted="true" />
  </network-security-config>
  ```

  然后在APP的AndroidManifest.xml文件下的application标签增加以下属性。

  ```xml
  <application
  ...
   android:networkSecurityConfig="@xml/network_security_config"
  ...
  />
  ```

### 相关参考链接
- [Protecting users with TLS by default in Android P]([https://android-developers.googleblog.com/2018/04/protecting-users-with-tls-by-default-in.html ](https://android-developers.googleblog.com/2018/04/protecting-users-with-tls-by-default-in.html))
- [DNS over TLS support in Android P Developer Preview](https://android-developers.googleblog.com/2018/04/dns-over-tls-support-in-android-p.html)
- [Android 8: Cleartext HTTP traffic not permitted](https://stackoverflow.com/questions/45940861/android-8-cleartext-http-traffic-not-permitted)
- [网络安全性配置](https://developer.android.com/training/articles/security-config#CleartextTrafficPermitted)

### 网络其他方案描述

> 从Android 9开始，需要根据网络全进行相关配置(According to Network security configuration )。
> Starting with Android 9.0 (API level 28), cleartext support is disabled by default.

- 方案1
  - Create file res/xml/network_security_config.xml
    ```xml
    <?xml version="1.0" encoding="utf-8"?>
		<network-security-config>
    		<domain-config cleartextTrafficPermitted="true">
        		<domain includeSubdomains="true">Your URL(ex: 127.0.0.1)</domain>
        	</domain-config>
		</network-security-config>
    ```
  - 在AndroidManifest.xml增加一项配置
    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <manifest ...>
    	<uses-permission android:name="android.permission.INTERNET" />
    	<application
    		...
    		android:networkSecurityConfig="@xml/network_security_config"
    		...>
    		...
    	</application>
    </manifest>
    ```
- 方案2
  在AndroidManifest.xml中设置`android:usesCleartextTraffic="true"`即可。
  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <manifest ...>
  	<uses-permission android:name="android.permission.INTERNET" />
  	<application
  		...
  		android:usesCleartextTraffic="true"
  		...>
  		...
  	</application>
  </manifest>
  ```
  但这样设置会有一个问题，具体见下面：
  > Also as @david.s' answer pointed out android:targetSandboxVersion can be a problem too.
  > According to Manifest Docs：
  > `android:targetSandboxVersion`
  > The target sandbox for this app to use. The higher the sandbox version number, the higher the level of security. Its default value is 1; you can also set it to 2. Setting this attribute to 2 switches the app to a different SELinux sandbox. The following restrictions apply to a level 2 sandbox:
  > - The default value of usesCleartextTraffic in the Network Security Config is false.
  > - Uid sharing is not permitted.
- 方案3
  如果在`<manifest>`中有配置`android:targetSandboxVersion`，将其减少到1.
  即在 AndroidManifest.xml 文件中：
  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <manifest android:targetSandboxVersion="1">
  	<uses-permission android:name="android.permission.INTERNET" />
  	...
  </manifest>
  ```