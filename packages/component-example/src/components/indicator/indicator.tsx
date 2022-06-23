import React, { FC } from 'react'

import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'

const classPrefix = 'market-indicator'

export type IndicatorProps = {
  /**
   * 尺寸
   */
  size?: number
  /**
   * 颜色
   */
  color?: string
  /**
   * 背景颜色
   */
  bgColor?: string
  /**
   * 粗细
   */
  borderWidth?: number
} & NativeProps

const defaultProps = {
  size: 16,
  color: '#ff1a34',
  bgColor: '#eee',
  borderWidth: 5
}

const DIAMETER = 62

export const Indicator: FC<IndicatorProps> = p => {
  const props = mergeProps(defaultProps, p)

  const indicatorStyle = {
    width: props.size,
    height: props.size
  }

  const half = DIAMETER / 2
  const r = half - props.borderWidth / 2

  return withNativeProps(
    props,
    <div className={classPrefix} style={indicatorStyle}>
      <svg className={`${classPrefix}-svg`} viewBox={`${DIAMETER / 2} ${DIAMETER / 2} ${DIAMETER} ${DIAMETER}`}>
        <circle cx={DIAMETER} cy={DIAMETER} r={r} fill='none' stroke={props.bgColor} strokeWidth={props.borderWidth} />
        <circle
          className={`${classPrefix}-circle`}
          cx={DIAMETER}
          cy={DIAMETER}
          r={r}
          fill='none'
          stroke={props.color}
          strokeWidth={props.borderWidth}
        />
      </svg>
    </div>
  )
}
