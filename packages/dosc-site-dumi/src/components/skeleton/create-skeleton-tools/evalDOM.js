/* eslint-disable */
export default function autoCreateSkeleton(options) {
  const ELEMENTS = ['audio', 'button', 'canvas', 'code', 'img', 'input', 'pre', 'svg', 'textarea', 'video', 'xmp'];
  const nodeInfo = [];
  const win_w = window.innerWidth;
  const win_h = window.innerHeight;
  const { rootNode } = options || {};

  function getArgtype(arg) {
    return Object.prototype.toString
      .call(arg)
      .toLowerCase()
      .match(/\s(\w+)/)[1];
  }

  function getStyle(node, attr) {
    return (node.nodeType === 1 ? getComputedStyle(node)[attr] : '') || '';
  }

  function getRootNode(el) {
    if (!el) return el;
    return typeof el === 'object' ? el : getArgtype(el) === 'string' ? document.querySelector(el) : null;
  }

  function includeElement(elements, node) {
    return ~elements.indexOf((node.tagName || '').toLowerCase());
  }

  function isHideStyle(node) {
    return (
      getStyle(node, 'display') === 'none' ||
      getStyle(node, 'visibility') === 'hidden' ||
      getStyle(node, 'opacity') == 0 ||
      node.hidden
    );
  }

  function isCustomCardBlock(node) {
    const bgStyle = getStyle(node, 'background');
    const bgColorReg = /rgba\([\s\S]+?0\)/gi;
    const bdReg = /(0px)|(none)/;
    const hasBgColor = !bgColorReg.test(bgStyle) || ~bgStyle.indexOf('gradient');
    const hasNoBorder = ['top', 'left', 'right', 'bottom'].some((item) => {
      return bdReg.test(getStyle(node, 'border-' + item));
    });
    const { w, h } = getRect(node);
    const customCardBlock = !!(
      hasBgColor &&
      (!hasNoBorder || getStyle(node, 'box-shadow') != 'none') &&
      w > 0 &&
      h > 0 &&
      w < 0.95 * win_w &&
      h < 0.3 * win_h
    );
    return customCardBlock;
  }

  function getRect(node) {
    if (!node) return {};
    const { top: t, left: l, width: w, height: h } = node.getBoundingClientRect();
    return { t, l, w, h };
  }

  function getPadding(node) {
    return {
      paddingTop: parseInt(getStyle(node, 'paddingTop')),
      paddingLeft: parseInt(getStyle(node, 'paddingLeft')),
      paddingBottom: parseInt(getStyle(node, 'paddingBottom')),
      paddingRight: parseInt(getStyle(node, 'paddingRight')),
    };
  }

  function pushNodeInfo({ left, top, width, height, radius }) {
    nodeInfo.push({
      x: left,
      y: top,
      z: 1,
      w: width,
      h: height,
      r: radius,
    });
  }

  function DrawPageframe(opts) {
    this.rootNode = getRootNode(opts.rootNode) || document.body;
    return this instanceof DrawPageframe ? this : new DrawPageframe(opts);
  }

  DrawPageframe.prototype = {
    startDraw: function () {
      const nodes = this.rootNode.childNodes;

      function deepFindNode(nodes) {
        if (nodes.length) {
          for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            if (isHideStyle(node)) {
              continue;
            }
            let childNodes = node.childNodes;
            let hasChildText = false;
            let background = getStyle(node, 'backgroundImage');
            let backgroundHasurl = background.match(/url\(.+?\)/);
            backgroundHasurl = backgroundHasurl && backgroundHasurl.length;

            // 判断该节点下是否有文字
            for (let j = 0; j < childNodes.length; j++) {
              if (childNodes[j].nodeType === 3 && childNodes[j].textContent.trim().length) {
                hasChildText = true;
                break;
              }
            }
            const { t, l, w, h } = getRect(node);
            if (
              includeElement(ELEMENTS, node) ||
              (backgroundHasurl && w < win_w && h < win_h) ||
              (node.nodeType === 3 && node.textContent.trim().length) ||
              hasChildText ||
              isCustomCardBlock(node)
            ) {
              if (w > 0 && h > 0 && l >= 0 && l < win_w && win_h - t >= 20 && t >= 0) {
                const { paddingTop, paddingLeft, paddingBottom, paddingRight } = getPadding(node);
                const radius = {
                  tl: parseInt(getStyle(node, 'border-top-left-radius')),
                  tr: parseInt(getStyle(node, 'border-top-right-radius')),
                  bl: parseInt(getStyle(node, 'border-bottom-left-radius')),
                  br: parseInt(getStyle(node, 'border-bottom-right-radius')),
                  isY: false,
                };
                if (getStyle(node, 'border-radius') === '50%') {
                  radius.isY = true;
                }
                pushNodeInfo({
                  width: parseInt(w),
                  height: parseInt(h),
                  top: parseInt(t),
                  left: parseInt(l),
                  /* width: parseInt(w - paddingLeft - paddingRight), 
                    height: parseInt(h - paddingTop - paddingBottom), 
                    top: parseInt(t + paddingTop), 
                    left: parseInt(l + paddingLeft), */
                  radius,
                });
              }
            } else if (childNodes && childNodes.length) {
              if (!hasChildText) {
                deepFindNode(childNodes);
              }
            }
          }
        }
      }

      deepFindNode(nodes);
      return nodeInfo;
    },
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = new DrawPageframe({
          rootNode,
        }).startDraw();
        resolve(data);
      } catch (e) {
        reject(e);
      }
    }, 1000);
  });
}
