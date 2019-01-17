<template>
  <div style="padding: 0 20px">
    <mtd-form
      :model="author"
    >
      <mtd-form-item label="姓名" prop="name">
        {{author.name}}
      </mtd-form-item>
      <mtd-form-item label="年龄" prop="age">
        {{author.age}}
      </mtd-form-item>
      <mtd-form-item label="生日" prop="birth">
        {{author.birth}}
      </mtd-form-item>
    </mtd-form>
    <mtd-table
      v-if="!author.$loading.books"
      :data="author.books.items"
    >
      <mtd-table-column
        prop='id'
        label='ID'
      >
      </mtd-table-column>
      <mtd-table-column
        prop='name'
        label='名称'
      >
      </mtd-table-column>
      <mtd-table-column
        prop='price'
        label='价格'
      >
      </mtd-table-column>
      <mtd-table-column
        prop='wordNumber'
        label='字数'
      >
      </mtd-table-column>
      <mtd-table-column
        prop='publishDate'
        label='出版日期'
      >
      </mtd-table-column>
      <mtd-table-column
        prop='publishHouse'
        label='出版社'
      >
      </mtd-table-column>
    </mtd-table>
    <div v-if="author.$loading.books">
      正在加载该作者的书籍列表...
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Author from '@/demo/store/Author'

@Component
export default class AuthorDetail extends Vue {
  author: Author = new Author()

  async created () {
    const id = Number(this.$route.params.id)
    this.author = await Author.find({
      id,
    })
    await this.author.getChild('books')
  }
}
</script>
<style lang="scss" scoped>
</style>
