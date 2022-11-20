<script setup lang="ts">
/**
 * @File:   AsideNav.vue
 * @Time:   2022/11/19 13:14:44
 * @Author: Hao1617
 * @Desc:
 */
import logo from '@/assets/logo.png'
import { useRouter } from 'vue-router'
import { useHomeStore } from '@/stores/home'
import { storeToRefs } from 'pinia'

const { activeId, sideNav } = storeToRefs(useHomeStore())
const { setActiveId } = useHomeStore()
const router = useRouter()

const handleSideItemBtn = async (id: categories, path: string) => {
  setActiveId(id)
  router.push(path)
}

const activeFn = (id: string) => {
  return activeId.value === id ? 'active' : ''
}
</script>

<template>
  <div class="flex flex-col items-center pt-4">
    <div class="logo">
      <img :src="logo" alt="logo" />
    </div>
    <el-divider> </el-divider>
    <div class="w-full flex-1">
      <div
        v-for="item in sideNav"
        :key="item.id"
        class="item"
        :class="activeFn(item.id)"
        @click="handleSideItemBtn(item.id, item.path)"
      >
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  color: #fff;
}
.logo {
  width: 68px;
  height: 68px;
  min-height: 68px;
  border-radius: 50%;
  overflow: hidden;
}
.item {
  font-size: 14px;
  text-align: center;
  line-height: 36px;
  cursor: pointer;
}
.active,
.item:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
