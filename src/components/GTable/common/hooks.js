import { ref, reactive, computed, toRefs } from 'vue'

/**
 * @description table 操作方法封装
 * @param {Function} api 获取表格数据 api 方法 (必传)
 * @param {Object} initParam 获取数据初始化参数 (非必传，默认为{})
 * @param {Boolean} isPageable 是否有分页 (非必传)
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法 (非必传)
 * @param {Function} requestError 请求失败的处理方法 (非必传)
 * */
export const useTableHook = (api, initParam = {}, isPageable, paramCallBack, dataCallBack, requestError) => {
  const state = reactive({
    loading: false,
    tableData: [],
    pageable: {
      pageNum: 1,
      pageSize: 10,
      total: 0,
    },
    //查询参数(只有查询)
    searchParam: {},
    //默认的查询参数
    searchInitParam: {},
    //总参数(分页+查询)
    totalParam: {},
  })

  /**
   * @description 分页查询参数
   */
  const pageParam = computed({
    get: () => {
      return {
        pageNum: state.pageable.pageNum,
        pageSize: state.pageable.pageSize,
      }
    },
    set: (newValue) => {
      console.log('分页更新', newValue)
    },
  })

  /**
   * @description 获取表格数据
   * @return void
   */
  const getTableList = async () => {
    if (!api) return
    if (state.loading) return
    state.loading = true
    try {
      Object.assign(state.totalParam, initParam, isPageable ? pageParam.value : {})
      let params = { ...state.searchInitParam, ...state.totalParam }
      paramCallBack && (params = paramCallBack(params))
      let data = await api(params)
      dataCallBack && (data = dataCallBack(data))
      state.tableData = isPageable ? data.list : data
      if (isPageable) {
        const { total } = data
        updatePageable({ total })
      }
    } catch (error) {
      requestError && requestError(error)
    } finally {
      state.loading = false
    }
  }

  /**
   * @description 更新分页信息
   * @param {Object} pageable 后台返回的分页数据
   * @return void
   * */
  const updatePageable = (pageable) => {
    Object.assign(state.pageable, pageable)
  }

  /**
   * @description 更新查询参数
   * @return void
   * */
  const updatedTotalParam = () => {
    state.totalParam = {}
    // 处理查询参数，可以给查询参数加自定义前缀操作
    let nowSearchParam = {}
    // 防止手动清空输入框携带参数（这里可以自定义查询参数前缀）
    for (let key in state.searchParam) {
      // 某些情况下参数为 false/0 也应该携带参数
      if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0) {
        nowSearchParam[key] = state.searchParam[key]
      }
    }
    Object.assign(state.totalParam, nowSearchParam, isPageable ? pageParam.value : {})
  }

  /**
   * @description 表格数据查询
   * @return void
   * */
  const search = () => {
    state.pageable.pageNum = 1
    updatedTotalParam()
    getTableList()
  }

  /**
   * @description 表格数据重置
   * @return void
   * */
  const reset = () => {
    state.pageable.pageNum = 1
    // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
    state.searchParam = { ...state.searchInitParam }
    updatedTotalParam()
    getTableList()
  }

  /**
   * @description 每页条数改变
   * @param {Number} val 当前条数
   * @return void
   * */
  const handleSizeChange = (val) => {
    state.pageable.pageNum = 1
    state.pageable.pageSize = val
    getTableList()
  }

  /**
   * @description 当前页改变
   * @param {Number} val 当前页
   * @return void
   * */
  const handleCurrentChange = (val) => {
    state.pageable.pageNum = val
    getTableList()
  }

  return {
    ...toRefs(state),
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
  }
}

/**
 * @description 表格多选数据操作
 * @param {String} rowKey 当表格可以多选时，所指定的 id
 * */
export const useSelection = (rowKey = 'id') => {
  const isSelected = ref(false)
  const selectedList = ref([])

  // 当前选中的所有 ids 数组
  const selectedListIds = computed(() => {
    let ids = []
    selectedList.value.forEach((item) => ids.push(item[rowKey]))
    return ids
  })

  /**
   * @description 多选操作
   * @param {Array} rowArr 当前选择的所有数据
   * @return void
   */
  const selectionChange = (rowArr) => {
    rowArr.length ? (isSelected.value = true) : (isSelected.value = false)
    selectedList.value = rowArr
  }

  return {
    isSelected,
    selectedList,
    selectedListIds,
    selectionChange,
  }
}
