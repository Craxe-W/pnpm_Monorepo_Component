import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  CSSProperties,
} from 'react';
import { NativeProps, withNativeProps } from '../../utils/native-props';
import { mergeProps } from '../../utils/with-default-props';
import { CarouselItem } from './carousel-item';

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
  // indicatorProps?: Pick<PageIndicatorProps, 'color' | 'style' | 'className'>
  /** * 指示器的相关属性	  */
  // indicatorProps?: any
  // /** * 自定义指示器	  */
  // indicator?: (total: number, current: number) => ReactNode
  /** * 滑块的宽度百分比  */
  // slideSize?: number
  // /** * 滑块轨道整体的偏移量百分比  */
  // trackOffset?: number
  // /** * 是否在边界两边卡住，避免出现空白，仅在非 loop 模式且 slideSize < 100 时生效  */
  // stuckAtBoundary?: boolean
  /** * 是否在拖动超出内容区域时启用橡皮筋效果，仅在非 loop 模式下生效  */
  rubberband?: boolean;
  /** * 子元素  */
  children?: ReactElement | ReactElement[];
} & NativeProps<'--height' | '--width' | '--border-radius' | '--track-padding'>;

interface CarouseTouch {
  /** 滑动时间 */
  touchStartTime: number;
  /** 起始点位置 */
  start: number;
  /** 滑动的大小 */
  delta: number;
}

const defaultProps = {
  page: 1,
  duration: 500,
  defaultIndex: 0, // 初始位置
  allowTouchMove: true, // 是否允许手势滑动
  autoplay: false, // 是否自动切换
  autoplayInterval: 3000, // 自动切换的间隔，单位为 ms
  loop: false, // 是否循环
  direction: 'horizontal', // 方向，默认是水平方向
  slideSize: 100, // 滑块的宽度百分比
  trackOffset: 0, // 滑块轨道整体的偏移量百分比
  stuckAtBoundary: true, // 是否在边界两边卡住，避免出现空白，仅在非 loop 模式且 slideSize < 100 时生效
  rubberband: true, // 是否在拖动超出内容区域时启用橡皮筋效果，仅在非 loop 模式下生效
};

