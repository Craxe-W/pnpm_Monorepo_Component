/* eslint-disable */
import autoCreateSkeleton from './evalDOM';
import { cloneDeep, uniqBy } from 'lodash';
import axios from 'axios';

const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
const eventMap = (function () {
  return isMobile
    ? {
        TouchStart: 'touchstart',
        TouchMove: 'touchmove',
        TouchEnd: 'touchend',
      }
    : {
        TouchStart: 'mousedown',
        TouchMove: 'mousemove',
        TouchEnd: 'mouseup',
      };
})();

const createId = (function () {
  let num = 1;
  return function () {
    return `${new Date().getTime()}-${parseInt(Math.random() * 100000)}-${num++}`;
  };
})();

const toDrawNode = ({ ctx, scale, node }) => {
  if (node) {
    let { x, y, w, h, r, color, type } = node || {};
    let { tl = 0, tr = 0, bl = 0, br = 0, isY = false } = r || {};

    x = x * scale;
    y = y * scale;
    w = w * scale;
    h = h * scale;
    tl = tl * scale;
    tr = tr * scale;
    bl = bl * scale;
    br = br * scale;

    if (type === 'stroke') {
      x += 0.5;
      y += 0.5;
      w -= 1;
      h -= 1;
    }

    if (isY) {
      ctx.beginPath();
      ctx.arc(x + w / 2, y + w / 2, w / 2, 0, 2 * Math.PI);
      if (type === 'stroke') {
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.stroke();
      } else {
        ctx.fillStyle = color;
        ctx.fill();
      }
      return;
    }

    ctx.beginPath();
    ctx.moveTo(x, y + tl);
    ctx.lineTo(x, y + h - bl); // 左上点-左下点
    ctx.quadraticCurveTo(x, y + h, x + bl, y + h);
    ctx.lineTo(x + w - br, y + h); // 左下点-右下点
    ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - br);
    ctx.lineTo(x + w, y + tr); // 右下点-右上点
    ctx.quadraticCurveTo(x + w, y, x + w - tr, y);
    ctx.lineTo(x + tl, y); // 右上点-左上点
    ctx.quadraticCurveTo(x, y, x, y + tl);
    ctx.closePath();
    if (type === 'stroke') {
      ctx.lineWidth = 1;
      ctx.strokeStyle = color;
      ctx.stroke();
    } else {
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
};

const toDrawList = ({ ctx, scale, list, select }) => {
  if (Array.isArray(list)) {
    // 1、先提取已选中的块
    let selectIds = {};
    if (select) {
      if (Array.isArray(select.childs)) {
        select.childs.forEach((item) => {
          selectIds[item.id] = true;
        });
      } else {
        selectIds[select.id] = true;
      }
    }
    // 2、绘制list中未选中的块
    list.forEach((node) => {
      if (!selectIds[node.id]) {
        if (Array.isArray(node.childs)) {
          node.childs.forEach((item) => {
            toDrawNode({
              ctx,
              scale,
              node: {
                ...item,
                x: item.x + node.x,
                y: item.y + node.y,
              },
            });
          });
        } else {
          toDrawNode({ ctx, scale, node });
        }
      }
    });
  }
};

//绘制当前选中block或dom区域
const toDrawSelect = ({ ctx, scale, node, color }) => {
  const { selectColor, selectBlockColor } = color;
  if (Array.isArray(node.childs)) {
    node.childs.forEach((item) => {
      toDrawNode({
        ctx,
        scale,
        node: {
          ...item,
          x: item.x + node.x,
          y: item.y + node.y,
          color: item.block ? selectBlockColor : selectColor,
        },
      });
    });
  } else {
    toDrawNode({
      ctx,
      scale,
      node: {
        ...node,
        color: node.block ? selectBlockColor : selectColor,
      },
    });
  }
  node.block &&
    toDrawNode({
      ctx,
      scale,
      node: {
        ...node,
        r: {
          isY: Array.isArray(node.childs) ? false : node.r.isY,
          tl: Array.isArray(node.childs) ? 0 : node.r.tl,
          tr: Array.isArray(node.childs) ? 0 : node.r.tr,
          bl: Array.isArray(node.childs) ? 0 : node.r.bl,
          br: Array.isArray(node.childs) ? 0 : node.r.br,
        },
        color: '#000',
        type: 'stroke',
      },
    });
};

const createDom = ({ tag, attr = {}, events = {}, text, children, parent }) => {
  const dom = document.createElement(tag);
  // attr
  if (attr) {
    for (let attrKey in attr) {
      switch (attrKey) {
        case 'style':
          const style = attr[attrKey];
          const slist = [];
          for (let styleKey in style) {
            if (styleKey && (style[styleKey] || style[styleKey] === 0)) {
              slist.push(`${styleKey}:${style[styleKey]}`);
            }
          }
          dom.setAttribute('style', slist.join(';'));
          break;
        default:
          dom.setAttribute(attrKey, attr[attrKey]);
          break;
      }
    }
  }
  // events
  if (events) {
    for (let eventsKey in events) {
      dom.addEventListener(eventsKey, events[eventsKey], true);
    }
  }
  // text
  if (text) {
    dom.innerHTML = text;
  }
  // children
  if (Array.isArray(children)) {
    children.forEach((item) => {
      if (item) {
        if (item.parent) {
          delete item.parent;
        }
        const child = createDom(item);
        dom.appendChild(child);
      }
    });
  }
  // parent
  if (parent) {
    parent.appendChild(dom);
  }
  return dom;
};

const getFileInfo = () => {
  let { hash, pathname } = window.location;
  hash = hash.replace(/\?.*/g, '').replace('#/', '').replace(/\//g, '@');
  const name = hash ? `${hash}.json` : 'index.json';
  const path = pathname.replace('/', '').split('/')[0] + '/skeleton-json/';
  return {
    path,
    name,
  };
};

const formatExportData = (data) => {
  const _data = [];
  if (Array.isArray(data)) {
    data.forEach((item) => {
      const _item = {
        x: item.x,
        y: item.y,
        z: item.z,
        w: item.w,
        h: item.h,
        r: {
          tl: item.r?.tl,
          tr: item.r?.tr,
          bl: item.r?.bl,
          br: item.r?.br,
          isY: item.r?.isY,
        },
        color: item.color,
      };
      if (Array.isArray(item.childs) && item.childs.length) {
        _item.childs = formatExportData(item.childs);
      }
      _data.push(_item);
    });
  }
  return _data;
};

class SkeletonTools {
  config = {
    scale: 2,
    width: window.innerWidth,
    height: window.innerHeight,
    color: {
      fillColor: '#eeeeee',
      selectColor: '#0436ea78',
      selectBlockColor: '#7fb97e6b',
    },
  };
  $message = null;
  dom = {
    container: null,
    canvas: null,
    mask: null,
    tools: null,
  };
  canvasContext = null;
  drawList = [];
  selectNode = null;
  constructor() {
    this.init();
  }
  init() {
    this.initMessage();
    this.initContainer();
    this.initCanvas();
    this.initMask();
    this.initTools();
    this.initGlobalEvent();
  }
  initMessage() {
    const colorMap = {
      success: 'rgb(103,194,58)',
      warning: 'rgb(230,162,60)',
      danger: 'rgb(245,108,108)',
    };
    const modelDom = createDom({
      tag: 'div',
      attr: {
        style: {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          'z-index': -1,
          'background-color': 'rgba(255,255,255, 0)',
          display: 'none',
        },
      },
      parent: document.body,
    });
    let timer = null;
    this.$message = (options) => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      const { message = '请输入提示', type = 'success' } = options || {};
      modelDom.style.zIndex = 999999;
      modelDom.style.display = 'block';
      const messageDom = createDom({
        tag: 'span',
        attr: {
          style: {
            display: 'inline-block',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '5px 10px',
            'border-radius': '5px',
            color: '#fff',
            'font-size': '14px',
            'background-color': colorMap[type],
          },
        },
        text: message,
        parent: modelDom,
      });
      timer = setTimeout(() => {
        modelDom.style.zIndex = -1;
        modelDom.style.display = 'none';
      }, 1000);
      setTimeout(() => {
        messageDom.remove();
      }, 1000);
    };
  }
  initContainer() {
    this.dom.container = createDom({
      tag: 'div',
      attr: {
        style: {
          'font-size': '14px',
        },
      },
      parent: document.body,
    });
    this.hideContainer();
  }
  // 初始化画布
  initCanvas() {
    let hasTouchStart = false;
    let startX;
    let startY;
    let blockX;
    let blockY;
    let blockW;
    let blockH;
    let action; // 当前点击时的动作（移动、改变block大小）
    let multiSelectNode = false;
    // 距离block边缘5px以内视为形变操作（指改变block的大小）
    const changeSize = 5;
    // 格式化event（已验证）
    const formatEvent = (event) => {
      const e = event || window.event;
      if (e.clientX === undefined) {
        const eventkey = e.targetTouches.length > 0 ? 'targetTouches' : 'changedTouches';
        e.clientX = e[eventkey][0]['clientX'];
        e.clientY = e[eventkey][0]['clientY'];
      }
      return e;
    };

    // 检测某个坐标点是否在一个矩形范围内（已验证）
    const checkPointInSideRect = (point, rect) => {
      if (rect.x <= point.x && rect.x + rect.w >= point.x && rect.y <= point.y && rect.y + rect.h >= point.y) {
        return true;
      } else {
        return false;
      }
    };

    // 检测点击事件是否点击在已存在的block区域内（已验证）
    const calcTouchInSideBlock = (event) => {
      const e = formatEvent(event);
      for (let i = 0; i < this.drawList.length; i++) {
        if (checkPointInSideRect({ x: e.clientX, y: e.clientY }, this.drawList[i])) {
          return this.drawList[i];
        }
      }
      return null;
    };

    // 检测事件在block块内的类型，形变或移动，形变又包含单边变化还是两边同时变化。（已验证）
    const checkTouchInSideType = (event, block) => {
      const e = formatEvent(event);
      const mx = e.clientX;
      const my = e.clientY;

      let changeL = false;
      let changeR = false;
      let changeT = false;
      let changeB = false;

      if (checkPointInSideRect({ x: mx, y: my }, block)) {
        changeL = mx <= block.x + changeSize;
        changeR = mx >= block.x + block.w - changeSize;
        changeT = my <= block.y + changeSize;
        changeB = my >= block.y + block.h - changeSize;
        if (!changeL && !changeR && !changeT && !changeB) {
          return { changeL, changeR, changeT, changeB, move: true, resize: false };
        } else {
          return { changeL, changeR, changeT, changeB, move: false, resize: true };
        }
      }
      return { changeL, changeR, changeT, changeB, move: false, resize: false };
    };

    // 多选操作 ctrl+点击事件触发
    const formatMultiSelectNode = (block) => {
      if (!multiSelectNode) {
        // 此时是多选的第一次操作
        multiSelectNode = cloneDeep(block);
        const item = cloneDeep(block);
        item.x = 0;
        item.y = 0;
        multiSelectNode.childs = [item];
        multiSelectNode.id = createId(); // 待验证
      } else {
        // 此时是多选的第N次操作
        if (block.x < multiSelectNode.x) {
          multiSelectNode.childs.forEach((item) => {
            item.x = item.x + multiSelectNode.x - block.x;
          });
          multiSelectNode.w = Math.max(block.x + block.w, multiSelectNode.x + multiSelectNode.w) - block.x;
          multiSelectNode.x = block.x;
        }
        if (block.x + block.w > multiSelectNode.x + multiSelectNode.w) {
          multiSelectNode.w = block.x + block.w - multiSelectNode.x;
        }
        if (block.y < multiSelectNode.y) {
          multiSelectNode.childs.forEach((item) => {
            item.y = item.y + multiSelectNode.y - block.y;
          });
          multiSelectNode.h = Math.max(block.y + block.h, multiSelectNode.y + multiSelectNode.h) - block.y;
          multiSelectNode.y = block.y;
        }
        if (block.y + block.h > multiSelectNode.y + multiSelectNode.h) {
          multiSelectNode.h = block.y + block.h - multiSelectNode.y;
        }
        const child = cloneDeep(block);
        child.x = child.x - multiSelectNode.x;
        child.y = child.y - multiSelectNode.y;
        multiSelectNode.childs.push(child);
        multiSelectNode.childs = uniqBy(multiSelectNode.childs, 'id'); // 根据id去重，避免重复渲染
      }
      return multiSelectNode;
    };

    let historyPosition = { x: -1, y: -1 }; // 记录每次点击的坐标信息
    let historyIndex = -1; // 记录每次点击的下标
    // 鼠标点击canvas时 检测页面dom，并转为选中焦点rect区域(蓝色状态区域);（已验证）
    const handleDomToBlock = (event) => {
      const e = formatEvent(event);
      const curPosition = { x: e.clientX, y: e.clientY };
      // 如果当前点击坐标相对于历史点击坐标，位移 > 1，则重置历史信息
      if (Math.abs(historyPosition.x - curPosition.x) > 1 || Math.abs(historyPosition.y - curPosition.y) > 1) {
        historyIndex = -1;
        historyPosition = curPosition;
      }
      historyIndex++;
      // 获取某坐标点下的HTML元素数组，过滤掉大于屏幕宽高的元素
      const elements = document.elementsFromPoint(historyPosition.x, historyPosition.y).filter((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width >= this.config.width && rect.height >= this.config.height) {
          return false;
        } else {
          return true;
        }
      });
      // 没有元素，则错误提示
      if (elements.length === 0) {
        this.maskwarn();
        return false;
      }
      // 若下标已大于元素长度，则置为0
      if (historyIndex >= elements.length) {
        historyIndex = 0;
      }
      const curDom = elements[historyIndex];
      const curDomRect = curDom.getBoundingClientRect();
      const curDomStyle = window.getComputedStyle(curDom);
      if (!curDomRect || !curDomStyle) {
        this.maskwarn();
        return false;
      }
      const selectNode = {
        x: parseInt(curDomRect.x),
        y: parseInt(curDomRect.y),
        z: 1,
        w: parseInt(curDomRect.width),
        h: parseInt(curDomRect.height),
        r: {
          tl: parseInt(curDomStyle['border-top-left-radius']),
          tr: parseInt(curDomStyle['border-top-right-radius']),
          bl: parseInt(curDomStyle['border-bottom-left-radius']),
          br: parseInt(curDomStyle['border-bottom-right-radius']),
          isY: false,
        },
      };
      if (curDomStyle['border-radius'] === '50%') {
        selectNode.r.isY = true;
      }
      this.selectNode = selectNode;
      this.startDraw();
    };

    const canvasTouchStart = (event) => {
      const e = formatEvent(event);
      hasTouchStart = true;
      startX = e.clientX;
      startY = e.clientY;

      // 检测点击事件是否点击在已存在的block区域内，若是，则返回此block信息
      const block = calcTouchInSideBlock(e);
      if (block) {
        if (!e.ctrlKey) {
          // 单选
          multiSelectNode = false;
          blockX = block.x;
          blockY = block.y;
          blockW = block.w;
          blockH = block.h;
          this.selectNode = block;
          action = checkTouchInSideType(e, block);
          this.startDraw();
        } else {
          // 多选
          this.selectNode = formatMultiSelectNode(block);
          this.startDraw();
        }
      } else {
        multiSelectNode = false;
        action = { move: false, resize: false };
      }
    };

    const canvasTouchMove = (event) => {
      if (!action) {
        return true;
      }
      const e = formatEvent(event);
      const curX = e.clientX;
      const curY = e.clientY;
      const { changeL, changeR, changeT, changeB, move, resize } = action;
      if (hasTouchStart) {
        if (move) {
          this.selectNode.x = Math.round(blockX + curX - startX);
          this.selectNode.y = Math.round(blockY + curY - startY);
          this.startDraw();
        } else if (resize) {
          if (changeL && startX - curX + blockW > changeSize * 2) {
            this.selectNode.w = Math.round(blockW + (startX - curX));
            this.selectNode.x = Math.round(blockX - (startX - curX));
          } else if (changeR && blockW - (startX - curX) > changeSize * 2) {
            this.selectNode.w = Math.round(curX - startX + blockW);
          }
          if (changeT && startY - curY + blockH > changeSize * 2) {
            this.selectNode.h = Math.round(startY - curY + blockH);
            this.selectNode.y = Math.round(blockY - (startY - curY));
          } else if (changeB) {
            this.selectNode.h = Math.round(curY - startY + blockH);
          }
          this.startDraw();
        }
      }
      e.stopPropagation();
      return false;
    };

    const canvasTouchEnd = (event) => {
      hasTouchStart = false;
      const e = formatEvent(event);
      // 若点击事件不在已存在的block区域内，并且点击结束时位移 - 开始时位移 < 2，才需要绘制此点击元素
      if (!calcTouchInSideBlock(e) && Math.abs(e.clientX - startX) < 2 && Math.abs(e.clientY - startY) < 2) {
        handleDomToBlock(e);
      }
    };

    const { scale, width, height } = this.config;
    this.dom.canvas = createDom({
      tag: 'canvas',
      attr: {
        style: {
          top: 0,
          left: 0,
          position: 'fixed',
          'z-index': 99998,
          transform: `scale(${1 / scale})`,
          'transform-origin': 'left top',
        },
        width: width * scale,
        height: height * scale,
      },
      events: {
        [eventMap.TouchStart]: canvasTouchStart,
        [eventMap.TouchMove]: canvasTouchMove,
        [eventMap.TouchEnd]: canvasTouchEnd,
      },
      parent: this.dom.container,
    });
    this.canvasContext = this.dom.canvas.getContext('2d');
  }
  initMask() {
    this.dom.mask = createDom({
      tag: 'div',
      attr: {
        style: {
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          'z-index': 99997,
          position: 'fixed',
          'pointer-events': 'none',
          'background-color': 'rgba(255,255,255,0.76)',
        },
      },
      parent: this.dom.container,
    });
  }
  initTools() {
    let isClick = false;
    let barCurY;
    let barStartY;
    let isMove = false;
    const tools = createDom({
      tag: 'div',
      attr: {
        style: {
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          'z-index': 99999,
          'background-color': 'rgba(0,0,0,0.5)',
        },
      },
      events: {
        [eventMap.TouchStart]: (evt) => {
          isMove = true;
          barCurY = parseInt(tools.style.top);
          barStartY = evt.clientY || evt.targetTouches[0]['clientY'];
        },
        [eventMap.TouchMove]: (evt) => {
          if (isMove) {
            let moveY = evt.clientY || evt.targetTouches[0]['clientY'];
            let sy = barCurY + moveY - barStartY;
            sy = sy < 0 ? 0 : sy;
            sy =
              sy + parseInt(tools.offsetHeight) > this.config.height
                ? this.config.height - parseInt(tools.offsetHeight)
                : sy;
            tools.style.top = sy + 'px';
            evt.stopPropagation();
            return false;
          }
        },
        [eventMap.TouchEnd]: () => {
          isMove = false;
        },
      },
      children: [
        {
          tag: 'div',
          attr: {
            style: {
              width: '100%',
              display: 'flex',
              'align-items': 'center',
              'flex-wrap': 'wrap',
            },
          },
          children: [
            // 按钮-生成块
            {
              tag: 'span',
              attr: {
                style: {
                  color: '#fff',
                  'font-size': '12px',
                  padding: '5px',
                  'border-radius': '3px',
                  margin: '5px',
                  'background-color': 'rgb(64,158,255)',
                },
              },
              events: {
                click: (event) => {
                  if (!isClick) {
                    isClick = true;
                    event.target.style.backgroundColor = 'rgba(64,158,255,0.5)';
                    const selectNode = this.selectNode;
                    if (selectNode && !selectNode.block) {
                      selectNode.block = true;
                      selectNode.id = createId();
                      (selectNode.color = selectNode.color || this.config.color.fillColor),
                        this.drawList.push(selectNode);
                      this.selectNode = null;
                      this.startDraw();
                      this.$message({
                        type: 'success',
                        message: '生成成功',
                      });
                    } else {
                      this.maskwarn();
                      this.$message({
                        type: 'danger',
                        message: '生成失败',
                      });
                    }
                    isClick = false;
                    event.target.style.backgroundColor = 'rgb(64,158,255)';
                  }
                },
              },
              text: '生成块',
            },
            // 按钮-合并块
            {
              tag: 'span',
              attr: {
                style: {
                  color: '#fff',
                  'font-size': '12px',
                  padding: '5px',
                  'border-radius': '3px',
                  margin: '5px',
                  'background-color': 'rgb(230,162,60)',
                },
              },
              events: {
                click: (event) => {
                  if (!isClick) {
                    isClick = true;
                    event.target.style.backgroundColor = 'rgba(230,162,60,0.5)';
                    const selectNode = this.selectNode;
                    if (selectNode && Array.isArray(selectNode.childs) && !selectNode.merge) {
                      const childsId = {};
                      selectNode.childs.forEach((child) => {
                        childsId[child.id] = true;
                      });
                      this.drawList = this.drawList.filter((item) => {
                        return childsId[item.id] ? false : true;
                      });
                      const cur = cloneDeep(selectNode);
                      cur.merge = true;
                      this.drawList.push(cur);
                      this.selectNode = null;
                      this.startDraw();
                      this.$message({
                        type: 'success',
                        message: '合并成功',
                      });
                    } else {
                      this.maskwarn();
                      this.$message({
                        type: 'danger',
                        message: '合并失败',
                      });
                    }
                    isClick = false;
                    event.target.style.backgroundColor = 'rgb(230,162,60)';
                  }
                },
              },
              text: '合并块',
            },
            // 按钮-一键生成骨架
            {
              tag: 'span',
              attr: {
                style: {
                  color: '#fff',
                  'font-size': '12px',
                  padding: '5px',
                  'border-radius': '3px',
                  margin: '5px',
                  'background-color': 'rgb(103,194,58)',
                },
              },
              events: {
                click: (event) => {
                  if (!isClick) {
                    isClick = true;
                    event.target.style.backgroundColor = 'rgba(103,194,58,0.5)';
                    autoCreateSkeleton({
                      rootNode: '#root',
                    }).then((data) => {
                      this.drawList = data.map((item) => {
                        return {
                          ...item,
                          color: this.config.color.fillColor,
                          block: true,
                          id: createId(),
                        };
                      });
                      this.startDraw();
                      this.$message({
                        type: 'success',
                        message: '已成功生成骨架',
                      });
                      isClick = false;
                      event.target.style.backgroundColor = 'rgb(103,194,58)';
                    });
                  }
                },
              },
              text: '一键生成骨架',
            },
            // 按钮-一键清空
            {
              tag: 'span',
              attr: {
                style: {
                  color: '#fff',
                  'font-size': '12px',
                  padding: '5px',
                  'border-radius': '3px',
                  margin: '5px',
                  'background-color': 'rgb(245,108,108)',
                },
              },
              events: {
                click: (event) => {
                  if (!isClick) {
                    isClick = true;
                    event.target.style.backgroundColor = 'rgba(245,108,108,0.5)';
                    this.selectNode = null;
                    this.drawList = [];
                    this.startDraw();
                    this.$message({
                      type: 'success',
                      message: '已清空',
                    });
                    isClick = false;
                    event.target.style.backgroundColor = 'rgb(245,108,108)';
                  }
                },
              },
              text: '一键清空',
            },
            // 按钮-生成文件
            {
              tag: 'span',
              attr: {
                style: {
                  color: '#fff',
                  'font-size': '12px',
                  padding: '5px',
                  'border-radius': '3px',
                  margin: '5px',
                  'background-color': 'rgb(103,194,58)',
                },
              },
              events: {
                click: (event) => {
                  if (!isClick) {
                    event.target.style.backgroundColor = 'rgba(103,194,58, 0.3)';
                    isClick = true;
                    const data = JSON.stringify({
                      scale: this.config.scale,
                      dw: this.config.width,
                      dh: this.config.height,
                      dcolor: '#f4f4f4',
                      blocks: formatExportData(this.drawList),
                    });
                    const fileInfo = getFileInfo();
                    axios
                      .post('http://127.0.0.1:8082/local/v1/skeleton/create', {
                        data,
                        filePath: fileInfo.path,
                        fileName: fileInfo.name,
                      })
                      .then((res) => {
                        res = res.data;
                        if (res.code === 0) {
                          this.$message({
                            message: '已成功生成文件！',
                            type: 'success',
                          });
                        } else {
                          this.$message({
                            message: '生成失败，请检查服务日志！',
                            type: 'danger',
                          });
                        }
                        isClick = false;
                        event.target.style.backgroundColor = 'rgb(103,194,58)';
                      })
                      .catch(() => {
                        this.$message({
                          message: '请开启服务！',
                          type: 'danger',
                        });
                        isClick = false;
                        event.target.style.backgroundColor = 'rgb(103,194,58)';
                      });
                  }
                },
              },
              text: '生成文件',
            },
            // 按钮-X
            {
              tag: 'span',
              attr: {
                style: {
                  color: '#fff',
                  'font-size': '12px',
                  width: '20px',
                  height: '20px',
                  'line-height': '20px',
                  'text-align': 'center',
                  'border-radius': '50%',
                  margin: '5px',
                  'background-color': 'rgb(0,0,0)',
                },
              },
              events: {
                click: () => {
                  if (!isClick) {
                    isClick = true;
                    this.hideContainer();
                    isClick = false;
                  }
                },
              },
              text: 'X',
            },
          ],
        },
        {
          tag: 'div',
          attr: {
            style: {
              display: 'flex',
              'align-items': 'center',
              'justify-content': 'flex-start',
              'flex-wrap': 'wrap',
            },
          },
          children: [
            { key: 'X', value: 'x' },
            { key: 'Y', value: 'y' },
            { key: 'Z', value: 'z' },
            { key: '宽', value: 'w' },
            { key: '高', value: 'h' },
            { key: '颜色', value: 'color' },
          ].map((item) => ({
            tag: 'div',
            attr: {
              style: {
                width: '33%',
                display: 'flex',
                padding: '5px',
              },
            },
            children: [
              {
                tag: 'span',
                attr: {
                  style: {
                    color: '#fff',
                    width: '28px',
                    height: '16px',
                    'text-align': 'right',
                    'margin-right': '5px',
                  },
                },
                text: item.key,
              },
              {
                tag: 'input',
                attr: {
                  style: {
                    flex: 1,
                    width: 0,
                    color: '#fff',
                    height: '16px',
                    'background-color': 'transparent',
                    border: '1px dashed #fff',
                    'border-radius': '2px',
                    'text-align': 'center',
                  },
                  name: item.value,
                  class: 'skeleton-toolinfo-input',
                },
                events: {
                  change: (e) => {
                    const el = e.target;
                    const name = el.getAttribute('name');
                    let value = el.value;
                    el.value = value = value.replace(/\s+/g, '');
                    if (name !== 'color') {
                      el.value = value = parseInt(value);
                    }
                    if (this.selectNode && this.selectNode.block) {
                      this.selectNode[name] = value;
                      this.startDraw();
                    }
                  },
                },
              },
            ],
          })),
        },
      ],
      parent: this.dom.container,
    });
    this.dom.tools = tools;
  }
  initGlobalEvent() {
    const KeyMap = {
      Del: 46, // 删除
      Backspace: 8,
      Up: 38, // 上
      Down: 40, // 下
      Left: 37, // 左
      Right: 39, // 右
      KeyC: 67, // 复制
      KeyV: 86, // 粘贴
      KeyB: 66, // 显示
      KeyH: 72, // 隐藏
    };
    let copyNode = null;
    window.addEventListener(
      'keydown',
      (evt) => {
        // 如果是按下了显示/隐藏的快捷键，则不再继续往下走
        if ([KeyMap.KeyB, KeyMap.KeyH].includes(evt.keyCode) && (evt.metaKey || evt.ctrlKey)) {
          switch (evt.keyCode) {
            case KeyMap.KeyB:
              this.showContainer();
              break;
            case KeyMap.KeyH:
              this.hideContainer();
              break;
          }
          evt.preventDefault();
          return false;
        }
        const selectNode = this.selectNode;
        if (selectNode) {
          const tagName = evt.target.tagName;
          // 未成块但选中后，允许删除
          if (!selectNode.block) {
            if ((evt.keyCode === KeyMap.Del || evt.keyCode === KeyMap.Backspace) && tagName !== 'INPUT') {
              this.selectNode = null;
              this.startDraw();
              evt.preventDefault();
              return false;
            }
          }
          if (selectNode.block) {
            if ((evt.keyCode === KeyMap.Del || evt.keyCode === KeyMap.Backspace) && tagName !== 'INPUT') {
              this.drawList = this.drawList.filter((item) => {
                return item.id === selectNode.id ? false : true;
              });
              this.selectNode = null;
              this.startDraw();
              evt.preventDefault();
              return false;
            } else if (evt.keyCode === KeyMap.Up && tagName !== 'INPUT') {
              selectNode.y -= evt.ctrlKey ? 10 : 1;
              this.startDraw();
              evt.preventDefault();
              return false;
            } else if (evt.keyCode === KeyMap.Down && tagName !== 'INPUT') {
              selectNode.y += evt.ctrlKey ? 10 : 1;
              this.startDraw();
              evt.preventDefault();
              return false;
            } else if (evt.keyCode === KeyMap.Left && tagName !== 'INPUT') {
              selectNode.x -= evt.ctrlKey ? 10 : 1;
              this.startDraw();
              evt.preventDefault();
              return false;
            } else if (evt.keyCode === KeyMap.Right && tagName !== 'INPUT') {
              selectNode.x += evt.ctrlKey ? 10 : 1;
              this.startDraw();
              evt.preventDefault();
              return false;
            } else if (evt.keyCode === KeyMap.KeyC && (evt.metaKey || evt.ctrlKey)) {
              copyNode = cloneDeep(selectNode);
              evt.preventDefault();
              return false;
            } else if (evt.keyCode === KeyMap.KeyV && (evt.metaKey || evt.ctrlKey)) {
              const cur = cloneDeep(copyNode);
              cur.x += 20;
              cur.y += 20;
              cur.id = createId();
              this.drawList.push(cur);
              this.selectNode = cur;
              this.startDraw();
              evt.preventDefault();
              return false;
            }
          }
        }
      },
      true,
    );
  }
  startDraw() {
    const { width, height, scale } = this.config;
    this.canvasContext.clearRect(0, 0, width * scale, height * scale);
    this.drawList.sort((a, b) => {
      return a.z < b.z ? -1 : 1;
    });
    toDrawList({
      ctx: this.canvasContext,
      scale: scale,
      list: this.drawList,
      select: this.selectNode,
    });
    const inputList = this.dom.tools.querySelectorAll('.skeleton-toolinfo-input');
    if (this.selectNode) {
      inputList.forEach((item) => {
        if (item.name === 'color') {
          item.value = this.selectNode[item.name] || this.config.color.fillColor;
        } else {
          item.value = this.selectNode[item.name];
        }
      });
      toDrawSelect({
        ctx: this.canvasContext,
        scale: scale,
        node: this.selectNode,
        color: this.config.color,
      });
    } else {
      inputList.forEach((item) => {
        item.value = '';
      });
    }
  }
  maskwarn() {
    this.dom.mask.style.backgroundColor = '#ef9b9bc2';
    setTimeout(() => {
      this.dom.mask.style.backgroundColor = '#ffffffc2';
    }, 100);
  }
  showContainer() {
    this.dom.container.style.display = 'block';
  }
  hideContainer() {
    this.dom.container.style.display = 'none';
  }
}

if (!window.YHSkeletonTools) {
  class YHSkeletonTools {
    constructor() {
      this.skeletonTools = new SkeletonTools();
    }
    show() {
      this.skeletonTools.showContainer();
    }
    hide() {
      this.skeletonTools.hideContainer();
    }
  }
  window.YHSkeletonTools = new YHSkeletonTools();
}
