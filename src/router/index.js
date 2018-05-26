import Vue from 'vue'
import Router from 'vue-router'

/* pages */
import Home from '@/pages/Home'
import Miscellaneous from '../pages/Miscellaneous'
import Todo from '../components/Todo'
import Markdown from '../components/Markdown'
import ProductTester from '../pages/ProductTester'
import Loading from '../pages/Loading'

// add global-level functionality to Vue
// call VueRouter.install(Vue)
Vue.use(Router)

export default new Router({
  mode: 'history', // 讓URL不要有#符號
  routes: [
    {
      path: '/Home',
      component: Home,
      children: [
        {
          path: '',
          name: 'home',
          component: Todo
        },
        {
          path: 'Todo',
          name: 'Todo',
          component: Todo
        }
      ]
    },
    {
      path: '/Miscellaneous',
      component: Miscellaneous,
      children: [
        {
          path: 'Todo',
          name: 'Miscellaneous',
          component: Todo
        },
        {
          path: 'Markdown',
          name: 'Markdown',
          component: Markdown
        },
        {
          path: 'ProductTester',
          name: 'ProductTester',
          component: ProductTester
        }
      ]
    },
    {
      path: '/loading',
      name: 'Loading',
      component: Loading
    },
    {
      // 其他路徑一律導回首頁
      path: '/*',
      redirect: '/Home'
    }
  ]
})
