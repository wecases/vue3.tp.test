<script setup lang="ts">
/**
 * @File:   App.vue
 * @Time:   2022/11/18 08:51:40
 * @Author: Hao1617
 * @Desc:
 */
import bg from '@/assets/bg.png'
import { useHomeStore } from '@/stores/home'
import { useRoute } from 'vue-router'
const loading = ref(false)
const route = useRoute()
const { sideNav, setActiveId, getSearch } = useHomeStore()
watch(
  () => route.path,
  async () => {
    sideNav.forEach((item) => {
      if (route.path.includes(item.path)) {
        setActiveId(item.id)
      }
    })
    loading.value = true
    const params: SearchParams = {
      page: 1,
    }
    await getSearch(params)
    loading.value = false
  }
)
</script>

<template>
  <div class="w-screen h-screen flex relative z-10 overflow-hidden">
    <aside-nav class="side w-200px" />
    <div class="flex flex-col flex-1">
      <header-nav class="header h-60px" />
      <router-view
        class="flex-1 overflow-hidden"
        v-loading="loading"
        element-loading-text="加载中..."
        element-loading-background="rgba(255, 255, 255, 0.9)"
        style="border-radius: 4px"
      />
    </div>
  </div>
  <div
    class="fixed top-0 left-0 w-screen h-screen filter blur-3 transform scale-105"
    :style="{ background: `url(${bg}) 100% 100% / cover` }"
  ></div>
</template>

<style scoped>
.side {
  margin-right: 16px;
  background-color: #1b1b1b;
  border-right: 1px solid #292929;
  box-shadow: 0 0 7px rgb(0 0 0 / 50%);
}
</style>
