# 知乎日报 - 阅读器 [![Dependency Status](https://david-dm.org/nonoroazoro/Zhihu-Daily-Reader/develop.svg?style=flat-square)](https://david-dm.org/nonoroazoro/Zhihu-Daily-Reader/develop)

知乎日报官方不提供 Web 版，只能自己动手了。

> 离线：自动离线知乎日报（可配置），无法访问 Internet 时也能用咯。

> 快捷键：类似 Google Reader 的 `j/k/v/o/enter` 当然还有 `方向键`，你懂的（按下 `shift+?` 或 `h` 可查看快捷键列表）。

> 用户认证：可配置为需帐号登录（默认关闭）。

> 支持：`Firefox/Chrome/IE11`。没测 `Opera`，应该可以。

> 不支持：移动端（请用知乎官方客户端）。


## 声明

> 本应用使用了知乎日报非正式公开 API，使用与共享之行为或有侵犯知乎权益的嫌疑，因此**请自行部署**使用，请您暸解相关情况，并遵守知乎协议。


## 技术栈

- **front-end**: [react](http://facebook.github.io/react/)
- **back-end**: [node](https://nodejs.org)、[express](http://expressjs.com/)、[passport](https://github.com/jaredhanson/passport)、[mongodb](https://www.mongodb.org/)
- **linter**: [eslint](http://eslint.org/)、[eslint-config-zoro](https://github.com/nonoroazoro/eslint-config-zoro)
- **logging**: [bunyan](https://github.com/trentm/node-bunyan)
- **bundle**: [webpack](https://webpack.github.io/)
- **ci**: [travis](https://travis-ci.org/)、[mocha](https://mochajs.org/)、[should](https://github.com/shouldjs/should.js)
- **deploy**: [docker](https://www.docker.com/)、[docker-compose](https://docs.docker.com/compose/)


## 使用方法

1. **install docker**

    1. install [docker-engine](https://docs.docker.com/engine/installation/).

    1. install [docker-compose](https://docs.docker.com/compose/install/).

1. **clone from git**

    ```bash
    git clone https://github.com/nonoroazoro/Zhihu-Daily-Reader.git`
    ```

1. **disable auth**

    默认开启了用户认证（导致你们无法登录），请务必修改 `./config/production.json` 为：

    ```json
    {
        "enable_auth": false
    }
    ```

1. **config**

    1. Standard

        1. **install dependencies**

            1. install node.js: [https://nodejs.org](https://nodejs.org)

            1. install npm packages

                ```bash
                cd Zhihu-Daily-Reader && npm install --production
                ```

            1. install mongodb (*可选。不装的话会自动关闭数据库相关功能*)：[https://www.mongodb.org/downloads](https://www.mongodb.org/downloads)

        1. **start app**

            ```bash
            npm start
            ```

        1. browse: http://localhost:8888

    1. Docker

        1. 部署到 Raspberry Pi

            1. 端口默认为 `8888`，可在 `docker-compose.rpi.yml` 中修改，例如：

                ```yaml
                ports:
                    - "9999:8888"
                ```

            1. *（可选）* 离线数据目录默认为当前目录下的 `db`，可在 `docker-compose.rpi.yml` 中修改，例如：

                ```yaml
                volumes:
                    - ./myDataFolder:/data/db
                ```

            1. start app

                ```bash
                docker-compose up -f docker-compose.rpi.yml -d
                ```

            1. browse: http://localhost:8888

        1. 部署到 DaoCloud

            1. 创建新项目（使用之前 clone 的代码）

            1. 在项目的`流程定义`中指定 `Dockerfile` 为 `Dockerfile.daocloud`，并构建镜像

            1. *（可选）* 在`服务集成`中申请 `MongoDB` 服务

            1. 创建应用（可在此绑定之前申请的 `MongoDB` 服务）

            1. browse: DaoCloud 为您提供的地址


## 更新记录

### <a href="#v1.3.1" id="v1.3.1">1.3.1</a>

2017 年 3 月 8 日

- 支持部署到 Raspberry Pi。
- 支持部署到 DaoCloud（支持其 mongodb 服务集成）。
- 调整在不用分辨率设备下的表现。


### <a href="#v1.3.0" id="v1.3.0">1.3.0</a>

2016 年 9 月 7 日

- Docker 化。


### <a href="#v1.2.0" id="v1.2.0">1.2.0</a>

2016 年 8 月 30 日

- 修正 mongodb 启动问题。
- 增加用户登录认证（默认关闭）。


### <a href="#v1.1.5" id="v1.1.5">1.1.5</a>

2016 年 6 月 6 日

- 调整主界面样式。
- 增加阅读界面的“上/下一篇”功能。
- 更新截图。
- 修正几处潜在错误。


### <a href="#v1.1.4" id="v1.1.4">1.1.4</a>

2016 年 4 月 13 日

- 添加键盘快捷键帮助：`Shift+?` 或 `h` 打开帮助面板。
- 服务启动时延迟启动爬虫。
- 修复几处关于知乎外链的错误。
- 嵌入的外链视频在 Firefox 中无法正常播放，待解决。


### <a href="#v1.1.3" id="v1.1.3">1.1.3</a>

2016 年 4 月 9 日

- 修复正文内容外链出现重复的 bug。
- 修改正文内容外链，默认在新窗口打开。
- 前端全部迁到 ES6 + ES7 Stage-0。
- 更新 webpack 配置。
- 嵌入的外链视频目前还不能正常播放，待解决。


### <a href="#v1.1.2" id="v1.1.2">1.1.2</a>

2015 年 12 月 22 日

- 修正启动脚本（Windows/Mac/Linux）。
- 修改默认端口为 `8888`。


### <a href="#v1.1.1" id="v1.1.1">1.1.1</a>

2015 年 12 月 15 日

- 增加离线功能，无法访问 Internet 时也能用啦（需安装[Mongodb](https://www.mongodb.org/downloads)）。
- 离线功能可选，无需进行特殊设置（全自动）。
- 其他细节优化，不想列出来了。


### <a href="#v1.0" id="v1.0">1.0</a>

2015 年 8 月 14 日

- 初版，包含知乎日报基本阅读功能。


## 截图

- **主界面**：

  ![主界面](./screenshots/1.jpg?raw=true)

- **阅读界面**：

  ![阅读界面](./screenshots/2.jpg?raw=true)

- **快捷键**：

  ![阅读界面](./screenshots/3.jpg?raw=true)
