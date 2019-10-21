// eslint配置文件
module.exports = {
  // 要启用的环境
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  // 启用 airbnb 规则
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    // 'airbnb-base',
  ],
  globals: {
    // Vue: false,
    // weex: false,
    // window: false,
    '@': false,
  },
  // parser: 'babel-eslint',
  // extends: 'airbnb-base',
  // plugins: ['html'],
  // 使用语言及版本
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  // 个人自定义规则
  rules: {
    // 'indent': ['error', 4], // 缩进 单位:空格
    'linebreak-style': 0, // 不校验换行符
    'semi': ['error', 'never'], // 不使用分号
    'no-debugger': 0, // 不校验debugger
    'no-console': 0, // 不校验console
    'no-new': 0, // new Vue要用
    'no-underscore-dangle': 0, // 可使用下划线命名
    'prefer-promise-reject-errors': 0, // reject不强制Error
    // 'no-restricted-globals': 0, // 禁用特定的全局变量
    'no-param-reassign': 0, // 不允许对 function 的参数进行重新赋值
    'no-extend-native': 0, // 禁止扩展原生对象
    // 'consistent-return': 0, // 要求 return 语句要么总是指定返回的值，要么不指定
    // 'no-multi-assign': 0, // 不允许在单个语句中使用多个分配
    // 'no-unused-expressions': 0, // 禁止出现未使用过的表达式
    // 'object-shorthand': 0, // 强制对象字面量缩写语法
    // 'func-names': 0, // 函数表达式必须有名字
    // 'no-plusplus': 0, // 禁止使用++，--
    // 'array-callback-return': 0, // 强制数组方法的回调函数中有 return 语句
    // 'no-nested-ternary': 0, // 不允许使用嵌套的三元表达式
    // 'operator-linebreak': [2, 'before', { 'overrides': { '||': 'after' } }],
    // 'class-methods-use-this': ['error', { 'exceptMethods': ['myMethod'] }], // 强制类方法使用 this
    'import/prefer-default-export': 0, // 禁用强制使用默认导出
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }], // 禁止引入未添加到依赖中的库
    'max-len': [0, 80, 4],//字符串最大长度
  },
}
