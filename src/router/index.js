import Vue from 'vue'
import Router from 'vue-router'

/* Pages */
import Home from '@/pages/Home'
import Others from '@/pages/Others'
import Loading from '@/pages/Loading'

/* Sub pages */
import SampleControl from '@/pages/home/SampleControl'
import Winpc32 from "@/pages/home/Winpc32"
import Todo from '@/pages/Others/Todo'
import Markdown from '@/pages/Others/Markdown'
import ProductTester from '@/pages/Others/ProductTester'
import Chatroom from '@/pages/Others/Chatroom'

/* GPX pages */
import Gpx from '@/pages/home/Gpx'
import Void from '@/components/gpx_window/Void'
import window1 from '@/components/gpx_window/window1'
import window2 from '@/components/gpx_window/window2'
import window3 from '@/components/gpx_window/window3'
import window4 from '@/components/gpx_window/window4'
import window5 from '@/components/gpx_window/window5'

// add global-level functionality to Vue
// call VueRouter.install(Vue)
Vue.use(Router)

export default new Router({
	mode: 'history', // 讓URL不要有#符號
	routes: [
		{
			path: '/Home',
			redirect: '/Home/Gpx',
			component: Home,
			children: [
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
					path: 'Gpx',
					component: Gpx,
					children: [
						{
							path: '',
							name: 'Gpx',
							component: Void,
						},
						{
							path: 'window1',
							name: 'window1',
							component: window1,
						},
						{
							path: 'window2',
							name: 'window2',
							component: window2,
						},
						{
							path: 'window3',
							name: 'window3',
							component: window3,
						},
						{
							path: 'window4',
							name: 'window4',
							component: window4,
						},
						{
							path: 'window5',
							name: 'window5',
							component: window5,
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
			redirect: '/Home/Gpx'
		}
	]
})
