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
				<th scope="col" class="text-center" style="vertical-align: middle;" v-for="(th,thi) in sku_card" :key="thi" rowspan="1"
				 colspan="1">
					{{th.name}}
				</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th class="text-center" style="vertical-align: middle;" scope="row">1</th>
			</tr>
		</tbody>
	</table>
</template>

<script>
	import {mapGetters,mapState} from 'vuex'
	export default {
		computed: {
			...mapGetters(['tableThs','tableData']),
			...mapState({
				sku_card: state => state.goods_create.sku_card
			})
		},
		mounted() {
			console.log(this.tableThs)
		}
	}
</script>

<style>
</style>
