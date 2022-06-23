# Coupon 优惠券

<code src="./demo1.tsx"></code>

<code src="./demo2.tsx"></code>

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| couponStyle | 券样式 | `'text01' \| 'text02' \| 'image'` | `'text01'` |
| couponLayout | 券布局 | `'single' \| 'double'` | `'single'` |
| couponKindShowVo | 券信息(中台返回) | `CouponKindShowVo` | - |
| couponStatus | 券状态 | `'can_receive' \| 'receiving' \| 'received' \| 'to_use' \| 'over' \| 'tomorrow'` | `can_receive` |
| couponImageUrl | 券图片地址(券样式是图片样式时有效) | `string` | - |
| onClick | 点击事件 | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>, couponKindShowVo: CouponKindShowVo) => void` | - |

## CouponKindShowVo

| 属性           | 说明             | 类型        | 默认值 |
| -------------- | ---------------- | ----------- | ------ |
| catalog        | 券类型           | `number`    | -      |
| name           | 券名称           | `string`    | -      |
| realm          | 券适用范围       | `string`    | -      |
| conditiondesc  | 券适用条件描述   | `string`    | -      |
| subtitle       | 券副标题         | `string`    | -      |
| amount         | 券金额           | `string`    | -      |
| delaydays      | 券延迟生效天数   | `number`    | -      |
| expirationdays | 券有效天数(相对) | `number`    | -      |
| availablefrom  | 券生效开始时间   | `number`    | -      |
| availableto    | 券生效结束时间   | `number`    | -      |
| taglist        | 券标签           | `Taglist[]` | -      |

## Taglist

| 属性 | 说明       | 类型     | 默认值 |
| ---- | ---------- | -------- | ------ |
| type | 券标签类型 | `string` | -      |
| text | 券标签名称 | `string` | -      |

## CSS 变量

| 属性                          | 说明           | 默认值                                        |
| ----------------------------- | -------------- | --------------------------------------------- |
| --coupon-theme-color          | 券主题颜色     | `#ff1a34`                                     |
| --coupon-background-color     | 券背景颜色     | `#fff6f7`                                     |
| --coupon-tag-background-color | 券标签背景颜色 | `linear-gradient(to right, #ff644d, #ff3819)` |

## 自定义颜色

| --coupon-theme-color | --coupon-background-color | --coupon-tag-background-color                 |
| -------------------- | ------------------------- | --------------------------------------------- |
| `#ff3819`            | `#fff6f1`                 | `linear-gradient(to right, #ff654d, #ff3819)` |
| `#19baff`            | `#f2fbff`                 | `linear-gradient(to right, #4dc9ff, #19baff)` |
| `#28bf13`            | `#f7fff6`                 | `linear-gradient(to right, #4abf39, #28bf13)` |
| `#711aff`            | `#faf7ff`                 | `linear-gradient(to right, #904dff, #711aff)` |
