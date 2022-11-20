<script setup lang="ts">
/**
 * @File:   Icon.vue
 * @Time:   2022/11/19 14:19:47
 * @Author: Hao1617
 * @Desc:
 */
defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
})
</script>
<template>
  <el-icon :size="size" :color="color">
    <component :is="icon" />
  </el-icon>
</template>
