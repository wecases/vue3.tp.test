import { defineStore } from 'pinia'
import request from '@/request/request'

export const useHomeStore = defineStore('home', {
  state: (): State => {
    return {
      activeId: '100',
      sideNav: [
        {
          id: '100',
          name: '热门精选',
          icon: 'i-ep-pear',
          path: '/general',
        },
        {
          id: '010',
          name: '动漫精选',
          icon: 'i-ep-apple',
          path: '/anime',
        },
        {
          id: '001',
          name: '人物精选',
          icon: 'i-ep-orange',
          path: '/people',
        },
      ],
      list: [],
      meta: {} as searchMeta,
    }
  },
  getters: {},
  actions: {
    async getSearch(params: SearchParams): Promise<void> {
      params.purity = '100'
      params.categories = this.activeId

      const res: SearchData = await request({
        url: '/api/v1/search',
        method: 'get',
        params,
      })
      this.meta = res.meta
      if (this.meta.current_page === 1) {
        this.list = res.data
      } else {
        this.list = [...this.list, ...res.data]
      }
    },

    async getDetails(id: string) {
      const url = `/api/v1/w/${id}`
      const res = await request({
        url,
        method: 'get',
      })
      return res.data
    },

    setActiveId(id: categories) {
      this.activeId = id
    },
  },
})
