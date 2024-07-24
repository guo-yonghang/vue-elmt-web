<template>
  <div class="table-box">
    <GTable :data="tableData" :columns="columns" stripe :auto-request="false">
      <template #tableHeader="scope">
        <el-button type="primary" :icon="CirclePlus">新增用户</el-button>
        <el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected"> 删除用户</el-button>
      </template>
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <template #usernameHeader="scope">
        <el-button type="primary" @click="ElMessage.success('我是通过作用域插槽渲染的表头')">
          {{ scope.column.label }}
        </el-button>
      </template>
      <template #createTime="scope">
        <el-button type="primary" link @click="ElMessage.success('我是通过作用域插槽渲染的内容')">
          {{ scope.row.createTime }}
        </el-button>
      </template>
      <template #operation="scope">
        <el-button type="primary" link :icon="View">查看</el-button>
        <el-button type="primary" link :icon="EditPen">编辑</el-button>
        <el-button type="primary" link :icon="Refresh">重置密码</el-button>
        <el-button type="primary" link :icon="Delete">删除</el-button>
      </template>
    </GTable>
  </div>
</template>

<script setup lang="jsx" name="/table/useSuperTable">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { CirclePlus, Delete, View, EditPen, Refresh } from '@element-plus/icons-vue'
import GTable from '@/components/GTable/index.vue'

const router = useRouter()
const statusAuth = ref(true)

//查看用户详情
const onUserDetail = (row) => {
  console.log('username', row.username)
  router.push({ name: '/table/userDetail', params: { id: row.id, subTitle: row.username } })
}

//渲染表头
const headerRender = (scope) => {
  return (
    <el-button type="primary" onClick={() => ElMessage.success('我是通过 tsx 语法渲染的表头')}>
      {scope.column.label}
    </el-button>
  )
}

//列配置
const columns = reactive([
  { type: 'selection', fixed: 'left', width: 70 },
  { type: 'sort', label: 'Sort', width: 80 },
  { type: 'expand', label: 'Expand', width: 85 },
  {
    prop: 'username',
    label: '用户姓名',
    search: { el: 'input', tooltip: '我是搜索提示' },
    render: (scope) => {
      return (
        <el-button type="primary" link onClick={() => onUserDetail(scope.row)}>
          {scope.row.username}
        </el-button>
      )
    },
  },
  {
    prop: 'gender',
    label: '性别',
    // 字典数据（本地数据）
    // enum: genderType,
    // 字典请求不带参数
    // enum: getUserGender,
    enum: [
      { genderLabel: '男', genderValue: 1 },
      { genderLabel: '女', genderValue: 2 },
    ],
    // 字典请求携带参数
    // enum: () => getUserGender({ id: 1 }),
    search: { el: 'select', props: { filterable: true } },
    fieldNames: { label: 'genderLabel', value: 'genderValue' },
  },
  {
    // 多级 prop
    prop: 'user.detail.age',
    label: '年龄',
    search: {
      // 自定义 search 显示内容
      render: ({ searchParam }) => {
        return (
          <div class="flxc">
            <el-input vModel_trim={searchParam.minAge} placeholder="最小年龄" />
            <span class="mr10 ml10">-</span>
            <el-input vModel_trim={searchParam.maxAge} placeholder="最大年龄" />
          </div>
        )
      },
    },
  },
  { prop: 'idCard', label: '身份证号', search: { el: 'input' } },
  { prop: 'email', label: '邮箱' },
  { prop: 'address', label: '居住地址' },
  {
    prop: 'status',
    label: '用户状态',
    enum: [
      { userLabel: '启用', userStatus: 1 },
      { userLabel: '禁用', userStatus: 0 },
    ],
    search: { el: 'tree-select', props: { filterable: true } },
    fieldNames: { label: 'userLabel', value: 'userStatus' },
    render: (scope) => {
      return (
        <>
          {statusAuth.value ? (
            <el-switch model-value={scope.row.status} active-text={scope.row.status ? '启用' : '禁用'} active-value={1} inactive-value={0} />
          ) : (
            <el-tag type={scope.row.status ? 'success' : 'danger'}>{scope.row.status ? '启用' : '禁用'}</el-tag>
          )}
        </>
      )
    },
  },
  {
    prop: 'createTime',
    label: '创建时间',
    headerRender,
    width: 180,
    search: {
      el: 'date-picker',
      span: 2,
      props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
      defaultValue: ['2024-01-01 11:35:00', '2024-12-12 11:35:00'],
    },
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 330 },
])

