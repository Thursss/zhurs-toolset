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
