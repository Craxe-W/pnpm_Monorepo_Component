# CSS3 动画实现手势点击效果

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
