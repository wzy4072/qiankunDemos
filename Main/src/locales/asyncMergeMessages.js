import i18n from '@/locales'
import { getMessages } from '@/utils/util'
import { getMultiLangByPrefix } from '@/api/multiLang'

// 存储 modelNames messages 用于刷新/登陆后的语言包补充
// 登录时要检测 localStroage 用户名是否同当前相同
// 如果不同 1清空local messages  2清空modelNames
// 如果相同 按照modelNames去补充语言包

// 更新本地modelNames messages 同步更新vuex中的modelNames

// 刷新/登录后从本地取值，更新vuex中modulesnames

// 路由守卫 使用vuex中的modulesnames去判断当前modele是否已经加载过messages补充包

// 目前暂不维护vuex 后期更新// 为了掩饰 暂不保存本地

export function checkModuleMessages (moduleName) {
  return i18n.messages[i18n.locale]?.[moduleName] || false
}

export async function loadModuleMessage (moduleName) {
  // console.log('加载 moduleName', moduleName)
  if (!checkModuleMessages('common')) {
    // console.log('未找到common')
 await getMultiLangByPrefix('common').then(res => {
    i18n.mergeLocaleMessage(i18n.locale, getMessages({ data: res.data }))
    i18n.messages[i18n.locale].common = true
    // console.log('已经设置 common')
  })
}
if (checkModuleMessages(moduleName)) return '已加载'

  return getMultiLangByPrefix(moduleName).then(res => {
    const resMessage = getMessages({ data: res.data })
    i18n.mergeLocaleMessage(i18n.locale, resMessage) // 新增语言包
    i18n.messages[i18n.locale][moduleName] = true
  // console.log('加载 moduleName 成功', moduleName)
    return resMessage
  })
}
