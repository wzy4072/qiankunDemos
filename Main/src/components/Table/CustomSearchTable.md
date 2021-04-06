### table

> 在 a-table 已定义的基础上添加了以下字段/方法

| 字段名           | 解释                                                                                                                                                                         | valueType                         |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| useDragColumns   | 是否使用拖拽配置列功能,非动态 table 请显式定义为 false                                                                                                                       | boolean;true                      |
| formItemConfigs  | 自定义选中不同的 fieldName 时，渲染 fieldValue 的 formConfig, 格式是{ [fieldIndex]: configObject }, fieldIndex 取对应 tableColumn 列 dataIndex ;configObject 配置参考 注解 2 | Object;                           |
| @updateColumns    | columns 配置成功，请求更新 columns                                                                                                                                           | Function(-)                       |
| @getCustomParams | 常用搜索 被点击                                                                                                                                                              | Function({ customParam: values }) |

-   注解 2 configObject 是描述 formitem 的配置信息,非必传，默认使用可为空的 input 渲染，格式及内容可以参考[使用文档](http://kcz66.gitee.io/k-form-design/#/zh-cn/guide/start)，或者使用[设计器](http://cdn.kcz66.com/k-form-design.html)

### columns

> 在 a-table 已定义字段的基础上添加了以下字段/方法

| 字段名    | 解释                     | valueType       | require |
| --------- | ------------------------ | --------------- | ------- |
| isSearch  | 是否可作为搜索字段       | boolean;true    | true    |
| defSearch | 是否默认搜索             | boolean; true   | true    |
| show      | 表格是否渲染该列         | boolean; true   | true    |
| title     | 函数方式渲染，请看注解 1 | string,function | true    |
| width     | title 宽度               | number          | true    |
| relations | 字段值的约束 请看注解 2  | string;'eq'     | true    |

-   注解 1 TableHead 是从数据库读取的动态数据，所以存储函数统一使用“先定义方法，后存储方法名”的方式存取。为保持代码可读性，请把“先定义”的所有 methods 以 xxTbHead.js 单独存放，mixin 到当前组件对象中。可参考 role/index.vue

-   注解 2 比如 数字类可以使用> = < 介于 等 可以给值字符串 'eq,lt,gt,between', 默认只有 eq,其他关系如下
    { value: 'contains', title: '包含' },
    { value: 'notContains', title: '不包含' },
    { value: 'eq', title: '=' },
    { value: 'neq', title: '!=' },
    { value: 'gt', title: '>' },
    { value: 'geq', title: '>=' },
    { value: 'lt', title: '<' },
    { value: 'leq', title: '<=' },
    { value: 'between', title: '介于' }
