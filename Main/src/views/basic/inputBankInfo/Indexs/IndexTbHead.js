import dateUtil from '@/utils/date'

export default {
    methods: {
        createdTimeTitle () {
            return this.$t('common.createdTime')
        },
        updateTimeTitle () {
            return this.$t('common.updateTime')
        },
        actionTitle () {
            return this.$t('common.field.action')
        },
        createdRender (text, row) {
            return dateUtil.dateTime(row.createdTime)
        },
        updateTimeRender (text, row) {
            return dateUtil.dateTime(row.updateTime)
        }
    }
}
