let routes = [
	{
		// path: '/',
		// name: 'layout',
		redirect:{name:'index'},
		// component: () => import('../../views/layout.vue'),
		component: 'layout',
		children: [
			{
				// path: '/index',
				// name: 'index',
				// component: () => import('../../views/index/index.vue')
				component: 'index/index'
			},
			{
				// path: '/shop/goods/list',
				// name: 'list',
				// component: () => import('../../views/index/index.vue')
				component: 'shop/goods/list'
			}
		]
	},
	{
		// path: '/login',
		// name: 'login',
		// component: () => import('../../views/login/index.vue')
		component: 'login/index'
	},
	{
		path:'*',
		redirect:{name:'index'},
	}
]

// 获取路由信息方法
let getRoutes = function(){
	// 自动生成路由
	createrRoute(routes);
	return routes
}

// 自动生成路由
function createrRoute(arr){
	for(let i = 0; i < arr.length; i++){
		if(!arr[i].component) return
		// 去除index
		let val = deleteIndex(arr[i].component)
		// 生成name
		arr[i].name = arr[i].name || val.replace(/\//g,'_');
		// 生成path
		arr[i].path = arr[i].path || `/${val}`;
		//自动生成component
		let componentFun = import(`../../views/${arr[i].component}.vue`);
		arr[i].component = ()=>componentFun;
		if(arr[i].children && arr[i].children.length > 0){
			createrRoute(arr[i].children);
		}
	}
}

// 去除index
function deleteIndex(str){
	// 获取最后一个/的索引
	let index = str.lastIndexOf('/');
	// 获取最后一个/后面的值
	let val = str.substring(index+1,str.length);
	// 判断val是否位index结尾
	if(val === 'index'){
		return str.substring(index,-1);
	}
	return str;
}
export default getRoutes()
