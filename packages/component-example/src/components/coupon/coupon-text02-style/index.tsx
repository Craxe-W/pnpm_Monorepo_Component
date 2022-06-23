import React, { FC, useMemo } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import isArray from 'lodash/isArray'

import { CouponKindShowVo } from '..'
import { COUPONS_TYPE } from '../enums'

const classPrefix = 'market-coupon-text02'
import './index.less'

type Props = {
  couponKindShowVo: CouponKindShowVo
  couponLayout: 'single' | 'double'
  couponStatus: 'can_receive' | 'receiving' | 'received' | 'to_use' | 'over' | 'tomorrow'
}

const CouponText02Style: FC<Props> = props => {
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

  const renderInfo = () => {
    if (props.couponLayout === 'single') {
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
              <div className={`${classPrefix}-condition market-one-line-ellipsis`}>
                {props.couponKindShowVo.subtitle}
              </div>
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
                <span className={`${classPrefix}-amount market-one-line-ellipsis`}>
                  {props.couponKindShowVo.amount}
                </span>
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
          <div className={`${classPrefix}-info-right`}>
            <div className={`${classPrefix}-split-line`} />
            {renderInfoRight()}
          </div>
        </>
      )
    } else if (props.couponLayout === 'double') {
      const renderInfo = () => {
        const giftCoupon = () => {
          return (
            <>
              <div className={`${classPrefix}-coupon-mame market-one-line-ellipsis`}>{props.couponKindShowVo.name}</div>
              <div className={`${classPrefix}-time market-one-line-ellipsis`}>{time}</div>
            </>
          )
        }

        const discountCoupon = () => {
          return (
            <>
              <div className={`${classPrefix}-discount market-one-line-ellipsis`}>
                {props.couponKindShowVo.conditiondesc}
              </div>
              <div className={`${classPrefix}-condition market-one-line-ellipsis`}>
                {props.couponKindShowVo.subtitle}
              </div>
              <div className={`${classPrefix}-realm market-one-line-ellipsis`}>{props.couponKindShowVo.realm}</div>
            </>
          )
        }

        const stampCoupon = () => {
          return (
            <>
              <div className={`${classPrefix}-coupon-mame market-one-line-ellipsis`}>{props.couponKindShowVo.name}</div>
              <div className={`${classPrefix}-realm market-one-line-ellipsis`}>{props.couponKindShowVo.realm}</div>
            </>
          )
        }

        const defaultCoupon = () => {
          return (
            <>
              <div className={`${classPrefix}-amount-wrapper`}>
                <span className={`${classPrefix}-symbol`}>￥</span>
                <span className={`${classPrefix}-amount market-one-line-ellipsis`}>
                  {props.couponKindShowVo.amount}
                </span>
              </div>
              <div className={`${classPrefix}-condition market-one-line-ellipsis`}>
                {props.couponKindShowVo.conditiondesc}
              </div>
              <div className={`${classPrefix}-realm market-one-line-ellipsis`}>{props.couponKindShowVo.realm}</div>
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

      return <>{renderInfo()}</>
    }
  }

  return (
    <>
      <div className={classNames(`${classPrefix}-info`)}>{renderInfo()}</div>
      {tag && <div className={`${classPrefix}-tag market-one-line-ellipsis`}>{tag}</div>}
      <div className={`${classPrefix}-notch`}></div>
    </>
  )
}

export default CouponText02Style
