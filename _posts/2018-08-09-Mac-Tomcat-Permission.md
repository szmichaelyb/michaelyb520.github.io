---
layout: post
title:  Mac中Tomcat之startup.sh拒绝访问的问题
author: Michael
Date: 2018-08-09 10:29:00 +8000
Categories: Java开发
tags: Tomcat
---

今天在Mac上启动Tomcat，结果弹出：`-bash: ./startup.sh: Permission denied` 的提示。

这是因为用户没有权限，而导致无法执行。用命令 `chmod `修改一下 `bin` 目录下的.sh权限就可以了。

```bash
chmod u+x *.sh
```

![Mac-Tomcat-Permission ](/assets/images/2018/Mac-Tomcat-Permission .png)

### 命令解释：

- `u`： 这里指文件所有者
- `+x`： 添加可执行权限
- `*.sh`：表示所有的sh文件