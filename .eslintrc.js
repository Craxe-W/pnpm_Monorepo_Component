module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'unicorn'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'no-var': 'error',
    'no-console': 'off',
    //禁止重新分配“const”变量
    'no-const-assign': 'error',
    //不允许在定义变量之前使用它们
    'no-use-before-define': 'warn',
    //不允许function嵌套块中的变量或声明。
    'no-inner-declarations': 'off',
    // 禁止在“函数”定义中出现重复参数
    'no-dupe-args': 'error',
    //禁止重复的模块导入
    'no-duplicate-imports': 'error',

    //unicorn 独角兽的配置规范 感觉没生效啊
    //通过使正则表达式更短、一致和更安全来改进它们。
    'unicorn/better-regex': 'error',
    //首选 JavaScript 模块 (ESM) 而不是 CommonJS.
    'unicorn/prefer-module': 'off',
    //防止缩写
    'unicorn/prevent-abbreviations': 'off',
    //对文件名强制使用大小写样式。
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          // 中划线
          kebabCase: true,
          // 小驼峰
          camelCase: true,
          // 下划线
          snakeCase: false,
          // 大驼峰
          pascalCase: true
        }
      }
    ],
    //不要使用可替换为 for-of 循环的 for 循环
    'unicorn/no-for-loop': 'warn',
    //Prefer .addEventListener() and .removeEventListener() over on-functions
    'unicorn/prefer-add-event-listener': [
      'error',
      {
        excludedPackages: ['koa', 'sax']
      }
    ],
    //Prefer .querySelector() over .getElementById(), .querySelectorAll() over .getElementsByClassName() and .getElementsByTagName().
    'unicorn/prefer-query-selector': 'error',
    //禁止使用 null 文字.
    'unicorn/no-null': 'off',
    //禁止使用 Array#reduce() 和 Array#reduceRight()
    'unicorn/no-array-reduce': 'off',
    // 将函数定义移动到可能的最高范围
    'unicorn/consistent-function-scoping': 'off',

    //@typescript-eslint 规范
    //禁止不必要的构造函数
    '@typescript-eslint/no-useless-constructor': 'error',
    //禁止空函数
    '@typescript-eslint/no-empty-function': 'warn',
    //不允许使用 require 语句，除了在 import 语句中
    '@typescript-eslint/no-var-requires': 'off',
    //需要函数和类方法的显式返回类型
    '@typescript-eslint/explicit-function-return-type': 'off',
    //需要导出函数和类的公共类方法的显式返回和参数类型
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    //在定义之前禁止使用变量
    '@typescript-eslint/no-use-before-define': 'error',
    //禁止未使用的变量
    '@typescript-eslint/no-unused-vars': 'off',
    //禁止声明空接口
    '@typescript-eslint/no-empty-interface': 'warn',
    //禁止@ts-<directive>使用评论或在指令后要求描述
    '@typescript-eslint/ban-ts-comment': 'warn',
    //禁止使用特定类型
    '@typescript-eslint/ban-types': 'warn',
    //禁止使用该any类型
    '@typescript-eslint/no-explicit-any': 'off',
    //禁止不必要的分号
    '@typescript-eslint/no-extra-semi': 'off',

    //react规范  https://www.jianshu.com/p/339bdb463964?tdsourcetag=s_pcqq_aiomsg
    //防止在react组件定义中缺少props验证
    'react/prop-types': 'warn',
    //组件定义时需要定义组件名称
    'react/display-name': 'warn',
    //限制文件扩展名
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', 'ts', '.jsx', 'js'] }],
    //验证属性缩进
    'react/jsx-indent-props': ['error', 2],
    //验证缩进
    'react/jsx-indent': ['error', 2],
    //限制单行的表达式数量
    'react/jsx-one-expression-per-line': 'off',
    //组件中强制要求结构赋值
    'react/destructuring-assignment': 'off',

    //react-hooks 规范
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
}
