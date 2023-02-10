import { assertionType } from './examine'
import { isEmpty, isString, isArray } from 'lodash-es'

/**
 * @description: 格式化时间
 * @param {Date} date
 * @param {String} format
 * @return {string}
 */
export function formatDate(date = new Date(), format = 'YY-MM-dd hh:mm:ss') {
  if (!date) return null
  if (!assertionType(date, 'date')) date = new Date(Number(date))

  const o = {
    'Y+': date.getFullYear(), // year
    'M+': date.getMonth() + 1, //month
    'd+': date.getDate(), //day
    'h+': date.getHours(), //hour
    'm+': date.getMinutes(), //minute
    's+': date.getSeconds(), //second
    'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
    S: date.getMilliseconds(), //millisecond
  }

  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, o[k].toString().padStart(2, '0'))
    }
  }
  return format
}

/**
 * @description: 解析url参数
 * @param {*} path
 * @param {*} variable
 * @return {*}
 */
export function getQueryVariable(path: string, variable: string): string
export function getQueryVariable(path: string, variable: string[]): object
export function getQueryVariable(
  path: string,
  variable?: string | string[]
): string | object {
  if (!isString(path)) return {}
  const query = path.substr(path.indexOf('?') + 1)
  const vars = query.split('&')
  const varObj = {}

  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    varObj[pair[0]] = pair[1]
  }

  if (assertionType(variable, ['null', 'undefined'])) return varObj
  if (isString(variable)) return varObj[variable as string]
  if (isArray(variable)) {
    const targetVars = {}
    ;(variable as string[]).forEach((targetVar) => {
      targetVars[targetVar] = varObj[targetVar]
    })
    return targetVars
  }
}

/**
 * @description: 生成url参数
 * @param {object} obj
 * @return {string}
 */
export function createQueryVariable(obj: object): string {
  if (!obj || assertionType(obj, ['object', 'map']) || isEmpty(obj)) return ''
  let variable = '?'
  for (const key in obj) {
    variable += `${key}=${obj[key]}&`
  }
  return variable.slice(0, -1)
}
