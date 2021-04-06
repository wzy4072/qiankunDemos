<style scoped>
</style>
<template>
  <a-modal
    title="信息"
    :confirmLoading="submitLoading"
    :visible="visible"
    @ok="onSubmit"
    :destroyOnClose="true"
    :maskClosable="false"
    @cancel="handleCancel"
    width="200">
    <a-form-model
      ref="countryCustForm"
      v-model="formData"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6}"
      :wrapper-col="{ span: 14 }">
      <a-row>
        <a-spin :spinning="loading">
          <a-col span="24">
            <a-form-model-item hidden ref="sysId" label="国家id" prop="sysId">
              <a-input v-model="formData.sysId"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="nameZh" label="中文名称" prop="nameZh">
              <a-select
                v-model="formData.nameZh"
                placeholder="请选择"
                show-search
                :filter-option="filterOption"
                option-filter-prop="children"
                @change="selectChange">
                <a-select-option
                  v-for="countryDetail in countryCustData"
                  :key="countryDetail.id"
                  :label="countryDetail.nameZh"
                  :value="countryDetail.id">
                  {{ countryDetail.nameZh }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="nameEn" label="英文名称" prop="nameEn">
              <a-input v-model="formData.nameEn" :disabled="true"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="curId" label="币种" prop="curId">
              <a-select v-model="formData.curId" placeholder="请选择" @change="getTapByStripe">
                <a-select-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.englishCode"
                  :value="item.id">
                  {{ item.englishCode }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="enCode" label="简称" prop="enCode">
              <a-input v-model="formData.enCode"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="code" label="代码" prop="code">
              <a-input v-model="formData.code"/>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="timeZoneId" label="时区" prop="timeZoneId">
              <a-select v-model="formData.timeZoneId" placeholder="请选择" @change="getTime">
                <a-select-option
                  v-for="item in times"
                  :key="item.id"
                  :label="item.timeZone"
                  :value="item.id">
                  {{ item.timeZone }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col span="24">
            <a-form-model-item ref="validSign" label="有效标志" prop="validSign">
              <a-radio-group v-model="formData.validSign" :defaultValue="Number(formData.validSign)">
                <a-radio value="0">
                  无效
                </a-radio>
                <a-radio value="1">
                  有效
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
        </a-spin>
      </a-row>
    </a-form-model>
    <!--关于新增table表格-->
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 25 }">
      <a-button class="editable-add-btn" @click="handleAdd">
        Add
      </a-button>
      <a-table bordered :data-source="dataSource" :columns="columns" rowkey="key">
        <template
          slot="nameZh"
          slot-scope="text, record, index"
        >
          <a-form-item>
            <a-input
              v-decorator="[index +'_nameZh', { rules: [{ required: true, message: '请输入中文名称' }] }]"
              size="default"/>
          </a-form-item>
        </template>
        <template slot="nameEn" slot-scope="text, record, index">
          <a-form-item>
            <a-input
              v-decorator="[index +'_nameEn', { rules: [{ required: true, message: '请输入英文名称' }] }]"
              size="default"/>
          </a-form-item>
        </template>
        <template slot="code" slot-scope="text, record, index">
          <a-form-item>
            <a-input
              v-decorator="[index +'_code', { rules: [{ required: true, message: '请输入代码' }] }]"
              size="default"/>
          </a-form-item>
        </template>
        <template slot="timeZoneId" slot-scope="text, record, index">
          <a-form-item>
            <a-select
              size="default"
              v-decorator="[index + '_timeZoneId', { rules: [{ required: true, message: '请选择时区' }] }]"
              placeholder="请选择"
              @change="getTime">
              <a-select-option
                v-for="item in times"
                :key="item.id"
                :label="item.timeZone"
                :value="item.id">
                {{ item.timeZone }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.key)"
          >
            <div v-if="isShow">
              <a href="javascript:;">Delete</a>
            </div>
            <div v-else>
              <a href="javascript:;"></a>
            </div>
          </a-popconfirm>
        </template>
      </a-table>
    </a-form>
  </a-modal>
</template>
<script>
    import {
        getNameZhs,
        getTimePlace,
        getTapByStripeid,
        addCountryCust,
        getCountryCust,
        updateCountryCust
    } from '@/api/countryCust'
    import AFormModelItem from 'ant-design-vue/es/form-model/FormItem'

    export default {
        name: 'EditModal',
        components: { AFormModelItem },
        data () {
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this, { name: 'coordinated' }),
                dataSource: [
                    {
                        key: '0',
                        nameZh: '',
                        nameEn: '',
                        code: '',
                        timeZoneId: ''
                    }
                ],
                count: 1,
                columns: [
                    {
                        title: '中文名称',
                        dataIndex: 'nameZh',
                        width: '20%',
                        scopedSlots: { customRender: 'nameZh' }
                    },
                    {
                        title: '英文名称',
                        dataIndex: 'nameEn',
                        width: '20%',
                        scopedSlots: { customRender: 'nameEn' }
                    },
                    {
                        title: '代码',
                        dataIndex: 'code1',
                        width: '20%',
                        scopedSlots: { customRender: 'code' }
                    },
                    {
                        title: '时区',
                        dataIndex: 'timeZoneId1',
                        width: '20%',
                        scopedSlots: { customRender: 'timeZoneId' }
                    },
                    {
                        title: '操作',
                        dataIndex: 'operation',
                        scopedSlots: { customRender: 'operation' }
                    }
                ],
                // 搜索 展开/关闭
                advanced: false,
                visible: false,
                submitLoading: false,
                disable: true,
                loading: false,
                id: '',
                isShow: false,
                options: [],
                times: [],
                countryCustData: [],
                countryCustOne: {},
                timeZones: [],
                formData: {
                    nameZh: '',
                    curId: '',
                    enCode: '',
                    code: '',
                    timeZoneId: '',
                    validSign: '1',
                    nameEn: '',
                    sysId: '',
                    formDataList: []
                },
                // value: this.text,
                rules: {
                    nameZh: [{ required: true, message: '请填写中文名称', trigger: 'blur' }],
                    nameEn: [{ required: true, message: '请填写英文名称', trigger: 'blur' }],
                    curId: [{ required: true, message: '请选择币种', trigger: 'blur' }],
                    enCode: [{ required: true, message: '请填写简称', trigger: 'blur' }],
                    code: [{ required: true, message: '请填写代码', trigger: 'blur' }],
                    timeZoneId: [{ required: true, message: '请选择时区', trigger: 'blur' }],
                    validSign: [{ required: true, message: '请选择有效标志', trigger: 'blur' }]
                }
            }
        },
        mounted () {
            this.loadaaa()
            this.getTapByStripe()
            this.getTime()
            this.getTimeZone()
        },
        methods: {
            onDelete (key) {
                const dataSource = [...this.dataSource]
                this.dataSource = dataSource.filter(item => item.key !== key)
                if (this.dataSource.length !== 1) {
                    this.isShow = true
                } else {
                    this.isShow = false
                }
            },
            handleAdd () {
                const { count, dataSource } = this
                const newData = {
                    key: count,
                    nameZh: '',
                    nameEn: '',
                    code1: '',
                    timeZoneId: ''
                }
                this.dataSource = [...dataSource, newData]
                this.count = count + 1
                this.isShow = true
            },
            // 自加载关于国家汉字名称的数据的数据
            loadaaa () {
                getNameZhs().then(res => {
                    this.countryCustData = res.data
                })
            },
            selectChange (value) {
                const countryCustOne = this.countryCustData.filter(item => item.id === value)[0]
                this.formData.nameEn = countryCustOne.nameEn
                this.formData.sysId = countryCustOne.id
            },
            // 显示弹框
            showModal (id) {
                this.visible = true
                if (id) {
                    this.loading = true
                    getCountryCust(id).then((response) => {
                        if (response.code === '00000001') {
                            this.formData = response.data
                            this.$set(this.formData, 'validSign', response.data.validSign)
                        } else {
                            this.$message.error(response.msg)
                        }
                        this.loading = false
                    })
                } else {
                    this.$set(this.formData, 'validSign', '1')
                }
            },
            getTapByStripe () {
                getTapByStripeid().then(res => {
                    this.options = res.data
                })
            },
            getTime () {
                getTimePlace().then(res => {
                    this.times = res.data
                })
            },
            getTimeZone () {
                getTimePlace().then(res => {
                    this.timeZones = res.data
                })
            },
            filterOption (input, option) {
                return (
                    option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
                )
            },
            handleCancel () {
                this.visible = false
                this.formData = {}
                this.$refs.countryCustForm && this.$refs.countryCustForm.resetFields()
            },
            onSubmit () {
                const _this = this
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values)
                        this.formData.formDataList.push(values)
                    }
                })
                this.$refs.countryCustForm.validate(valid => {
                    if (!valid) {
                        return false
                    }
                    let request
                    console.log(this.formData)
                    if (this.formData.id) {
                        request = updateCountryCust(this.formData)
                    } else {
                        request = addCountryCust(this.formData)
                    }
                    this.submitLoading = true
                    request.then((response) => {
                        if (response.code === '00000001') {
                            _this.$message.success(response.msg)
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
<style>
    .editable-cell {
        position: relative;
    }

    .editable-cell-input-wrapper,
    .editable-cell-text-wrapper {
        padding-right: 24px;
    }

    .editable-cell-text-wrapper {
        padding: 5px 24px 5px 5px;
    }

    .editable-cell-icon,
    .editable-cell-icon-check {
        position: absolute;
        right: 0;
        width: 20px;
        cursor: pointer;
    }

    .editable-cell-icon {
        line-height: 18px;
        display: none;
    }

    .editable-cell-icon-check {
        line-height: 28px;
    }

    .editable-cell:hover .editable-cell-icon {
        display: inline-block;
    }

    .editable-cell-icon:hover,
    .editable-cell-icon-check:hover {
        color: #108ee9;
    }

    .editable-add-btn {
        margin-bottom: 8px;
    }
</style>
