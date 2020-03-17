<template>
	<el-form ref="form" label-width="80px">
		<el-form-item label="市场价格">
			<el-input type="number" :value="oprice" @input="vmodel('oprice',$event)" class="w-25" placeholder="请输入商品的市场价格">
				<template slot="append">元</template>
			</el-input>
		</el-form-item>
		<el-form-item label="销售价格">
			<el-input type="number" :value="pprice" @input="vmodel('pprice',$event)" class="w-25" placeholder="请输入商品的市场价格">
				<template slot="append">元</template>
			</el-input>
		</el-form-item>
		<el-form-item label="成本价格">
			<el-input type="number" :value="cprice" @input="vmodel('cprice',$event)" class="w-25" placeholder="请输入商品的市场价格">
				<template slot="append">元</template>
			</el-input>
		</el-form-item>
		<el-form-item label="商品重量">
			<el-input type="number" :value="weight" @input="vmodel('weight',$event)" class="w-25" placeholder="请输入商品的市场价格">
				<template slot="append">公斤</template>
			</el-input>
		</el-form-item>
		<el-form-item label="商品体积">
			<el-input type="number" :value="volume" @input="vmodel('volume',$event)" class="w-25" placeholder="请输入商品的市场价格">
				<template slot="append">立方米</template>
			</el-input>
		</el-form-item>
	</el-form>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default{
		computed: {
			...mapState({
				// 单规格
				oprice:state=>state.goods_create.oprice,
				pprice:state=>state.goods_create.pprice,
				cprice:state=>state.goods_create.cprice,
				weight:state=>state.goods_create.weight,
				volume:state=>state.goods_create.volume,
			})
		},
		methods: {
			...mapMutations(['vModelState']),
			// 修改表单的值
			vmodel(key,value){
				this.vModelState({key,value})
			},
		}
	}
</script>

<style>
</style>
