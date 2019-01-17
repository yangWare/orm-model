import { BaseModel, primaryKey, hasMany } from '../../lib/index'
import Book from './Book'
import { getAuthorList, getAuthor } from '../api/author'

declare interface AuthorCtor {
  id?: number
  name?: string
  age?: number
  birth?: string
  books?: Book[]
}

export default class Author extends BaseModel {
  @primaryKey
  id: number = -1
  name: string = ''
  age: number = 0
  birth: string = ''
  @hasMany(Book, 'author')
  books: ListWrapper<Book> = {
    items: [],
  }

  constructor (p?: AuthorCtor) {
    super()
    this.resolveCtor(p)
  }

  static async findAll ({ query }: {
    query?: string,
  }) {
    // todo 发起一个请求，此处mock数据
    const res = await getAuthorList({
      query,
    })
    return this.toList<Author>(res)
  }

  static async find ({ book, id }: {
    book?: Book,
    id?: number,
  }) {
    const res = await getAuthor({
      bookId: (book && book.id) || void 0,
      id,
    })
    return this.toInstance<Author>(res)
  }
}
