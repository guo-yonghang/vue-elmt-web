<template>
  <div>route.params:{{ route.params.id }}</div>
</template>

<script setup name="/table/userDetail">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
