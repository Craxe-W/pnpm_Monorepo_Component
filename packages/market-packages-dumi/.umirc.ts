import { defineConfig } from 'dumi';
const path = require('path')

export default defineConfig({
  title: '常用H5效果Code',
  mode: 'site', //default：doc ｜ site
  logo: 'https://image.yonghuivip.com/yh-market-packages/favicon.png',
  favicon: 'https://image.yonghuivip.com/yh-market-packages/favicon.png',
  history: {
    type: 'hash'
  },
  outputPath: 'dist',
  publicPath: './',
  hash: true,
  menus:{      // 仅在site模式下使用
    '/guide': [
      {
        title: '快速上手',
        path: '/guide/quick-start'
      },
      {
        title: '问题反馈',
        path: '/guide/feedback'
      },
      {
        title: '更新记录',
        path: '/guide/update-log'
      }
    ],
  },
  navs:[
    {
      title: '指南',
      path: '/guide'
    },
    {
      title: '组件',
      path: '/components'
    },
    {
      title: 'GitHub',
      path: 'https://github.com/Craxe-W/pnpm_Monorepo_Component'
    }
  ],
  themeConfig: {
    hd: {
      rules: []
    }
  },
  alias: {
    demos: path.resolve(process.cwd(), './src/demos/index.ts')
  },
});
