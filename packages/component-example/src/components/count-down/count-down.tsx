import React, { forwardRef, useImperativeHandle, useMemo, useEffect } from 'react'

import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import useCountDown, { CurrentTime } from '../../hooks/useCountDown'
import { parseFormat } from './utils'

const classPrefix = 'market-count-down'

export type CountDownRef = {
  /**
   * 开始倒计时
   */
  start: () => void
  /**
   * 暂停倒计时
   */
  pause: () => void
  /**
   * 重置倒计时
   */
  reset: (totalTime?: number) => void
}

export type CountDownProps = {
  /**
   * 倒计时时长，单位毫秒
   */
  time?: number
  /**
   * 时间格式
   */
  format?: string
  /**
   * 是否自动开始倒计时
   */
  autoStart?: boolean
  /**
   * 是否开启毫秒级渲染
   */
  millisecond?: boolean
  /**
   * 倒计时结束时触发
   */
  finish?: () => void
  /**
   * 倒计时变化时触发
   */
  change?: (current: CurrentTime) => void
  /**
   * 自定义倒计时样式
   */
  render?: (current: CurrentTime) => React.ReactNode
} & NativeProps

const defaultProps = {
  time: 0,
  format: 'HH:mm:ss',
  autoStart: true,
  millisecond: false
}

export const CountDown = forwardRef<CountDownRef, CountDownProps>((p, ref) => {
  const props = mergeProps(defaultProps, p)

  const { start, pause, reset, current } = useCountDown({
    time: props.time,
    millisecond: props.millisecond,
    onFinish: () => props.finish?.(),
    onChange: current => props.change?.(current)
  })

  const timeText = useMemo(() => parseFormat(props.format, current), [current, props.format])

  useImperativeHandle(ref, () => ({
    start: () => start(),
    pause: () => pause(),
    reset: (totalTime?: number) => reset(totalTime)
  }))

  useEffect(() => {
    const resetTime = async () => {
      await reset(props.time)
      if (props.autoStart) {
        start()
      }
    }

    resetTime()

    return () => {
      pause()
    }
  }, [props.time])

  return withNativeProps(props, <div className={classPrefix}>{props.render ? props.render(current) : timeText}</div>)
})
