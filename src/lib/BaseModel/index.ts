import QueryWrapper from '../QueryWrapper'

class BaseModel {
  static toInstance<T> (p: any): T {
    return new this(p) as any
  }

  static toList<T> (p: any): ListWrapper<T> {
    p.items = p.items.map((item: any) => new this(item))
    return p
  }

  static createQueryWrapper<T, F = {}, E = {}> (p?: QueryWrapperCtor<T, F, E>): QueryWrapper<T, F, E> {
    return new QueryWrapper<T, F, E>(p, this)
  }

  constructor (p?: any) {
    (this as any).$loading = {}
    const $children = this.proto.$children
    if ($children) {
      Object.keys($children).forEach((key: string) => {
        (this as any).$loading[key] = false
      })
    }
  }

  get proto () {
    return (this as any).__proto__
  }

  resolveCtor (p: any) {
    if (!p) {
      return
    }
    Object.assign(this, p)
    this._resolverChildren(p)
  }

  async getChild (key: string) {
    if ((this as any).$loading[key]) {
      throw new Error(`子Model[${key}]正在请求...`)
    }
    (this as any).$loading[key] = true
    try {
      const $children = this.proto.$children
      if (!$children[key]) {
        throw new Error(`key: [${key}]并没有指定model关系`)
      }
      const { model, type, fkey } = $children[key]
      if (type === 'hasOne') {
        (this as any)[key] = await model.find({
          [fkey]: this,
        })
      } else {
        (this as any)[key] = await model.findAll({
          [fkey]: this,
        })
      }
      (this as any).$loading[key] = false
    } catch (e) {
      (this as any).$loading[key] = false
      throw e
    }
  }

  _resolverChildren (p: any) {
    const $children = this.proto.$children
    if (!$children) {
      return
    }
    const that: any = this
    Object.keys($children).forEach((key: string) => {
      if (p[key]) {
        const childConfig = $children[key]
        const model = childConfig.model
        const ctorParams: any = {
          ...p[key],
        }
        if (childConfig.fkey) {
          ctorParams[childConfig.fkey] = that
        }
        that[key] = new model(ctorParams)
      }
    })
  }
}

export default BaseModel
