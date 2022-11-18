<script setup lang="ts">
/**
 * @File:   index.vue
 * @Time:   2022/11/18 09:16:29
 * @Author: Hao1617
 * @Desc:
 */
// import { getHomeMultidata } from '@/request/api'
import bg from '@/assets/bg.png'
import * as echarts from 'echarts'
import chinaJSON from '@/assets/china.json'

// const { data } = await getHomeMultidata()

const chinaMap = ref<HTMLElement>()
const regions = []
const scatter = []

const drawChina = () => {
  const myChart = echarts.init(chinaMap.value!)
  echarts.registerMap('china', chinaJSON as any)
  const option = {
    geo: {
      map: 'china',
      // roam: true, //是否允许缩放，拖拽
      zoom: 1, //初始化大小
      //缩放大小限制
      scaleLimit: {
        min: 1, //最小
        max: 2, //最大
      },
      //设置中心点
      center: [115.97, 29.71],
      //省份地图添加背景
      regions: regions,
      itemStyle: {
        areaColor: '#073354',
        color: 'red',
        borderColor: '#45b3e6',
        borderWidth: 2,
      },
      //高亮状态
      emphasis: {
        areaColor: '#4eabdc',
        label: {
          show: true,
          color: '#ffffff',
        },
      },
    },
    //配置属性
    series: {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: scatter,
      showEffectOn: 'render',
      rippleEffect: {
        //涟漪特效相关配置
        brushType: 'stroke', //波纹的绘制方式，可选 'stroke' 和 'fill'
      },
      label: {
        show: true,
        color: '#ffffff',
      },
      itemStyle: {
        //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时
        color: '#ffffff', //散点的颜色
        shadowBlur: 10,
        shadowColor: 20,
        fontSize: '12px',
      },
      zlevel: 1,
    },
  }
  myChart.setOption(option)
}
onMounted(() => {
  drawChina()
})
</script>

<template>
  <div
    class="w-screen h-screen flex"
    :style="{ background: `url(${bg}) 100% 100% / cover` }"
  >
    <div class="flex-1" ref="chinaMap"></div>
  </div>
</template>

<style scoped></style>
