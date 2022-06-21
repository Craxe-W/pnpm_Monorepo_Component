# 基于 pnpm 配置 Monorepo 搭建一个 Component

## 启动项目流程

### 安装 pnpm

```bash
npm install -g pnpm
```

### 安装依赖

```bash
pnpm install
```

### 启动项目

```bash
pnpm start
```

## 基本配置过程

### 1.安装 pnpm

```bash
npm install -g pnpm
```

### 2.创建一个文件夹或者自己新建一个 github 项目 并且在内部新建一个 package 文件夹

```
├─ packages
│  ├─ dom1-packages // 组件仓库
│  └─ dom1-packages-dumi // 站点仓库
```

### 3.配置 pnpm-workspace 文件

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

### 4.初始化项目

```bash
pnpm init
```

### 5.配置 dumi 添加站点 在 dom1-packages-dumi 文件内执行

https://d.umijs.org/zh-CN/guide#%E6%9E%84%E5%BB%BA%E5%8F%8A%E9%83%A8%E7%BD%B2

```bash
npx @umijs/create-dumi-app
or
pnpm create @umijs/dumi-app
```

### 6.修改 dumi package 中的一些引入的其他的包（样式的可以在全局公共中添加）

```bash
#我个人是仅剩下他这个

"devDependencies": {
    "dumi": "^1.0.13"
  }
```

### 7.在根目录下安装对应的 node_module 包

```
pnpm install
```

### 8.在根 package.json 配置启动命令

```
## 注意这是7.0之后的写法，7.0之前的还是pnpm start --F xxxxxx的写法
"scripts": {
    "start": "pnpm --F dosc-site-dumi start",
    "build": "pnpm build --F dosc-site-dumi"
  },
```

### 9.初始化其他 package 下的文件

```
npm init -y
```

至于这里为啥用 npm 解答：

- pnpm init 不传参了
- 以前我们可以 pnpm init -y 去实现快速 init 一个包，现在因为 script 的 argv 被完全传递，需要用 pnpm init -- -y ，所以我们的解法是以后不使用 pnpm init 了，直接回归到 npm init -y 即可，或者手动创建一个 package.json 。 monorepo 不能在 submodule (workspace) 里 init 了
- monorepo 场景下，比如创建一个 packages/app 项目，此时 package/app 里面是空的，需要先把 package.json 创建出来，所以我们需要用 pnpm init -y ，现在无论如何都不能被 pnpm init 出来：
- ERR_PNPM_PACKAGE_JSON_EXISTS  package.json already exists
- pnpm init -- -y 也无法生效，必须使用 npm init -y ，以后忘掉 pnpm init 即可

```bash
prism-react-renderer   代码高亮
prismjs                代码高亮
qrcode.react           二维码
rimraf                 清空dist组件
```

### 10.开始配置组件 package 内容

这部分 因为是组件且只是一个库 这里只需要一个

```
├─ packages
│  ├─ component-example // 组件仓库
│  │  │─ LICENSE
│  │  ├─ README.md
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ assets
│  │  │  │  └─ images
│  │  │  ├─ components // 各组件代码
│  │  │  │  └─ indicator
│  │  │  │     ├─ index.ts
│  │  │  │     ├─ indicator.less
│  │  │  │     └─ indicator.tsx
│  │  │  ├─ global
│  │  │  │  ├─ font.less
│  │  │  │  ├─ global.less
│  │  │  │  ├─ index.ts
│  │  │  │  └─ theme.less
│  │  │  ├─ index.ts
│  │  │  └─ utils
│  │  └─ tsconfig.json
│  └─ dosc-site-dumi // 站点仓库
```

这里面 components 是我们编写组件库 的地方，index.ts 则是我们最后抛出组件的地方

```bash
import './global';

export { default as Carousel } from './src/components/carousel';

```

### 11.剩下开始添加 dumi 模版、添加各种插件满足功能等

### 遇到的问题

##### 1.pnpm6.x 升级到 7.x 后启动失败的问题

```text
问题点：有一个命令可以在 pnpm 6.x 上正确执行，但 7.x 不能 #4652
pnpm_monorepo_component@ start /Users/wang_sir/code/YongHuiChaoShi/other_code/pnpm_Monorepo_Component
> pnpm start --F dosc-site-dumi


> pnpm_monorepo_component@ start /Users/wang_sir/code/YongHuiChaoShi/other_code/

pnpm_Monorepo_Component
> pnpm start --F dosc-site-dumi "--F" "dosc-site-dumi"
> pnpm_monorepo_component@ start /Users/wang_sir/code/YongHuiChaoShi/other_code/pnpm_Monorepo_Component
> pnpm start --F dosc-site-dumi "--F" "dosc-site-dumi" "--F" "dosc-site-dumi"
> pnpm_monorepo_component@ start /Users/wang_sir/code/YongHuiChaoShi/other_code/pnpm_Monorepo_Component
> pnpm start --F dosc-site-dumi "--F" "dosc-site-dumi" "--F" "dosc-site-dumi" "--F" "dosc-site-dumi"
```

通过 github 查找对应的解答内容

```text
解答：
我们在 v7 中更改了 run 命令的工作方式。脚本名称之后的所有内容都传递给脚本。

所以不要使用：

"dev": "pnpm run dev --stream --parallel --filter {packages}",
利用

"dev": "pnpm run --stream --parallel --filter {packages} dev",
或者

"dev": "pnpm --stream --parallel --filter {packages} run dev",
发布页面的相关报价：

使用 pnpm run <script> 时，脚本名称后的所有命令行参数现在都传递给脚本的 argv，甚至 --。例如， pnpm run echo --hello --world 现在将 --hello --world 传递给 echo 脚本的 argv。以前标记的参数（例如 --silent）被解释为 pnpm 参数，除非 -- 出现在它之前。
```

#### 2.我创建好了 dumi 但是在引入我的 component——example 的时候 一直报我 component——example 文件内 TS 报错

我犯的错误：

- 咱们的组件库也就是 component-example 是不存在 webpack 文件的 而解析我们 TS 文件包括 JS、less 文件全都依赖于我们 dumi 站点中的配置 所以 我应该第一时间在 dumi 上找下问题解决方案

* 解答：

- dumi 提供的.umirc.ts 文件中是支持我们去处理 webpack 的，所以 我们去查看文档可以知道有这么一个配置内容 chainWebpack 所以 我们可以通过这里对我们的内容进行处理

```
chainWebpack(memo, { env, webpack }) {
    memo.module.rule('js').include.add(path.resolve(process.cwd(), '../component-example/src'));
  },
```
