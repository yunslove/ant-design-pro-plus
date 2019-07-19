<h1 align="center">Ant Design Pro V2 Plus</h1>

<div align="center">

官方说明请参阅 [/v2/README.zh-CN](https://github.com/ant-design/ant-design-pro/blob/v2/README.zh-CN.md)

</div>

![ant-design-pro-v2-plus-screenshot.png](https://i.loli.net/2019/07/06/5d1ff32b16d2497023.png)

## 新增特性✨

* [ChildrenTabs 根据 children 实现标签页切换](#ChildrenTabs-根据-children-实现标签页切换)
* [PageTabs 基于路由实现标签页切换](#PageTabs-基于路由实现标签页切换)
* [StandardTable 增强](#StandardTable-增强)
* [antd-form-pro 表单功能增强](#antd-form-pro-表单功能增强)
* [DetailFormDrawer 详情抽屉](#DetailFormDrawer-详情抽屉)
* [DetailFormModal 详情模态框](#DetailFormModal-详情模态框)
* [QueryPanel 查询面板](#QueryPanel-查询面板)
* [base-models/curd 生成基础增删改查 model](#base-models/curd-生成基础增删改查-model)
* [BasePage/Curd 基础增删改查页面](#BasePage/Curd-基础增删改查页面)

## 功能实现概述☁️

除页面外，尽量使用 TypeScript 开发。由于对类型检验还不太熟练，所以部分类型检验直接使用了 `any` 。

### ChildrenTabs 根据 children 实现标签页切换

可通过配置实现 children 的标签页展示。

#### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeKey | 激活 tab 的唯一标识 | string | - |
| activeTitle | 激活 tab 展示的标题 | string | - |
| handleTabChange | 切换 tab 时的回调函数。设置新的的 activeKey | (keyToSwitch: string, activedTabs: any[]) => void; | - |
| handleRemoveTab | 删除 tab 时的回调函数。可直接设置新的 activeKey 为相邻的 nextTabKey | (removeKey: string, nextTabKey: string, activedTabs: any[]) => void | - |
| children | 与当前 tab 对应的 children | JSX.Element | - |
| extraTabProperties | 当前 tab 的扩展属性 | {} | {} |
| tabsConfig | 可自行配置 Tabs 属性，除 `activeKey`， `onEdit`， `onChange` 外 | TabsProps | - |

### PageTabs 基于路由实现标签页切换

`router.push()` 会注入该路由的 component ，所以根据条件处理该 children component 即可。

可通过 [defaultSettings](/src/defaultSettings.js) 中的 `pageTabs` 配置是否开启标签页功能，默认开启。

关注实现的可参考[基于 ant design pro 2.3.1 页面标签化展示的研究与实现](https://theprimone.top/2019/07/06/2019-07-06-ant-design-pro-tabs-page-by-route)

### StandardTable 增强

* 默认开启 hideOnSinglePage
* 间隔行着色
* 多选功能可选，通过 `checkable` 控制

### antd-form-pro 表单功能增强

新增组件 ant-form-pro ，可配置化实现表单功能。支持的组件与配置方式可参考 [map.js](/src/pages/Enhance/CurdPage/map.js) ，使用方式参考 [DetailFormDrawer 详情表单抽屉组件](#DetailFormDrawer-详情抽屉组件)。

### DetailFormDrawer 详情抽屉

基于 antd-form-pro 实现的详情表单抽屉，参数定义可参见 [DetailFormDrawer/index.d.ts](/src/components/DetailFormDrawer/index.d.ts) ，结合 ant-form-pro 的具体使用可参考 [DetailFormDrawer/index.js](/src/components/DetailFormDrawer/index.js) 。

### DetailFormModal 详情模态框

基于 antd-form-pro 实现的详情模态框，参数定义可参见 [DetailFormModal/index.d.ts](/src/components/DetailFormDrawer/index.d.ts) 。

### QueryPanel 查询面板

基于 antd-form-pro 实现的查询面板组件，具体实现可参考 [QueryPanel/index.js](/src/components/QueryPanel/index.js) ，只需传入表单配置和 `onSearch` 方法即可使用。同时提供了重置表单后的 `onReset` 函数。

### base-models/curd 生成基础增删改查 model

通过 `namespace` 和 `modelConfig` 配置一个基础的增删改查 model ，参考 [base-models/curd.ts](/src/base-models/curd.ts) 。

### BasePage/Curd 基础增删改查页面

![base-curd.png](https://i.loli.net/2019/07/12/5d28976248c5c94749.png)

前置工具及组件：

* base-models/curd
* antd-form-pro
* DetailFormDrawer
* DetailFormModal
* QueryPanel
* StandardTable

如果需要新建一个类似**基础增删改查**的页面，快速开发指南：

* 配置页面路由
* 编写接口增删改查 service
* 基于 base-models/curd 配置 model
* 配置新建和编辑的表单数据映射 map.js
* 配置页面 index.js ，主要是配置查询面板和数据列模型

具体使用参考 [src/pages/Enhance/CurdPage](src/pages/Enhance/CurdPage) 的实现。

相较于之前一个个去复制粘贴修改代码，通过配置化的方式快速实现一个页面 demo 看起来已经好了不少。另外，本想着用 umi 里的区块试试的，后来意识到即使写了一个页面的区块，还是得去修改代码，索性自己把这些逻辑全都抽出来，通过配置实现页面扩展。

#### API

##### BasePage/Curd

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| namespace | model 名称空间 | string | - |
| queryArgsConfig | 查询参数配置，参考 [map.js](/src/pages/Enhance/CurdPage/map.js) | any[] | [] |
| columns | table [columns](https://ant.design/components/table-cn/#Column) | [ColumnProps](https://git.io/vMMXC)[] | [] |
| data | StandardTable data | any | {} |
| fetchLoading | 请求列表 loading | boolean | - |
| detailLoading | 请求 model 详情 | boolean | - |
| createLoading | 创建 model loading | boolean | - |
| updateLoading | 更新 model loading | boolean | - |
| setFormItemsConfig | 配置新建、详情和更新表单数据 | (detail: {}, mode: string) => any[] | - |
| afterPopupNotVisible | 关闭弹窗后事件 | () => void | - |
| createButtonName | 新建按钮名称 | string | - |
| createTitle | 新建窗口名称 | string | - |
| detailTitle | 详情窗口名称 | string | - |
| updateTitle | 编辑窗口名称 | string | - |
| dipatch | dva 注入的 dispatch 函数 | Function | - |
| interceptors | 拦截器 | [interceptors](#interceptors) | - |
| containerConfig | 弹窗配置，可选择 modal 或 drawer ，并配置 | {} | - |
| queryPanelProps | 查询面板配置 | QueryPanelProps | - |

##### interceptors

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| updateFieldsValue | 新建和更新表单处理拦截，类似时间区间这样的数据，需要单独处理后再提交 | (fieldsValue: any) => any | - |
| handleDetailClick | 详情点击事件拦截，可通过路由跳转到自定义的对象详情页面 | (record: any) => any | - |
| handleUpdateClick | 编辑点击事件拦截 | (record: any) => any | - |
| handleDeleteClick | 删除点击事件拦截 | (record: any) => any | - |
