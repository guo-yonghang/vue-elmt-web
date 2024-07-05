export const properties = {
  rowKey: {
    type: String,
    default: 'id',
  },
  data: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
  initParams: {
    type: Object,
    default: () => ({}),
  },
  pagination: {
    type: Boolean,
    default: true,
  },
  toolButton: {
    type: Array,
    default: () => ['refresh', 'setting', 'search'],
  },
  autoRequest: {
    type: Boolean,
    default: true,
  },
  requestApi: {
    type: Function,
    default: () => {},
  },
  dataCallBack: {
    type: Function,
    default: () => {},
  },
  requestError: {
    type: Function,
    default: () => {},
  },
}
