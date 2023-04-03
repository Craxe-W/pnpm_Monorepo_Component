## ActivityRule 活动规则

<code src="./demo.tsx"></code>

| 属性                   | 说明               | 类型              | 默认值             |
| ---------------------- | ------------------ | ----------------- | ------------------ |
| visible                | 是否可见 Poup      | `boolean`         | `-`                |
| position               | 指定排列顺序       | `boolean`         | `-`                |
| activityRuleStyleClass | 活动规则字体样式   | ``                | `-`                |
| clickButtonStyleClass  | Poup 中按钮样式    | ``                | `-`                |
| bodyClassName          | Poup 内容区域类名  | ``                | `yh-bottom-dialog` |
| activityRule           | 活动规则数据       | `string`          | `-`                |
| ruleTitle              | Poup 中头部        | `string`          | `活动规则`         |
| onClick                | 点击活动规则事件   | `() => void`      | `-`                |
| onClickButton          | 点击 poup 按钮     | `() => void`      | `-`                |
| onMaskClick            | 点击蒙层           | `() => void`      | `-`                |
| afterClose             | 弹框完全关闭后触发 | `() => void`      | `-`                |
| afterShow              | 弹框完全展示后触发 | `() => void`      | `-`                |
| children               | 前端自定义规则     | `React.ReactNode` | `-`                |
