import Vue from 'vue'
import Router from 'vue-router'

/* pages */
import ProductTester from '../pages/ProductTester'
import Layout from '../pages/Layout'

// add global-level functionality to Vue
// call VueRouter.install(Vue)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout

    }
  ]
})
