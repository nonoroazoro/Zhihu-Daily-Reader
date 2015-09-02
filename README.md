# 知乎日报 - 阅读器

知乎日报官方不提供 Web 版，你妹的，那就做一个吧。
> 快捷键：类似 Google Reader，`j/k/v` 当然还有方向键，你懂的。

> 支持：`Firefox/Chrome/IE11`。没测 `Opera`，应该可以。

## 声明

> 本应用使用了知乎日报非正式公开 API，使用与共享之行为或有侵犯知乎权益的嫌疑，因此请自行部署使用，请您暸解相关情况，并遵守知乎协议。

## 介绍

- **后端**：`Node`、`Express`（目前还没用数据库，后续更新）
- **前端**：`React`
- **打包**：`Webpack`

## 用法

*注：服务器端口默认`80`，可在 `./config/production.json` 中自行修改。*

**1.clone from git:**

	$ git clone https://github.com/nonoroazoro/Zhihu-Daily-Reader.git

**2.install dependencies:**

	$ cd Zhihu-Daily-Reader && npm install

**3.start app:**

- *windows:*

		# method 1:
		$ npm run start
		# visit http://localhost

		# method 2:
		$ start.bat

- *linux&mac:*

		$ npm run startx
		# visit http://localhost

## 更新历史

###<a href="#v1.0" id="v1.0">1.0</a>

2015年8月14日

- 初版，包含知乎日报基本阅读功能。

## 截图

- **主界面**：
![主界面](./screenshots/1.jpg?raw=true "主界面")

- **阅读界面**：
![阅读界面](./screenshots/2.jpg?raw=true "阅读界面")