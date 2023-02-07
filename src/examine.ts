/**
 * 类型判断
 * @param {unknown} parameter
 * @param {string | string[]} type
 * @returns {string | boolean}
 */
export function assertionType(parameter: unknown): string
export function assertionType(
  parameter: unknown,
  type: string | string[]
): boolean
export function assertionType(parameter: unknown, type?: string | string[]) {
  const typeMap = {
    '': 'null',
  }
  const objType =
    typeMap[Object.prototype.toString.call(parameter)] ??
    Object.prototype.toString
      .call(parameter)
      .slice(8)
      .slice(0, -1)
      .toLowerCase()

  const pType =
    typeMap[Object.prototype.toString.call(type)] ??
    Object.prototype.toString.call(type).slice(8).slice(0, -1).toLowerCase()

  if (pType === 'string') return type === objType
  if (pType === 'array') return type.includes(objType)
  return objType
}

/**
 * 判断是否是对象
 * @param {unknown} parameter
 * @returns {boolean}
 */
export function isObject(parameter: unknown) {
  return assertionType(parameter, 'object')
}
/**
 * 判断是否是数组
 * @param {unknown} parameter
 * @returns {boolean}
 */
export function isArray(parameter: unknown) {
  return assertionType(parameter, 'array')
}

/**
 * 判断对象或数组是否不为空
 * @param obj
 * @returns {boolean}
 */
export function isNotEmpty(obj) {
  let isEmptyFlog = false
  if (assertionType(obj, ['undefined', 'null'])) isEmptyFlog = true
  if (assertionType(obj, 'object')) isEmptyFlog = JSON.stringify(obj) === '{}'
  if (assertionType(obj, 'array')) isEmptyFlog = obj.length <= 0
  return !isEmptyFlog
}

/**
 * 判断对象或数组是否为空
 * @param obj
 * @returns {boolean}
 */
export function isEmpty(obj) {
  return !isNotEmpty(obj)
}
