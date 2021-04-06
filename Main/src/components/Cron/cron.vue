<template lang="html">
  <div class="cron" :val="value_">
    <a-tabs v-model="activeName" :animated="false">
      <a-tab-pane tab="秒" key="s">
        <second-and-minute v-model="sVal" lable="秒"></second-and-minute >
      </a-tab-pane>
      <a-tab-pane tab="分" key="m">
        <second-and-minute v-model="mVal" lable="分"></second-and-minute >
      </a-tab-pane>
      <a-tab-pane tab="时" key="h">
        <hour v-model="hVal" lable="时"></hour>
      </a-tab-pane>
      <a-tab-pane tab="日" key="d">
        <day v-model="dVal" lable="日"></day>
      </a-tab-pane>
      <a-tab-pane tab="月" key="month">
        <month v-model="monthVal" lable="月"></month>
      </a-tab-pane>
      <a-tab-pane tab="周" key="week">
        <week v-model="weekVal" lable="周"></week>
      </a-tab-pane>
      <a-tab-pane tab="年" key="year">
        <year v-model="yearVal" lable="年"></year>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import SecondAndMinute from './cron/secondAndMinute'
import hour from './cron/hour'
import day from './cron/day'
import month from './cron/month'
import week from './cron/week'
import year from './cron/year'
export default {
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      //
      activeName: 's',
      sVal: '',
      mVal: '',
      hVal: '',
      dVal: '',
      monthVal: '',
      weekVal: '',
      yearVal: ''
    }
  },
  watch: {
    'value' (a, b) {
      this.updateVal()
    }
  },
  computed: {
    tableData () {
      return [{
        sVal: this.sVal,
        mVal: this.mVal,
        hVal: this.hVal,
        dVal: this.dVal,
        monthVal: this.monthVal,
        weekVal: this.weekVal,
        yearVal: this.yearVal
      }]
    },
    value_ () {
      if (!this.dVal && !this.weekVal) {
        return ''
      }
      if (this.dVal === '?' && this.weekVal === '?') {
        this.$message.error('日期与星期不可以同时为“不指定”')
      }
      if (this.dVal !== '?' && this.weekVal !== '?') {
        this.$message.error('日期与星期必须有一个为“不指定”')
      }
      const v = `${this.sVal} ${this.mVal} ${this.hVal} ${this.dVal} ${this.monthVal} ${this.weekVal} ${this.yearVal}`
      if (v !== this.value) {
        this.$emit('input', v)
      }
      return v
    }
  },
  methods: {
    updateVal () {
      if (!this.value) {
        return
      }
      const arrays = this.value.split(' ')
      this.sVal = arrays[0]
      this.mVal = arrays[1]
      this.hVal = arrays[2]
      this.dVal = arrays[3]
      this.monthVal = arrays[4]
      this.weekVal = arrays[5]
      this.yearVal = arrays[6]
    }
  },
  created () {
    this.updateVal()
  },
  components: {
    SecondAndMinute, hour, day, month, week, year
  }
}
</script>

<style lang="css">
.cron {
  text-align: left;
  padding: 10px;
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
</style>
