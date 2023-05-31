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
      <DemoBlock title='券样式01-通栏' padding='12px' background='#C8C8C8'>
        <Grid columns={1} gap={9}>
          <Grid.Item>
            <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} />
          </Grid.Item>
        </Grid>
      </DemoBlock>

      <DemoBlock title='券样式01-两列' padding='12px' background='#C8C8C8'>
        <Grid columns={2} gap={9}>
          <Grid.Item>
            <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} couponLayout='double' />
          </Grid.Item>

          <Grid.Item>
            <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} couponLayout='double' />
          </Grid.Item>
        </Grid>
      </DemoBlock>

      <DemoBlock title='券样式02' padding='12px' background='#C8C8C8'>
        <Grid columns={1} gap={9}>
          <Grid.Item>
            <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} couponStyle='style02' />
          </Grid.Item>
        </Grid>
      </DemoBlock>

      <DemoBlock title='券状态-领取中' padding='12px' background='#C8C8C8'>
        <Space block direction='vertical' style={{ '--gap': '9px' }}>
          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} couponStatus='receiving' />
            </Grid.Item>

            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponStyle='style02'
                couponStatus='receiving'
              />
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
        </Space>
      </DemoBlock>

      <DemoBlock title='券状态-已领取' padding='12px' background='#C8C8C8'>
        <Space block direction='vertical' style={{ '--gap': '9px' }}>
          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} couponStatus='received' />
            </Grid.Item>

            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponStyle='style02'
                couponStatus='received'
              />
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
        </Space>
      </DemoBlock>

      <DemoBlock title='券状态-去使用' padding='12px' background='#C8C8C8'>
        <Space block direction='vertical' style={{ '--gap': '9px' }}>
          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} couponStatus='to_use' />
            </Grid.Item>

            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponStyle='style02'
                couponStatus='to_use'
              />
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
        </Space>
      </DemoBlock>

      <DemoBlock title='券状态-已抢完' padding='12px' background='#C8C8C8'>
        <Space block direction='vertical' style={{ '--gap': '9px' }}>
          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} couponStatus='over' />
            </Grid.Item>

            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponStyle='style02'
                couponStatus='over'
              />
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
        </Space>
      </DemoBlock>

      <DemoBlock title='券状态-明天再来' padding='12px' background='#C8C8C8'>
        <Space block direction='vertical' style={{ '--gap': '9px' }}>
          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} couponStatus='tomorrow' />
            </Grid.Item>

            <Grid.Item>
              <Coupon
                couponKindShowVo={fullReductionCoupon.couponkindshowvo}
                couponStyle='style02'
                couponStatus='tomorrow'
              />
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
        </Space>
      </DemoBlock>

      <DemoBlock title='点击事件' padding='12px' background='#C8C8C8'>
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
