<template>
  <div style="padding: 0 20px;">
    <div style="text-align: middle; margin: 20px 0;">
      <mtd-input
        style="text-align: middle;"
        v-model="authorQuery.query"
      >
      </mtd-input>
      <mtd-button
        style="text-align: middle; margin-left: 20px;"
        @click="authorQuery.execute.bind(authorQuery)"
      >搜索</mtd-button>
    </div>
    <mtd-table
      :data="authorQuery.items"
    >
      <mtd-table-column
        prop='id'
        label='ID'
      >
        <template slot-scope="scope">
          <router-link :to="`/author/${scope.row.id}`">{{scope.row.id}}</router-link>
        </template>
      </mtd-table-column>
      <mtd-table-column
        prop='name'
        label='名称'
      >
      </mtd-table-column>
      <mtd-table-column
        prop='age'
        label='年龄'
      >
      </mtd-table-column>
      <mtd-table-column
        prop='birth'
        label='生日'
      >
      </mtd-table-column>
    </mtd-table>
    <mtd-pagination
      style="text-align: right; margin-top: 20px;"
      :total="authorQuery.pagination.tn"
      show-total
      size="small"
      :current-page="authorQuery.pagination.cn"
      @change="handlePageChange"
    >
    </mtd-pagination>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Author from '../store/Author'

@Component
export default class AuthorList extends Vue {
  authorQuery = Author.createQueryWrapper<Author>()

  async handlePageChange () {
    await this.authorQuery.execute()
  }

  async handleSearch () {
    await this.authorQuery.execute()
  }

  created () {
    this.authorQuery.execute()
  }
}
</script>
<style lang="scss" scoped>
</style>
