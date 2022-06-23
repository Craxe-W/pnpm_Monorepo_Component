// 这个地方写公共的第三方库的声明
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'lodash/*';
declare module '*.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
