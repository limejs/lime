
# CONTRIBUTE 指南

## 工作流程

1. Fork 本仓库到你的 github 账户。LIME.JS 的主仓库 master 分支是 `protected` 的，不允许直接 push。

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

    发起 pull request 与官方讨论合并。向 master 分支发起 pull request，会自动触发 [Travis-CI](https://travis-ci.org/limejs/lime) 的构建行为。

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

## 代码规范

代码规范采用 [STANDARD] 标准 JavaScript 编码规范，基于 [ESLINT](http://eslint.cn/) 实现代码规范检测。

开发阶段，推荐使用 [VSCODE](https://code.visualstudio.com/) 编辑器进行开发，也可以使用同类编辑器或IDE，如 ATOM、Sublime 等，下面推荐几个 VSCODE 相关的 `插件/扩展`，其他编辑器请自行搜索同类插件。

* [vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)。提供了 ESLINT 规则的自动检查和提示，亦可配置为 `Auto Fix on Save`，即保存时自动执行 `eslint --fix`。
* [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)。提供基于 `.editorconfig` 配置的自动缩进和格式化
* [editorconfiggenerator](https://marketplace.visualstudio.com/items?itemName=nepaul.editorconfiggenerator)。提供 `editorconfig generator` 的 VSCODE 命令，从而可以帮助你在新建的项目中快速生成一份配置

我们通过 `git pre-commit` 钩子约束代码规范。

## Git 提交信息规范

Git 提交信息规范是指的 `git commit` 时所填写的描述信息，规范书写这个信息不仅能保证团队之间正确传达提交的内容，而且对持续集成、持续部署过程中有效地触发构建或生成 `CHANGELOG` 都有帮助。

我们这里遵循 [这份提交惯例](https://www.conventionalcommits.org/zh/v1.0.0-beta.4/#%E7%BA%A6%E5%AE%9A%E5%BC%8F%E6%8F%90%E4%BA%A4%E8%A7%84%E8%8C%83) 来进行 `COMMIT MESSAGE` 的规范化。

在 LIME 源码的 git hook 中，已经通过 [husky](https://github.com/typicode/husky) 约束了提交行为。以上规范被配置在 LIME 项目源码的 `.commitlintrc.js` 中，具体规则如下:

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [0], // 不校验scope类型
    'scope-empty': [0], // 不校验scope是否设置
    'subject-min-length': [2, 'always', 5], // 描述至少5个字符
    'subject-case': [0, 'never'], // 不校验描述的字符格式
    'type-enum': [
      2,
      'always',
      [
        'publish', // 发布npm包
        'build', // 构建
        'ci', // ci
        'chore', // Other changes that don't modify src or test files. 改变构建流程、或者增加依赖库、工具等
        'docs', // Adds or alters documentation. 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
        'feat', // Adds a new feature. 新增feature
        'fix', // Solves a bug. 修复bug
        'perf', // Improves performance. 优化相关，比如提升性能、体验
        'refactor', // Rewrites code without feature, performance or bug changes. 代码重构，没有加新功能或者修复bug
        'revert', // Reverts a previous commit. 回滚到上一个版本
        'style', // Improves formatting, white-space. 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
        'test', // Adds or modifies tests. 测试用例，包括单元测试、集成测试等
      ],
    ],
  },
}

```

## 文档编写规范

无论是 README 还是 WIKI 等文档，必须采用 [markdown](https://daringfireball.net/projects/markdown/syntax) 编写，网络上有大量的 [教程](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) 可供学习。

请严格按照 [中文文案排版指北](https://github.com/mzlogin/chinese-copywriting-guidelines) 所提供的规范进行中文文档编写。
