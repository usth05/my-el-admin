<template>
	<table class="table table-sm table-bordered">
		<thead>
			<tr>
				<th scope="col" class="text-center" style="vertical-align: middle;" v-for="(th,thi) in tableThs" :key="thi"
				 :rowspan="th.rowspan" :colspan="th.colspan">
					{{th.name}}
				</th>
			</tr>
			<tr>
				<th scope="col" class="text-center" style="vertical-align: middle;" v-for="(th,thi) in skuLables" :key="thi" rowspan="1"
				 colspan="1">
					{{th.name}}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item,index) in list" :key="index">
				<!-- 商品规格 -->
				<th class="text-center" style="vertical-align: middle;" scope="row" v-for="(sku,skuI) in item.skus" :key="skuI">{{sku.name}}</th>
				<td class="text-center" width="100">
					<span class="btn btn-light border">
						<i class="el-icon-plus"></i>
					</span>	
				</td>
				<td class="text-center" width="100">
					<input type="number" class="form-control" v-model="item.oprice">
				</td>
				<td class="text-center" width="100">
					<input type="number" class="form-control" v-model="item.pprice">
				</td>
				<td class="text-center" width="100">
					<input type="number" class="form-control" v-model="item.cprice">
				</td>
				<td class="text-center" width="100">
					<input type="number" class="form-control" v-model="item.stock">
				</td>
				<td class="text-center" width="100">
					<input type="number" class="form-control" v-model="item.weight">
				</td>
				<td class="text-center" width="100">
					<input type="number" class="form-control" v-model="item.volume">
				</td>
				<td class="text-center" width="100">
					<input type="text" class="form-control" v-model="item.code">
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
	import {mapGetters,mapState} from 'vuex'
	export default {
		data(){
			return {
				list:[]
			}
		},
		computed: {
			...mapGetters(['tableThs','tableData','skuLables']),
			...mapState({
				sku_card: state => state.goods_create.sku_card
			}),
		},
		watch:{
			tableData(newValue,oldValue){
				this.list = newValue;
			}
		},
		mounted() {
			this.list = this.tableData;
		}
	}
</script>

<style>
</style>
