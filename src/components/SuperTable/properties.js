export default {
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
  searchs: {
    type: Array,
    default: () => [],
  },
  params: {
    type: Object,
    default: () => ({}),
  },
  pagination: {
    type: Boolean,
    default: true,
  },
  showUtil: {
    type: Boolean,
    default: true,
  },
}
