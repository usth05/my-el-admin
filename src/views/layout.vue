<template>
	<div>
		<el-container style="position: absolute;left: 0;top: 0;bottom: 0;right: 0;overflow: hidden;">
			<!-- 头部布局 -->
			<el-header class="d-flex align-items-center" style="background-color:#545c64">
				<a class="h5 mb-0 text-light mr-auto">{{$conf.logo}}</a>
				<el-menu :default-active="navBar.active" mode="horizontal" @select="handleSelect" background-color="#545c64"
				 text-color="#fff" active-text-color="#ffd04b">
					<el-menu-item v-for="(item,index) in navBar.list" :index="index | numToString" :key="index">{{item.name}}</el-menu-item>
					<!-- <el-menu-item index="1">首页</el-menu-item>
					<el-menu-item index="2">商品</el-menu-item>
					<el-menu-item index="3">订单</el-menu-item>
					<el-menu-item index="4">会员</el-menu-item>
					<el-menu-item index="5">设置</el-menu-item> -->
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

			<el-container style="height: 100%;padding-bottom: 60px;">
				<!-- 侧边导航 -->
				<el-aside width="200px">
					<el-menu :default-active="slideMenuActive" @select="sliderSelect">
						<el-menu-item :index="index|numToString" v-for="(item, index) in slideMenus">
							<i :class="item.icon"></i>
							<span slot="title">{{item.name}}</span>
						</el-menu-item>
					</el-menu>
				</el-aside>
				<!-- 主体部分 -->
				<el-main>
					<li v-for="i in 100" :key="i">{{i}}</li>
				</el-main>
			</el-container>
		</el-container>
		<!-- <router-view></router-view> -->
	</div>
</template>

<script>
	import common from '@/common/mixins/common.js'
	export default {
		mixins: [common],
		data() {
			return {
				navBar: {
					active: '0',
					list: [{
							name: '首页',
							subActive: '0',
							submenu: [{
								icon: "el-icon-s-home",
								name: "后台首页",
							}, {
								icon: "el-icon-s-claim",
								name: "商品列表",
							}]
						},
						{
							name: '商品',
							subActive: '0',
							submenu: [{
								icon: "el-icon-s-home",
								name: "后台首页",
							}, {
								icon: "el-icon-s-claim",
								name: "商品列表",
							}]
						},
						{
							name: '订单',
							subActive: '0',
							submenu: [{
								icon: "el-icon-s-home",
								name: "后台首页",
							}, {
								icon: "el-icon-s-claim",
								name: "商品列表",
							}]
						},
						{
							name: '会员',
							subActive: '0',
							submenu: [{
								icon: "el-icon-s-home",
								name: "后台首页",
							}, {
								icon: "el-icon-s-claim",
								name: "商品列表",
							}]
						},
						{
							name: '设置',
							subActive: '0',
							submenu: [{
								icon: "el-icon-s-home",
								name: "后台首页",
							}, {
								icon: "el-icon-s-claim",
								name: "商品列表",
							}]
						},
					]
				}
			}
		},
		computed: {
			// slideMenuActive(){
			// 	return this.navBar.list[this.navBar.active].subActive || '0'
			// },
			slideMenuActive:{
				get(){
					return this.navBar.list[this.navBar.active].subActive || '0'
				},
				set(val){
					this.navBar.list[this.navBar.active].subActive = val;
				}
			},
			slideMenus() {
				return this.navBar.list[this.navBar.active].submenu || []
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				this.navBar.active = key;
			},
			sliderSelect(key, keyPath) {
				this.slideMenuActive = key;
			}
		},
	}
</script>

<style>

</style>
