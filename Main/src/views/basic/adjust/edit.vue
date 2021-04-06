<style scoped>
</style>
<template>
  <a-modal
    title="信息"
    :confirmLoading="submitLoading"
    :visible="visible"
    @ok="onSubmit"
    @cancel="handleCancel">
    <a-form-model
      ref="fcExcrateAdjustForm"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6}"
      :wrapper-col="{ span: 14 }">
      <a-row>
        <a-spin :spinning="loading">
          <a-col span="24">
            <a-form-model-item label="汇率类型" prop="typeId">
              <a-select v-model="formData.typeId" placeholder="请选择" @change="onSelectedRate($event)">
                <a-select-option v-for="item in typeIds" :key="item.id" :value="item.id" >
                  {{ item.typeName }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item label="标准币种" prop="curId">
              <a-select @change="curIdChange" v-model="formData.curId" placeholder="请选择">
                <a-select-option v-for="item in curIds" :key="item.id" :value="item.id">
                  {{ item.curName }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item label="报价币种" prop="referCurId">
              <a-select @change="referCurIdChange" v-model="formData.referCurId" placeholder="请选择">
                <a-select-option v-for="item in curIds" :key="item.id" :value="item.id">
                  {{ item.curName }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="preTime" label="执行日期" prop="preTime">
              <a-date-picker
                style="width: 100%"
                :format="dateFormat"
                v-model="formData.preTime"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="oldExchangeRate" label="原汇率" prop="oldExchangeRate">
                <money-input :disabled="diasabledInput" symbol="" :precision="precision" v-model="formData.oldExchangeRate"></money-input>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="newExchangeRate" label="即期汇率" prop="newExchangeRate">
                <money-input  symbol="" :precision="precision" v-model="formData.newExchangeRate"></money-input>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="foreignExchangePurchase" label="汇买价" prop="foreignExchangePurchase">
                <money-input  symbol=""  :precision="precision"   v-model="formData.foreignExchangePurchase"></money-input>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="foreignExchangeSell" label="汇卖价" prop="foreignExchangeSell">
                <money-input  symbol=""  :precision="precision"  v-model="formData.foreignExchangeSell"></money-input>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="foreignExchangeMiddle" label="中间价" prop="foreignExchangeMiddle">
                <money-input  symbol="" :precision="precision" v-model="formData.foreignExchangeMiddle"></money-input>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="rmk" label="备注" prop="rmk">
              <a-input v-model="formData.rmk"/>
            </a-form-model-item>
          </a-col>
        </a-spin>
      </a-row>
    </a-form-model>
    <a-button
      @click="saveTmp"
      type="primary"
      style="top: 100%;
      left: 88%"
    >暂存
    </a-button>
  </a-modal>
</template>
<script>
    import { addAdjust, getAdjust, updateAdjust, listRateType, listCruId, getOldRate } from '@/api/adjust'
    import dateUtil from '@/utils/date'
    import MoneyInput from '@/components/CustomInput/MoneyInput.vue'
    export default {
        name: 'EditModal',
        components: { MoneyInput },
        data () {
            return {
                precision: '2',
                diasabledInput: true,
                typeIds: [],
                curIds: [],
                visible: false,
                submitLoading: false,
                loading: false,
                formData: {
                    typeId: '',
                    curId: '',
                    referCurId: '',
                    preTime: '',
                    oldExchangeRate: '',
                    newExchangeRate: '',
                    rmk: '',
                    foreignExchangePurchase: '',
                    foreignExchangeSell: '',
                    foreignExchangeMiddle: ''
                },
                dateFormat: 'YYYY-MM-DD',
                rules: {
                    typeId: [{ required: true, message: '请填写汇率类型', trigger: 'blur' }],
                    curId: [{ required: true, message: '请填写标准币种', trigger: 'blur' }],
                    referCurId: [{ required: true, message: '请填写报价币种', trsigger: 'blur' }],
                    preTime: [{ required: true, message: '请填写执行日期', trigger: 'change' }],
                    // oldExchangeRate: [{ required: true, message: '请填写原汇率', trigger: 'change' }],
                    newExchangeRate: [{ required: true, message: '请填写即期汇率', trigger: 'blur' },
                        {
                            trigger: 'change',
                            pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
                            message: '请填写数字'
                        }],
                    rmk: [{ required: false, message: '请填写备注', trigger: 'blur' }],
                    // status: [{required: false, message: '请填写状态', trigger: 'blur'}],
                    // createdTime: [{required: false, message: '请填写创建时间', trigger: 'blur'}],
                    // createdBy: [{required: false, message: '请填写创建人', trigger: 'blur'}],
                    // updateTime: [{required: false, message: '请填写更新时间', trigger: 'blur'}],
                    foreignExchangePurchase: [{ required: false, message: '请填写汇买价', trigger: 'blur' },
                        {
                            trigger: 'change',
                            pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
                            message: '请填写数字'
                        }],
                    foreignExchangeSell: [{ required: false, message: '请填写汇卖价', trigger: 'blur' },
                        {
                            trigger: 'change',
                            pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
                            message: '请填写数字'
                        }],
                    foreignExchangeMiddle: [{ required: false, message: '请填写中间价', trigger: 'blur' },
                        {
                            trigger: 'change',
                            pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
                            message: '请填写数字'
                        }]
                }
            }
        },
        // 组件创建完成
        created () {
            this.listRateType()
            this.listCruId()
        },
        methods: {
            onSelectedRate (event) {
                this.typeIds.map(e => {
                    if (e.id === event) {
                        this.precision = e.decimalPlaces
                    }
                })
            },
            handleInput (e) {
                e.target.value = e.target.value.replace(/[^\d.]/g, '').replace(/^0{1,}/g, '')
                // 通过正则过滤小数点后两位
                e.target.value = (e.target.value.match(/^\d*(\.?\d{0,3})/g)[0]) || null
            },
            getRate () {
                var _this = this
                this.formData.preTime = dateUtil.dateTime(this.formData.preTime)
                getOldRate(this.formData).then(res => {
                    _this.formData.oldExchangeRate = res.data
                })
            },
            curIdChange (val) {
                if (this.formData.referCurId) {
                    this.getRate()
                }
            },
            referCurIdChange (val) {
                if (this.formData.curId) {
                    this.getRate()
                }
            },
            listRateType () {
                var _this = this
                listRateType().then(res => {
                    if (res.success) {
                        _this.typeIds = res.data
                    } else {
                        _this.typeIds = []
                    }
                })
            },
            listCruId () {
                var _this = this
                listCruId().then(res => {
                    if (res.success) {
                        _this.curIds = res.data
                    } else {
                        _this.curIds = []
                    }
                })
            },
            // 显示弹框
            showModal (id) {
                this.visible = true
                if (id) {
                    this.loading = true
                    getAdjust(id).then((response) => {
                        if (response.success) {
                            response.data.preTime = dateUtil.dateTime(response.data.preTime)
                            this.formData = response.data
                        } else {
                            this.$message.error(response.msg)
                        }
                        this.loading = false
                    })
                }
            },
            handleCancel () {
                this.visible = false
                this.formData = {}
                this.$refs.fcExcrateAdjustForm && this.$refs.fcExcrateAdjustForm.resetFields()
            },
            onSubmit () {
                const _this = this
                this.$refs.fcExcrateAdjustForm.validate(valid => {
                    if (!valid) {
                        return false
                    }
                    let request
                    this.formData.preTime = dateUtil.dateTime(this.formData.preTime)
                    this.formData.status = '11'
                    if (this.formData.id) {
                        request = updateAdjust(this.formData)
                    } else {
                        request = addAdjust(this.formData)
                    }
                    this.submitLoading = true
                    request.then((response) => {
                        if (response.success) {
                            _this.$message.success('操作成功')
                            _this.visible = false
                            _this.$emit('refreshTable')
                            _this.handleCancel()
                        } else {
                            if (response.code === '00020000') {
                                _this.$message.error(response.msg + ',' + response.data)
                            } else {
                                _this.$message.error(response.msg)
                            }
                        }
                        this.submitLoading = false
                    })
                })
            },
            // 暂存
            saveTmp () {
                const _this = this
                this.$refs.fcExcrateAdjustForm.validate(valid => {
                    if (!valid) {
                        return false
                    }
                    let request
                    this.formData.preTime = dateUtil.dateTime(this.formData.preTime)
                    this.formData.status = '0'
                    if (this.formData.id) {
                        request = updateAdjust(this.formData)
                    } else {
                        request = addAdjust(this.formData)
                    }
                    this.submitLoading = true
                    request.then((response) => {
                        if (response.success) {
                            _this.$message.success('操作成功')
                            _this.visible = false
                            _this.$emit('refreshTable')
                            _this.handleCancel()
                        } else {
                            if (response.code === '00020000') {
                                _this.$message.error(response.msg + ',' + response.data)
                            } else {
                                _this.$message.error(response.msg)
                            }
                        }
                        this.submitLoading = false
                    })
                })
            }
        }
    }
</script>
