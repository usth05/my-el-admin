<template>
	<div>
		<div class="d-flex align-items-center">
			<!-- 左 -->
			<slot name="left"></slot>
			<!-- 右边 -->
			<div class="ml-auto" v-show="!superSearch">
				<slot name="right">
					<el-input :placeholder="placeholder" size="mini" style="width: 150px;" class="mr-2"
					v-model="keyWord"></el-input>
					<el-button size="mini" type="info" @click="$emit('search',keyWord)">搜索</el-button>
					<el-button size="mini" @click="superSearch=true">高级搜索</el-button>
				</slot>
			</div>
		</div>
		<el-card class="box-card bg-light my-3" v-show="superSearch">
			<div slot="header" class="clearfix" style="margin: -10px;">
				<span>高级搜索</span>
				<el-button style="float: right; padding: 3px 0" @click="closeSuperSearch()" type="text">收起</el-button>
			</div>
			<!-- 表单 -->
			<slot name="form"></slot>
		</el-card>
	</div>
</template>

<script>
	export default{
		props:{
			placeholder:{
				type:String,
				default:""
			}
		},
		data(){
			return {
				keyWord:"",
				superSearch:false
			}
		},
		methods:{
			closeSuperSearch(){
				this.superSearch = false;
			}
		}
	}
</script>

<style>
</style>
