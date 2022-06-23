import React, { FC, useMemo } from 'react'
import classNames from 'classnames'

import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'

import CouponText01Style from './coupon-text01-style'
import CouponText02Style from './coupon-text02-style'
import CouponImageStyle from './coupon-image-style'

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

type CouponStyle = 'text01' | 'text02' | 'image'

export type CouponProps = {
  /**
   * 券样式, 默认 'txt01'
   * 'txt01'   - 文字01样式
   * 'txt02'   - 文字02样式
   * 'image' - 图片样式
   */
  couponStyle?: CouponStyle
  /**
   * 券布局, 默认 'single'
   * 'single' - 通栏布局
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
   * 券图片地址(券样式是图片样式时有效)
   */
  couponImageUrl?: string
  /**
   * 点击事件
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, couponKindShowVo: CouponKindShowVo) => void
} & NativeProps<'--coupon-theme-color' | '--coupon-background-color' | '--coupon-tag-background-color'>

const defaultProps = {
  couponStyle: 'text01',
  couponLayout: 'single',
  couponStatus: 'can_receive'
}

export const Coupon: FC<CouponProps> = p => {
  const props = mergeProps(defaultProps, p)

  const backgroundDisabled = useMemo(() => {
    return props.couponStyle !== 'image' && (props.couponStatus === 'over' || props.couponStatus === 'tomorrow')
  }, [props.couponStatus, props.couponStyle])

  const handlerClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (props.couponStatus === 'can_receive' || props.couponStatus === 'to_use') {
      props.onClick?.(event, props.couponKindShowVo)
    }
  }

  const renderCouponStyle = (couponStyle: CouponStyle) => {
    switch (couponStyle) {
      case 'text01':
        return <CouponText01Style {...props} />
      case 'text02':
        return <CouponText02Style {...props} />
      case 'image':
        return <CouponImageStyle {...props} />
    }
  }

  return withNativeProps(
    props,
    <div
      className={classNames(classPrefix, `${classPrefix}-${props.couponStyle} ${classPrefix}-${props.couponLayout}`, {
        [`${classPrefix}-disabled`]: backgroundDisabled
      })}
      onClick={handlerClick}
    >
      {renderCouponStyle(props.couponStyle)}
    </div>
  )
}
