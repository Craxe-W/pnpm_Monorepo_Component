# package.json 配置解析
https://juejin.cn/post/7145001740696289317#heading-11

```
files: 项目在进行 npm 发布时，可以通过 files 指定需要跟随一起发布的内容来控制 npm 包的大小，避免安装时间太长。
发布时默认会包括 package.json，license，README 和main 字段里指定的文件。忽略 node_modules，lockfile 等文件。

type: 在 node 支持 ES 模块后，要求 ES 模块采用 .mjs 后缀文件名。只要遇到 .mjs 文件，就认为它是 ES 模块。如果不想修改文件后缀，就可以在 package.json文件中，指定 type 字段为 module。 'type':"module"

main: 项目发布时，默认会包括 package.json，license，README 和main 字段里指定的文件，因为 main 字段里指定的是项目的入口文件，在 browser 和 Node 环境中都可以使用。

module: 项目也可以指定 ES 模块的入口文件，这就是 module 字段的作用。

types 或者 typings:  指定 TypeScript 的类型定义的入口文件, 一些第三方库或应用在进行某些内部处理时会依赖这些字段，使用它们时需要安装对应的第三方库。


sideEffects: 显示设置某些模块具有副作用，用于 tree-shaking 优化。

publishConfig:  顾名思义，publishConfig 就是 npm 包发布时使用的配置。 比如在安装依赖时指定了 registry 为 taobao 镜像源，但发布时希望在公网发布，就可以指定 publishConfig.registry。
如："publishConfig": {
  "registry": "https://registry.npmjs.org/"
}

repository： 项目的仓库地址以及版本控制信息。


```
