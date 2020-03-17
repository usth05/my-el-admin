<template>
	<div class="card mb-3" style="line-height: 1.2;">
		<div class="card-header d-flex align-items-center">
			规格项：
			<el-input size="mini" style="width: 200px;" :value="item.name" @input="vModel('name',index,$event)">
				<el-button slot="append" icon="el-icon-more"></el-button>
			</el-input>
			<el-radio-group size="mini" class="ml-2" :value="item.type" @input="vModel('type',index,$event)" style="margin-bottom: -10px;">
				<el-radio :label="0">无</el-radio>
				<el-radio :label="1">颜色</el-radio>
				<el-radio :label="2">图片</el-radio>
			</el-radio-group>
			<!-- 上移 -->
			<el-button size="mini" @click="sortCard('moveUp',index)" :disabled="index === 0" class="ml-auto" icon="el-icon-top"></el-button>
			<!-- 下移 -->
			<el-button size="mini" @click="sortCard('moveDown',index)" :disabled="(index+1) === skuCardTotal" icon="el-icon-bottom"></el-button>
			<el-button size="mini" type="text" @click="delectSkuCard(index)">删除</el-button>
		</div>
		<div class="card-body">
			<!-- 规格属性列表 -->
			<div class="d-flex align-items-center flex-wrap">
				 
				 <sku-card-children 
				 :type="item.type" v-for="(item2,index2) in list"
				 :key="index2" :item="item2"
				 :index="index2"
				 :cardIndex="index"
				 v-dragging="{ item: item2, list: list, group: `skuItem{$index}` }"></sku-card-children>
				 
			</div>
			<!-- 增加规格 -->
			<div class="mt-2">
				<el-button type="text" size="mini" icon="el-icon-plus" @click="addSkuValue(index)">增加规格值</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import skuCardChildren from './sku-card-children.vue'
	export default{
		components:{
			skuCardChildren
		},
		data() {
			return {
				list: this.item.list
			}
		},
		props: {
			index: Number,
			item: Object,
			skuCardTotal:Number
		},
		mounted() {
			this.$dragging.$on('dragend', (e) => {
				if(e.group === 'skuItem' + this.index){
					this.sortSkuValue({
						index:this.index,
						value:this.list
					})
				}
			})
		},
		methods:{
			...mapMutations(['delectSkuCard','vModelSkuCord','sortSkuCard','addSkuValue','sortSkuValue']),
			vModel(key,index,value){
				this.vModelSkuCord({key,index,value});
			},
			// 排序
			sortCard(action,index){
				this.sortSkuCard({action,index})
			}
		}
	}
</script>

<style>
</style>