//表格数据
const tableData = [
  {
    id: '253622506765466365',
    username: '郑丽',
    gender: 2,
    user: {
      detail: {
        age: 21,
      },
    },
    idCard: '253622506765466365',
    email: 'n.sphpu@vtkxtcw.kz',
    address: '甘肃省 天水市',
    createTime: '1990-05-15 04:13:09',
    status: 0,
    avatar: 'https://i.imgtg.com/2023/01/16/QRqMK.jpg',
  },
  {
    id: '017243776167324988',
    username: '张秀兰',
    gender: 2,
    user: {
      detail: {
        age: 13,
      },
    },
    idCard: '017243776167324988',
    email: 'w.pirdqpl@tqoyglfd.pf',
    address: '云南省 文山壮族苗族自治州',
    createTime: '1988-07-26 19:35:09',
    status: 0,
    avatar: 'https://i.imgtg.com/2023/01/16/QRa0s.jpg',
  },
  {
    id: '133822513334226492',
    username: '杨勇',
    gender: 1,
    user: {
      detail: {
        age: 29,
      },
    },
    idCard: '133822513334226492',
    email: 'r.nww@ovmqjprkuj.tc',
    address: '新疆维吾尔自治区 巴音郭楞蒙古自治州',
    createTime: '1992-07-08 06:52:37',
    status: 0,
    avatar: 'https://i.imgtg.com/2023/01/16/QRa0s.jpg',
  },
  {
    id: '767693544421530612',
    username: '崔刚',
    gender: 2,
    user: {
      detail: {
        age: 16,
      },
    },
    idCard: '767693544421530612',
    email: 'i.icdngoqg@rvnxjllmt.al',
    address: '河北省 唐山市',
    createTime: '1973-05-18 11:47:09',
    status: 0,
    avatar: 'https://i.imgtg.com/2023/01/16/QRa0s.jpg',
  },
  {
    id: '203570648259238032',
    username: '金刚',
    gender: 1,
    user: {
      detail: {
        age: 12,
      },
    },
    idCard: '203570648259238032',
    email: 'p.psmxe@gdohj.tf',
    address: '浙江省 嘉兴市',
    createTime: '2003-01-16 22:34:07',
    status: 1,
    avatar: 'https://i.imgtg.com/2023/01/16/QRa0s.jpg',
  },
  {
    id: '137444392758723573',
    username: '龙刚',
    gender: 2,
    user: {
      detail: {
        age: 28,
      },
    },
    idCard: '137444392758723573',
    email: 'b.cwpxtapm@bmtjd.kw',
    address: '香港特别行政区 新界',
    createTime: '1990-10-10 09:28:33',
    status: 1,
    avatar: 'https://i.imgtg.com/2023/01/16/QRqMK.jpg',
  },
  {
    id: '182775952216141008',
    username: '姜涛',
    gender: 1,
    user: {
      detail: {
        age: 28,
      },
    },
    idCard: '182775952216141008',
    email: 'l.ntfi@zfseojstv.gh',
    address: '陕西省 安康市',
    createTime: '1994-05-06 08:21:22',
    status: 0,
    avatar: 'https://i.imgtg.com/2023/01/16/QRa0s.jpg',
  },
  {
    id: '176385971226187714',
    username: '孟勇',
    gender: 1,
    user: {
      detail: {
        age: 13,
      },
    },
    idCard: '176385971226187714',
    email: 'y.hmcqmpfme@ceclurp.gi',
    address: '黑龙江省 佳木斯市',
    createTime: '1991-07-23 09:36:53',
    status: 0,
    avatar: 'https://i.imgtg.com/2023/01/16/QRqMK.jpg',
  },
  {
    id: '582271747058827558',
    username: '吕涛',
    gender: 1,
    user: {
      detail: {
        age: 11,
      },
    },
    idCard: '582271747058827558',
    email: 'b.loep@lei.ke',
    address: '台湾 新竹县',
    createTime: '2012-05-24 08:23:28',
    status: 0,
    avatar: 'https://i.imgtg.com/2023/01/16/QRa0s.jpg',
  },
  {
    id: '785778256510269453',
    username: '蒋敏',
    gender: 2,
    user: {
      detail: {
        age: 25,
      },
    },
    idCard: '785778256510269453',
    email: 'c.plljpay@mzxccjjed.pl',
    address: '海南省 海口市',
    createTime: '2007-11-18 22:29:23',
    status: 1,
    avatar: 'https://i.imgtg.com/2023/01/16/QR57a.jpg',
  },
]
</script>

<style lang="scss" scoped></style>
