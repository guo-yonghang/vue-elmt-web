<template>
  <svg aria-hidden="true" style="width: 20px; height: 20px" v-bind="$attrs">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: String,
})

const symbolId = computed(() => `#${props.name}`)
</script>

<style scoped lang="scss"></style>
