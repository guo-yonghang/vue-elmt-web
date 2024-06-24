import { TableColumnCtx } from 'element-plus'
import { Ref, VNode } from 'vue'

interface SuperTableProps {
  rowKey?: string //行的key
  columns: ColumnType[] //列配置项
  data?: any[] //静态data数据
  initParams?: any //初始化请求参数
  pagination?: boolean //是否需要分页组件
  toolButton?: ('refresh' | 'setting' | 'search')[] | boolean //是否显示表格功能按钮
  autoRequest?: boolean //是否自动请求表格数据的api
  requestApi?: (params: any) => Promise<any> //请求表格数据的api
  dataCallBack?: (data: any) => any //返回数据的回调函数，可以对数据进行处理
  requestError?: (params: any) => void //表格数据api请求错误回调
}

interface ColumnType<T = any> {
  isShow?: boolean //是否展示在表格当中
  type?: 'selection' | 'radio' | 'index' | 'expand' | 'sort'
  tag?: boolean //是否使用标签展示
  search?: SearchProps | undefined //搜索项配置
  enum?: EnumProps[] | Ref<EnumProps[]> | ((params?: any) => Promise<any>) //枚举字典
  isFilterEnum?: boolean //单元格值是否也用enmu进行过滤
  fieldNames?: { label?: string; value?: string; children?: string } //指定enuim的label && value && children的key值
  headerRender?: (scope: HeaderRenderScope<T>) => VNode //自定义标头渲染 jsx语法
  render?: (scope: RenderScope<T>) => VNode | string //自定义单元格内容渲染
  _children?: ColumnType<T>[] //多级表头
}

type EnumProps = {
  label?: string // 选项框显示的文字
  value?: string | number | boolean | any[] // 选项框值
  disabled?: boolean // 是否禁用此选项
  tagType?: string // 当 tag 为 true 时，此选择会指定 tag 显示类型
  children?: EnumProps[] // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any
}

type SearchProps = {
  el?: 'input' | 'input-number' | 'select' | 'select-v2' | 'tree-select' | 'cascader' | 'date-picker' | 'time-picker' | 'time-select' | 'switch' | 'slider'
  label?: string
  props?: any //搜索项属性，使用v-bind透传到组件
  key?: string //搜索项的key 部位prop属性时可通过key传递
  tooltip?: string //搜索提示
  order?: number //搜索项排序(大到小)
  defaultValue?: any //搜索项默认值
  render: (scope: SearchRenderScope) => VNode // 自定义搜索内容渲染jsx
}

type HeaderRenderScope<T> = {
  $index: number
  column: TableColumnCtx<T>
  [key: string]: any
}

type RenderScope<T> = {
  row: T
  $index: number
  column: TableColumnCtx<T>
  [key: string]: any
}

type SearchRenderScope = {
  searchParam: { [key: string]: any }
  placeholder: string
  clearable: boolean
  options: EnumProps[]
  data: EnumProps[]
}
