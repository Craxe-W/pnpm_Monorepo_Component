import { defineConfig } from 'dumi';
const path = require('path');
const components = [
  '/components/coupon',
  '/components/indicator',
  '/components/carousel',
  '/components/count-down',
  '/components/skeleton',
  '/components/css3',
  '/components/activity-rule',
];

const logo =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K';
export default defineConfig({
  title: '营销移动端业务组件',
  mode: 'site',
  favicon: logo,
  logo: logo,
  outputPath: 'dist',
  // publicPath: './',
  // history: {
  //   type: 'hash',
  // },
  hash: true,
  themeConfig: {
    hd: {
      rules: [],
    },
  },
  //侧边菜单
  menus: {
    '/components': [
      {
        title: '业务组件',
        children: components,
      },
    ],
  },
  //横向导航
  navs: [
    {
      title: '组件',
      path: '/components',
    },
    {
      title: '其他',
      path: '链接是可选的',
      children: [
        { title: '第一项', path: 'https://d.umijs.org' },
        { title: '第二项', path: '/guide' },
      ],
    },
    {
      title: 'GitHub',
      path: 'https://github.com/umijs/dumi',
    },
  ],
  alias: {
    demos: path.resolve(process.cwd(), '/src/demos/index.ts'),
  },
  chainWebpack(memo, { env, webpack }) {
    memo.module.rule('js').include.add(path.resolve(process.cwd(), '../component-example/src'));
  },
});
