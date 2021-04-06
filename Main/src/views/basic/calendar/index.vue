<style scoped>
</style>
<template>
  <a-row :gutter="16">
    <a-col span="8">
      <a-form-model>
        <a-radio-group
          v-model="type"
          :defaultValue="1">
          <a-radio value="1">
            地点
          </a-radio>
          <a-radio value="0">
            币种
          </a-radio>
        </a-radio-group>
        <a-form-model-item label="请选择地点" v-if="!type || type == '1'">
          <a-col span="16">
            <table-select
              ref="tableSelect"
              v-model="country"
              :tableDataApi="counter"
              valueKey="id"
              labelKey="nameZh"
              :columns="columns"
              rowKey="id"></table-select>
          </a-col>
        </a-form-model-item>
        <a-form-model-item label="请选择币种" v-if="type == '0'">
          <a-col span="16">
            <a-select
              show-search
              placeholder="请选择"
              option-filter-prop="children"
              style="width: 200px"
              :option="currencyData"
              v-model="currencyId"
              :filter-option="filterOption"
              @focus="handleFocus"
              @blur="handleBlur"
              @change="handleChange"
            >
              <a-select-option v-for="item in currencyData" :key="item.id" :value="item.id">
                {{ item.curName }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-form-model-item>
        <a-form-model-item label="日期区间">
          <a-range-picker
            ref="rangePicker"
            :ranges="ranges"
            :format="dateFormat"
            :value="[this.moment(startDate, dateFormat), this.moment(endDate, dateFormat)]"
            @change="onChangeTime"
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-row type="flex" justify="center" :gutter="8">
            <a-button type="primary" @click="doWorkDay(true)">设置工作日</a-button>
            <a-button type="primary" style="margin-left: 8px" @click="doWorkDay(false)">设置非工作日</a-button>
          </a-row>
        </a-form-model-item>
      </a-form-model>
    </a-col>
    <a-col span="16">
      <full-calendar
        ref="fullCalendar"
        :options="config"
      ></full-calendar>
    </a-col>
  </a-row>
</template>

<script>
    import moment from 'moment'
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import interactionPlugin from '@fullcalendar/interaction'
    import { adjust, listWorkDay } from '@/api/basic/calendar'
    import { searchCountryCust } from '@/api/countryCust'
    import { listCurrency } from '@/api/currency'
    import TableSelect from '@/components/TableSelect/TableSelect'
    import { handleJsonColumns } from '@/utils/util'

    const defaultColumns = [
        {
            title: '地区编码',
            dataIndex: 'code',
            key: 'code',
            isSearch: true,
            width: 220,
            show: true,
            fixed: null
        },
        {
            title: '中文名称',
            dataIndex: 'nameZh',
            key: 'nameZh',
            isSearch: true,
            width: 200,
            show: true,
            fixed: null
        },
        {
            title: '英文名称',
            dataIndex: 'nameEn',
            key: 'nameEn',
            isSearch: true,
            width: 200,
            show: true,
            fixed: null
        }
    ]

    moment.locale('zh-cn')

    export default {
        name: 'WorkingCalendar',
        components: {
            FullCalendar,
            TableSelect
        },
        data () {
            return {
                countryId: '',
                country: {},
                counter: searchCountryCust,
                startDate: new Date(),
                endDate: new Date(),
                type: null,
                columns: handleJsonColumns(defaultColumns, this),
                currencyData: [],
                currencyId: '',
                dateFormat: 'YYYY-MM-DD',
                ranges: {
                    '今天': [moment(), moment()],
                    '本月': [moment(), moment().endOf('month')]
                },
                config: {
                    locale: 'zh',
                    buttonText: {
                        today: '今天',
                        month: '月'
                    },
                    plugins: [dayGridPlugin, interactionPlugin],
                    headerToolbar: {
                        left: 'prev,next,today',
                        center: 'title',
                        right: 'prev,next'
                    },
                    initialView: 'dayGridMonth',
                    editable: false, // 是否可以拖拽编辑
                    selectable: true,
                    firstDay: 1, // 控制周一-1周日-0那个在前面
                    eventClick: this.eventClick, // 点击事件
                    dateClick: this.dateClick, // 点击日程表上面某一天
                    select: this.select, // 选择
                    events: this.queryParam
                },
                calendarApi: null
            }
        },
        watch: {
            type (value) {
                this.checkOut(value)
            },
            countryId (value) {
                this.checkCountryId(value)
            },
            currencyId (value) {
                this.checkCurrencyId(value)
            },
            country (value) {
                this.countryId = value.id
            }
        },
        mounted () {
            this.calendarApi = this.$refs.fullCalendar.getApi()
            /**
             * 获取币别
             */
            this.loadCuurency()
        },
        methods: {
            handleChange (value) {
                this.currencyId = value
            },
            handleBlur () {
            },
            handleFocus () {
            },
            filterOption (input, option) {
                return (
                    option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
                )
            },
            loadCuurency () {
                listCurrency().then(response => {
                    if (response.success) {
                        this.currencyData = response.data
                    } else {
                        this.$message.error(this.$t(response.msg))
                    }
                })
            },
            moment,
            dateClick (info) { // 点击日期
                const _this = this
                _this.startDate = _this.endDate = info.dateStr
            },
            select (selectionInfo) { // 选择日期
                const _this = this
                _this.startDate = selectionInfo.startStr
                _this.endDate = moment(selectionInfo.endStr).subtract(1, 'day').format('YYYY-MM-DD')
            },
            eventClick (info) { // 点击event
                const _this = this
                const event = info.event
                const status = event.title !== '工作日'
                // 为页面的日期控件赋值
                _this.startDate = _this.endDate = event.startStr
                _this.confirmData(status)
            },
            doWorkDay (status) {
                const _this = this
                _this.confirmData(status)
            },
            queryParam (fetchInfo, successCallback) {
                var queryParam = {}
                if (this.countryId) {
                    if (this.type == null) {
                        if (this.countryId) {
                            queryParam = {
                                type: '1',
                                countryId: this.countryId,
                                startDate: moment(fetchInfo.startStr).format('YYYY-MM-DD'),
                                endDate: moment(fetchInfo.endStr).format('YYYY-MM-DD')
                            }
                        } else {
                            queryParam = {
                                startDate: moment(fetchInfo.startStr).format('YYYY-MM-DD'),
                                endDate: moment(fetchInfo.endStr).format('YYYY-MM-DD')
                            }
                        }
                    } else if (this.type == '0') {
                        queryParam = {
                            type: '0',
                            curId: this.currencyId,
                            startDate: moment(fetchInfo.startStr).format('YYYY-MM-DD'),
                            endDate: moment(fetchInfo.endStr).format('YYYY-MM-DD')
                        }
                    } else if (this.type == '1') {
                        queryParam = {
                            type: '1',
                            countryId: this.countryId,
                            startDate: moment(fetchInfo.startStr).format('YYYY-MM-DD'),
                            endDate: moment(fetchInfo.endStr).format('YYYY-MM-DD')
                        }
                    }
                } else if (this.currencyId) {
                    if (this.type == '0') {
                        queryParam = {
                            type: '0',
                            curId: this.currencyId,
                            startDate: moment(fetchInfo.startStr).format('YYYY-MM-DD'),
                            endDate: moment(fetchInfo.endStr).format('YYYY-MM-DD')
                        }
                    } else {
                        queryParam = {
                            type: '1',
                            countryId: this.countryId,
                            startDate: moment(fetchInfo.startStr).format('YYYY-MM-DD'),
                            endDate: moment(fetchInfo.endStr).format('YYYY-MM-DD')
                        }
                    }
                } else {
                    if (this.type == null) {
                        queryParam = {
                            startDate: moment(fetchInfo.startStr).format('YYYY-MM-DD'),
                            endDate: moment(fetchInfo.endStr).format('YYYY-MM-DD')
                        }
                    } else if (this.type == '0') {
                        queryParam = {
                            type: '0',
                            curId: this.currencyId,
                            startDate: moment(fetchInfo.startStr).format('YYYY-MM-DD'),
                            endDate: moment(fetchInfo.endStr).format('YYYY-MM-DD')
                        }
                    } else if (this.type == '1') {
                        queryParam = {
                            type: '1',
                            countryId: this.countryId,
                            startDate: moment(fetchInfo.startStr).format('YYYY-MM-DD'),
                            endDate: moment(fetchInfo.endStr).format('YYYY-MM-DD')
                        }
                    }
                }
                // queryParam = {
                //     type: this.type,
                //     countryId: this.countryId,
                //     curId: this.currencyId,
                //     startDate: moment(fetchInfo.startStr).format('YYYY-MM-DD'),
                //     endDate: moment(fetchInfo.endStr).format('YYYY-MM-DD')
                // }
                listWorkDay(queryParam).then(response => {
                    if (response.success) {
                        const events = []
                        response.data.forEach(res => {
                            const title = res.workDaySign ? '工作日' : '非工作日'
                            events.push({
                                title: title,
                                start: res.adjustDate,
                                className: 'eventText',
                                editable: false,
                                color: '#fff',
                                textColor: res.workDaySign ? '#25992E' : '#ed6d23',
                                allDay: true
                            })
                        })
                        successCallback(events)
                    } else {
                        this.$message.error(this.$t(response.msg))
                    }
                })
            },
            confirmData (status) {
                const _this = this
                const content = status ? '工作日' : '非工作日'
                const workDaySign = status ? 1 : 0
                this.$confirm({
                    title: '信息提示',
                    content: `确认要设置为${content}吗?`,
                    onOk () {
                        var params = {}
                        if (_this.currencyId) {
                            if (_this.type == '0') {
                                params = {
                                    type: '0',
                                    curId: _this.currencyId,
                                    startDate: _this.startDate,
                                    endDate: _this.endDate,
                                    workDaySign: workDaySign
                                }
                            } else if (_this.type == '1') {
                                params = {
                                    type: '1',
                                    countryId: _this.countryId,
                                    startDate: _this.startDate,
                                    endDate: _this.endDate,
                                    workDaySign: workDaySign
                                }
                            }
                        } else if (_this.countryId) {
                            if (_this.type == null) {
                                params = {
                                    type: '1',
                                    countryId: _this.countryId,
                                    startDate: _this.startDate,
                                    endDate: _this.endDate,
                                    workDaySign: workDaySign
                                }
                            } else if (_this.type == '1') {
                                params = {
                                    type: '1',
                                    countryId: _this.countryId,
                                    startDate: _this.startDate,
                                    endDate: _this.endDate,
                                    workDaySign: workDaySign
                                }
                            }
                        } else {
                            params = {
                                startDate: _this.startDate,
                                endDate: _this.endDate,
                                workDaySign: workDaySign
                            }
                        }
                        // const params = {
                        //     startDate: _this.startDate,
                        //     endDate: _this.endDate,
                        //     workDaySign: workDaySign
                        // }
                        return adjust(params).then((res) => {
                            if (res.success) {
                                _this.$message.success('操作成功')
                                _this.refreshEvents()
                            } else {
                                _this.$message.error(res.msg ? res.msg : '操作失败')
                            }
                        })
                    }
                })
            },
            checkOut (value) {
                this.refreshEvents()
            },
            checkCountryId (value) {
                this.refreshEvents()
            },
            checkCurrencyId (value) {
                this.refreshEvents()
            },
            refreshEvents () {
                this.calendarApi.refetchEvents()
            },
            onChangeTime (dates, dateStrings) {
                const _this = this
                _this.startDate = dateStrings[0]
                _this.endDate = dateStrings[1]
            }
        }
    }
</script>
