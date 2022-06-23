import { useRef, useState } from 'react'
import { raf, cancelRaf, inBrowser } from '../utils/request-animation-frame'

type UseCountDownOptions = {
  time: number
  millisecond?: boolean
  onFinish?: () => void
  onChange?: (current: CurrentTime) => void
}

export type CurrentTime = {
  /**
   * 剩余天数
   */
  days: number
  /**
   * 剩余小时
   */
  hours: number
  /**
   * 剩余总时间（单位毫秒）
   */
  total: number
  /**
   * 剩余分钟
   */
  minutes: number
  /**
   * 剩余秒数
   */
  seconds: number
  /**
   * 剩余毫秒
   */
  milliseconds: number
}

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

function parseTime(time: number): CurrentTime {
  const days = Math.floor(time / DAY)
  const hours = Math.floor((time % DAY) / HOUR)
  const minutes = Math.floor((time % HOUR) / MINUTE)
  const seconds = Math.floor((time % MINUTE) / SECOND)
  const milliseconds = Math.floor(time % SECOND)

  return {
    total: time,
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  }
}

function isSameSecond(time1: number, time2: number) {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000)
}

const useCountDown = (options: UseCountDownOptions) => {
  const rafId = useRef<number>(0)
  const endTime = useRef<number>(0)
  const counting = useRef<boolean>(false)
  const remain = useRef<number>(options.time)
  const [current, setCurrent] = useState(parseTime(remain.current))

  const getCurrentRemain = () => Math.max(endTime.current - Date.now(), 0)

  const pause = () => {
    counting.current = false
    rafId.current && cancelRaf(rafId.current)
  }

  const setRemain = (value: number) => {
    remain.current = value
    setCurrent(parseTime(remain.current))
    options.onChange?.(parseTime(value))

    if (value === 0) {
      pause()
      options.onFinish?.()
    }
  }

  const microTick = () => {
    rafId.current = raf(() => {
      if (counting.current) {
        setRemain(getCurrentRemain())

        if (remain.current > 0) {
          microTick()
        }
      }
    })
  }

  const macroTick = () => {
    rafId.current = raf(() => {
      if (counting.current) {
        const remainRemain = getCurrentRemain()

        if (!isSameSecond(remainRemain, remain.current) || remainRemain === 0) {
          setRemain(remainRemain)
        }

        if (remain.current > 0) {
          macroTick()
        }
      }
    })
  }

  const tick = () => {
    if (!inBrowser) {
      return
    }

    if (options.millisecond) {
      microTick()
    } else {
      macroTick()
    }
  }

  const start = () => {
    if (!counting.current) {
      endTime.current = Date.now() + remain.current
      counting.current = true
      tick()
    }
  }

  const reset = async (totalTime: number = options.time) => {
    pause()
    remain.current = totalTime
    setCurrent(parseTime(remain.current))
  }

  return {
    start,
    pause,
    reset,
    current
  }
}

export default useCountDown
