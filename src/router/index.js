import Vue from 'vue'
import Router from 'vue-router'

import SampleControl from '@/components/SampleControl'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SampleControl',
      component: SampleControl
    }
  ]
})
