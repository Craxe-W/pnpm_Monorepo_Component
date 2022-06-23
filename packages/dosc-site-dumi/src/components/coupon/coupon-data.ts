export const couponData = {
  // 现金券
  caseCoupon: {
    couponkindshowvo: {
      catalog: 1,
      name: '现金券',
      realm: '全品类商品可用（特殊商品除外）',
      conditiondesc: '现金券',
      amount: 6,
      delaydays: 3,
      expirationdays: 4,
      // availablefrom: 1642694400000,
      // availableto: 1642953599000,
      taglist: [
        {
          type: 'omnichannel',
          text: '线上/到店可用',
        },
      ],
    },
  },
  // 满减券
  fullReductionCoupon: {
    couponkindshowvo: {
      catalog: 3,
      name: '满减券',
      realm: '全品类商品可用（特殊商品除外）',
      conditiondesc: '满20元可用',
      amount: 10,
      // delaydays: 3,
      // expirationdays: 12,
      availablefrom: 1642694400000,
      availableto: 1642953599000,
      taglist: [
        {
          type: 'omnichannel',
          text: '线上/到店可用',
        },
      ],
    },
  },
  // 赠品券
  giftCoupon: {
    couponkindshowvo: {
      catalog: 4,
      name: '赠品券',
      realm: '门店通用',
      conditiondesc: '赠品券',
      amount: -100,
      // delaydays: 3,
      expirationdays: 100,
      // availablefrom: 1642694400000,
      // availableto: 1642953599000,
      taglist: [
        {
          type: 'omnichannel',
          text: '线上/到店可用',
        },
      ],
    },
  },
  // 折扣券
  discountCoupon: {
    couponkindshowvo: {
      catalog: 6,
      name: '打折券',
      realm: '指定商品可用',
      conditiondesc: '6折券',
      subtitle: '最高抵1.13元',
      amount: -100,
      // delaydays: 3,
      expirationdays: 5,
      // availablefrom: 1642694400000,
      // availableto: 1642953599000,
      taglist: [
        {
          type: 'omnichannel',
          text: '线上/到店可用',
        },
      ],
    },
  },
  // 商品兑换券
  exchangeCoupon: {
    couponkindshowvo: {
      catalog: 7,
      name: '商品兑换券',
      realm: '指定商品可用',
      conditiondesc: '商品兑换券',
      amount: 2,
      // delaydays: 3,
      expirationdays: 1000,
      // availablefrom: 1642694400000,
      // availableto: 1642953599000,
      taglist: [
        {
          type: 'omnichannel',
          text: '线上/到店可用',
        },
      ],
    },
  },
  // 印花券
  stampCoupon: {
    couponkindshowvo: {
      catalog: 10,
      name: '印花券',
      realm: '全品类商品可用（特殊商品除外）',
      conditiondesc: '满10元可用',
      amount: 5.5,
      // delaydays: 3,
      // expirationdays: 12,
      availablefrom: 1640275200000,
      availableto: 1672502399000,
      taglist: [
        {
          type: 'omnichannel',
          text: '线上/到店可用',
        },
      ],
    },
  },
};
