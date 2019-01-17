declare interface QueryWrapperCtor<T, F, E> {
  items: T[]
  pn?: number
  cn?: number
  tn?: number
  sn?: number
  sortby?: string
  query?: string
  filters?: {
    [key in keyof F]?: F[key]
  }
}
