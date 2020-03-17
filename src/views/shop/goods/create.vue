<template>
	<div class="bg-white px-3 goods_create" style="margin: -20px;margin-top: -1rem;margin-bottom: 0 !important;">
		<router-link :to="{name:'shop_goods_list'}" style="position: absolute;top: 12px;left: 180px;">
			<el-button type="primary" plain size="mini">返回到商品列表</el-button>
		</router-link>
		<el-tabs v-model="tabIndex" @tab-click="handleClick">
			<!-- 基础设置 -->
			<el-tab-pane label="基础设置">
				<base-create></base-create>
			</el-tab-pane>
			<!-- 商品规格 -->
			<el-tab-pane label="商品规格">
				<el-form ref="form" label-width="80px">
					<el-form-item label="商品规格">
						<el-radio-group :value="sku_type" @input="vmodel('sku_type',$event)" size="medium">
							<el-radio-button :label="0">单一规格</el-radio-button>
							<el-radio-button :label="1">多规格</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-form>
				<!-- 单规格 -->
				<el-form ref="form" label-width="80px">
					<template v-if="sku_type===0">
						<single-attrs> </single-attrs>
					</template>
					<template v-else>
						<!-- 多规格 -->
						<!-- 规格卡片 -->
						<el-form ref="form" label-width="80px">
							<el-form-item label="添加规格">
								<sku-card v-for="(item, index) in sku_card" :skuCardTotal="skuCardTotal" :key="index" :item="item" :index="index"></sku-card>
								<el-button type="success" @click="addSkuCard" size="mini">添加规格</el-button>
							</el-form-item>
						</el-form>
						<el-form ref="form" label-width="80px">
							<el-form-item label="批量设置">
								<el-button type="text">销售价</el-button>
								<el-button type="text">市场价</el-button>
								<el-button type="text">成本价</el-button>
								<el-button type="text">库存</el-button>
								<el-button type="text">体积</el-button>
								<el-button type="text">重量</el-button>
							</el-form-item>
							<el-form-item label="规格设置">
								<sku-table></sku-table>
							</el-form-item>
						</el-form>
					</template>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="商品属性">商品属性</el-tab-pane>
			<el-tab-pane label="媒体设置">媒体设置</el-tab-pane>
			<el-tab-pane label="商品详情">商品详情</el-tab-pane>
			<el-tab-pane label="折扣设置">折扣设置</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import baseCreate from '@/components/shop/create/base-create.vue'
	import singleAttrs from '@/components/shop/create/single-attrs.vue'
	import skuCard from '@/components/shop/create/sku/sku-card.vue'
	import skuTable from '@/components/shop/create/sku-table.vue';
	export default {
		data() {
			return {
				tabIndex: 0,
			}
		},
		components: {
			baseCreate,
			singleAttrs,
			skuCard,
			skuTable
		},
		computed: {
			...mapState({
				sku_type: state => state.goods_create.sku_type, //0：单规格 1：多规格
				sku_card: state => state.goods_create.sku_card
			}),
			// 规格卡片总数
			skuCardTotal() {
				return this.sku_card.length;
			}
		},

		methods: {
			...mapMutations(['addSkuCard', 'vModelState']),
			// 修改表单的值
			vmodel(key, value) {
				this.vModelState({
					key,
					value
				})
			},
			handleClick() {

			}
		}
	}
</script>

<style>
	.goods_create .el-form-item {
		margin-bottom: 10px;
	}
</style>
