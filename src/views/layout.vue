<template>
	<div>
		<el-container style="position: absolute;left: 0;top: 0;bottom: 0;right: 0;overflow: hidden;">
			<!-- 头部布局 -->
			<el-header class="d-flex align-items-center" style="background-color:#545c64">
				<a class="h5 mb-0 text-light mr-auto">{{$conf.logo}}</a>
				<el-menu :default-active="navBar.active" mode="horizontal" @select="handleSelect" background-color="#545c64"
				 text-color="#fff" active-text-color="#ffd04b">
					<el-menu-item v-for="(item,index) in navBar.list" :index="index | numToString" :key="index">{{item.name}}</el-menu-item>
					<el-submenu index="6">
						<template slot="title">
							<el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
							summer
						</template>
						<el-menu-item index="2-1">修改</el-menu-item>
						<el-menu-item index="2-2">退出</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-header>

			<el-container style="height: 100%;">
				<!-- 侧边导航 -->
				<el-aside width="200px">
					<el-menu style="height: 100%;" :default-active="slideMenuActive" @select="sliderSelect">
						<el-menu-item :index="index|numToString" v-for="(item, index) in slideMenus">
							<i :class="item.icon"></i>
							<span slot="title">{{item.name}}</span>
						</el-menu-item>
					</el-menu>
				</el-aside>
				<!-- 主体部分 -->
				<el-main class="bg-light">
					<!-- 面包屑导航 -->
					<div class="border-bottom mb-3 bg-white" style="padding: 20px;margin: -20px;" v-if="bran.length > 0">
						<el-breadcrumb separator-class="el-icon-arrow-right">
							<el-breadcrumb-item :to="{ path: item.path }" v-for="(item,index) in bran" :key="index">
								{{item.title}}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<router-view></router-view>
					<el-backtop target=".el-main" :bottom="100">
						<div style="height: 100%;width: 100%;background-color: #f2f5f6;box-shadow: 0 0 6px rgba(0,0,0, .12);text-align: center; line-height: 40px;color: #1989fa;">
							UP
						</div>
					</el-backtop>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import common from '@/common/mixins/common.js'
	export default {
		mixins: [common],
		data() {
			return {
				navBar: [],
				bran: [],
			}
		},
		created() {
			// 初始化菜单
			this.navBar = this.$conf.navBar;
			// 获去面包屑导航
			this.getRouterBran();
			// 初始化选中菜单
			this._initNavBar()
		},
		watch: {
			'$route'(to, from) {
				this.getRouterBran();
				localStorage.setItem("navActive", JSON.stringify({
					top: this.navBar.active,
					left: this.slideMenuActive
				}))
			}
		},
		computed: {
			// 当前选中的是第几个侧边导航
			slideMenuActive: {
				get() {
					return this.navBar.list[this.navBar.active].subActive || '0'
				},
				set(val) {
					this.navBar.list[this.navBar.active].subActive = val;
				}
			},
			// 侧边导航
			slideMenus() {
				return this.navBar.list[this.navBar.active].submenu || []
			}
		},
		methods: {
			// 默认 
			_initNavBar() {
				let r = localStorage.getItem("navActive");
				if (r) {
					r = JSON.parse(r);
					this.navBar.active = r.top;
					this.slideMenuActive = r.left;
				}
			},
			// 获取面包屑导航
			getRouterBran() {
				let b = this.$route.matched.filter(v => v.name);
				let arr = [];
				b.forEach((v, k) => {
					// 过滤layout或index
					if (v.name == 'index' || v.name === 'layout') return;
					arr.push({
						name: v.name,
						path: v.path,
						title: v.meta.title
					})
				})
				if (arr.length > 0) {
					arr.unshift({
						name: 'index',
						path: '/index',
						title: '后台首页'
					})
				}
				this.bran = arr;
			},
			handleSelect(key, keyPath) {
				this.navBar.active = key;
				// 默认选中跳转到当前激活
				this.slideMenuActive = '0';
				if (this.slideMenus.length > 0) {
					this.$router.push({
						name: this.slideMenus[this.slideMenuActive].pathname
					})
				}
			},
			sliderSelect(key, keyPath) {
				this.slideMenuActive = key;
				console.log(this.slideMenus[key]);
				// 跳转到指定页面
				this.$router.push({
					name: this.slideMenus[key].pathname
				})
			}
		},
	}
</script>

<style>

</style>
