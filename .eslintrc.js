module.exports = {
  env: {
    browser: true, // 开启浏览器全局变量
    node: true, // 开启 node 全局变量
    es6: true, // 开启 es6 全局变量 如 Set
    jquery: true, // jquery 全局变量
    mocha: true, // mocha 全局变量
  },
  globals: {
    logger: true
  },
  extends: ['standard'],
  rules: {
    semi: ['error', 'never'],
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
}
