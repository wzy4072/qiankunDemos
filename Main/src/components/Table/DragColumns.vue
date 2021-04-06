<template>
  <div style="display:inline-block;">
    <!-- <a-icon title="设置列" type="setting" class="tool-icon-btn" :class="{ onfocus: visible }" @click="visible = true" /> -->
    <a-button type="link" title="设置列" class="icon-btn" @click="visible = true"><a-icon type="setting"/> </a-button>
    <a-modal
      v-model="visible"
      title="自定义列"
      @ok="handleModalOk"
      width="800px"
      :bodyStyle="{ padding: '16px', 'max-height': '460px', overflow: 'auto' }"
    >
      <template slot="footer">
        <a-button @click="visible = false"> 取消 </a-button>
        <a-button type="primary" @click="handleModalOk">确定</a-button>
      </template>

      <!-- {{ checkedKeys }}
      <hr /> -->
      <!-- 勾选需要显示的列，拖动列名进行排序。 -->
      <a-checkbox-group :value="checkedKeys" style="width: 100%">
        <!-- 左侧冻结列 -->
        <a-divider orientation="left"> 左侧冻结列 </a-divider>

        <draggable
          class="list-group"
          tag="ul"
          v-model="leftColumns"
          v-bind="dragOptions"
          group="columns"
          :move="onMove"
        >
          <transition-group
            type="transition"
            class="group-wrap"
            :class="{ 'empty-group': leftColumns.length === 0 }"
          >
            <li
              class="list-group-item"
              v-for="colItem in leftColumns"
              :key="colItem.dataIndex || colItem.title"
            >
              <a-checkbox
                :disabled="colItem.required"
                :value="colItem.dataIndex || colItem.title"
                @change="checkChange"
              ></a-checkbox>
              <span class="title drag-ele">
                <span class="title-bar" :style="{ width: `${colItem.width}px` }">{{
                  colItem.title
                }}</span>
              </span>
              <span class="text-muted">{{ colItem.required && '(必选)' }}</span>
              <span class="wid-item">
                宽度
                <span
                  class="wid-item-blur"
                  @click="
                    e => {
                      focusIpt(e, colItem)
                    }
                  "
                  v-show="!colItem.isEdit"
                >{{ colItem.width }}</span
                >
                <a-input-number
                  v-show="colItem.isEdit"
                  @blur="colItem.isEdit = false"
                  size="small"
                  class="wid-ipt"
                  addon-before=""
                  addon-after=""
                  v-model="colItem.width"
                  :min="1"
                  :max="500"
                />
                px</span
              >
            </li>
          </transition-group>
        </draggable>
        <a-divider orientation="left"> 滚动/普通列 </a-divider>
        <!-- <div class="def-item" v-if="leftColumns.length === 0">左侧冻结列请拖动至这里</div> -->
        <draggable
          class="list-group"
          tag="ul"
          v-model="scrollColumns"
          v-bind="dragOptions"
          group="columns"
          :move="onMove"
        >
          <transition-group
            type="transition"
            class="group-wrap"
            :class="{ 'empty-group': scrollColumns.length === 0 }"
          >
            <li
              class="list-group-item"
              v-for="colItem in scrollColumns"
              :key="colItem.dataIndex || colItem.title"
            >
              <a-checkbox
                :disabled="colItem.required"
                :value="colItem.dataIndex || colItem.title"
                @change="checkChange"
              ></a-checkbox>
              <span class="title drag-ele">
                <span class="title-bar" :style="{ width: `${colItem.width}px` }">{{
                  colItem.title
                }}</span>
              </span>
              <span class="text-muted">{{ colItem.required && '(必选)' }}</span>
              <span class="wid-item">
                宽度
                <span
                  class="wid-item-blur"
                  @click="
                    e => {
                      focusIpt(e, colItem)
                    }
                  "
                  v-show="!colItem.isEdit"
                >{{ colItem.width }}</span
                >
                <a-input-number
                  v-show="colItem.isEdit"
                  @blur="colItem.isEdit = false"
                  size="small"
                  class="wid-ipt"
                  addon-before=""
                  addon-after=""
                  v-model="colItem.width"
                  :min="1"
                  :max="500"
                />
                px</span
              >
            </li>
          </transition-group>
        </draggable>
        <!-- 右侧冻结列 -->
        <a-divider orientation="left"> 右侧冻结列 </a-divider>
        <draggable
          class="list-group"
          tag="ul"
          v-model="rightColumns"
          v-bind="dragOptions"
          group="columns"
          :move="onMove"
        >
          <transition-group
            type="transition"
            class="group-wrap"
            :class="{ 'empty-group': rightColumns.length === 0 }"
          >
            <li
              class="list-group-item"
              v-for="colItem in rightColumns"
              :key="colItem.dataIndex || colItem.title"
            >
              <a-checkbox
                :disabled="colItem.required"
                :value="colItem.dataIndex || colItem.title"
                @change="checkChange"
              ></a-checkbox>
              <span class="title drag-ele">
                <span class="title-bar" :style="{ width: `${colItem.width}px` }">{{
                  colItem.title
                }}</span>
              </span>
              <span class="text-muted">{{ colItem.required && '(必选)' }}</span>
              <span class="wid-item">
                宽度
                <span
                  class="wid-item-blur"
                  @click="
                    e => {
                      focusIpt(e, colItem)
                    }
                  "
                  v-show="!colItem.isEdit"
                >{{ colItem.width }}</span
                >
                <a-input-number
                  v-show="colItem.isEdit"
                  @blur="colItem.isEdit = false"
                  size="small"
                  class="wid-ipt"
                  addon-before=""
                  addon-after=""
                  v-model="colItem.width"
                  :min="1"
                  :max="500"
                />
                px</span
              >
            </li>
          </transition-group>
        </draggable>
        <!-- <div class="def-item" v-if="rightColumns.length === 0">右侧冻结列请拖动至这里</div> -->
      </a-checkbox-group>
    </a-modal>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { upDateTableColumns } from '@/api/customSearch'

