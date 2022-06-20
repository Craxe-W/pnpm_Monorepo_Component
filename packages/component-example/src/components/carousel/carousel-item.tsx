import React, { FC, CSSProperties, useMemo } from 'react';
import { withNativeProps } from '../../utils/native-props';

// Partial 参数转化为可选  Record:属性映射 泛型S的类型为string
export interface NativeProps<S extends string = never> {
  className?: string;
  style?: CSSProperties & Partial<Record<S, string>>;
  tabIndex?: number;
}
// React.MouseEvent<HTMLDivElement, MouseEvent> React触摸事件 两个参数 一个是DOM节点 一个是反馈的事件
type Props = {
  width?: number;
  scale?: boolean;
  transition?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: any;
} & NativeProps;

export const CarouselItem: FC<Props> = (props) => {
  const { width = '100%', scale = false, transition = false, children } = props;

  // TODO:这里要通过currect+page来控制前几个元素的变换效果 其他的都是正常不变的内容 然后 他这个变换是跟元素移动时候的变换是同步的
  const CarouselItemStyle = useMemo(() => {
    const style: React.CSSProperties = {
      width: `${width}px`,
      transform: `translateY(0) scale(${scale ? 0.884 : 1})`,
      transitionDuration: `${transition ? 500 : 0}ms`,

      // TODO:测试开发关于JD效果使用属性
      // opacity: '1'
      // 设置 all 元素在切换时候 在 800ms 内 按照 cubic-bezier 进行变换 这个秒数应该是跟滑动的秒数保持一致的
      // transitionProperty: `transform, opacity`,
      // transitionDuration: `800ms, 720ms`,
      // transitionTimingFunction: `cubic-bezier(0.22, 0.01, 0.68, 1), cubic-bezier(0.62, 0.02, 0.68, 1)`,
      // transitionDelay: `0s, 0s`,
      // transformOrigin: '90px center', // 设置元素旋转的位置
      // 按照 rotateY 进行3D旋转 -60deg  一般来说 这个旋转的作用都是给最边上的 要消失的元素使用的  变换到60度的时候 透明度要变得消失
      // 这个里面因该有三个变量 1、偏转度 2.上下大小元素
      // transform: `rotateY(0.1deg) translate3d(0px,3px,0px) scale(${scale ? 0.884 : 1})`
      // transform: `rotateY(0.1deg) translate3d(0px,3px,0px) scale(1)`
    };
    return style;
  }, [scale, transition, width]);

  return withNativeProps(
    props,
    // <div onClick={props.onClick} style={{ ...CarouselItemStyle }}>
    <div style={{ ...CarouselItemStyle }}>{children}</div>,
  );
};
