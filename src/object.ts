import { assertionType } from './examine'

type ObjType = { [key: string]: any }

/**
 * 深合并
 * @param {ObjType[]} objs
 * @returns {ObjType}
 */
export function deepAssign(...objs: ObjType[]): ObjType {
  if (objs.length === 0) return {}
  if (objs.length === 1) return objs[0]
  const mergeObject = deepMergeObject(objs[0], objs[1])

  objs = objs.slice(2)
  objs.unshift(mergeObject)

  return deepAssign(...objs)
}

export function deepMergeObject(obj1: ObjType, obj2: ObjType): ObjType {
  return { ...obj1, ...obj2 }
}