export default {
    name: 'DragColumns',
    props: {},
    components: {
        draggable
    },
    data () {
        return {
            visible: false,
            leftColumns: [],
            rightColumns: [],
            scrollColumns: [],
            isDragging: false,
            delayedDragging: false,
            dragOptions: {
                animation: 500,
                handle: '.drag-ele',
                disabled: false,
                ghostClass: 'ghost',
                dragClass: 'drag-item'
            },
            checkedKeys: []
        }
    },
    computed: {},
    watch: {
        isDragging (newValue) {
            if (newValue) {
                this.delayedDragging = true
                return
            }
            this.$nextTick(() => {
                this.delayedDragging = false
            })
        }
    },
    methods: {
        initColumns ({ columns }) {
            this.scrollColumns = []
            this.leftColumns = []
            this.rightColumns = []
            this.checkedKeys = []
            columns.map(item => {
                const { fixed, show } = item
                // Object.assign(item, { isEdit: false })
                if (fixed === 'left') this.leftColumns.push(item)
                if (fixed === 'right') this.rightColumns.push(item)
                if (!fixed) this.scrollColumns.push(item)
                if (show) this.checkedKeys.push(item.dataIndex)
            })
        },
        test () {
            this.scrollColumns[1].width += 20
        },
        handleModalOk () {
            // 处理fixed 列
            // 处理展示隐藏列
            this.leftColumns.map(item =>
                Object.assign(item, { fixed: 'left', show: this.checkedKeys.includes(item.dataIndex) })
            )
            this.rightColumns.map(item =>
                Object.assign(item, { fixed: 'right', show: this.checkedKeys.includes(item.dataIndex) })
            )
            this.scrollColumns.map(item =>
                Object.assign(item, { fixed: false, show: this.checkedKeys.includes(item.dataIndex) })
            )
            const resultColumns = [...this.leftColumns, ...this.scrollColumns, ...this.rightColumns]
            upDateTableColumns({ name: 'columns', type: 'columnsParams', values: JSON.stringify(resultColumns) }).then(res => {
            // upDateTableColumns({ tableColumns: resultColumns }).then(res => {
                // 保存成功后 通知父组件更新
                this.$emit('updateDragColumns')
                this.visible = false
            })
        },
        orderList () {
            this.list = this.list.sort((one, two) => {
                return one.order - two.order
            })
        },
        focusIpt (e, colItem) {
            colItem.isEdit = true
            this.$nextTick(() => e.target.nextElementSibling.getElementsByTagName('input')[0]?.focus())
        },
        onMove ({ relatedContext, draggedContext }) {
            return 1
            // const relatedElement = relatedContext.element
            // const draggedElement = draggedContext.element
            // return 1
            // return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        },
        onDragEnd ({ to, from, item, clone, oldIndex, newIndex }) {
            // this.$emit('updatecolumns', this.dynamicColumns)
        },
        checkChange ({ target: { value, checked } }) {
            const newKeys = new Set(this.checkedKeys)
            checked ? newKeys.add(value) : newKeys.delete(value)
            this.checkedKeys = [...newKeys]
            // this.$emit('updatecheckedKeys', [...newKeys])
        },
        sortItem (from, to) {
            const copyColumns = [...this.columns]
            copyColumns.splice(to, 0, ...copyColumns.splice(from, 1))
            this.columns = [...copyColumns]
        }
    }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default';
@shasowBgColor: #f5f5f5;
// i.tool-icon-btn {
//     font-size: 20px;
// }
// i.tool-icon-btn.anticon.anticon-setting.onfocus {
//     color: @primary-color;
// }
// i.tool-icon-btn.anticon.anticon-setting:hover {
//     color: @icon-color-hover;
// }

.def-item {
    border: 1px solid #ccc;
    border-bottom: none;
    margin-bottom: -34px;
    height: 36px;
    line-height: 34px;
    /* padding-top: 2px; */
    padding-left: 25px;
    position: relative;
    top: -44px;
}

.list-group {
    padding: 0;
    margin-bottom: 8px;

    .group-wrap {
        min-height: 36px;
        display: block;
        border-bottom: 1px solid @input-border-color;
        &.empty-group {
            border: 1px solid @input-border-color;
        }
    }

    .list-group-item {
        padding: 0 8px;
        border: 1px solid @input-border-color;
        border-bottom: none;
        height: 36px;
        line-height: 36px;

        &:hover {
            background-color: @table-row-hover-bg;
        }
        .wid-item {
            color: #ccc;
            .wid-item-blur {
                cursor: pointer;
                display: inline-block;
                width: 60px;
                border-radius: 2px;
                height: 24px;
                line-height: 24px;
                color: @input-border-color;
                padding-left: 7px;
                border: 1px solid transparent;

                //  border: 1px solid @input-border-color;
                //   background-color: #fff;
                &:hover {
                    border: 1px solid @input-border-color;
                    background-color: #fff;
                }
            }
            .wid-ipt {
                width: 60px;
            }
        }
        .text-muted {
            display: inline-block;
            width: 80px;
            color: @input-border-color;
        }
        .title.drag-ele:hover {
            cursor: move;
        }
        .title {
            display: inline-block;
            width: 500px;
            .title-bar {
                display: inline-block;
                padding-left: 6px;
                margin-left: 6px;
                height: 26px;
                line-height: 26px;
                // width: 300px;
                white-space: nowrap;
                background: @shasowBgColor;
                // border-left: 1px solid #fafafa;
                // border-right: 1px solid #fafafa;
            }
        }
    }
}
</style>
