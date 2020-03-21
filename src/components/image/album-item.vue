<template>
	<li class="list-group-item list-group-item-action d-flex align-items-center"
	 :class="{'active sum-active':active}"
	 style="cursor: pointer;"
	 @click.stop="$emit('change',index)">
		{{item.name}}
		<span class="btn btn-light btn-sm ml-auto" v-if="!showOptions">
			{{ item.num}}</i>
		</span>
		<el-dropdown class="ml-auto" v-else>
			<span class="btn btn-light btn-sm">
				{{ item.num}}<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item @click.stop.native="$emit('edit',{index,item})">修改</el-dropdown-item>
				<el-dropdown-item @click.stop.native="$emit('del',index)">删除</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</li>
</template>

<script>
	export default{
		props:{
			item:Object,
			index:Number,
			active:{
				type:Boolean,
				default: false
			},
			showOptions:{
				type:Boolean,
				default:true
			}
		},
		methods:{

		}
	}
</script>

<style>
</style>
