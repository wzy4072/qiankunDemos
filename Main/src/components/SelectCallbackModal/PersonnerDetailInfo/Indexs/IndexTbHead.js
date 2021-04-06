import dateUtil from '@/utils/date'
import { i18nRender } from '@/locales'

export default {
  methods: {
    createdTimeTitle () { return i18nRender('common.createdTime') },
    updateTimeTitle () { return i18nRender('common.updateTime') },
    actionTitle () { return this.$t('common.field.action') },
    createdRender (text, row) { return dateUtil.dateTime(row.createdTime) },
    updateTimeRender (text, row) { return dateUtil.dateTime(row.updateTime) }
  }
}
