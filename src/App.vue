<template>
  <el-button type="primary" @click="toggleDark()">切换dark</el-button>
  <el-button type="primary" @click="toggleTheme()">切换theme</el-button>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";
import { useTheme } from "@/hooks/useTheme";

const isDark = useDark();
const toggleDark = useToggle(isDark);
const { onChangePrimary } = useTheme();

const toggleTheme = () => {
  onChangePrimary("#dda765");
};

// document.documentElement.style.setProperty("--el-color-primary", "red");
</script>

<style scoped lang="scss"></style>
