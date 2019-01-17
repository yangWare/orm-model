import { BaseModel, primaryKey, hasMany, hasOne } from '../../lib/index'
import Author from './Author'
import { getBookList, getBook } from '../api/book'

declare interface BookCtor {
  id?: number
  name?: string
  price?: number
  // 字数
  wordNumber?: number
  publishDate?: string
  publishHouse?: string
  author?: Author
}

export default class Book extends BaseModel {
  @primaryKey
  id: number = -1
  name: string = ''
  price: number = 0
  // 字数
  wordNumber: number = 0
  publishDate: string = ''
  publishHouse: string = ''
  @hasOne(Author, 'book')
  author: Author

  constructor (p?: BookCtor) {
    super()
    this.resolveCtor(p)
  }

  static async findAll ({ author, query }: {
    author?: Author,
    query?: string,
  }) {
    const res = await getBookList({
      authorId: (author && author.id) || void 0,
      query,
    })
    return this.toList<Author>(res)
  }

  static async find (p: {
    id: number,
  }) {
    const res = await getBook(p)
    return this.toInstance(res)
  }
}
