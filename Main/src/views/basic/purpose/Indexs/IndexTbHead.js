import dateUtil from '@/utils/date'
import { i18nRender } from '@/locales'

export default {
  methods: {
    createdTimeTitle () { return i18nRender('common.field.createdTime') },
    updateTimeTitle () { return i18nRender('common.field.updateTime') },
    actionTitle () { return i18nRender('common.table.column.operation') },
    createdRender (text, row) { return dateUtil.dateTime(row.createdTime) },
    updateTimeRender (text, row) { return dateUtil.dateTime(row.updateTime) }
  }
}
