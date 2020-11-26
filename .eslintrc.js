module.exports = {
  root: true,
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false
    }],
    'comma-dangle': [2, 'never'],
    singleQuote: 0,

    'space-before-function-paren': 0,
    'no-unused-vars': 'warn', // 把该条提示信息转换成警告信息
    // 'space-before-function-paren': ['error', {
    //   anonymous: 'always',
    //   named: 'always',
    //   asyncArrow: 'always'
    // }],

    'no-undef': 'off',
    camelcase: 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
