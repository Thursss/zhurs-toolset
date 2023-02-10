import { assertionType } from './examine'
import {
  isEmpty,
  isString,
  isArray,
  isDate,
  isNumber,
  toString,
  toNumber,
  isObject,
  floor,
  cloneDeep,
} from 'lodash-es'

/**
 * @description: 格式化时间
 * @param {string | number | Date} date
 * @param {string} format
 * @return {string}
 */
export function formatDate(
  date: string | number | Date = new Date(),
  format = 'YY-MM-dd hh:mm:ss'
) {
  if (!isDate(date)) date = new Date(date)

  const o = {
    'Y+': (<Date>date).getFullYear(), // year
    'M+': (<Date>date).getMonth() + 1, //month
    'd+': (<Date>date).getDate(), //day
    'h+': (<Date>date).getHours(), //hour
    'm+': (<Date>date).getMinutes(), //minute
    's+': (<Date>date).getSeconds(), //second
    'q+': Math.floor(((<Date>date).getMonth() + 3) / 3), //quarter
    S: (<Date>date).getMilliseconds(), //millisecond
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
 * @param {string} path
 * @param {string | string[]} variable
 * @return {string | object}
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

type sliceType = number | string[] | { [key: string]: string | number }
type sliceFormatype = {
  daySlice: sliceType
  hoursSlice?: sliceType
  minutesSlice?: sliceType
  secondSlice?: sliceType
}
type sliceFormatMapType = { [key in keyof sliceFormatype]: object }

/**
 * @description:
 * @param {sliceFormatype} sliceFormat
 * @param {string} date
 * @param {*} delay
 * @return {*}
 */
export function timeSlice(
  sliceFormat: sliceFormatype = {
    daySlice: 4,
    minutesSlice: 12,
    secondSlice: 6,
    hoursSlice: 3,
  },
  date: string | number | Date = '2023-02-10 12:00:00',
  delay = 1000 * 60 * 60 * 13
) {
  // TODO 待完善
  if (!isDate(date)) date = new Date(date)

  const sliceFormatMap: sliceFormatMapType = {
    daySlice: {},
    hoursSlice: {},
    minutesSlice: {},
    secondSlice: {},
  }

  const timeSliceArrMap = {
    daySlice: [],
    hoursSlice: [],
    minutesSlice: [],
    secondSlice: [],
  }

  // 开始时间
  const startYear = toNumber(formatDate(date, 'YY'))
  const startMonth = toNumber(formatDate(date, 'MM'))
  const startDay = toNumber(formatDate(date, 'dd'))
  const startHours = toNumber(formatDate(date, 'hh'))
  const startMinutes = toNumber(formatDate(date, 'hh'))
  const startSeconds = toNumber(formatDate(date, 'ss'))

  // 延长后时间
  const delayStartYear = toNumber(formatDate((<Date>date).getTime() + delay, 'YY'))
  const delayStartMonth = toNumber(formatDate((<Date>date).getTime() + delay, 'MM'))
  const delayStartDay = toNumber(formatDate((<Date>date).getTime() + delay, 'dd'))
  const delayStartHours = toNumber(formatDate((<Date>date).getTime() + delay, 'hh'))
  const delayStartMinutes = toNumber(formatDate((<Date>date).getTime() + delay, 'hh'))
  const delayStartSeconds = toNumber(formatDate((<Date>date).getTime() + delay, 'ss'))

  // 格式化日期对应表
  for (const sliceItem in sliceFormat) {
    const sliceItemValue = sliceFormat[sliceItem]
    if (isNumber(sliceItemValue)) {
      if (sliceItem === 'daySlice') {
        for (let i = startDay; i < startDay + <number>sliceItemValue; i++) {
          if (i < delayStartDay) continue
          const key = `${startYear}-${startMonth}-${toString(i).padStart(
            2,
            '0'
          )}`
          sliceFormatMap[sliceItem][key] = key
        }
      } else if (sliceItem === 'hoursSlice') {
        const interval = 24 / <number>sliceItemValue
        for (let i = 0; i < 24; i += interval) {
          // if (i < delayStartHours) continue
          const key = `${toString(floor(i)).padStart(2, '0')}`
          sliceFormatMap[sliceItem][key] = key
        }
      } else if (sliceItem === 'minutesSlice') {
        const interval = 60 / <number>sliceItemValue
        for (let i = 0; i < 60; i += interval) {
          // if (i < delayStartMinutes) continue
          const key = `${toString(floor(i)).padStart(2, '0')}`
          sliceFormatMap[sliceItem][key] = key
        }
      } else if (sliceItem === 'secondSlice') {
        const interval = 60 / <number>sliceItemValue
        for (let i = 0; i < 60; i += interval) {
          // if (i < delayStartSeconds) continue
          const key = `${toString(floor(i)).padStart(2, '0')}`
          sliceFormatMap[sliceItem][key] = key
        }
      }
    } else if (isArray(sliceItemValue)) {
      ;(<string[]>sliceItemValue).forEach((key) => {
        sliceFormatMap[sliceItem][key] = key
      })
    } else if (isObject(sliceItemValue)) {
      for (const key in <object>sliceItemValue) {
        sliceFormatMap[sliceItem][key] = sliceItem[key]
      }
    }

    for (const key in sliceFormatMap[sliceItem]) {
      const value = sliceFormatMap[sliceItem][key]
      timeSliceArrMap[sliceItem].push({
        value,
        label: key,
        children: [],
      })
    }
  }

  const minutesSliceArr = timeSliceArrMap.minutesSlice.map((timeSliceArrs) => ({
    ...timeSliceArrs,
    children: cloneDeep(timeSliceArrMap.secondSlice),
  }))
  const hoursSliceArr = timeSliceArrMap.hoursSlice.map((timeSliceArrs) => ({
    ...timeSliceArrs,
    children: cloneDeep(minutesSliceArr),
  }))
  const daySliceArr = timeSliceArrMap.daySlice.map((timeSliceArrs) => ({
    ...timeSliceArrs,
    children: cloneDeep(hoursSliceArr),
  }))

  return daySliceArr
}
