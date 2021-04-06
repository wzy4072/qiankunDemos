<style scoped>
</style>
<template>
  <a-form-model
    ref="externalCorpForm"
    :model="formData"
    :label-col="{ span: 6}"
    :wrapper-col="{ span: 14 }">
    <a-card :bordered="false">
      <a-descriptions :title="$t('basic.externalCorp.title.base')">
        <a-descriptions-item :label="$t('basic.externalCorp.filed.corpId')">{{ formData.corpName }}</a-descriptions-item>
        <a-descriptions-item ></a-descriptions-item>
        <a-descriptions-item ></a-descriptions-item>
        <a-descriptions-item :label="$t('basic.externalCorp.filed.code')">{{ formData.code }}</a-descriptions-item>
        <a-descriptions-item :label="$t('basic.externalCorp.filed.sourceSystem')">{{ formData.sourceSystemName }}</a-descriptions-item>
        <a-descriptions-item :label="$t('basic.externalCorp.filed.name')">{{ formData.name }}</a-descriptions-item>
        <a-descriptions-item :label="$t('basic.externalCorp.filed.abbreviate')">{{ formData.abbreviate }}</a-descriptions-item>
        <a-descriptions-item :label="$t('basic.externalCorp.filed.externalType')">{{ formData.externalTypeName }}</a-descriptions-item>
        <a-descriptions-item v-if="formData.externalType === '1' || formData.externalType === '2'" :label="$t('basic.externalCorp.filed.supplierId')">{{ formData.supplierId }}</a-descriptions-item>
        <a-descriptions-item :label="$t('basic.externalCorp.filed.bwType')">{{ formData.bwTypeName }}</a-descriptions-item>
        <a-descriptions-item :label="$t('basic.externalCorp.filed.isNative')">{{ formData.isNativeName }}</a-descriptions-item>
        <a-descriptions-item :label="$t('basic.externalCorp.filed.status')">{{ formData.statusName }}</a-descriptions-item>
        <a-descriptions-item :label="$t('basic.externalCorp.filed.isCommon')">{{ formData.isCommonName }}</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px"/>
      <a-descriptions :title="$t('basic.externalCorp.title.link')">
        <a-descriptions-item v-if="formData.isNative + '' === '1'" :label="$t('basic.externalCorp.filed.region')">{{ formData.region }}</a-descriptions-item>
        <a-descriptions-item v-if="formData.isNative + '' === '0'" :label="$t('basic.externalCorp.filed.regionEx')">{{ formData.region }}</a-descriptions-item>
        <a-descriptions-item :label="$t('basic.externalCorp.filed.address')">{{ formData.address }}</a-descriptions-item>
        <a-descriptions-item :label="$t('basic.externalCorp.filed.linkMan')">{{ formData.linkMan }}</a-descriptions-item>
        <a-descriptions-item :label="$t('basic.externalCorp.filed.tel')">{{ formData.tel }}</a-descriptions-item>
        <a-descriptions-item :label="$t('basic.externalCorp.filed.tel')">{{ formData.fax }}</a-descriptions-item>
        <a-descriptions-item :label="$t('basic.externalCorp.filed.email')">{{ formData.email }}</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px"/>
      <div class="ant-descriptions-title"> {{ $t('basic.externalCorp.title.acc') }}</div>
      <a-table
        style="margin-bottom: 24px"
        v-if="formData.isNative + '' === '1'"
        row-key="id"
        :pagination="false"
        :columns="columnsNative"
        :dataSource="formData.externalCorpBankAcc">
      </a-table>
      <a-table
        style="margin-bottom: 24px"
        v-if="formData.isNative + '' === '0'"
        row-key="id"
        :pagination="false"
        :columns="columnsNoNative"
        :dataSource="formData.externalCorpBankAcc">
      </a-table>
      <a-divider style="margin-bottom: 32px"/>
      <a-descriptions :title="$t('basic.externalCorp.title.file')">
        <a-descriptions-item label="附件">{{ formData.attachmentId }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <footer-tool-bar class="ant-pro-footer-toolbar">
      <a-button type="button" style="float: right;" class="ant-btn ant-btn-primary" @click="onSubmit('95')" :loading="loading">{{ $t('basic.externalCorp.btn.pass') }}</a-button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a-button type="button" style="float: right;" class="ant-btn ant-btn-primary" @click="onSubmit('-1')" :loading="loading">{{ $t('basic.externalCorp.btn.back') }}</a-button>
      <!--<a-button type="button" class="ant-btn ant-btn-primary" @click="validate" :loading="loading">重置</a-button>-->
    </footer-tool-bar>
    <a-card style="margin-top: 24px" :bordered="false" :title="$t('basic.externalCorp.title.auditMessage')">
      <a-row type="flex" justify="center" align="top">
        <a-col span="12">
          <a-form-model-item ref="attachmentId" :label="$t('basic.externalCorp.title.auditMessage')" prop="attachmentId">
            <a-input type="textarea" v-model="formData.auditMessage"/>
          </a-form-model-item>
        </a-col>
        <a-col span="12">
        </a-col>
      </a-row>
    </a-card>
  </a-form-model>
</template>
<script>
    import { getExternalCorp, audit } from '@/api/basic/supplier/externalCorp'
    import { dict, dictGroup } from '@/components/Dict/dictUtil'
    import { i18nRender } from '@/locales'

    const columnsNative = [
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.externalAcc'),
            dataIndex: 'externalAcc',
            key: 'externalAcc'
        },
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.bank'),
            dataIndex: 'bank',
            key: 'bank'
        },
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.bankSourcecode'),
            dataIndex: 'bankSourcecode',
            key: 'bankSourcecode'
        },
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.region'),
            dataIndex: 'region',
            key: 'region'
        },
        {
            title: () => i18nRender('common.field.rmk'),
            dataIndex: 'remark',
            key: 'remark'
        },
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.isDefaultAcc'),
            dataIndex: 'isDefaultAccName',
            key: 'isDefaultAcc'
        }
    ]
    const columnsNoNative = [
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.externalAccEx'),
            dataIndex: 'externalAcc',
            key: 'externalAcc'
        },
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.bankEx'),
            dataIndex: 'bank',
            key: 'bank'
        },
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.bankSourcecodeEx'),
            dataIndex: 'bankSourcecode',
            key: 'bankSourcecode'
        },
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.regionEx'),
            dataIndex: 'region',
            key: 'region'
        },
        {
            title: () => i18nRender('common.field.rmk'),
            dataIndex: 'remark',
            key: 'remark'
        },
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.isDefaultAccEx'),
            dataIndex: 'isDefaultAccName',
            key: 'isDefaultAcc'
        }
    ]
    export default {
        name: 'EditModal',
        props: ['id'],
        components: { },
        data () {
            return {
                count: 1,
                columnsNative,
                columnsNoNative,
                form: this.$form.createForm(this),
                data: [],
                visible: false,
                submitLoading: false,
                auditFrom: {
                    auditMessage: '',
                    ids: [],
                    auditStatus: ''
                },
                loading: false,
                formData: {
                    tenantId: '',
                    auditMessage: '',
                    name: '',
                    corpName: '',
                    abbreviate: '',
                    externalAcc: '',
                    bank: '',
                    province: '',
                    city: '',
                    corpId: '',
                    linkMan: '',
                    tel: '',
                    fax: '',
                    email: '',
                    address: '',
                    status: '',
                    statusName: '',
                    sourceSystem: '',
                    sourceSystemName: '',
                    isCommon: '',
                    isCommonName: '',
                    code: '',
                    isNative: '',
                    isNativeName: '',
                    externalType: '',
                    externalTypeName: '',
                    supplierId: '',
                    supplierName: '',
                    attachmentId: '',
                    auditStatus: '',
                    auditName: '',
                    bwType: '',
                    bwTypeName: '',
                    externalCorpBankAcc: []
                }
            }
        },
        // 组件挂载完成
        async mounted () {
            this.showModal(this.id)
            await dictGroup('btExternalCorp.sourceSystem')
            await dictGroup('yesOrNo')
            await dictGroup('btExternalCorp.bwType')
            await dictGroup('btExternalCorp.status')
            await dictGroup('btExternalCorp.externalType')
        },
        methods: {
            // 显示弹框
            showModal (id) {
                if (id) {
                    this.loading = true
                    getExternalCorp(id).then((response) => {
                        if (response.success) {
                            this.formData = response.data
                            if (this.formData.isNative + '' === '1') {
                                this.formData.corpName = i18nRender('basic.externalCorp.title.commonCorp')
                            }
                            if (this.formData.isNative + '' === '0') {
                                this.formData.corpName = this.formData.corpId
                            }
                            this.formData.region = this.formData.province + '/' + this.formData.city
                            this.formData.statusName = dict('yesOrNo', this.formData.status + '')
                            this.formData.isNativeName = dict('yesOrNo', this.formData.isNative + '')
                            this.formData.isCommonName = dict('yesOrNo', this.formData.isCommon + '')
                            this.formData.sourceSystemName = dict('btExternalCorp.sourceSystem', this.formData.sourceSystem)
                            this.formData.bwTypeName = dict('btExternalCorp.bwType', this.formData.bwType)
                            this.formData.auditStatusName = dict('btExternalCorp.auditStatus', this.formData.auditStatus)
                            this.formData.externalTypeName = dict('btExternalCorp.externalType', this.formData.externalType)
                            this.formData.externalCorpBankAcc.forEach(function (element, index, array) {
                                element.isDefaultAccName = dict('yesOrNo', element.isDefaultAcc + '')
                                element.region = element.accProvince + '/' + element.accCity
                            })
                        } else {
                            this.$message.error(this.$t(response.msg))
                        }
                        this.loading = false
                    })
                }
            },
            onSubmit (auditStatus) {
                const _this = this
                // 提交就是待审核 11 暂存 0
                this.auditFrom.auditStatus = auditStatus
                this.auditFrom.auditMessage = this.formData.auditMessage
                this.auditFrom.ids = [ this.id ]
                audit(this.auditFrom).then((response) => {
                    if (response.success) {
                        this.$message.success(this.$t(response.msg))
                        _this.$store.commit('SET_REFRESH_PATH', _this.$route.path)
                        _this.$store.commit('SET_REMOVE_KEY', _this.$route.fullPath)
                    } else {
                        this.$message.error(this.$t(response.msg))
                    }
                    this.loading = false
                })
            }
        }
    }
</script>
