export async function getAuthorList ({ query }: {
  query?: string,
}) {
  return {
    items: [
      {
        id: 1,
        name: `${query}1`,
        age: 10,
        birth: '2018-12-12',
      },
      {
        id: 2,
        name: `${query}2`,
        age: 10,
        birth: '2018-12-12',
      },
    ],
    cn: 1,
    tn: 100,
  }
}

export async function getAuthor ({ bookId, id }: {
  bookId?: number,
  id?: number,
}) {
  return {
    id: id || bookId,
    name: bookId ? `书${bookId}的作者` : `ID为${id}的作者`,
    age: 10,
    birth: '2018-12-12',
  }
}
