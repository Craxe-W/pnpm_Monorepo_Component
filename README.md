# 基于pnpm 配置Monorepo 搭建一个Component

## 基本配置
#### 1.安装pnpm
```bash
npm install -g pnpm
```

#### 2.创建一个文件夹或者自己新建一个github项目 并且在内部新建一个package文件夹
```
├─ packages
│  ├─ dom1-packages // 组件仓库
│  └─ dom1-packages-dumi // 站点仓库
```

#### 3.配置pnpm-workspace文件
```bash
#pnpm-workspace.yaml
packages:
  # root directory
  - "."
  # all packages in subdirs of packages/
  - "packages/**"
  # exclude packages that are inside test/ directories
  - "!**/test/**" # '!' means exclude
```
#### 4.初始化项目
```bash
pnpm init
```

#### 5.配置dumi 添加站点
https://d.umijs.org/zh-CN/guide#%E6%9E%84%E5%BB%BA%E5%8F%8A%E9%83%A8%E7%BD%B2
```bash
npx @umijs/create-dumi-app
or
pnpm create @umijs/dumi-app
```

#### 6.修改dumi package中的一些引入的其他的包（样式的可以在全局公共中添加）
```bash
#我个人是仅剩下他这个

"devDependencies": {
    "dumi": "^1.0.13"
  }
```
