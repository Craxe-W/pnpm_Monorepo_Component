import React, { FC } from 'react'
import classNames from 'classnames'

import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'

import CouponStyle01 from './coupon-style01'
import CouponStyle02 from './coupon-style02'

const classPrefix = 'market-coupon'

export type CouponKindShowVo = {
  /**
   * 券类型
   */
  catalog: number
  /**
   * 券名称
   */
  name: string
  /**
   * 券适用范围
   */
  realm?: string
  /**
   * 券适用条件描述
   */
  conditiondesc?: string
  /**
   * 券副标题
   */
  subtitle?: string
  /**
   * 券金额
   */
  amount?: number
  /**
   * 券延迟生效天数
   */
  delaydays?: number
  /**
   * 券有效天数(相对)
   */
  expirationdays?: number
  /**
   * 券生效开始时间
   */
  availablefrom?: number
  /**
   * 券生效结束时间
   */
  availableto?: number
  /**
   * 券标签
   */
  taglist?: Array<{ type: string; text: string; imgurl?: string }>
}

type CouponStyle = 'style01' | 'style02'

export type CouponProps = {
  /**
   * 券样式, 默认 'style01'
   */
  couponStyle?: CouponStyle
  /**
   * 券布局, 默认 'single'
   * 'single'  - 通栏布局
   * 'double'  - 两列布局
   */
  couponLayout?: 'single' | 'double'
  /**
   * 中台返回的券信息
   */
  couponKindShowVo: CouponKindShowVo
  /**
   * 券状态
   * 'can_receive'  - 可领取
   * 'receiving'    - 领取中
   * 'received'     - 已领取
   * 'to_use'       - 去使用
   * 'over'         - 已抢光
   * 'tomorrow'     - 明天再来
   */
  couponStatus?: 'can_receive' | 'receiving' | 'received' | 'to_use' | 'over' | 'tomorrow'
  /**
   * 点击事件
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, couponKindShowVo: CouponKindShowVo) => void
} & NativeProps<'--coupon-theme-color' | '--coupon-background-color' | '--coupon-tag-background-color'>

const defaultProps = {
  couponStyle: 'style01',
  couponLayout: 'single',
  couponStatus: 'can_receive'
}

export const Coupon: FC<CouponProps> = p => {
  const props = mergeProps(defaultProps, p)

  const handlerClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (props.couponStatus === 'can_receive' || props.couponStatus === 'to_use') {
      props.onClick?.(event, props.couponKindShowVo)
    }
  }

  const renderCouponStyle = (couponStyle: CouponStyle) => {
    switch (couponStyle) {
      case 'style01':
        return <CouponStyle01 {...props} />
      case 'style02':
        return <CouponStyle02 {...props} />
    }
  }

  return withNativeProps(
    props,
    <div
      className={classNames(
        classPrefix,
        `${classPrefix}-${props.couponStyle} ${classPrefix}-${props.couponLayout} ${classPrefix}-${props.couponStatus}`
      )}
      onClick={handlerClick}
    >
      {renderCouponStyle(props.couponStyle)}
    </div>
  )
}
