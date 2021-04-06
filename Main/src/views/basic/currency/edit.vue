<style scoped>
</style>
<template>
  <a-modal
    :title="$t('basic.currency.add')"
    :confirmLoading="submitLoading"
    :visible="visible"
    @ok="onSubmit"
    @cancel="handleCancel"
    width="80%">
    <a-form-model
      ref="btCurrencyForm"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6}"
      :wrapper-col="{ span: 14 }">
      <a-row>
        <a-spin :spinning="loading">
          <a-col span="24">
            <a-form-model-item ref="curCode" :label="$t('basic.currency.field.curCode')" prop="curCode">
              <a-input v-model="formData.curCode"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="curName" :label="$t('basic.currency.field.curName')" prop="curName">
              <a-input v-model="formData.curName"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item
              ref="englishCode"
              :label="$t('basic.currency.field.englishCode')"
              prop="englishCode">
              <a-input v-model="formData.englishCode"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item
              ref="curExrate"
              :label="$t('basic.currency.field.curExrate')"
              prop="curExrate">
              <a-input v-model="formData.curExrate"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="curSign" :label="$t('basic.currency.field.curSign')" prop="curSign">
              <a-input v-model="formData.curSign"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item
              ref="pbScaleCode"
              :label="$t('basic.currency.field.pbScaleCode')"
              prop="pbScaleCode">
              <a-input v-model="formData.pbScaleCode"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="rmk" :label="$t('basic.currency.field.rmk')" prop="rmk">
              <a-input v-model="formData.rmk"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item
              ref="validSign"
              :label="$t('basic.currency.field.validSign')"
              prop="validSign">
              <dict-select
                v-model="formData.validSign"
                dictGroup="validSign"
                type="radio"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item
              ref="nonworkDayRule"
              :label="$t('basic.currency.field.nonworkDayRule')"
              prop="nonworkDayRule">
              <a-select
                v-model="formData.nonworkDayRule"
                style="width: 100%">
                <a-select-option
                  v-for="(d,index) in nonWorkDayRuleAgs"
                  :key="index"
                  :value="d.nonworkDayRule">
                  {{ d.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          {{ formData.nonworkDay }}
          <a-col span="24">
            <a-form-model-item
              ref="nonworkDay"
              :label="$t('basic.currency.field.nonworkDay')"
              prop="nonworkDay">
              <a-checkbox @change="chooseAll" :checked="checked">{{ $t('basic.currency.field.checkAll') }}
              </a-checkbox>
              <a-checkbox-group v-model="formData.nonworkDay">
                <a-checkbox
                  @change="choose"
                  v-for="item in nonWorkDayAgs"
                  :key="item.nonworkDay"
                  :label="item.name"
                  :value="item.nonworkDay">{{ item.name }}
                </a-checkbox>
              </a-checkbox-group>
            </a-form-model-item>
          </a-col>
        </a-spin>
      </a-row>
    </a-form-model>
  </a-modal>
</template>
<script>
    import { addCurrency, getCurrency, updateCurrency } from '@/api/currency'
    import { dict, dictGroup } from '@/components/Dict/dictUtil'

    export default {
        name: 'EditModal',
        data () {
            return {
                checked: false,
                nonWorkDayAgs: [],
                nonWorkDayAgsS: [],
                nonWorkDayRuleAgsS: [],
                nonWorkDayRuleAgs: [],
                validSign: '1',
                checkedList: [],
                indeterminate: false,
                checkAll: true,
                visible: false,
                submitLoading: false,
                loading: false,
                formData: {
                    curCode: '',
                    curName: '',
                    englishCode: '',
                    curExrate: '',
                    curSign: '',
                    pbScaleCode: '',
                    rmk: '',
                    validSign: '',
                    nonworkDayRule: '',
                    nonworkDay: ''
                },
                rules: {
                    curCode: [{ required: true, message: this.$t('basic.currency.message'), trigger: 'blur' }],
                    curName: [{ required: true, message: this.$t('basic.currency.message'), trigger: 'blur' }],
                    englishCode: [{ required: true, message: this.$t('basic.currency.message'), trigger: 'blur' },
                        { trigger: 'change', pattern: /^[A-Za-z]+$/, message: this.$t('basic.currency.message') }
                    ],
                    curExrate: [{ required: true, message: this.$t('basic.currency.message'), trigger: 'blur' },
                        {
                            trigger: 'change',
                            pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
                            message: this.$t('basic.currency.messageNumber')
                        }
                    ],
                    curSign: [{ required: false, message: this.$t('basic.currency.message'), trigger: 'blur' }],
                    pbScaleCode: [{ required: false, message: this.$t('basic.currency.message'), trigger: 'blur' }],
                    rmk: [{ required: false, message: this.$t('basic.currency.message'), trigger: 'blur' }],
                    validSign: [{ required: false, message: this.$t('basic.currency.message'), trigger: 'blur' }],
                    nonworkDayRule: [{ required: false, message: this.$t('basic.currency.message'), trigger: 'blur' }],
                    nonworkDay: [{ required: false, message: this.$t('basic.currency.message'), trigger: 'blur' }]
                }
            }
        },
        async mounted () {
            // 加载指定字典组
            await dictGroup('btPurpose.sysBusType', 'validSign')
            // 加载指定字典组-非工作日设置
            this.nonWorkDayAgsS = (await dictGroup('btCurrency.nonWorkDay'))['btCurrency.nonWorkDay'] || []
            this.nonWorkDayAgs = this.nonWorkDayAgsS.map(r =>
                ({
                    nonworkDay: r.value,
                    name: r.name
                })
            )
            // 加载指定字典组-非工作日规则
            this.nonWorkDayRuleAgsS = (await dictGroup('btCurrency.nonWorkDayRule'))['btCurrency.nonWorkDayRule'] || []
            this.nonWorkDayRuleAgs = this.nonWorkDayRuleAgsS.map(r =>
                ({
                    nonworkDayRule: r.value,
                    name: r.name
                })
            )
        },
        methods: {
            // 有效标识
            radioChange (value) {
                this.validSign = value.target.value
            },
            // 非工作日规则选择
            handleChange (value) {
                this.nonworkDayRule = `${value}`
            },
            // 全选
            chooseAll (e) {
                if (e.target.checked) {
                    this.formData.nonworkDay = this.nonWorkDayAgs.map(item => item.nonworkDay)
                    this.checked = true
                    console.log(this.formData.nonworkDay)
                } else {
                    this.formData.nonworkDay = []
                    this.checked = false
                }
            },
            // 单选
            choose () {
                if (this.formData.nonworkDay.length == 6) {
                    this.checked = true
                } else {
                    this.checked = false
                }
                console.log(this.formData.nonworkDay)
            },
            // 显示弹框
            showModal (id) {
                this.visible = true
                if (id) {
                    this.loading = true
                    getCurrency(id).then((response) => {
                        if (response.success) {
                            this.formData = response.data
                            this.formData = response.data
                            // 默认的非工作日设置
                            this.checkedList = this.formData.nonworkDay.split(',')
                            this.formData.nonworkDay = this.checkedList
                        } else {
                            this.$message.error(this.$t(response.msg))
                        }
                        this.loading = false
                    })
                }
            },

            handleCancel () {
                this.visible = false
                this.formData = {}
                this.$refs.btCurrencyForm && this.$refs.btCurrencyForm.resetFields()
            },
            onSubmit () {
                const _this = this
                this.$refs.btCurrencyForm.validate(valid => {
                    if (!valid) {
                        return false
                    }
                    if (this.checkedList == []) {
                        return false
                    } else {
                        this.formData.nonworkDay = this.checkedList.toString()
                    }
                    this.formData.validSign = this.validSign
                    this.formData.nonworkDayRule = this.nonworkDayRule
                    let request
                    if (this.formData.id) {
                        request = updateCurrency(this.formData)
                    } else {
                        request = addCurrency(this.formData)
                    }
                    this.submitLoading = true
                    request.then((response) => {
                        if (response.success) {
                            _this.$message.success(response.msg)
                            _this.visible = false
                            _this.$emit('refreshTable')
                            _this.handleCancel()
                        } else {
                            if (response.code === '00020000') {
                                _this.$message.error(response.msg + ',' + response.data)
                            } else {
                                _this.$message.error(response.msg + ',' + response.data)
                            }
                        }
                        this.submitLoading = false
                    })
                })
            }
        }
    }
</script>
