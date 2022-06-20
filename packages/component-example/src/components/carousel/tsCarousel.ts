import { ReactElement } from 'react';
import { NativeProps } from '../../utils/native-props';

export type SwiperProps = {
  page: number;
  /** * 初始位置  */
  defaultIndex?: number;
  /** * 是否允许手势滑动  */
  allowTouchMove?: boolean;
  /** * 是否自动切换  */
  autoplay?: boolean;
  /** * 自动切换的间隔，单位为 ms  */
  autoplayInterval?: number;
  /** 变换时间 */
  duration?: number;
  /** * 是否循环  */
  loop?: boolean;
  /** * 方向，默认是水平方向  */
  direction?: 'horizontal' | 'vertical';
  /** * 切换时触发	  */
  onIndexChange?: (index: number) => void;
  rubberband?: boolean;
  /** * 子元素  */
  children?: ReactElement | ReactElement[];
} & NativeProps<'--height' | '--width' | '--border-radius' | '--track-padding'>;

export interface CarouseTouch {
  /** 滑动时间 */
  touchStartTime: number;
  /** 起始点位置 */
  start: number;
  /** 滑动的大小 */
  delta: number;
}
