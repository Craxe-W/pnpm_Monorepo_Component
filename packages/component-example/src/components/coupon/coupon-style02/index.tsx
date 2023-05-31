import React, { FC, useMemo } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import isArray from 'lodash/isArray'

import Indicator from '../../indicator'
import { CouponKindShowVo } from '..'
import { COUPONS_TYPE } from '../enums'

const classPrefix = 'market-coupon-style02'
import './index.less'

type Props = {
  couponKindShowVo: CouponKindShowVo
  couponStatus: 'can_receive' | 'receiving' | 'received' | 'to_use' | 'over' | 'tomorrow'
}

const CouponStyle02: FC<Props> = props => {
  const time = useMemo(() => {
    let t = ''
    if (props.couponKindShowVo.delaydays) {
      t = `领取后${props.couponKindShowVo.delaydays}天开始生效`
    } else if (props.couponKindShowVo.expirationdays || props.couponKindShowVo.expirationdays === 0) {
      t = `领取后${props.couponKindShowVo.expirationdays === 0 ? '当' : props.couponKindShowVo.expirationdays}天有效`
    } else {
      const from = dayjs(props.couponKindShowVo.availablefrom).format('YYYY.MM.DD')
      const to = dayjs(props.couponKindShowVo.availableto).format('YYYY.MM.DD')
      t = `${from}-${to}`
    }
    return t
  }, [
    props.couponKindShowVo.availablefrom,
    props.couponKindShowVo.availableto,
    props.couponKindShowVo.delaydays,
    props.couponKindShowVo.expirationdays
  ])

  const tag = useMemo(() => {
    let t = ''
    const taglist = props.couponKindShowVo.taglist

    if (isArray(taglist) && taglist.length) {
      const filterTaglist = taglist.filter(list => list && list.text)
      t = filterTaglist.length ? filterTaglist[0].text : ''
    }

    return t
  }, [props.couponKindShowVo.taglist])

  const buttonText = useMemo(() => {
    const couponStatus = props.couponStatus
    switch (couponStatus) {
      case 'received':
        return '已领取'
      case 'to_use':
        return '去使用'
      case 'over':
        return '已抢光'
      case 'tomorrow':
        return '明天再来'
      default:
        return '领取'
    }
  }, [props.couponStatus])

  const renderInfo = () => {
    const renderInfoLeft = () => {
      const giftCoupon = () => {
        return (
          <div className={`${classPrefix}-coupon-mame market-one-line-ellipsis`}>{props.couponKindShowVo.name}</div>
        )
      }

      const discountCoupon = () => {
        return (
          <>
            <div className={`${classPrefix}-discount market-one-line-ellipsis`}>
              {props.couponKindShowVo.conditiondesc}
            </div>
            <div className={`${classPrefix}-condition market-one-line-ellipsis`}>{props.couponKindShowVo.subtitle}</div>
          </>
        )
      }

      const stampCoupon = () => {
        return (
          <div className={`${classPrefix}-coupon-mame market-one-line-ellipsis`}>{props.couponKindShowVo.name}</div>
        )
      }

      const defaultCoupon = () => {
        return (
          <>
            <div className={`${classPrefix}-amount-wrapper`}>
              <span className={`${classPrefix}-symbol`}>￥</span>
              <span className={`${classPrefix}-amount market-one-line-ellipsis`}>{props.couponKindShowVo.amount}</span>
            </div>
            <div className={`${classPrefix}-condition market-one-line-ellipsis`}>
              {props.couponKindShowVo.conditiondesc}
            </div>
          </>
        )
      }

      const { catalog } = props.couponKindShowVo
      switch (catalog) {
        case COUPONS_TYPE.GIFT:
          return giftCoupon()
        case COUPONS_TYPE.DISCOUNT:
          return discountCoupon()
        case COUPONS_TYPE.STAMP:
          return stampCoupon()
        default:
          return defaultCoupon()
      }
    }

    const renderInfoRight = () => {
      const defaultCoupon = () => {
        return (
          <>
            <div className={`${classPrefix}-realm market-two-line-ellipsis`}>{props.couponKindShowVo.realm}</div>
            <div className={`${classPrefix}-time market-one-line-ellipsis`}>{time}</div>
            <div className={`${classPrefix}-tag market-one-line-ellipsis`}>{tag}</div>
          </>
        )
      }

      const { catalog } = props.couponKindShowVo
      switch (catalog) {
        default:
          return defaultCoupon()
      }
    }

    return (
      <>
        <div className={`${classPrefix}-info-left`}>{renderInfoLeft()}</div>
        <div className={`${classPrefix}-info-right`}>{renderInfoRight()}</div>
      </>
    )
  }

  return (
    <>
      <div className={`${classPrefix}-content`}>
        <div className={`${classPrefix}-info`}>{renderInfo()}</div>
        <div className={`${classPrefix}-button-wrap`}>
          <div
            className={classNames(`${classPrefix}-button`, {
              [`${classPrefix}-button-txt-opacity`]: props.couponStatus === 'received'
            })}
          >
            {props.couponStatus === 'receiving' ? (
              <Indicator borderWidth={6} />
            ) : (
              <div className={`${classPrefix}-button-txt market-one-line-ellipsis`}>{buttonText}</div>
            )}
          </div>
        </div>
        <div className={`${classPrefix}-notch`}></div>
      </div>
    </>
  )
}

export default CouponStyle02
