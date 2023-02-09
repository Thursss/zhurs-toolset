import { isArray } from './examine'

/**
 * 数组扁平化
 * @param arr
 * @param key
 * @returns
 */
export function flatten(arr: any[], key = 'key') {
  return [].concat(
    ...arr.map((item) =>
      item[key] && isArray(item[key])
        ? [].concat(item, ...flatten(item[key], key))
        : item
    )
  )
}
