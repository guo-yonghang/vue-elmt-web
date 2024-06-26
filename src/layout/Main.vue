<template>
  <router-view v-slot="{ Component }">
    <transition appear name="fade-transform" mode="out-in">
      <keep-alive :include="[]">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup></script>

<style lang="scss" scoped></style>
