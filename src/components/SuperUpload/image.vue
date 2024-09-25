<template>
  <div class="upload-box">
    <div class="upload-box_list" :id="componentId">
      <template v-for="(item, index) in fileList" :key="item.id || generateId(6, 'itemId')">
        <div class="upload-item">
          <div class="upload-item__content">
            <!-- 图片内容 -->
            <el-image :src="item.url" fit="contain" v-loading="item.status === 'uploading'">
              <template #error>
                <el-icon><Picture /></el-icon>
              </template>
            </el-image>
            <!-- 状态角标 -->
            <div :class="['status', item.status]" v-if="item.status && item.status !== 'uploading'">
              <el-icon>
                <Close v-if="item.status === 'fail'" />
                <Check v-else />
              </el-icon>
            </div>
            <!-- 操作遮罩 -->
            <div class="oprate" v-if="item.status !== 'uploading'">
              <el-space>
                <el-icon @click="onPreview(index)"><ZoomIn /></el-icon>
                <el-icon @click="onRemove(index)" v-if="!_disabled"><Delete /></el-icon>
              </el-space>
            </div>
          </div>
          <!-- 表单内容 -->
          <el-input v-if="useInput && (item.status === 'success' || !item.status)" v-model="item.name" :disabled="_disabled" placeholder="请输入名称" />
        </div>
      </template>
    </div>
    <label :for="inputId" class="upload-btn" @click="onLabel">
      <el-icon><Plus /></el-icon>
      <input :id="inputId" type="file" :accept="accept" :multiple="!cropper" @change="onFileChange" v-if="!_disabled && fileList.length < limit" />
    </label>
    <CropperImg v-model:visible="crop.visible" :img="crop.img" @confirm="onCropConfirm" />
    <el-image-viewer v-if="preview.visible" :url-list="previewList" :initial-index="preview.index" hide-on-click-modal @close="preview.visible = false" />
  </div>
</template>

<script setup name="SuperUploadImage">
import { reactive, inject, computed, onMounted } from 'vue'
import { ElMessage, formContextKey } from 'element-plus'
import { Plus, Close, Check, ZoomIn, Delete } from '@element-plus/icons-vue'
import { generateId, sleep } from '@/utils'
import Sortable from 'sortablejs'
import CropperImg from '@/components/CropperImg/index.vue'

//组件id
const componentId = generateId(6, 'upload')

//表单id
const inputId = generateId(6, 'input')

const props = defineProps({
  fileList: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false },
  limit: { type: Number, default: 5 },
  accept: { type: String, default: 'image/*' },
  width: { type: String, default: '120px' },
  height: { type: String, default: '120px' },
  borderRadius: { type: String, default: '6px' },
  useInput: { type: Boolean, default: false },
  cropper: [Object, Boolean, undefined],
})

//接收文件列表
const fileList = defineModel('fileList')

//表单实例
const formContext = inject(formContextKey, void 0)

//预览相关内容
const preview = reactive({
  index: 0,
  visible: false,
})

//裁剪相关内容
const crop = reactive({
  visible: false,
  img: '',
})

//预览列表
const previewList = computed(() => {
  return fileList.value.map((i) => i.url)
})

//是否禁用
const _disabled = computed(() => {
  return props.disabled || formContext?.disabled
})

//是否超限
const onLabel = () => {
  if (fileList.value.length >= props.limit) {
    ElMessage.warning('最多只能上传' + props.limit + '张图片')
  }
}

//预览图片
const onPreview = (index) => {
  preview.index = index
  preview.visible = true
}

//删除图片
const onRemove = (index) => {
  const [current] = fileList.value.splice(index, 1)
  current.url.includes('http:') && URL.revokeObjectURL(current.url)
}

//裁剪完成
const onCropConfirm = (data) => {
  fileList.value.push({
    id: generateId(6, 'itemId'),
    url: URL.createObjectURL(data),
    row: new File([data], generateId() + '.jpg', { type: 'image/jpg' }),
    name: '',
    status: '',
  })
}

//表单内容变化
const onFileChange = (event) => {
  const { files } = event.target
  if (files.length + fileList.value.length > props.limit) {
    return ElMessage.warning('最多只能上传' + props.limit + '张图片')
  }
  Array.from(files).forEach((file) => {
    const url = URL.createObjectURL(file)
    if (props.cropper) {
      crop.img = url
      crop.visible = true
    } else {
      fileList.value.push({
        id: generateId(6, 'itemId'),
        url,
        row: file,
        name: file.name,
        status: '',
      })
    }
    event.target.value = ''
  })
}

//开始上传
const handleUpload = () => {
  fileList.value.forEach((item) => {
    item.status = 'uploading'
    sleep(1000).then(() => {
      item.status = 'success'
    })
  })
}

defineExpose({
  handleUpload,
})

//拖拽排序
const dragSort = () => {
  const pelement = document.querySelector('#' + componentId)
  Sortable.create(pelement, {
    handle: '.upload-item',
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
      const [removedItem] = fileList.value.splice(oldIndex, 1)
      fileList.value.splice(newIndex, 0, removedItem)
    },
  })
}

onMounted(() => {
  dragSort()
})
</script>

<style scoped lang="scss">
//上传组件容器
.upload-box {
  display: flex;
  flex-wrap: wrap;
  .upload-box_list {
    display: flex;
    flex-wrap: wrap;
  }
}
//单个图片展示
.upload-item {
  user-select: none;
  overflow: hidden;
  background-color: var(--el-fill-color-blank);
  border: 1px solid var(--el-border-color);
  width: v-bind(width);
  height: max-content;
  border-radius: v-bind(borderRadius);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 8px 8px 0;
  position: relative;
  //图片的内容区域
  .upload-item__content {
    //鼠标经过样式
    &:hover {
      .status {
        opacity: 0;
      }
      .oprate {
        opacity: 1;
      }
    }
  }
  //图片加载失败时内容
  .el-image {
    width: calc(v-bind(width) - 2px);
    height: calc(v-bind(height) - 2px);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: var(--el-text-color-secondary);
  }
  //名称表单
  :deep(.el-input) {
    .el-input__inner {
      height: 23px;
    }
  }
  //成功状态和失败状态
  .status {
    position: absolute;
    right: -15px;
    top: -6px;
    width: 40px;
    height: 24px;
    transform: rotate(45deg);
    transition: opacity var(--el-transition-duration);
    opacity: 1;
    background: var(--el-color-success);
    display: flex;
    justify-content: center;
    align-items: center;
    .el-icon {
      color: #fff;
      font-size: 12px;
      margin-top: 11px;
      transform: rotate(-45deg);
    }
    &.fail {
      background: var(--el-color-error);
    }
  }
  //操作区域遮罩
  .oprate {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: v-bind(width);
    height: v-bind(height);
    color: #fff;
    font-size: 20px;
    background-color: var(--el-overlay-color-lighter);
    transition: opacity var(--el-transition-duration);
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-icon {
      cursor: pointer;
    }
  }
}

//上传按钮
.upload-btn {
  width: v-bind(width);
  height: v-bind(height);
  border-radius: v-bind(borderRadius);
  background-color: var(--el-fill-color-lighter);
  border: 1px dashed var(--el-border-color-darker);
  cursor: pointer;
  vertical-align: top;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: var(--el-text-color-secondary);
  transition: border-color var(--el-transition-duration);
  &:hover {
    border-color: var(--el-color-primary);
  }
  input {
    display: none;
  }
}
</style>
