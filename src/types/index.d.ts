declare interface detailsParams {
  id: string
}

declare type categories = '100' | '010' | '001'

declare interface sideItem {
  name: string
  icon: string
  id: categories
  path: string
}

declare interface State {
  activeId: categories
  sideNav: sideItem[]
  list: any[]
  meta: searchMeta
}

declare interface SearchParams {
  q?: string
  categories?: categories
  sorting?:
    | 'date_added'
    | 'relevance'
    | 'random'
    | 'views'
    | 'favorites'
    | 'toplist'
  order?: 'desc' | 'asc'
  topRange?: '1d' | '3d' | '1w' | '1M' | '3M' | '6M' | '1y'
  resolutions?: '1920x1080' | '1920x1200'
  ratio?: '16x9' | '16x10'
  colors?: string
  page?: number
  purity?: '100'
}

declare type searchMeta = {
  current_page: number
  last_page: number
  per_page: number
  query?: any
  seed?: any
  total: number
}

declare interface SearchData {
  data: []
  meta: searchMeta
}
