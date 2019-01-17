/**
 * T: 保存的类类型
 * F: 除分页、排序之外的过滤参数
 */
export default class QueryWrapper<T, F, E = any> {
  // table数据
  items: T[] = []
  // 分页数据
  pagination = {
    cn: 1,
    pn: 1,
    tn: 0,
    sn: 10,
  }
  // 排序
  sortby = ''
  // 过滤
  query = ''
  // 其他定制过滤信息
  filters: {
    [key in keyof F]?: F[key]
  } = {}
  // 其他除items之外需要保存的数据，比如从后端返回的描述性信息
  extensions: {
    [key in keyof E]?: E[key]
  } = {}
  model: any = null
  findAll: any = null

  constructor (p?: QueryWrapperCtor<T, F, E>, model?: any, findAll?: any) {
    if (p) {
      Object.assign(this, p)
    }
    this.model = model
    this.findAll = findAll
  }
  async execute () {
    this.filters = this.filters || {}
    const params = {
      ...this.filters as object,
      cn: this.pagination.cn,
      sn: this.pagination.sn,
      sortby: this.sortby,
      query: this.query,
    }
    let res: any = null
    if (this.model) {
      res = await this.model.findAll(params)
    } else if (typeof this.findAll === 'function') {
      res = await this.findAll(params)
    }
    Object.assign(this, res || {})
  }
}
