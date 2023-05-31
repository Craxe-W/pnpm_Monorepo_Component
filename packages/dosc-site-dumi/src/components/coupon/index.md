# Coupon 优惠券

<code src="./demo1.tsx"></code>

<code src="./demo2.tsx"></code>

## 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| couponStyle | 券样式 | `'style01' \| 'style02'` | `'style01'` |
| couponLayout | 券布局(仅 style01 支持) | `'single' \| 'double'` | `'single'` |
| couponKindShowVo | 券信息(中台返回) | `CouponKindShowVo` | - |
| couponStatus | 券状态 | `'can_receive' \| 'receiving' \| 'received' \| 'to_use' \| 'over' \| 'tomorrow'` | `can_receive` |
| onClick | 点击事件 | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>, couponKindShowVo: CouponKindShowVo) => void` | - |

## CouponKindShowVo

| 属性           | 说明                                                                        | 类型        | 默认值 |
| -------------- | --------------------------------------------------------------------------- | ----------- | ------ |
| catalog        | 券类型(1-现金券、3-满减券、4-赠品券、6-折扣券、7-商品兑换券、10-线下印花券) | `number`    | -      |
| name           | 券名称                                                                      | `string`    | -      |
| realm          | 券适用范围                                                                  | `string`    | -      |
| conditiondesc  | 券适用条件描述                                                              | `string`    | -      |
| subtitle       | 券副标题                                                                    | `string`    | -      |
| amount         | 券金额                                                                      | `string`    | -      |
| delaydays      | 券延迟生效天数                                                              | `number`    | -      |
| expirationdays | 券有效天数(相对)                                                            | `number`    | -      |
| availablefrom  | 券生效开始时间                                                              | `number`    | -      |
| availableto    | 券生效结束时间                                                              | `number`    | -      |
| taglist        | 券标签                                                                      | `Taglist[]` | -      |

## Taglist

| 属性 | 说明       | 类型     | 默认值 |
| ---- | ---------- | -------- | ------ |
| type | 券标签类型 | `string` | -      |
| text | 券标签名称 | `string` | -      |
