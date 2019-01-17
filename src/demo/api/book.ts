export async function getBookList ({ authorId, query }: {
  authorId?: number
  query?: string,
}) {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve({
        items: [
          {
            id: 1,
            name: `作者${authorId}的书1`,
            price: 1000,
            // 字数
            wordNumber: 1000000,
            publishDate: '2018-12-12',
            publishHouse: '哈哈出版社',
          },
          {
            id: 2,
            name: `作者${authorId}的书2`,
            price: 1000,
            // 字数
            wordNumber: 1000000,
            publishDate: '2018-12-12',
            publishHouse: '哈哈出版社',
          },
        ],
        cn: 1,
        tn: 100,
      })
    }, 3000)
  })
}

export async function getBook ({ id }: {
  id?: number,
}) {
  return {
    id,
    name: `书${id}的作者`,
    age: 10,
    birth: '2018-12-12',
  }
}
