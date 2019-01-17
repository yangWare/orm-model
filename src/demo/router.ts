import Vue from 'vue'
import Router from 'vue-router'

import AuthorList from '@/demo/views/AuthorList.vue'
import AuthorDetail from '@/demo/views/AuthorDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/authorList',
      name: 'authorList',
      component: AuthorList,
    },
    {
      path: '/author/:id',
      name: 'authorDetail',
      component: AuthorDetail,
    },
  ],
})
