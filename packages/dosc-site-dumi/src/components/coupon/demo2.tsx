import React from 'react';

import { DemoBlock } from 'demos';
import { Space, Grid } from 'antd-mobile';
import { Coupon } from 'component-example';
import { couponData } from './coupon-data';

export default () => {
  const { caseCoupon, fullReductionCoupon, giftCoupon, discountCoupon, exchangeCoupon, stampCoupon } = couponData;

  return (
    <>
      <DemoBlock title='现金券' padding='12px' background='#C8C8C8'>
        <Space block direction='vertical' style={{ '--gap': '9px' }}>
          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={caseCoupon.couponkindshowvo} />
            </Grid.Item>
          </Grid>

          <Grid columns={2} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={caseCoupon.couponkindshowvo} couponLayout='double' />
            </Grid.Item>
          </Grid>

          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={caseCoupon.couponkindshowvo} couponStyle='style02' />
            </Grid.Item>
          </Grid>
        </Space>
      </DemoBlock>

      <DemoBlock title='满减券' padding='12px' background='#C8C8C8'>
        <Space block direction='vertical' style={{ '--gap': '9px' }}>
          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} />
            </Grid.Item>
          </Grid>

          <Grid columns={2} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} couponLayout='double' />
            </Grid.Item>
          </Grid>

          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={fullReductionCoupon.couponkindshowvo} couponStyle='style02' />
            </Grid.Item>
          </Grid>
        </Space>
      </DemoBlock>

      <DemoBlock title='赠品券' padding='12px' background='#C8C8C8'>
        <Space block direction='vertical' style={{ '--gap': '9px' }}>
          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={giftCoupon.couponkindshowvo} />
            </Grid.Item>
          </Grid>

          <Grid columns={2} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={giftCoupon.couponkindshowvo} couponLayout='double' />
            </Grid.Item>
          </Grid>

          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={giftCoupon.couponkindshowvo} couponStyle='style02' />
            </Grid.Item>
          </Grid>
        </Space>
      </DemoBlock>

      <DemoBlock title='折扣券' padding='12px' background='#C8C8C8'>
        <Space block direction='vertical' style={{ '--gap': '9px' }}>
          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={discountCoupon.couponkindshowvo} />
            </Grid.Item>
          </Grid>

          <Grid columns={2} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={discountCoupon.couponkindshowvo} couponLayout='double' />
            </Grid.Item>
          </Grid>

          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={discountCoupon.couponkindshowvo} couponStyle='style02' />
            </Grid.Item>
          </Grid>
        </Space>
      </DemoBlock>

      <DemoBlock title='商品兑换券' padding='12px' background='#C8C8C8'>
        <Space block direction='vertical' style={{ '--gap': '9px' }}>
          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={exchangeCoupon.couponkindshowvo} />
            </Grid.Item>
          </Grid>

          <Grid columns={2} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={exchangeCoupon.couponkindshowvo} couponLayout='double' />
            </Grid.Item>
          </Grid>

          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={exchangeCoupon.couponkindshowvo} couponStyle='style02' />
            </Grid.Item>
          </Grid>
        </Space>
      </DemoBlock>

      <DemoBlock title='印花券' padding='12px' background='#C8C8C8'>
        <Space block direction='vertical' style={{ '--gap': '9px' }}>
          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={stampCoupon.couponkindshowvo} />
            </Grid.Item>
          </Grid>

          <Grid columns={2} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={stampCoupon.couponkindshowvo} couponLayout='double' />
            </Grid.Item>
          </Grid>

          <Grid columns={1} gap={9}>
            <Grid.Item>
              <Coupon couponKindShowVo={stampCoupon.couponkindshowvo} couponStyle='style02' />
            </Grid.Item>
          </Grid>
        </Space>
      </DemoBlock>
    </>
  );
};
