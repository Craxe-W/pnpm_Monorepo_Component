import React, { FC } from 'react'
import classNames from 'classnames'
import { Image } from 'antd-mobile'
import Indicator from '../../indicator'

import couponBackgroundImage from '../../../assets/images/coupon-bg.png'
import './index.less'

const classPrefix = 'market-coupon-image'

type Props = {
  couponStatus: 'can_receive' | 'receiving' | 'received' | 'to_use' | 'over' | 'tomorrow'
  couponImageUrl?: string
}

const CouponImageStyle: FC<Props> = props => {
  return (
    <>
      <Image
        lazy
        src={props.couponImageUrl}
        placeholder={<img className={`${classPrefix}-placeholder`} src={couponBackgroundImage} />}
        fallback={<img className={`${classPrefix}-placeholder`} src={couponBackgroundImage} />}
        style={{ height: '100%' }}
      />

      {props.couponStatus === 'receiving' && (
        <div className={`${classPrefix}-mask`}>
          <Indicator borderWidth={6} />
        </div>
      )}

      {props.couponStatus === 'received' && (
        <div className={`${classPrefix}-mask`}>
          <div className={classNames(`${classPrefix}-stamp`, `${classPrefix}-stamp-received`)} />
          <div className={`${classPrefix}-tip`}>请至“红包礼券”中使用</div>
        </div>
      )}

      {props.couponStatus === 'to_use' && (
        <div className={`${classPrefix}-mask`}>
          <div className={classNames(`${classPrefix}-stamp`, `${classPrefix}-stamp-received`)} />
          <div className={`${classPrefix}-button`}>去使用</div>
        </div>
      )}

      {(props.couponStatus === 'over' || props.couponStatus === 'tomorrow') && (
        <div className={`${classPrefix}-mask`}>
          <div className={classNames(`${classPrefix}-stamp`, `${classPrefix}-stamp-${props.couponStatus}`)} />
        </div>
      )}
    </>
  )
}

export default CouponImageStyle
