import './global.less';
import { canUseDom } from '../src/utils/can-use-dom';

if (canUseDom) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  document.addEventListener('touchstart', () => {}, true);
}
