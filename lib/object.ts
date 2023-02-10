import { isEmpty, isObject, cloneDeep } from 'lodash-es'

/**
 * 深拷贝 使用lodah
 * @param {object | any[]} obj
 * @returns {object | any[]}
 */
// export function deepCopy<T>(obj: T[]): T[]
// export function deepCopy<T extends object>(obj: T): T
// export function deepCopy(obj: object | any[]) {
//   const result = isArray(obj) ? [] : {}
//   for (const key in obj) {
//     if (isObject(obj[key]) || isArray(obj[key])) {
//       result[key] = deepCopy(obj[key]) //递归复制
//     } else {
//       result[key] = obj[key]
//     }
//   }
//   return result
// }

/**
 * 深合并
 * @param {object[]} objs
 * @returns {object}
 */
export function deepAssign<T extends object>(...objs: T[]): T {
  if (objs.length === 0) return <T>{}
  if (objs.length === 1) return objs[0]
  const mergeObject = deepMergeObject<T>(objs[0], objs[1])

  objs = objs.slice(2)
  objs.unshift(mergeObject)

  return deepAssign(...objs)
}

/**
 * 深合并
 * @param {object} obj1
 * @param {object} obj2
 * @returns {object}
 */
export function deepMergeObject<T>(obj1: object, obj2: object): T {
  if (isEmpty(obj1) || isEmpty(obj2)) return <T>{ ...obj1, ...obj2 }

  const baseObj = cloneDeep(obj1)
  const mergeObj = cloneDeep(obj2)

  for (const key in baseObj) {
    if (Object.prototype.hasOwnProperty.call(baseObj, key)) {
      if (isObject(baseObj[key]) && isObject(mergeObj[key])) {
        baseObj[key] = deepAssign(baseObj[key], mergeObj[key])
      } else {
        if (mergeObj[key]) baseObj[key] = mergeObj[key]
      }
    }
  }

  return <T>{ ...mergeObj, ...baseObj }
}
