import Vue from 'vue'
import Router from 'vue-router'

/* pages */
import Home from '@/pages/Home'
import Miscellaneous from '../pages/Miscellaneous'
import Todo from '../components/Todo'
import Markdown from '../components/Markdown'
import ProductTester from '../components/ProductTester'
import Loading from '../pages/Loading'
import Chatroom from '../components/Chatroom'
import SampleControl from '../components/SampleControl'
import Winpc32 from "../components/Winpc32"
import ButtonNavBar from "../components/ButtonNavBar"

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
          path: '/',
          name: 'Home',
          component: SampleControl
        },
        {
          path: 'SampleControl',
          name: 'SampleControl',
          component: SampleControl
        },
        {
          path: 'Winpc32',
          name: 'Winpc32',
          component: Winpc32
        },
        {
          path: 'ButtonNavBar',
          name: 'ButtonNavBar',
          component: ButtonNavBar
        }
      ]
    },
    {
      path: '/Miscellaneous',
      component: Miscellaneous,
      children: [
        {
          path: '/',
          name: 'Miscellaneous',
          component: Todo
        },
        {
          path: 'Todo',
          name: 'Todo',
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
        },
        {
          path: 'Chatroom',
          name: 'Chatroom',
          component: Chatroom
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
