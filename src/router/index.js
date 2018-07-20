import Vue from 'vue'
import Router from 'vue-router'

/* Pages */
import Home from '@/pages/Home'
import Others from '@/pages/Others'

/* Sub pages */
import Gauges from '@/pages/home/Gauges'
import Winpc32 from "@/pages/home/Winpc32"
import Todo from '@/pages/Others/Todo'
import ProductTester from '@/pages/Others/ProductTester'
import Chatroom from '@/pages/Others/Chatroom'
import ToolPage from '@/pages/Others/ToolPage'

/* GPX pages */
import Gpx from '@/pages/home/Gpx'
import Void from '@/components/gpx_window/Void'
import Window1 from '@/components/gpx_window/window1'
import Window2 from '@/components/gpx_window/window2'
import Window3 from '@/components/gpx_window/window3'
import Window4 from '@/components/gpx_window/window4'
import Window5 from '@/components/gpx_window/window5'

// add global-level functionality to Vue
// call VueRouter.install(Vue)
Vue.use(Router)

export default new Router({
	// mode: 'history', // 讓URL不要有#符號, 但會影響SSR
	routes: [
		{
			path: '/Home',
			redirect: '/Home',
			component: Home,
			children: [
				{
					path: 'Gauges',
					name: 'Gauges',
					component: Gauges
				},
				{
					path: 'Winpc32',
					name: 'Winpc32',
					component: Winpc32
				},
				{
					path: 'Gpx',
					component: Gpx,
					children: [
						{
							path: '',
							name: 'Gpx',
							component: Void,
						},
						{
							path: 'Window1',
							name: 'Window1',
							component: Window1,
						},
						{
							path: 'Window2',
							name: 'Window2',
							component: Window2,
						},
						{
							path: 'Window3',
							name: 'Window3',
							component: Window3,
						},
						{
							path: 'Window4',
							name: 'Window4',
							component: Window4,
						},
						{
							path: 'Window5',
							name: 'Window5',
							component: Window5,
						},
					]
				},
			]
		},
		{
			path: '/Others',
			component: Others,
			children: [
				{
					path: '',
					name: 'Others',
					component: Todo
				},
				{
					path: 'Todo',
					name: 'Todo',
					component: Todo
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
				},
				{
					path: 'ToolPage',
					name: 'ToolPage',
					component: ToolPage
				}
			]
		},
		{
			// 其他路徑一律導回首頁
			path: '/*',
			redirect: '/Home/Gpx'
		}
	]
})
