import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 引入组件库
import MTD from '@ss/mtd-vue'
import '@ss/mtd-vue/lib/theme-chalk/index.css'

Vue.use(MTD)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
