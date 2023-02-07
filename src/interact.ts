/**
 * 防抖
 * @param {Function} fn
 * @param {number} delay
 * @param {boolean} callNow
 * @returns {Function}
 */
export function debounce(fn: Function, delay = 300, callNow = true) {
  let timer: any = null
  return function (...arg) {
    callNow && !timer && fn.call(this, ...arg)
    if (timer !== null) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, ...arg)
    }, delay)
  }
}

/**
 * 节流
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export function throttle(fn: Function, delay = 300) {
  let timer = null
  return function (...arg) {
    if (timer !== null) return
    timer = setTimeout(() => {
      fn.apply(this, arg)
      timer = null
    }, delay)
  }
}
