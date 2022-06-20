/**
 * 展示错误警告作用
 */
import { isDev } from './is-dev';

export function devWarning(component: string, message: string): void {
  if (isDev) {
    console.warn(`[react-basic-framework: ${component}] ${message}`);
  }
}

export function devError(component: string, message: string) {
  if (isDev) {
    console.error(`[react-basic-framework: ${component}] ${message}`);
  }
}
