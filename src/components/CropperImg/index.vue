<template>
  <el-dialog v-model="visible" title="图片裁剪" width="750px" align-center>
    <VueCropper ref="cropper" style="height: 700px" :fixed :centerBox :autoCrop :maxImgSize v-bind="$attrs" />
    <template #footer>
      <el-space>
        <el-button @click="onPreview">预览</el-button>
        <el-button type="primary" @click="onConfirm">确认</el-button>
      </el-space>
    </template>
    <el-image-viewer v-if="preview.visible" :url-list="[preview.src]" :initial-index="0" hide-on-click-modal @close="preview.visible = false" />
  </el-dialog>
</template>

<script setup name="CropperImg">
import { ref, reactive } from 'vue'
import { VueCropper } from 'vue-cropper'
import 'vue-cropper/dist/index.css'

const props = defineProps({
  fixed: { type: Boolean, default: true },
  centerBox: { type: Boolean, default: true },
  autoCrop: { type: Boolean, default: true },
  maxImgSize: { type: Number, default: 650 },
})

const emits = defineEmits(['confirm'])

//弹窗状态
const visible = defineModel('visible', false)

//裁剪组件实例
const cropper = ref()

//预览状态
const preview = reactive({
  visible: false,
  src: '',
})

//预览截图的区域
const onPreview = () => {
  cropper.value.getCropData((data) => {
    preview.src = data
    preview.visible = true
  })
}

//确认裁剪
const onConfirm = () => {
  cropper.value.getCropData((data) => {
    emits('confirm', data)
    visible.value = false
  })
}

//暴露接口
defineExpose({
  cropper,
})
</script>
