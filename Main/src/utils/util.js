import moment from 'moment'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'

export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

export function bytesToSize (bytes) {
  if (bytes === 0) {
    return '0B'
  }
  const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}

export function toFixed (number, n) {
  let result = number.toString()
  const arr = result.split('.')
  const integer = arr[0]
  let decimal = arr[1]
  if (decimal === undefined) {
    decimal = '0000000000000000'
  } else {
    decimal += '0000000000000000'
  }
  result = integer + '.' + decimal.substr(0, n)
  const last = decimal.substr(n, 1)
  // 四舍五入，转换为整数再处理，避免浮点数精度的损失
  if (parseInt(last, 10) >= 5) {
    const x = Math.pow(10, n)
    result = ((parseFloat(result) * x) + 1) / x
    result = result.toFixed(n)
  }
  return result
}

export const formatDuration = (value, baseUnit) => {
  const duration = moment.duration(toMillis(value, baseUnit))
  const asDays = Math.floor(duration.asDays()); const hours = duration.hours(); const minutes = duration.minutes()
  let str = ''
  if (asDays !== 0) {
    str += asDays + '天'
  }
  if (hours !== 0) {
    str += hours + '小时'
  }
  if (minutes !== 0) {
    str += minutes + '分'
  }
  str += duration.seconds() + '秒'
  return str
}

export const formatMillis = (value, baseUnit) => {
  const duration = moment.duration(toMillis(value, baseUnit))
  return `${moment.duration(duration).asMilliseconds().toFixed(0)} ms`
}

export const toMillis = (value, baseUnit) => {
  switch (baseUnit) {
    case 'nanoseconds':
      return value / 1000000
    case 'microseconds':
      return value / 1000
    case 'milliseconds':
      return value
    case 'seconds':
    default:
      return value * 1000
  }
}
/**
 * @description 格式化金额
 * @param number：要格式化的数字
 * @param decimals：保留几位小数 默认0位
 * @param decPoint：小数点符号 默认.
 * @param thousandsSep：千分位符号 默认为,
 */
export const formatMoney = (number, decimals = 2, decPoint = '.', thousandsSep = ',') => {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  const sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
  const dec = (typeof decPoint === 'undefined') ? '.' : decPoint
  let s = ''
  const toFixedFix = function (n, prec) {
    const k = Math.pow(10, prec)
    return '' + Math.ceil(n * k) / k
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  const re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

/**
 * @description 数组分成二维数组
 * @param array：数组
 * @param subGroupLength：分组长度
 */
export const group = (array, subGroupLength) => {
  let index = 0
  const newArray = []
  while (index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength))
  }
  return newArray
}

const BYTE_UNITS = [
  'B',
  'kB',
  'MB',
  'GB',
  'TB',
  'PB',
  'EB',
  'ZB',
  'YB'
]

const BIT_UNITS = [
  'b',
  'kbit',
  'Mbit',
  'Gbit',
  'Tbit',
  'Pbit',
  'Ebit',
  'Zbit',
  'Ybit'
]
const toLocaleString = (number, locale) => {
  let result = number
  if (typeof locale === 'string') {
    result = number.toLocaleString(locale)
  } else if (locale === true) {
    result = number.toLocaleString()
  }

  return result
}
export const prettyBytes = (number, options) => {
  if (!Number.isFinite(number)) {
    throw new TypeError(`Expected a finite number, got ${typeof number}: ${number}`)
  }

  options = Object.assign({ bits: false }, options)
  const UNITS = options.bits ? BIT_UNITS : BYTE_UNITS

  if (options.signed && number === 0) {
    return ' 0 ' + UNITS[0]
  }

  const isNegative = number < 0
  const prefix = isNegative ? '-' : (options.signed ? '+' : '')

  if (isNegative) {
    number = -number
  }

  if (number < 1) {
    const numberString = toLocaleString(number, options.locale)
    return prefix + numberString + ' ' + UNITS[0]
  }

  const exponent = Math.min(Math.floor(Math.log10(number) / 3), UNITS.length - 1)
  // eslint-disable-next-line unicorn/prefer-exponentiation-operator
  number = Number((number / Math.pow(1000, exponent)).toPrecision(3))
  const numberString = toLocaleString(number, options.locale)

  const unit = UNITS[exponent]

  return prefix + numberString + ' ' + unit
}

export const getToken = function () {
    return storage.get(ACCESS_TOKEN)
}
/**
 * 把columns中的方法名转换为指向的方法
 * 这里修改了传入的columns
 */
 export function handleJsonColumns (columns, vm) {
  return columns.map(column => {
     const { title, customRender } = column
     if (title && typeof title === 'string') {
       if (title.includes('i18n:')) { column.title = i18nRender(title.slice(5)) }
       if (title.includes('()=>')) { column.title = vm[title.slice(4)] }
      }
     if (customRender && typeof customRender === 'string') {
      if (customRender.includes('date:')) {
        let format = customRender.slice(5)
        format === '-' && (format = 'YYYY-MM-DD HH:mm:ss')
         column.customRender = (text) => (moment(text).format(format) || '')
        }
      if (customRender.includes('=>')) {
        column.customRender = vm[customRender.slice(4)]
       }
     }

   return column
   })
 }
/**
 * 递归获取 list 的 所有 keys值
 * @param {*} param0
 * @returns
 */

 export function getTreeKeys ({ list = [], childrenName = 'children', keyName = 'key' }) {
  const childrenKeys = []
  const listKeys = list.map(item => {
    childrenKeys.push(...getTreeKeys({ list: item[childrenName] || [], childrenName, keyName }))
    return item[keyName]
  })
  listKeys.push(...childrenKeys)
  return listKeys
}
/**
 * 递归获取 值为keyValue 的 item
 * @param {} param0
 * @returns
 */
export function getTreeItem ({ list = [], childrenName = 'children', keyName = 'key', keyValue }) {
  let item = null
  for (let i = 0; i < list.length; i++) {
    const element = list[i]
    if (element[keyName] === keyValue) {
      item = element
      break
    }
    const children = element[childrenName]
    if (children && children.length > 0) {
      item = getTreeItem({ list: children, childrenName, keyName, keyValue })
      if (item) break
    }
  }
  return item
}
/**
 * 通过组件实例查找挂载点
 * @param {*} instance
 * @returns
 */
export const findDOMNode = instance => {
  let node = instance && (instance.$el || instance)
  while (node && !node.tagName) {
      node = node.nextSibling
  }
  return node
}
/**
 * 判断节点n是否在 root节点范围内
 * @param {*} root
 * @param {*} n
 * @returns
 */
export function contains (root, n) {
  var node = n
  while (node) {
      if (node === root) {
          return true
      }
      node = node.parentNode
  }

  return false
}
/**
 * 用于 I18 mergeLocaleMessage
 * 将多级对象转换为一级用于语言包的动态扩展 如{ key.key.key:value}
 * @param {*} param0
 * @returns
 */
export function getMessages ({ data = {}, pKey = '' }) {
  const message = {}
  for (const k in data) {
    const item = data[k]
    if (Object.prototype.toString.call(item) === '[object Object]') {
      Object.assign(
        message,
        getMessages({ data: item, pKey: `${pKey}${k}.` })
      )
    } else {
      message[`${pKey}${k}`] = item
    }
  }
  return message
}
