<template>
  <a-form-model
    ref="countryCust"
    :model="formData"
    :label-col="{ span: 6}"
    :wrapper-col="{ span: 14 }">
    <a-card :bordered="false">
      <a-descriptions title="国家地区详情">
        <a-descriptions-item label="国家">{{ formData.nameZh }}</a-descriptions-item>
        <a-descriptions-item></a-descriptions-item>
        <a-descriptions-item></a-descriptions-item>
        <a-descriptions-item label="英文名称">{{ formData.nameEn }}</a-descriptions-item>
        <a-descriptions-item label="币种">{{ formData.curId }}</a-descriptions-item>
        <a-descriptions-item label="简称">{{ formData.enCode }}</a-descriptions-item>
        <a-descriptions-item label="编码">{{ formData.code }}</a-descriptions-item>
        <a-descriptions-item label="时区">{{ formData.timeZoneId }}</a-descriptions-item>
        <a-descriptions-item label="是否有效">{{ formData.validSign }}</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px"/>
      <div class="ant-descriptions-title"> 地区 </div>
      <a-table
        style="margin-bottom: 24px"
        row-key="id"
        :pagination="false"
        :columns="columnsNative"
        :dataSource="formData.formDataList">
      </a-table>
    </a-card>
  </a-form-model>

</template>

<script>
    import { getCountryCust } from '@/api/countryCust'
    import { dict, dictGroup } from '@/components/Dict/dictUtil'
    const columnsNative = [
        {
            title: '中文名称',
            dataIndex: 'nameZh',
            key: 'nameZh',
            scopedSlots: { customRender: 'nameZh' }
        },
        {
            title: '英文名称',
            dataIndex: 'nameEn',
            key: 'nameEn',
            scopedSlots: { customRender: 'nameEn' }
        },
        {
            title: '代码',
            dataIndex: 'code',
            key: 'code',
            scopedSlots: { customRender: 'code' }
        },
        {
            title: '时区',
            dataIndex: 'timeZoneId',
            key: 'timeZoneId',
            scopedSlots: { customRender: 'timeZoneId' }
        }
    ]
    export default {
        name: 'DescriptionsModal',
        props: ['id'],
        data () {
            return {
                count: 1,
                columnsNative,
                form: this.$form.createForm(this),
                formData: {
                    enCode: '',
                    nameEn: '',
                    nameZh: '',
                    countryId: '',
                    curId: '',
                    timeZoneId: '',
                    validSign: '',
                    formDataList: [{
                        nameZh: '',
                        nameEn: '',
                        code: '',
                        timeZoneId: ''
                    }]
                }
            }
        },
        async mounted () {
            this.id && this.showModal(this.id)
            await dictGroup('validSign')
        },
        methods: {
            // 显示弹框
            showModal (id) {
                if (id) {
                    this.loading = true
                    getCountryCust(id).then((response) => {
                        if (response.success) {
                            this.formData = response.data
                            this.formData.validSign = dict('validSign', this.formData.validSign + '')
                        } else {
                            this.$message.error(this.$t(response.msg))
                        }
                        this.loading = false
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
