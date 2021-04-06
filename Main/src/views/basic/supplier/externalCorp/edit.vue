<style scoped>
</style>
<template>
  <a-form-model
    ref="externalCorpForm"
    :model="formData"
    :rules="rules"
    :label-col="{ span: 6}"
    :wrapper-col="{ span: 14 }">
    <a-card style="margin-top: 24px" :bordered="false" :title="$t('basic.externalCorp.title.base')">
      <a-row type="flex" justify="center" align="top">
        <a-col span="12">
          <a-form-model-item ref="code" :label="$t('basic.externalCorp.filed.code')" prop="code">
            <a-input v-model="formData.code"/>
          </a-form-model-item>
        </a-col>
        <a-col span="12">
          <a-form-model-item ref="sourceSystem" :label="$t('basic.externalCorp.filed.sourceSystem')" prop="sourceSystem">
            <dict-select
              v-model="formData.sourceSystem"
              dictGroup="btExternalCorp.sourceSystem"/>
          </a-form-model-item>
        </a-col>
        <a-col span="12">
          <a-form-model-item ref="name" :label="$t('basic.externalCorp.filed.name')" prop="name">
            <a-input v-model="formData.name"/>
          </a-form-model-item>
        </a-col>
        <a-col span="12">
          <a-form-model-item ref="abbreviate" :label="$t('basic.externalCorp.filed.abbreviate')" prop="abbreviate">
            <a-input v-model="formData.abbreviate"/>
          </a-form-model-item>
        </a-col>
        <a-col span="12">
          <a-form-model-item ref="externalType" :label="$t('basic.externalCorp.filed.externalType')" prop="externalType">
            <dict-select
              v-model="formData.externalType"
              dictGroup="btExternalCorp.externalType"/>
          </a-form-model-item>
        </a-col>
        <a-col span="12" >
          <a-form-model-item v-if="formData.externalType === '1' || formData.externalType === '2'" ref="supplierId" :label="$t('basic.externalCorp.filed.supplierId')" prop="supplierId">
            <a-select v-model="formData.supplierId" :placeholder="$t('common.fill.select')" @change="listSupplierType">
              <a-select-option
                v-for="item in options"
                :key="item.id"
                :label="item.supplierName"
                :value="item.id">
                {{ item.supplierName }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col span="12">
          <a-form-model-item ref="bwType" :label="$t('basic.externalCorp.filed.bwType')" prop="bwType">
            <dict-select
              v-model="formData.bwType"
              dictGroup="btExternalCorp.bwType"/>
          </a-form-model-item>
        </a-col>
        <a-col span="12">
        </a-col>
        <a-col span="12">
          <a-form-model-item ref="isNative" :label="$t('basic.externalCorp.filed.isNative')">
            <a-switch v-model="formData.isNative" :checked-children="$t('common.filed.yes')" :un-checked-children="$t('common.filed.no')" @change="initBankList()"/>
          </a-form-model-item>
        </a-col>
        <a-col span="12">
          <a-form-model-item ref="status" :label="$t('basic.externalCorp.filed.status')">
            <a-switch v-model="formData.status" :checked-children="$t('common.filed.yes')" :un-checked-children="$t('common.filed.no')"/>
          </a-form-model-item>
        </a-col>
        <a-col span="12">
          <a-form-model-item ref="sourceSystem" :label="$t('basic.externalCorp.filed.isCommon')" >
            <a-switch v-model="formData.isCommon" :checked-children="$t('common.filed.yes')" :un-checked-children="$t('common.filed.no')"/>
          </a-form-model-item>
        </a-col>
        <a-col span="12">
          <a-form-model-item v-if="!formData.isCommon" ref="corpId" :label="$t('basic.externalCorp.filed.corpId')" prop="corpId">
            <CorpTreeSelect style="width:100%;" v-model="formData.corpId" :checkable="false"/>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" :title="$t('basic.externalCorp.title.link')">
      <a-row type="flex" justify="center" align="top">
        <a-col span="12" v-if="this.formData.isNative">
          <a-form-model-item :label="$t('basic.externalCorp.filed.region')" prop="region">
            <region v-model="formData.region"/>
          </a-form-model-item>
        </a-col>
        <a-col span="12" v-if="!this.formData.isNative">
          <a-form-model-item :label="$t('basic.externalCorp.filed.regionEx')" prop="region" :rules="[{ required: true, message: '所在国家/地区/城市' }]">
            <a-input v-model="formData.province"/>
          </a-form-model-item>
        </a-col>
        <a-col span="12">
          <a-form-model-item ref="address" :label="$t('basic.externalCorp.filed.address')" prop="address">
            <a-input v-model="formData.address"/>
          </a-form-model-item>
        </a-col>
        <a-col span="12">
          <a-form-model-item ref="linkMan" :label="$t('basic.externalCorp.filed.linkMan')" prop="linkMan">
            <a-input v-model="formData.linkMan"/>
          </a-form-model-item>
        </a-col>
        <a-col span="12">
          <a-form-model-item ref="tel" :label="$t('basic.externalCorp.filed.tel')" prop="tel">
            <a-input v-model="formData.tel"/>
          </a-form-model-item>
        </a-col>
        <a-col span="12">
          <a-form-model-item ref="fax" :label="$t('basic.externalCorp.filed.tel')" prop="fax">
            <a-input v-model="formData.fax"/>
          </a-form-model-item>
        </a-col>
        <a-col span="12">
          <a-form-model-item ref="email" :label="$t('basic.externalCorp.filed.email')" prop="email">
            <a-input v-model="formData.email"/>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" :title="$t('basic.externalCorp.title.acc')">
      <a-button type="primary" @click="addRow">新增</a-button>
      <a-table rowKey="id" v-if="this.formData.isNative" :columns="columnsNative" :dataSource="formData.externalCorpBankAcc" :pagination="false">
        <a-form-model-item slot="externalAcc" :rules="[{ required: true, message: '请填写账号' }]" slot-scope="text, record, index" :prop="`externalCorpBankAcc[${index}].externalAcc`">
          <a-input v-model="record.externalAcc" />
        </a-form-model-item>
        <a-form-model-item slot="bank" slot-scope="text, record, index" :prop="`externalCorpBankAcc[${index}].bank`">
          <a-input v-model="record.bank"/>
        </a-form-model-item>
        <a-form-model-item slot="bankSourcecode" :rules="[{ required: true, message: '请填写联行号' }]" slot-scope="text, record, index" :prop="`externalCorpBankAcc[${index}].bankSourcecode`">
          <a-input v-model="record.bankSourcecode" />
        </a-form-model-item>
        <a-form-model-item slot="region" slot-scope="text, record, index" :prop="`externalCorpBankAcc[${index}].region`">
          <region v-model="record.region"/>
        </a-form-model-item>
        <a-form-model-item slot="remark" slot-scope="text, record, index" :prop="`externalCorpBankAcc[${index}].remark`">
          <a-input v-model="record.remark"/>
        </a-form-model-item>
        <a-form-model-item slot="isDefaultAcc" slot-scope="text, record, index" >
          <a-switch v-model="record.isDefaultAcc" :checked-children="$t('common.filed.yes')" :un-checked-children="$t('common.filed.no')"/>
        </a-form-model-item>
        <a-form-model-item slot="operation" slot-scope="text, record, index">
          <a @click="deleteRow(index)">删除</a>
        </a-form-model-item>
      </a-table>
      <a-table rowKey="id" v-if="!this.formData.isNative" :columns="columnsNoNative" :dataSource="formData.externalCorpBankAcc" :pagination="false">
        <a-form-model-item slot="externalAcc" :rules="[{ required: true, message: '请填写账号' }]" slot-scope="text, record, index" :prop="`externalCorpBankAcc[${index}].externalAcc`">
          <a-input v-model="record.externalAcc" />
        </a-form-model-item>
        <a-form-model-item slot="bank" slot-scope="text, record, index" :prop="`externalCorpBankAcc[${index}].bank`">
          <a-input v-model="record.bank"/>
        </a-form-model-item>
        <a-form-model-item slot="bankSourcecode" :rules="[{ required: true, message: '请填写联行号' }]" slot-scope="text, record, index" :prop="`externalCorpBankAcc[${index}].bankSourcecode`">
          <a-input v-model="record.bankSourcecode" />
        </a-form-model-item>
        <a-form-model-item slot="region" slot-scope="text, record, index" :prop="`externalCorpBankAcc[${index}].region`">
          <region v-model="record.region"/>
        </a-form-model-item>
        <a-form-model-item slot="remark" slot-scope="text, record, index" :prop="`externalCorpBankAcc[${index}].remark`">
          <a-input v-model="record.remark"/>
        </a-form-model-item>
        <a-form-model-item slot="isDefaultAcc" slot-scope="text, record, index" >
          <a-switch v-model="record.isDefaultAcc" :checked-children="$t('common.filed.yes')" :un-checked-children="$t('common.filed.no')"/>
        </a-form-model-item>
        <a-form-model-item slot="operation" slot-scope="text, record, index">
          <a @click="deleteRow(index)">删除</a>
        </a-form-model-item>
      </a-table>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false" :title="$t('basic.externalCorp.title.file')">
      <a-row type="flex" justify="center" align="top">
        <a-col span="12">
          <a-form-model-item ref="attachmentId" label="附件ID" prop="attachmentId">
            <a-input v-model="formData.attachmentId"/>
          </a-form-model-item>
        </a-col>
        <a-col span="12">
        </a-col>
      </a-row>
    </a-card>
    <footer-tool-bar class="ant-pro-footer-toolbar">
      <a-button type="button" class="ant-btn ant-btn-primary" @click="onSubmit('0')" :loading="loading">暂存</a-button>
      &nbsp;<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <a-button type="button" class="ant-btn ant-btn-primary" @click="onSubmit('11')" :loading="loading">提交</a-button>
      <!--<a-button type="button" class="ant-btn ant-btn-primary" @click="validate" :loading="loading">重置</a-button>-->
    </footer-tool-bar>
  </a-form-model>

</template>
<script>
    import { addExternalCorp, getExternalCorp, updateExternalCorp } from '@/api/basic/supplier/externalCorp'
    import { dict, dictGroup } from '@/components/Dict/dictUtil'
    import CorpTreeSelect from '@/components/SelectTree/CorpTreeSelect'
    import FooterToolBar from '@/components/FooterToolbar'
    import Region from '@/components/Cascader/region.vue'
    import { listSupplierType } from '@/api/basic/supplier/supplierType'
    import { i18nRender } from '@/locales'
    let rowId = 100

    const columnsNative = [
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.externalAcc'),
            dataIndex: 'externalAcc',
            key: 'externalAcc',
            scopedSlots: { customRender: 'externalAcc' }
        },
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.bank'),
            dataIndex: 'bank',
            key: 'bank',
            scopedSlots: { customRender: 'bank' }
        },
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.bankSourcecode'),
            dataIndex: 'bankSourcecode',
            key: 'bankSourcecode',
            scopedSlots: { customRender: 'bankSourcecode' }
        },
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.region'),
            dataIndex: 'region',
            key: 'region',
            scopedSlots: { customRender: 'region' }
        },
        {
            title: () => i18nRender('common.field.rmk'),
            dataIndex: 'remark',
            key: 'remark',
            scopedSlots: { customRender: 'remark' }
        },
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.isDefaultAcc'),
            dataIndex: 'isDefaultAcc',
            key: 'isDefaultAcc',
            scopedSlots: { customRender: 'isDefaultAcc' }
        },
        {
            title: () => i18nRender('common.table.column.operation'),
            key: 'action',
            scopedSlots: { customRender: 'operation' }
        }
    ]
    const columnsNoNative = [
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.externalAccEx'),
            dataIndex: 'externalAcc',
            key: 'externalAcc',
            scopedSlots: { customRender: 'externalAcc' }
        },
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.bankEx'),
            dataIndex: 'bank',
            key: 'bank',
            scopedSlots: { customRender: 'bank' }
        },
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.bankSourcecodeEx'),
            dataIndex: 'bankSourcecode',
            key: 'bankSourcecode',
            scopedSlots: { customRender: 'bankSourcecode' }
        },
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.regionEx'),
            dataIndex: 'region',
            key: 'region',
            scopedSlots: { customRender: 'region' }
        },
        {
            title: () => i18nRender('common.field.rmk'),
            dataIndex: 'remark',
            key: 'remark',
            scopedSlots: { customRender: 'remark' }
        },
        {
            title: () => i18nRender('basic.externalCorpBankAcc.filed.isDefaultAccEx'),
            dataIndex: 'isDefaultAcc',
            key: 'isDefaultAcc',
            scopedSlots: { customRender: 'isDefaultAcc' }
        },
        {
            title: () => i18nRender('common.table.column.operation'),
            key: 'action',
            scopedSlots: { customRender: 'operation' }
        }
    ]
    export default {
        name: 'EditModal',
        props: ['id'],
        components: { CorpTreeSelect, Region, FooterToolBar },
        data () {
            return {
                count: 1,
                columnsNative,
                columnsNoNative,
                form: this.$form.createForm(this),
                data: [],
                visible: false,
                submitLoading: false,
                loading: false,
                formData: {
                    tenantId: '',
                    name: '',
                    abbreviate: '',
                    region: [],
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
                    status: true,
                    sourceSystem: '',
                    isCommon: true,
                    code: '',
                    isNative: true,
                    externalType: '',
                    supplierId: '',
                    attachmentId: '',
                    auditStatus: '',
                    bwType: '',
                    externalCorpBankAcc: []
                },
                rules: {
                    sourceSystem: [{ required: true, message: '请填写数据来源', trigger: 'blur' }],
                    name: [{ required: true, message: '请填写客户名称', trigger: 'blur' }],
                    externalType: [{ required: true, message: '请填写客商类型', trigger: 'blur' }],
                    bwType: [{ required: true, message: '请填写客商属性', trigger: 'blur' }],
                    supplierId: [{ required: true, message: '请填写供应商类别', trigger: 'blur' }],
                    corpId: [{ required: true, message: '请填写所属单位', trigger: 'blur' }],
                    attachmentId: [{ required: true, message: '请填写附件ID', trigger: 'blur' }]
                }
            }
        },
        // 组件挂载完成
        async mounted () {
            this.listSupplierType()
            this.showModal(this.id)
            await dictGroup('btExternalCorp.sourceSystem')
            await dictGroup('yesOrNo')
            await dictGroup('btExternalCorp.bwType')
            await dictGroup('btExternalCorp.externalType')
        },
        methods: {
            listSupplierType () {
                listSupplierType().then(res => {
                    this.options = res.data
                })
            },
            initBankList () {
                this.formData.externalCorpBankAcc = []
            },
            deleteRow (index) {
                this.formData.externalCorpBankAcc.splice(index, 1)
            },
            addRow () {
                rowId++
                const newData = {
                    key: rowId,
                    externalAcc: '',
                    bank: '',
                    bankSourcecode: '',
                    remark: '',
                    isDefaultAcc: false
                }
                this.formData.externalCorpBankAcc.push(newData)
            },
            // 显示弹框
            showModal (id) {
                if (id) {
                    this.loading = true
                    getExternalCorp(id).then((response) => {
                        if (response.success) {
                            this.formData = response.data
                            this.formData.region = [ this.formData.province, this.formData.city ]
                            if (this.formData.status + '' === '1') {
                                this.formData.status = true
                            } else if (this.formData.status + '' === '0') {
                                this.formData.status = false
                            }

                            if (this.formData.isNative + '' === '1') {
                                this.formData.isNative = true
                            } else if (this.formData.isNative + '' === '0') {
                                this.formData.isNative = false
                            }

                            if (this.formData.isCommon + '' === '1') {
                                this.formData.isCommon = true
                            } else if (this.formData.isCommon + '' === '0') {
                                this.formData.isCommon = false
                            }
                            this.formData.externalCorpBankAcc.forEach(function (element, index, array) {
                                if (element.isDefaultAcc + '' === '1') {
                                    element.isDefaultAcc = true
                                } else if (element.isDefaultAcc + '' === '0') {
                                    element.isDefaultAcc = false
                                }
                                element.region = [element.accProvince, element.accCity]
                            })
                        } else {
                            this.$message.error(this.$t(response.msg))
                        }
                        this.loading = false
                    })
                }
            },
            handleCancel () {
                this.visible = false
                this.formData = {
                    tenantId: '',
                    name: '',
                    region: [],
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
                    status: true,
                    sourceSystem: '',
                    isCommon: true,
                    code: '',
                    isNative: true,
                    externalType: '',
                    supplierId: '',
                    attachmentId: '',
                    auditStatus: '',
                    bwType: '',
                    externalCorpBankAcc: []
                }
                this.$refs.externalCorpForm && this.$refs.externalCorpForm.resetFields()
            },
            onSubmit (auditStatus) {
                const _this = this
                this.$refs.externalCorpForm.validate(valid => {
                    if (!valid) {
                        return false
                    }
                    let request
                    const params = this.formData
                    if (this.formData.status === true) {
                        params.status = '1'
                    } else if (this.formData.status === false) {
                        params.status = '0'
                    }

                    if (this.formData.isNative === true) {
                        params.isNative = '1'
                    } else if (this.formData.isNative === false) {
                        params.isNative = '0'
                    }

                    if (this.formData.isCommon === true) {
                        params.isCommon = '1'
                    } else if (this.formData.isCommon === false) {
                        params.isCommon = '0'
                    }
                    params.province = this.formData.region[0]
                    params.city = this.formData.region[1]

                    this.formData.externalCorpBankAcc.forEach(function (element, index, array) {
                        element.accProvince = element.region[0]
                        element.accCity = element.region[1]
                    })
                    params.externalCorpBankAcc = this.formData.externalCorpBankAcc
                    // 提交就是待审核 11 暂存 0
                    params.auditStatus = auditStatus
                    if (this.formData.id) {
                        request = updateExternalCorp(params)
                    } else {
                        request = addExternalCorp(params)
                    }
                    this.submitLoading = true
                    request.then((response) => {
                        if (response.success) {
                            _this.$message.success(_this.$t(response.msg))
                            // _this.visible = false
                            // _this.$emit('refreshTable')
                            // _this.handleCancel()
                            _this.$store.commit('SET_REFRESH_PATH', _this.$route.path)
                            _this.$store.commit('SET_REMOVE_KEY', _this.$route.fullPath)
                        } else {
                            _this.$message.error(_this.$t(response.msg))
                        }
                        this.submitLoading = false
                    })
                })
            }
        }
    }
</script>
