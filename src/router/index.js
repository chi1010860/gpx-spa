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
import Gpx from "@/pages/home/Gpx"
import UserControl from "@/components/gpx_window/UserControl"
import Void2 from "@/components/gpx_window/Void2"
import Void3 from "@/components/gpx_window/Void3"
import Void4 from "@/components/gpx_window/Void4"
import Void5 from "@/components/gpx_window/Void5"

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
					path: 'Gpx',
					name: 'Gpx',
					component: Gpx,
					children: [
						{
							path: 'UserInput',
							name: 'UserInput',
							component: UserControl,
						},
						{
							path: 'ColorControl',
							name: 'ColorControl',
							component: Void2,
						},
						{
							path: 'Output',
							name: 'Output',
							component: Void3,
						},
						{
							path: 'FigureControl',
							name: 'FigureControl',
							component: Void4,
						},
						{
							path: 'Miscellaneous',
							name: 'Miscellaneous',
							component: Void5,
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
			redirect: '/Home'
		}
	]
})
