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
			<tr v-for="(item,index) in tableData" :key="index">
				<!-- 商品规格 -->
				<th class="text-center" style="vertical-align: middle;" scope="row" v-for="(sku,skuI) in item.skus" :key="skuI">{{sku.name}}</th>
				<td class="text-center" style="vertical-align: middle;">{{item.image}}</td>
				<td class="text-center" style="vertical-align: middle;">{{item.oprice}}</td>
				<td class="text-center" style="vertical-align: middle;">{{item.pprice}}</td>
				<td class="text-center" style="vertical-align: middle;">{{item.cprice}}</td>
				<td class="text-center" style="vertical-align: middle;">{{item.stock}}</td>
				<td class="text-center" style="vertical-align: middle;">{{item.weight}}</td>
				<td class="text-center" style="vertical-align: middle;">{{item.volume}}</td>
				<td class="text-center" style="vertical-align: middle;">{{item.code}}</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
	import {mapGetters,mapState} from 'vuex'
	export default {
		computed: {
			...mapGetters(['tableThs','tableData','skuLables']),
			...mapState({
				sku_card: state => state.goods_create.sku_card
			}),
		},
		mounted() {
			console.log(this.tableData)
		}
	}
</script>

<style>
</style>
