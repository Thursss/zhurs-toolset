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
 * 判断是否是字符串 使用lodah
 * @param {unknown} parameter
 * @returns {boolean}
 */
// export function isString(parameter: unknown) {
//   return assertionType(parameter, 'string')
// }
/**
 * 判断是否是对象 使用lodah
 * @param {unknown} parameter
 * @returns {boolean}
 */
// export function isObject(parameter: unknown) {
//   return assertionType(parameter, 'object')
// }
/**
 * 判断是否是数组 使用lodah
 * @param {unknown} parameter
 * @returns {boolean}
 */
// export function isArray(parameter: unknown) {
//   return assertionType(parameter, 'array')
// }

/**
 * 判断对象或数组是否不为空 使用lodah
 * @param {object | any[]} obj
 * @returns {boolean}
 */
// export function isNotEmpty(obj: object | any[]) {
//   let isEmptyFlog = false
//   if (assertionType(obj, ['undefined', 'null'])) isEmptyFlog = true
//   if (assertionType(obj, 'object')) isEmptyFlog = JSON.stringify(obj) === '{}'
//   if (assertionType(obj, 'array')) isEmptyFlog = (<any[]>obj).length <= 0
//   return !isEmptyFlog
// }

/**
 * 判断对象或数组是否为空 使用lodah
 * @param {object | any[]} obj
 * @returns {boolean}
 */
// export function isEmpty(obj: object | any[]) {
//   return !isNotEmpty(obj)
// }

/**
 * @description: 获取设备类型
 * @return {*}
 */
export function deviceInfo() {
  const ua = navigator.userAgent
  const language = navigator.language.toLowerCase()

  const version = {
    isIos: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios 终端
    //isMobile: !!ua.macth(/(iPhone|iPod|iPad|Android|ios)/i), // 是否移动终端
    isMobile: !!ua.match(/AppleWebKit.*Mobile.*/), // 是否移动终端
    isAndroid: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, // android 终端端或者uc 浏览器
    // isAndroid: !!appVersion.match(/android/gi),
    isIphone: ua.indexOf('iPhone') > -1, // 是否为iPhone或则QQHD浏览器
    // isIphone:  !!appVersion.match(/iphone/gi);
    iPad: ua.indexOf('iPad') > -1, // 是否是iPad
    isWebApp: ua.indexOf('Safari') === -1, // 是否为Webapp，没有头部和底部
    isTrident: ua.indexOf('Trident') > -1, //IE内核
    isPresto: ua.indexOf('Presto') > -1, // opera 内核
    isWebKit: ua.indexOf('AppleWebkit') > -1, // 苹果谷歌内核
    isGecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1, //火狐内核
    isWechat: !!ua.match(/micromessenger/gi),
    isWeiBo: !!ua.match(/weibo/gi),
    isQQ: !!ua.match(/qq/gi),
  }
  return {
    version,
    language,
  }
}
