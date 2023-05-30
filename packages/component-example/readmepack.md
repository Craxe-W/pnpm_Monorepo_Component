```
{
  "name": "component-example",
  "version": "1.0.0",
  "description": "营销移动端业务组件",
  "scripts": {
    "gulp": "gulp"
  },
  //字符串数组，表示这个项目包的关键词
  "keywords": [],
  //作者信息
  "author": "",
  //许可证
  "license": "ISC",
  //files 配置是一个数组，用来描述当把 npm 包作为依赖包安装时需要说明的文件列表
  "files": [
    "./lib"
  ],
  //指定入口
  "main": "./cjs/index.js",
  //module 字段可以定义 npm 包的 ESM 规范的入口文件
  "module": "./src/index.ts",
  "types": "./es/index.d.ts",
  //字段用来指定 TypeScript 的入口文件：
  "typings": "./es/index.d.ts",
  "sideEffects": [
    "**/*.css",
    "**/*.less",
    "./es/index.js",
    "./src/index.ts",
    "./es/global/index.js",
    "./src/global/index.ts"
  ],
  "devDependencies": {
    "autoprefixer": "^10.4.14",
    "del": "6.1.1",
    "gulp": "^4.0.2",
    "gulp-babel": "^8.0.0",
    "gulp-less": "^5.0.0",
    "gulp-postcss": "^9.0.1",
    "gulp-typescript": "^6.0.0-alpha.1",
    "through2": "^4.0.2"
  },
  "dependencies": {
    "@types/react": "^18.0.31",
    "antd-mobile": "^5.28.2",
    "classnames": "^2.3.2",
    "dayjs": "^1.11.7",
    "react": "^18.2.0"
  }
}


```
