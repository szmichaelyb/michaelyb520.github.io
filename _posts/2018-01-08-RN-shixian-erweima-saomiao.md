---
layout: page
title:  Bootstrap栅格系统使用方法
author: Michael
Date: 2018-01-08 10:54:00 +8000
Categories: 跨平台开发
tags: 跨平台开发-RN
---

> 最近刚好在学习 React Native 想搞个扫描条形码，二维码的小应用，因为涉及硬件接口，而且自己本身并没有原生开发背景，踩了几个坑，记录一下。

## 扫描二维码

首先当然是 **google** 一下看看是否有现成的 **React Native** 库支持二维码，感谢最大的同性交友网站 **GitHub**，还真有两个：`react-native-camera` 和 `react-native-barcodescanner` 。

不过，各自都有一点问题，`react-native-camera` 主要是用来调用摄像头的，**Android / iOS** 都可以用，但是识别条形码的功能只有 **iOS** 有，而 `react-native-barcodescanner` 直接只支持 **Android**。于是为了方便，有人把这两个库搞到一起，弄了个 `react-native-barcode-scanner-universal` 。里面代码也比较简单，就是利用 **React Native** 根据不同平台会去读 <font color='red'> **xxx.ios.js** </font>或者<font color='red'> **xxx.android.js** </font>的原理，写一个公共的<font color='red'> **index.js** </font>然后分别调用不同平台的库。


```react
// index.js
module.exports = require("./BarcodeScanner");

// BarcodeScanner.android.js
import BarcodeScanner from "react-native-barcodescanner";
module.exports = BarcodeScanner;

// BarcodeScanner.ios.js
import Camera from "react-native-camera";
module.exports = Camera;
```

既然都打包好了，那我们就开始用 `react-native-barcode-scanner-universal` 这个库吧。
既然是要调用硬件 **API**，那肯定有原生代码在里面，需要把原生模块给链接到相应的原生项目中。
这里既可以手动，又可以使用一个叫 `rnpm` 的工具。

<hr/>

`rnpm` 的全名是<font color='red'> React Native Package Manager</font>，高大上有木有，主要就是用来把一些 React Native 库中用到的原生模块给添加到相应的原生项目中。

**安装比较简单**：

```bash****
npm install -g rnpm
```

**链接**：

```bash
rnpm link react-native-camera
rnpm link react-native-barcodescanner
```
这个最新版是 1.9.0，不过我链接的时候总是提示各种奇怪的问题，于是查了下，改成 1.5.5 版本就好了，如果你遇到新版报错有问题，可以尝试退到 1.5.5 版本试试。

还可以用手动链接的方法，参考：

[React Native Camera](https://github.com/lwansbrough/react-native-camera#manual-install)
[react-native-barcodescanner](https://github.com/ideacreation/react-native-barcodescanner#installation)

链接好之后，闲话不多说，直接写个 **View** 开搞，这里以 **iOS** 为主。


```react
import BarcodeScanner from 'react-native-barcode-scanner-universal'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Platform
} from 'react-native';

export default class ScanView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "None"
        };
        this._show = this._show.bind(this);
    }

    render() {
        let scanArea = null;
        if (Platform.OS === 'ios') {
            scanArea = (
                <View style={styles.rectangleContainer}>
                    <View style={styles.rectangle} />
                </View>
            )
        }
        return (
            <View>
                <Text style={ [{color:"red"},{fontSize:16}] }>{this.state.code}</Text>
                <BarcodeScanner
                    onBarCodeRead={ (code) => this._show(code)}
                    style={styles.camera}>
                    {scanArea}
                </BarcodeScanner>
            </View>
        )
    }

    _show(val) {
        this.setState({
            code:val.data
        })
    }
}

var styles = StyleSheet.create({
    camera: {
        flex: 1
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 250,
        width: 250,
        borderWidth: 2,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
    }
})
```

简单解释一下，就是一进来就开始扫，识别到东西就现实到上面的 `<Text>` 中去。
实际运行一下，由于要使用摄像头，这里电脑要连一个 iOS 设备。我用 Xcode 打开 React Native 工程，设置好使用真机调试。

点下运行按钮，结果报错了：`Code signing is required for product type 'xxxx' in SDK 'iOS 8.0'`。

宝宝，没搞过 iOS，宝宝心里苦。大意是说要什么什么签名，一般这种设置应该都在项目的公共设置里面吧，于是点了下项目文件，还真有个 `Signing`，于是添加了一堆东西进去。

![RN-iOS签名](http://upload-images.jianshu.io/upload_images/563374-90e817e0e8f49da6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

再点运行，又报错了： `Code signing is required for product type 'Unit Test Bundle' in SDK 'iOS 8.0'`。

这单元测试包是啥子，于是 **google** 一番，原来这个地方是可以下拉的，没文化真可怕：

![RN-iOS单元测试包](http://upload-images.jianshu.io/upload_images/563374-e7e0730ef3f434fe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

和上面那个一样，这里也是设置一番就好。其中要确认 `Code Signing Identity` 这一项不能是<font color='red'> *Don't Code Sign* </font>。

又一次按下运行键，这次显示构建成功，在 iOS 设备上信任了开发证书之后，打开程序，因为我是一打开程序就开始扫描的，于是 `Crash` 了。这时候 Xcode 控制台幽幽的飘出一个错误：

![Xcode控制台错误](http://upload-images.jianshu.io/upload_images/563374-bf420620915393c0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

简单来说：因为你想用敏感数据，又没有事先告诉我，所以我让你挂了，如果你想不挂，就去 Info.plist 里面按我说的添加点东西，说说你为什么要用这些数据。

多么友好的提示啊，于是就按照提示加加加，找到项目的 `Info.plist` 文件，右键选择 `Open As -> Source Code` ， 添加它说的东西，里面的文字就是每次新装应用弹的框提示要什么什么权限的：

![plist文件配置](http://upload-images.jianshu.io/upload_images/563374-c42ea69d8f71147c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这里顺便把访问照片库的权限也给加了。关于 iOS 加权限的可以参考 [这篇文章](http://www.jianshu.com/p/c212cde86877)。
之后让我再给个机会运行一下，同意一堆权限之后，终于看到摄像头画面了，试试扫一扫，还真成功了。

![RN-二维码扫描测试1](http://upload-images.jianshu.io/upload_images/563374-56eee45045556a77.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![RN-二维码扫描测试2](http://upload-images.jianshu.io/upload_images/563374-264b34ce838eba3e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 总结

总结一下，这次跌跌撞撞的经历

- 把库链接好；
- 把程序的签名弄好；
- 把该加的权限加号，虽然这里是用 iOS 做例子，可想而知，Android 一样要在 Gradle 文件里面弄一波权限；
- 了解原生开发很重要

**React Native** 的哲学是<font color='red'> **Learn once, write anywhere**</font>，实际使用下来，感觉却是<font color='red'> **Learn once, and learn others**</font>，也就是常说的<font color='red'>**『一专多长』**</font>。 既要学习 **React Native** 本身的内容，也要学习 **Android / iOS** 的知识，不说了，赶快去亚马逊上买本 OC 的书压压惊。

