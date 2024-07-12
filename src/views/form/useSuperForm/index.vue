<template>
  <div>
    <CropperImg v-model:visible="visible" v-bind="options" @confirm="handleConfirm" />
    <el-button type="primary" @click="handleClick">图片裁剪</el-button>
    <div>
      <img :src="cropImg" alt="" v-if="cropImg" />
    </div>
  </div>
</template>

<script setup name="/form/useSuperForm">
import { ref, reactive } from 'vue'
import CropperImg from '@/components/CropperImg/index.vue'

const visible = ref(false)

const options = reactive({
  img: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
})

const cropImg = ref('')

const handleClick = () => {
  visible.value = true
}

const handleConfirm = (data) => {
  cropImg.value = data
}
</script>
