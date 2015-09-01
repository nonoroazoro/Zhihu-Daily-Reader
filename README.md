# 知乎日 - 报阅读器

知乎日报官方不提供 Web 版，你妹的，那就做一个吧。
> 快捷键：类似 Google Reader，`j/k/v` 什么你懂的。

> 支持：`Firefox/Chrome/IE11`。没测 `Opera`，应该可以。

## 申明

> 本应用使用了知乎日报非正式公开 API，使用与共享之行为或有侵犯知乎权益的嫌疑，因此请自行部署使用，请您暸解相关情况，并遵守知乎协议。

## 介绍

- **后端**：`Node`、`Express`（目前还没用数据库，后续更新）
- **前端**：`React`
- **打包**：`Webpack`

## 用法

    # clone from git
    $ git clone https://github.com/nonoroazoro/Zhihu-Daily-Reader.git

    # install dependencies
    $ cd Zhihu-Daily-Reader && npm install

    # method 1:
    # start server
    $ npm run start
    # open zhihu-daily-reader via http://localhost:3000/ or http://127.0.0.1:3000/

    # method 2 (only for windows):
    $ start.bat

## 更新历史

###<a href="#v1.0" id="v1.0">1.0</a>

2015年8月14日

- 初版，包含知乎日报基本阅读功能。