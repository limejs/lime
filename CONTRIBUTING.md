
# CONTRIBUTE 指南

## 工作流程

1. Fork 本仓库到你的 github 账户

2. 克隆你 Fork 的仓库到本地

3. 在本地项目中新建一个 feature 或 bugfix 分支

4. 安装 LIME 内核的依赖

    ```bash
    cd lime
    npm install
    ```

5. 启动示例项目

    ```bash
    npm start
    ```

    修改框架核心代码，示例项目会自动监测代码保存并重启

6. vscode debug:

    遇到难以排查的问题，可以通过 vscode 的 debug 功能进行调试。其底层会调用 `npm run debug 命令启动 Node.js 调试服务器

7. unit test

    LIME 通过编写严格的单元测试保证框架质量，请保证修改的框架代码都编写并且通过了单元测试。LIME 在 github 使用 `travis-ci` 进行持续集成

    ```bash
    npm run test
    ```

8. pull request

    发起 pull request 与官方讨论合并

9. publish

    LIME 通过发布 npm 包的方式提供给用户使用，包名为 `@limejs/core`。所有官方插件放置在 `@limejs` 命名空间下。发布 npm 时仅发布运行时代码，包括:

    ```js
    "files": [
      "index.js",
      "lib",
      "mvc",
      "example",
      "doc"
    ]
    ```

    其中 doc 和 example 是为了方便用户在本地查看或调试框架代码
