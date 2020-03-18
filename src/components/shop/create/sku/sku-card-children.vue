<template>
	<div class="border py-1 mr-3 px-2 d-flex align-items-center rounded position-relative">
		<div v-if="type != 0">
			<!-- 颜色选中器 -->
			<el-color-picker size="mini" v-if="type === 1"></el-color-picker>
			<!-- 图片选择器 -->
			<template v-else>
				<span @click="chooseImage" class="btn btn-light border">
					<i class="el-icon-plus"></i>
				</span>
			</template>
			
		</div>
		<input v-if="type === 0" @input="inputChange" :value="item.name" class="form-control text-center border-0" style="width: 80px;font-size: 15px;">
		<!-- 删除 -->
		<span class="btn btn-light p-0 position-absolute"
		@click="delSkuValue({cardIndex,valueIndex:index})"
		style="line-height: 1;right: -10px;top:-10px">
			<i class="el-icon-circle-close"></i>
		</span>
	</div>
</template>

<script>
	import {mapMutations} from "vuex"
	export default{
		props: {
			type: {
				type: Number,
				default: 0
			},
			item:Object,
			index:Number,
			cardIndex:Number
		},
		inject:['app'],
		methods:{
			...mapMutations(['delSkuValue','upDataSkuValue']),
			inputChange(e){
				this.vModel('name',e.target.value);
			},
			vModel(key,value){
				this.upDataSkuValue({
					cardIndex:this.cardIndex,
					valueIndex:this.index,
					key,
					value
				})
			},
			// 选择图片
			chooseImage(){
				this.app.show();
			}
		}
	}
</script>

<style>
</style>
