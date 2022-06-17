# 基于 pnpm 配置 Monorepo 搭建一个 Component

## 基本配置

#### 1.安装 pnpm

```bash
npm install -g pnpm
```

#### 2.创建一个文件夹或者自己新建一个 github 项目 并且在内部新建一个 package 文件夹

```
├─ packages
│  ├─ dom1-packages // 组件仓库
│  └─ dom1-packages-dumi // 站点仓库
```

#### 3.配置 pnpm-workspace 文件

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

#### 5.配置 dumi 添加站点

https://d.umijs.org/zh-CN/guide#%E6%9E%84%E5%BB%BA%E5%8F%8A%E9%83%A8%E7%BD%B2

```bash
npx @umijs/create-dumi-app
or
pnpm create @umijs/dumi-app
```

#### 6.修改 dumi package 中的一些引入的其他的包（样式的可以在全局公共中添加）

```bash
#我个人是仅剩下他这个

"devDependencies": {
    "dumi": "^1.0.13"
  }
```

```bash
prism-react-renderer   代码高亮
prismjs                代码高亮
qrcode.react           二维码
rimraf                 清空dist组件


//举个例子 如果这个button会用到react的版本跟其他版本不一样的话 我们就可以在最外层package.json中
//使用 dependenciesMeta  然后 针对button 这个组件设置 "injected": true 也就是告诉button使用版本跟当前//
//package一样  这两个 貌似是属于互相关联的关系

"dependenciesMeta": {
    "button": {
      "injected": true
    }
  }

pnpm init 不传参了
以前我们可以 pnpm init -y 去实现快速 init 一个包，现在因为 script 的 argv 被完全传递，需要用 pnpm init -- -y ，所以我们的解法是以后不使用 pnpm init 了，直接回归到 npm init -y 即可，或者手动创建一个 package.json 。

monorepo 不能在 submodule (workspace) 里 init 了
monorepo 场景下，比如创建一个 packages/app 项目，此时 package/app 里面是空的，需要先把 package.json 创建出来，所以我们需要用 pnpm init -y ，现在无论如何都不能被 pnpm init 出来：

ERR_PNPM_PACKAGE_JSON_EXISTS  package.json already exists

pnpm init -- -y 也无法生效，必须使用 npm init -y ，以后忘掉 pnpm init 即可。
```

```
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
