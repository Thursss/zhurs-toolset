import { isEmpty, isObject, isArray } from './examine'

/**
 * 深拷贝
 * @param {Object | any[]} obj
 * @returns {Object | any[]}
 */
export function deepCopy(obj: Object | any[]) {
  const result = isArray(obj) ? [] : {}
  for (const key in obj) {
    if (isObject(obj[key]) || isArray(obj[key])) {
      result[key] = deepCopy(obj[key]) //递归复制
    } else {
      result[key] = obj[key]
    }
  }
  return result
}

/**
 * 深合并
 * @param {Object[]} objs
 * @returns {Object}
 */
export function deepAssign(...objs: Object[]): Object {
  if (objs.length === 0) return {}
  if (objs.length === 1) return objs[0]
  const mergeObject = deepMergeObject(objs[0], objs[1])

  objs = objs.slice(2)
  objs.unshift(mergeObject)

  return deepAssign(...objs)
}

/**
 * 深合并
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {Object}
 */
export function deepMergeObject(obj1: Object, obj2: Object): Object {
  if (isEmpty(obj1) || isEmpty(obj2)) return { ...obj1, ...obj2 }

  const baseObj = deepCopy(obj1)
  const mergeObj = deepCopy(obj2)

  for (const key in baseObj) {
    if (Object.prototype.hasOwnProperty.call(baseObj, key)) {
      if (isObject(baseObj[key]) && isObject(mergeObj[key])) {
        baseObj[key] = deepAssign(baseObj[key], mergeObj[key])
      } else {
        if (mergeObj[key]) baseObj[key] = mergeObj[key]
      }
    }
  }

  return { ...mergeObj, ...baseObj }
}
