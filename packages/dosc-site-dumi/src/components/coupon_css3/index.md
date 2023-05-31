# CSS3 优惠券豁口效果

<code src="./demo.tsx"></code>

- 主要是利用 CSS3 的 radial-gradient
- 通过在制定位置创建圆并且将圆设置为透明状态 即可实现豁口效果

```
<style>
    :root {
        --c1: #ffe2e2;
        --c2: #bbded6;
    }

    .coupon-box {
        width: 550px;
        height: 180px;
        border-radius: 20px;
        /* overflow: hidden; */
        background:
            /* 翻译一下  circle at right top 说是要画一个圆 圆的位置在右上 */
            /* red 18px, var(--c1) 0  表示 圆的扩散的两个颜色  半径是18的一个圆 从rend扩散到--c1*/
            /* top left /180px 51% no-repeat; 表示 在左上角 横向间隔180 上下间隔51% */
            /* -20px 20px / 50% 20px; 表示 距离左边-20px 上边-20px 每个间隔50%  上下间隔20px */
            radial-gradient(circle at right top,
                transparent 18px,
                var(--c1) 0) top left /180px 51% no-repeat,
            radial-gradient(circle at right bottom,
                transparent 18px,
                var(--c1) 0) bottom left /180px 51% no-repeat,
            radial-gradient(circle at left top,
                transparent 18px,
                var(--c2) 0) top right /370px 51% no-repeat,
            radial-gradient(circle at left bottom,
                transparent 18px,
                var(--c2) 0) bottom right /370px 51% no-repeat;
    }
</style>

<body>
    <div class="coupon-box"></div>
</body>

</html>

```

- 另外 针对向图片这样的背景，我们可以通过 mask 遮罩，通过在特定点屏蔽或者裁剪图像来隐藏元素
- -webkit-mask: 遮罩

```
:root {
        --c1: orange;
        --c2: #ff2e63;
        --c3: #fff
    }

    body {
        width: 100%;
        height: 100%;
        background: #000;
    }

    .coupon-box {
        width: 550px;
        height: 180px;
        border-radius: 20px;
        /* background-image: linear-gradient(45deg, var(--c1), var(--c2)); */
        background-image: url(http://image.yonghuivip.com/image/16773134888454aabd58a49289f653b4d96c3063d22147a13f576.png?w=1053&h=210);
        /* overflow: hidden; */
        -webkit-mask:
            /* radial-gradient(circle at 50%, red 5px, #0000 0) 50% 50% / 100% 20px, */
            /* -20px 20px / 50% 20px; 表示 距离左边-20px 上边-20px 每个间隔50%  上下间隔20px */
            radial-gradient(circle at 20px 20px, #0000 20px, red 0) -20px -20px / 50%;
        /* -webkit-mask-composite 表示在当前遮罩及其下方的遮罩层的合成操作 */
        /* 通俗来讲就是多个mask通过-webkit-mask-composite进行效果叠加 */
        /* destination-out 只显示下方遮罩，重合地方不显示 */
        -webkit-mask-composite: destination-out;
    }
```
