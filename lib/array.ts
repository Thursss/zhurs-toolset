export const p = 1

/**
 * @description: 数组扁平化 使用lodah
 * @param {any[]} arr
 * @param {string} key
 * @return {any[]}
 */
// export function flatten(arr: any[], key = 'key'): any[] {
//   return [].concat(
//     ...arr.map((item) =>
//       item[key] && isArray(item[key])
//         ? [].concat(item, ...flatten(item[key], key))
//         : item
//     )
//   )
// }
