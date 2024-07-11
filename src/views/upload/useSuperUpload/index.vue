<template>
  <div>
    <el-form>
      <SuperUploadImage v-model:file-list="list" useInput :cropper="true" />
    </el-form>
    <div style="margin-top: 30px">拖拽排序、裁剪、名称编辑、删除、预览、上传状态等功能</div>
    <div v-for="(item, index) in list" :key="index" style="margin-top: 20px">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script setup name="/upload/useSuperUpload">
import { ref } from 'vue'
import SuperUploadImage from '@/components/SuperUpload/image.vue'

const list = ref([
  {
    name: '第一个',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    status: 'success',
  },
  {
    name: '第二个',
    url: '	https://element-plus.org/images/figure-1.png',
    status: 'fail',
  },
  {
    name: '第三个',
    url: 'https://element-plus.org/images/plant-1.png',
    status: 'uploading',
  },
])
</script>

<style scoped lang="scss"></style>
