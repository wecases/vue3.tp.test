<script setup lang="ts">
/**
 * @File:   MainList.vue
 * @Time:   2022/11/19 16:49:12
 * @Author: Hao1617
 * @Desc:
 */
import detailsBg from '@/assets/details-bg.png'
import { useHomeStore } from '@/stores/home'
import { storeToRefs } from 'pinia'

const bg = `#171717 url(${detailsBg}) top left repeat`

const { list, meta } = storeToRefs(useHomeStore())

const disabled = ref(false)
const main = ref<HTMLElement>()
const { getSearch } = useHomeStore()
const itemsLoading = async () => {
  const scrollTop = main.value?.scrollTop || 0
  if (scrollTop === 0) return
  const params: SearchParams = {
    page: meta.value?.current_page + 1,
  }
  disabled.value = true
  await getSearch(params)
  disabled.value = false
}

let col = ref(4)
let gap = ref(15)
let width = ref(0)
onMounted(() => {
  // 计算间距
  const spacing = 6 + col.value * gap.value - gap.value
  // 计算main总宽度
  const allWidth = main.value!.clientWidth - spacing
  // 计算每个item的宽度
  width.value = Math.floor(allWidth / col.value)
})

// 获取图片详情
const { getDetails } = useHomeStore()
const drawer = ref(false)
let url = ref('')
let loading = ref(false)
// 获取图片
type SizeRatio = 'fill-horizontal' | 'fill-vertical'
let pictureType: SizeRatio = 'fill-horizontal'

const handleItem = async (id: string) => {
  url.value = ''
  drawer.value = true
  loading.value = true
  const res = await getDetails(id)
  if (res.dimension_x > res.dimension_y) {
    pictureType = 'fill-horizontal'
  } else {
    pictureType = 'fill-vertical'
  }
  url.value = res.path
  loading.value = false
}
const handleClose = () => {
  drawer.value = false
}

// 点击图片
const content = ref<HTMLElement>()
const image = ref<HTMLElement>()
const imgClassList = ref<string[]>(['fit', 'fill', 'full'])
const handleImg = () => {
  const contentValue = content.value!
  // 获取当前图片的class
  const contentClassName = contentValue.className
  // 转换成数组
  const contentClassList = contentClassName.split(' ')
  // 获取当前图片的class在数组中的索引
  const index = contentClassList.findIndex((item) => {
    return imgClassList.value.includes(item)
  })
  // 获取当前name
  const name = contentClassList[index]
  let nextIndex = 0
  let nextName = ''
  // 删除当前name
  contentClassList.splice(index, 1)
  //判断当前是否是最后一个
  if (name === 'full') {
    nextName = 'fit'
  } else {
    // 获取当前name在数组中的索引
    nextIndex = imgClassList.value.findIndex((item) => item === name)
    // 获取下一个name
    nextName = imgClassList.value[nextIndex + 1]
  }
  // 获取未更换class之前的值
  const windowEvent = window.event as MouseEvent
  const clientX = windowEvent.clientX
  const clientY = windowEvent.clientY
  const contentScrollLeft = contentValue.scrollLeft
  const contentScrollTop = contentValue.scrollTop
  const contentOffsetLeft = contentValue.offsetLeft
  const contentOffsetTop = contentValue.offsetTop
  const imageValue = image.value!
  const originalWidth = imageValue.clientWidth
  const originalHeight = imageValue.clientHeight
  const x = clientX - contentOffsetLeft + contentScrollLeft
  const y = clientY - contentOffsetTop + contentScrollTop
  const xPercent = x / originalWidth
  const yPercent = y / originalHeight
  // 添加下一个name
  contentClassList.push(nextName)
  contentValue.className = contentClassList.join(' ')
  // 获取更换class之后的值
  const newWidth = imageValue.clientWidth
  const newHeight = imageValue.clientHeight
  let newX = xPercent * newWidth
  let newY = yPercent * newHeight
  contentValue.scrollLeft = newX
  contentValue.scrollTop = newY
}
</script>

<template>
  <div>
    <div
      ref="main"
      :infinite-scroll-disabled="disabled"
      v-infinite-scroll="itemsLoading"
      infinite-scroll-distance="10"
      class="main w-full h-full flex flex-wrap justify-between overflow-hidden overflow-y-auto"
    >
      <div
        class="item"
        v-for="item in list"
        :key="item.id"
        @click="handleItem(item.id)"
      >
        <img :src="item.thumbs.large" />
      </div>
      <div
        v-if="disabled"
        class="w-full h-30px text-center text-sm"
        style="color: #fff"
      >
        加载中...
      </div>
    </div>

    <el-drawer
      v-model="drawer"
      title="图片详情"
      :before-close="handleClose"
      size="100%"
    >
      <div
        v-if="drawer"
        v-loading="loading"
        element-loading-background="rgba(23, 23, 23, 0.3)"
        class="w-full h-full flex overflow-hidden"
      >
        <div class="sidebar"></div>
        <div
          ref="content"
          class="content fit flex-1 p-4 overflow-scroll relative"
        >
          <!-- 鼠标拖动 -->
          <img ref="image" :src="url" @click="handleImg" :class="pictureType" />
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<style scoped>
.main {
  -webkit-row-gap: v-bind(gap + 'px');
  -moz-row-gap: v-bind(gap + 'px');
  grid-row-gap: v-bind(gap + 'px');
  row-gap: v-bind(gap + 'px');
}
.item {
  width: v-bind(width + 'px');
  font-size: 0;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
}
:deep(.el-drawer) {
  background: v-bind(bg);
}
:deep(.el-drawer__header) {
  line-height: 50px;
  color: #ddd !important;
  padding: 0 20px;
  margin-bottom: 0;
  background-color: #212427;
  background-image: linear-gradient(to bottom, #292c2f 0, #191c1f 100%);
  text-shadow: 1px 1px 3px rgb(0 0 0 / 75%);
  box-shadow: inset 0 0 0 1px rgb(31 31 31 / 66%), 0 0 10px rgb(0 0 0 / 75%),
    0 0 10px rgb(0 0 0 / 75%);
  z-index: 1;
}
:deep(.el-drawer__body) {
  padding: 0;
  overflow: hidden;
}
.sidebar {
  width: 280px;
  background-color: #1b1b1b;
  border-right: 1px solid #292929;
}
.content img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  cursor: zoom-in;
  cursor: -webkit-zoom-in;
}
.fit img {
  max-width: 95%;
  max-height: 95%;
}
.fill .fill-horizontal {
  max-width: none;
  max-height: 100%;
  margin-top: 0px;
  margin-bottom: 0px;
}
.fill .fill-vertical {
  max-width: 100%;
  max-height: none;
  margin-top: 0px;
  margin-bottom: 0px;
}
.full img {
  max-height: none;
  max-width: none;
  cursor: zoom-out;
  cursor: -webkit-zoom-out;
  padding: 40px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.content .panning {
  cursor: grabbing;
}
</style>
