import React from 'react';

import { DemoBlock } from 'demos';
import { Space, Grid } from 'antd-mobile';
import { Coupon } from 'component-example';
import { CouponKindShowVo } from 'component-example/es/components/coupon';
import { couponData } from './coupon-data';

export default () => {
  const { fullReductionCoupon } = couponData;

  const handlerClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, couponKindShowVo: CouponKindShowVo) => {
    console.log(event, couponKindShowVo);
    alert('点击事件');
    alert(navigator.userAgent);
  };

  return (
    <>
      <DemoBlock title='文字01样式-通栏布局' padding='12px'>
        <Grid columns={1} gap={9}>
          <Grid.Item>
            <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} />
          </Grid.Item>
        </Grid>
      </DemoBlock>

      <DemoBlock title='文字01样式-两列布局' padding='12px'>
        <Grid columns={2} gap={9}>
          <Grid.Item>
            <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} couponLayout='double' />
          </Grid.Item>

          <Grid.Item>
            <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} couponLayout='double' />
          </Grid.Item>
        </Grid>
      </DemoBlock>

      <DemoBlock title='文字02样式-通栏布局' padding='12px'>
        <Grid columns={1} gap={9}>
          <Grid.Item>
            <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} couponStyle='text02' />
          </Grid.Item>
        </Grid>
      </DemoBlock>

      <DemoBlock title='文字02样式-两列布局' padding='12px'>
        <Grid columns={2} gap={9}>
          <Grid.Item>
            <Coupon
              couponKindShowVo={fullReductionCoupon.couponkindshowvo}
              couponStyle='text02'
              couponLayout='double'
            />
          </Grid.Item>

          <Grid.Item>
            <Coupon
              couponKindShowVo={fullReductionCoupon.couponkindshowvo}
              couponStyle='text02'
              couponLayout='double'
            />
          </Grid.Item>
        </Grid>
      </DemoBlock>

      <DemoBlock title='图片样式-通栏布局' padding='12px'>
        <Grid columns={1} gap={9}>
          <Grid.Item>
            <Coupon
              couponKindShowVo={fullReductionCoupon.couponkindshowvo}
              couponStyle='image'
              couponImageUrl='http://image.yonghuivip.com/image/16462924209146e19385e943c9bedd7e2e29f86c4753bb0ba3ca9.png?w=1035&h=246'
            />
          </Grid.Item>
        </Grid>
      </DemoBlock>

      <DemoBlock title='图片样式-两列布局' padding='12px'>
        <Grid columns={2} gap={9}>
          <Grid.Item>
            <Coupon
              couponKindShowVo={fullReductionCoupon.couponkindshowvo}
              couponStyle='image'
              couponImageUrl='http://image.yonghuivip.com/image/16500042252161b0195d24a546b2d2759ab2e1684a162d7d9d14a.png?w=504&h=246'
            />
          </Grid.Item>

          <Grid.Item>
            <Coupon
              couponKindShowVo={fullReductionCoupon.couponkindshowvo}
              couponStyle='image'
              couponImageUrl='http://image.yonghuivip.com/image/16500042252161b0195d24a546b2d2759ab2e1684a162d7d9d14a.png?w=504&h=246'
            />
          </Grid.Item>
        </Grid>
      </DemoBlock>

      <DemoBlock title='自定义颜色' padding='12px'>
        <Space block direction='vertical' style={{ '--gap': '9px' }}>
          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                style={{
                  '--coupon-theme-color': '#ff3819',
                  '--coupon-background-color': '#fff6f1',
                  '--coupon-tag-background-color': 'linear-gradient(to right, #ff654d, #ff3819)',
                }}
              />
            </Grid.Item>
          </Grid>

          <Grid columns={2} gap={9}>
            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponLayout='double'
                style={{
                  '--coupon-theme-color': '#19baff',
                  '--coupon-background-color': '#f2fbff',
                  '--coupon-tag-background-color': 'linear-gradient(to right, #4dc9ff, #19baff)',
                }}
              />
            </Grid.Item>
          </Grid>

          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponStyle='text02'
                style={{
                  '--coupon-theme-color': '#28bf13',
                  '--coupon-background-color': '#f7fff6',
                  '--coupon-tag-background-color': 'linear-gradient(to right, #4abf39, #28bf13)',
                }}
              />
            </Grid.Item>
          </Grid>

          <Grid columns={2} gap={9}>
            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponLayout='double'
                couponStyle='text02'
                style={{
                  '--coupon-theme-color': '#711aff',
                  '--coupon-background-color': '#faf7ff',
                  '--coupon-tag-background-color': 'linear-gradient(to right, #904dff, #711aff)',
                }}
              />
            </Grid.Item>
          </Grid>
        </Space>
      </DemoBlock>

      <DemoBlock title='状态-领取中' padding='12px'>
        <Space block direction='vertical' style={{ '--gap': '9px' }}>
          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} couponStatus='receiving' />
            </Grid.Item>
          </Grid>

          <Grid columns={2} gap={9}>
            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponLayout='double'
                couponStatus='receiving'
              />
            </Grid.Item>
          </Grid>

          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponStyle='image'
                couponImageUrl='http://image.yonghuivip.com/image/16462924209146e19385e943c9bedd7e2e29f86c4753bb0ba3ca9.png?w=1035&h=246'
                couponStatus='receiving'
              />
            </Grid.Item>
          </Grid>

          <Grid columns={2} gap={9}>
            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponStyle='image'
                couponImageUrl='http://image.yonghuivip.com/image/16500042252161b0195d24a546b2d2759ab2e1684a162d7d9d14a.png?w=504&h=246'
                couponStatus='receiving'
              />
            </Grid.Item>
          </Grid>
        </Space>
      </DemoBlock>

      <DemoBlock title='状态-已领取' padding='12px'>
        <Space block direction='vertical' style={{ '--gap': '9px' }}>
          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} couponStatus='received' />
            </Grid.Item>
          </Grid>

          <Grid columns={2} gap={9}>
            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponLayout='double'
                couponStatus='received'
              />
            </Grid.Item>
          </Grid>

          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponStyle='image'
                couponImageUrl='http://image.yonghuivip.com/image/16462924209146e19385e943c9bedd7e2e29f86c4753bb0ba3ca9.png?w=1035&h=246'
                couponStatus='received'
              />
            </Grid.Item>
          </Grid>

          <Grid columns={2} gap={9}>
            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponStyle='image'
                couponImageUrl='http://image.yonghuivip.com/image/16500042252161b0195d24a546b2d2759ab2e1684a162d7d9d14a.png?w=504&h=246'
                couponStatus='received'
              />
            </Grid.Item>
          </Grid>
        </Space>
      </DemoBlock>

      <DemoBlock title='状态-去使用' padding='12px'>
        <Space block direction='vertical' style={{ '--gap': '9px' }}>
          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} couponStatus='to_use' />
            </Grid.Item>
          </Grid>

          <Grid columns={2} gap={9}>
            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponLayout='double'
                couponStatus='to_use'
              />
            </Grid.Item>
          </Grid>

          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponStyle='image'
                couponImageUrl='http://image.yonghuivip.com/image/16462924209146e19385e943c9bedd7e2e29f86c4753bb0ba3ca9.png?w=1035&h=246'
                couponStatus='to_use'
              />
            </Grid.Item>
          </Grid>

          <Grid columns={2} gap={9}>
            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponStyle='image'
                couponImageUrl='http://image.yonghuivip.com/image/16500042252161b0195d24a546b2d2759ab2e1684a162d7d9d14a.png?w=504&h=246'
                couponStatus='to_use'
              />
            </Grid.Item>
          </Grid>
        </Space>
      </DemoBlock>

      <DemoBlock title='状态-已抢完' padding='12px'>
        <Space block direction='vertical' style={{ '--gap': '9px' }}>
          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} couponStatus='over' />
            </Grid.Item>
          </Grid>

          <Grid columns={2} gap={9}>
            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponLayout='double'
                couponStatus='over'
              />
            </Grid.Item>
          </Grid>

          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponStyle='image'
                couponImageUrl='http://image.yonghuivip.com/image/16462924209146e19385e943c9bedd7e2e29f86c4753bb0ba3ca9.png?w=1035&h=246'
                couponStatus='over'
              />
            </Grid.Item>
          </Grid>

          <Grid columns={2} gap={9}>
            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponStyle='image'
                couponImageUrl='http://image.yonghuivip.com/image/16500042252161b0195d24a546b2d2759ab2e1684a162d7d9d14a.png?w=504&h=246'
                couponStatus='over'
              />
            </Grid.Item>
          </Grid>
        </Space>
      </DemoBlock>

      <DemoBlock title='状态-明天再来' padding='12px'>
        <Space block direction='vertical' style={{ '--gap': '9px' }}>
          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} couponStatus='tomorrow' />
            </Grid.Item>
          </Grid>

          <Grid columns={2} gap={9}>
            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponLayout='double'
                couponStatus='tomorrow'
              />
            </Grid.Item>
          </Grid>

          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponStyle='image'
                couponImageUrl='http://image.yonghuivip.com/image/16462924209146e19385e943c9bedd7e2e29f86c4753bb0ba3ca9.png?w=1035&h=246'
                couponStatus='tomorrow'
              />
            </Grid.Item>
          </Grid>

          <Grid columns={2} gap={9}>
            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponStyle='image'
                couponImageUrl='http://image.yonghuivip.com/image/16500042252161b0195d24a546b2d2759ab2e1684a162d7d9d14a.png?w=504&h=246'
                couponStatus='tomorrow'
              />
            </Grid.Item>
          </Grid>
        </Space>
      </DemoBlock>

      <DemoBlock title='点击事件' padding='12px'>
        <Space block direction='vertical' style={{ '--gap': '9px' }}>
          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} onClick={handlerClick} />
            </Grid.Item>
          </Grid>
        </Space>
      </DemoBlock>
    </>
  );
};
