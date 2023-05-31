# CSS3 常见动画效果

<code src="./demo.tsx"></code>

- 主要是利用 CSS3 的 animation 动画实现手势点击，
- 通过在做动画的时候，切换不同的卡片位置（不同的百分比时机，进行切换）
- 然后 在针对批量的位置的时候做上下动画变更 即可实现

```
@keyframes finger-animation {
  0% {
    left: 60px;
  }

  10%,
  20%,
  45%,
  55%,
  80%,
  90% {
    transform: translate(-3px, -10px);
    animation-timing-function: ease-in;
  }

  15%,
  25%,
  50%,
  60%,
  85%,
  95% {
    transform: translate(0, 0);
    animation-timing-function: ease-in;
  }

  35% {
    left: 185px;
  }

  75%,
  100% {
    left: 310px;
  }
}

```

- 动画渐进效果 也是采用的是 animation
- 这里 重点是通过 tranform: scale3d(0.1,0.1,0.1) 来实现 当然 渐进的显示与隐藏还是需要 opacity

```
.gradually {
  position: relative;
  width: 180px;
  height: 280px;
  animation-name: graduallyanimation;
  animation-duration: 0.5s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: both;

  img {
    width: 100%;
    height: 100%;
  }
}

@keyframes graduallyanimation {
  0% {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1);
  }

  100% {
    opacity: 1;
  }
}
```
