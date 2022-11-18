import request from './request'

export const getHomeMultidata = () => request({ url: '/', method: 'get' })