const CarouselCurrection: FC<SwiperProps & { count: number; validChildren: Array<any> }> = (p) => {
  const props = mergeProps(defaultProps, p);
  const {
    page,
    duration,
    autoplay,
    autoplayInterval,
    loop,
    direction,
    defaultIndex,
    count,
    validChildren,
    allowTouchMove,
  } = props;
  /** 当前选中的DOM */
  const currentDom = useRef<number>(defaultIndex);
  // 大元素的Dom节点 用于获取元素的宽度或者高度
  const trackRef = useRef<HTMLDivElement>(null);
  // 状态  因为我是通过动画实现的 所以我要通过一个状态来决定我这个当前元素是否要进行触发动画
  const scrolling = useRef<boolean>(false);
  // 偏转状态 是按照X轴滑动还是Y轴滑动
  const isVertical = direction === 'vertical';
  // 通过ref绑定我的元素相对于通过state能每一次变换都能拿到 state拿不到
  const OffsetRef = useRef(0);
  // 通过ref绑定我元素的偏移量
  const [carouselOffset, setCarouselOffset] = useState(0);
  // DOM节点元素绑定  这个可以抽离
  const CarouselNode = useRef<HTMLDivElement>(null);
  /** 真正我渲染的DOM节点  这里这个key 需要处理下 */
  const childrenList: React.ReactNode[] = useMemo(() => {
    if (loop) {
      const headChildren = validChildren.slice(-page).map((item: any) => {
        return { ...item, key: `${Date.now()}${Math.random()}` };
      });
      const tailChildren = validChildren.slice(0, page).map((item: any) => {
        return { ...item, key: `${Date.now()}${Math.random()}` };
      });
      return [...headChildren, ...validChildren, ...tailChildren];
    }
    return validChildren;
  }, [loop, page, validChildren]);

  /**
   * 每个元素的样式存储
   */
  const childrenStyle = useRef<Array<{ scale: boolean }>>(new Array(childrenList.length).fill({ scale: true }));

  /** CSS 动画过渡样式 */
  const TransformCss: CSSProperties = useMemo(
    () => ({
      display: isVertical ? 'block' : 'flex',
      transform: isVertical ? `translateY(${carouselOffset}px)` : `translateX(${carouselOffset}px)`,
      transitionDuration: `${scrolling.current ? duration : 0}ms`,
    }),
    [carouselOffset, duration, isVertical],
  );

  /**
   * 轮播图 定时器绑定
   */
  const interval = useRef<number | undefined>();

  /**
   * @returns 元素hidn后 取消元素轮播
   */
  const clearIntervalRef = () => {
    interval.current && clearInterval(interval.current);
  };

  /**
   * 手势滑动的信息
   */
  const carouseTouch = useRef<CarouseTouch>(
    ((): CarouseTouch => {
      return {
        touchStartTime: 0,
        start: 0,
        delta: 0,
      };
    })(),
  );

  /**
   * @return 根据page获取元素宽度
   */
  function getSlidePixels() {
    const track = trackRef.current;
    if (!track) return 0;
    const trackPixels = isVertical ? track.offsetHeight : track.offsetWidth / page;
    return trackPixels;
  }

  /** 图形大小缩放效果样式 控制模块 */
  const TransformScaleCss = useCallback(
    (reset = false, point = page) => {
      for (let index = 0; index < childrenList.length; index++) {
        if (reset) {
          childrenStyle.current[index] = {
            scale: !!(Math.abs(point - index) % 2),
          };
        } else {
          childrenStyle.current[index] = {
            scale: !childrenStyle.current[index].scale,
          };
        }
      }
    },
    [childrenList.length, page],
  );

  /**
   * @param pace:切换几个位图
   * @return 获取我当前元素位置（轮播补位后的位置与非补位后的位置）
   */
  function getCurrentIndex(pace: number) {
    if (pace && loop) return currentDom.current + pace;
    return currentDom.current;
  }

  /**
   * @param pace:切换几个位图
   * @param offser:移动了多少位置
   * @return 轮播图位置移动方法
   */
  const move = useCallback(({ pace = 0, offset = 0 }) => {
    currentDom.current = getCurrentIndex(pace);
    const slidePixels = getSlidePixels();
    const currentOffsetValue = -slidePixels * (page + currentDom.current) + offset;
    OffsetRef.current = currentOffsetValue;
    setCarouselOffset(currentOffsetValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @return 轮播图极限(卡点位置判断)
   * 针对两个极限情况下的位置做图片切换位置处理
   */
  const loopCorrection = useCallback(() => {
    scrolling.current = false;
    if (currentDom.current <= -1) {
      TransformScaleCss(true);
      move({ pace: count });
    }
    if (currentDom.current >= count) {
      TransformScaleCss(true);
      move({ pace: -count });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, move]);

  /**
   * 自动轮播情况下每次变换判断的 极限卡点位置判断、样式变换、图片切换等
   */
  const next = useCallback(() => {
    // 卡点切换位置
    loopCorrection();
    scrolling.current = true;
    TransformScaleCss();
    move({ pace: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loopCorrection, move]);

  /**
   * @return 初始化轮播图对应的位置
   */
  useLayoutEffect(() => {
    const slidePixels = getSlidePixels();
    if (loop) {
      setCarouselOffset(-slidePixels * (page + currentDom.current));
      OffsetRef.current = -slidePixels * (page + currentDom.current);
    }
    TransformScaleCss(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @return 元素初始化判断是否轮播
   */
  useEffect(() => {
    if (!autoplay) return;
    interval.current = window.setInterval(() => {
      next();
    }, autoplayInterval);
    return () => {
      clearIntervalRef();
    };
  }, [autoplay, autoplayInterval, next]);

  useEffect(() => {
    let { touchStartTime, start, delta } = carouseTouch.current;
    const pageWidth = getSlidePixels();
    const onTouchStart = (event: any) => {
      loopCorrection();
      touchStartTime = Date.now();
      start = event.touches[0][isVertical ? 'clientY' : 'clientX'];
    };
    const onTouchMove = (event: any) => {
      const touch = event.touches[0];
      // 这个加1跟减1是为了解决在我快速滑动超过我最大值的情况下 我的偏移变换要优先于我的样式变换导致我的整体变换不生效，所以我临时添加一个加1根减1的操作
      const limitSlide = touch[isVertical ? 'clientY' : 'clientX'] - start > 0 ? pageWidth - 1 : -pageWidth + 1;
      delta =
        Math.abs(touch[isVertical ? 'clientY' : 'clientX'] - start) > pageWidth
          ? limitSlide
          : touch[isVertical ? 'clientY' : 'clientX'] - start;
      move({ offset: delta });
    };
    const onTouchEnd = () => {
      scrolling.current = true;
      const isHalf = Math.abs(delta) > pageWidth / 2;
      const durationTime = Date.now() - touchStartTime;
      const speed = delta / durationTime;
      const isFast = Math.abs(speed) > 0.25;
      const shouldSwipe = isHalf || isFast;
      if (shouldSwipe) {
        let pace = 0;
        if (loop) {
          const calcPace = Math[isFast ? 'ceil' : 'round'](Math.abs(delta) / pageWidth);
          pace = delta < 0 ? calcPace : -calcPace;
        }
        TransformScaleCss();
        move({ pace });
      } else if (delta) {
        move({ pace: 0 });
      }
      // 清除偏移量
      delta = 0;
    };

    const CarouselNodeELement = CarouselNode.current;
    if (CarouselNodeELement && allowTouchMove) {
      CarouselNodeELement.addEventListener('touchstart', onTouchStart, { capture: false, passive: false });
      CarouselNodeELement.addEventListener('touchmove', onTouchMove, { capture: false, passive: false });
      CarouselNodeELement.addEventListener('touchend', onTouchEnd, { capture: false, passive: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVertical, loop, loopCorrection, move]);

  function renderTrackInner() {
    return (
      <>
        {React.Children.map(childrenList, (child, index) => {
          if (!React.isValidElement(child)) {
            return null;
          }
          const childProps = {
            ...child.props,
            width: isVertical ? '100%' : getSlidePixels(),
            // 是否是 正常还是缩小
            scale: isVertical || page === 1 ? false : childrenStyle.current[index].scale,
            // 决定是否开始变换
            transition: scrolling.current,
          };
          return <div className='market-carousel-slide'>{React.cloneElement(child, childProps)}</div>;
        })}
      </>
    );
  }

  /** 样式合并渲染轮播图 */
  return withNativeProps(
    props,
    <div className='market-carousel' ref={CarouselNode}>
      <div className='market-carousel-main' ref={trackRef} style={{ ...TransformCss }}>
        {renderTrackInner()}
      </div>
    </div>,
  );
};

/**
 * 是否展示页面的逻辑
 * 需要判断几个逻辑：
 * 1.如果我的子节点不属于React的格式或者我的子节点的个数为0 需要跳出
 * 2.判断我要求展示的效果  如果是我子节点的个数不足我展示的个数的话 需要重新设置对应值
 */
export const Carousel: FC<SwiperProps> = (props) => {
  const { validChildren, count } = useMemo(() => {
    let count = 0;
    const validChildren = React.Children.map(props.children, (child) => {
      if (!React.isValidElement(child)) return null;
      if (child.type !== CarouselItem) {
        return null;
      }
      count++;
      return child;
    });
    return {
      validChildren,
      count,
    };
  }, [props.children]);

  if (count === 0 || !validChildren) {
    return null;
  }

  return <CarouselCurrection {...{ ...props, validChildren, count, page: count <= props.page ? 1 : props.page }} />;
};
