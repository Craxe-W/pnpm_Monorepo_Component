import React, { useEffect, useRef, useState } from 'react';

import './index.less';

const Content = (props: any) => {
  const { num, color } = props.count;
  return (
    <div className="box" style={{ backgroundColor: color }}>
      {num}
    </div>
  );
};

const color16 = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  return color;
};


const Data: any = [];
for (let index = 0; index < 100; index++) {
  Data.push({
    num: index,
    color: color16(),
  });
}
const itemHeight = 100;
/** 测试虚拟列表  固定高度 */
const Test = () => {
  //每一屏所能渲染的个数
  const currListMax = Math.ceil(window.innerHeight / itemHeight);
  //要渲染的数据
  const [showList, setShowList] = useState(Data.slice(0, currListMax * 2));
  //滚动的节点
  const CarouselNode = useRef<HTMLDivElement>(null);
  //样式节点
  const topBlankFill = useRef<any>(null);
  //防抖作用 减少不必要的数据变更
  const laststartIndex = useRef(0);

  /** 疑问：为啥样式变化了（值没变） */
  useEffect(() => {
    const onScroll = (event: any) => {
      let startIndex = Math.floor(parseInt(event.target.scrollTop) / itemHeight);
      //减少数据变更抖动
      if (startIndex === laststartIndex.current) return;
      laststartIndex.current = startIndex;
      if (startIndex > currListMax) {
        // 这里主要是保障上面保留一屏的数据
        startIndex = startIndex - currListMax;
      } else {
        startIndex = 0;
      }
      let endIndex = startIndex + 2 * currListMax + 1;
      if (endIndex > Data.length) {
        endIndex = Data.length;
      }

      // if (endIndex > currLen - 1) {
      //   // 更新请求参数，发送请求获取新的数据(但是要保证当前不在请求过程中，否则就会重复请求相同的数据)
      //   !isRequestRef.current && setOptions(state => ({ offset: state.offset + 1 }))
      //   // 如果已经滚动到了底部，那么就设置endIndex为最后一个元素索引即可
      //   endIndex = currLen - 1
      // }

      //这里请求数据 做分页效果

      topBlankFill.current = {
        paddingTop: `${startIndex * itemHeight}px`,
        paddingBottom: `${(100 - 1 - endIndex) * itemHeight}px`,
      };
      setShowList(Data.slice(startIndex, endIndex));
    };
    const CarouselNodeELement = CarouselNode.current;
    if (CarouselNodeELement) {
      CarouselNodeELement.addEventListener('scroll', onScroll);
    }
  }, [currListMax]);

  return (
    <div className="contaiont">
      <div ref={CarouselNode} className="dom">
        <div style={topBlankFill.current}>
          {showList.map((item: any, index: number) => {
            return <Content count={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Test;
