# CountDown 倒计时

<code src="./demo.tsx"></code>

## 属性

| 属性        | 说明                 | 类型                             | 默认值     |
| ----------- | -------------------- | -------------------------------- | ---------- |
| time        | 倒计时时长，单位毫秒 | `number`                         | `0`        |
| format      | 时间格式             | `string`                         | `HH:mm:ss` |
| autoStart   | 是否自动开始倒计时   | `boolean`                        | `true`     |
| millisecond | 是否开启毫秒级渲染   | `boolean`                        | `false`    |
| finish      | 倒计时结束时触发     | `() => void`                     | -          |
| change      | 倒计时变化时触发     | `(current: CurrentTime) => void` | -          |
| render      | 自定义倒计时样式     | `(current: CurrentTime) => void` | -          |

## format 格式

| 格式 | 说明         |
| ---- | ------------ |
| DD   | 天数         |
| HH   | 小时         |
| mm   | 分钟         |
| ss   | 秒数         |
| S    | 毫秒（1 位） |
| SS   | 毫秒（2 位） |
| SSS  | 毫秒（3 位） |

## CurrentTime 格式

| 名称         | 说明                   | 类型     |
| ------------ | ---------------------- | -------- |
| total        | 剩余总时间（单位毫秒） | `number` |
| days         | 剩余天数               | `number` |
| hours        | 剩余小时               | `number` |
| minutes      | 剩余分钟               | `number` |
| seconds      | 剩余秒数               | `number` |
| milliseconds | 剩余毫秒               | `number` |

## 手动控制

通过 ref 获取到组件实例后，可以调用 `start`、`pause`、`reset` 方法。

| 方法  | 说明       | 类型                           |
| ----- | ---------- | ------------------------------ |
| start | 开始倒计时 | `() => void`                   |
| pause | 暂停倒计时 | `() => void`                   |
| reset | 重置倒计时 | `(totalTime?: number) => void` |
