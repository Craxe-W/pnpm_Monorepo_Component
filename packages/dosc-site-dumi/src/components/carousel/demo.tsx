import React from 'react'

// import { DemoBlock } from 'demos'
import { Carousel } from 'component-example'
import './index.less'
const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac', '#00FA9A', '#FFFF00', '#FF4500']

const items = colors.map((color, index) => (
  <Carousel.Item key={index}>
    <div className='content' style={{ background: color }} key={`${new Date().getTime()}${index}`}>
      {index + 1}
    </div>
  </Carousel.Item>
))

export default () => {
  return (
    <React.Fragment>
      {/* <DemoBlock title='自动轮播'>
        <Carousel page={1} autoplay={true} loop={true} direction='horizontal' autoplayInterval={3000} duration={500}>
          {items}
        </Carousel>
      </DemoBlock>
      <DemoBlock title='禁止手势滑动'>
        <Carousel
          page={1}
          autoplay={true}
          loop={true}
          direction='horizontal'
          allowTouchMove={false}
          autoplayInterval={3000}
          duration={500}
        >
          {items}
        </Carousel>
      </DemoBlock>
      <DemoBlock title='轮播气泡'> */}
        <Carousel page={4} autoplay={true} loop={true} direction='horizontal' autoplayInterval={3000} duration={500}>
          {items}
        </Carousel>
      {/* </DemoBlock>
      <DemoBlock title='轮播气泡'>
        <Carousel page={3} autoplay={true} loop={true} direction='horizontal' autoplayInterval={3000} duration={500}>
          {items}
        </Carousel>
      </DemoBlock>
      <DemoBlock title='上下滑动'>
        <Carousel page={4} autoplay={true} loop={true} direction='vertical' autoplayInterval={3000} duration={500}>
          {items}
        </Carousel>
      </DemoBlock> */}
    </React.Fragment>
  )
}
