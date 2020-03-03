<template>
	<div class="bg-white px-2" style="margin: -20px;margin-top: -1rem;">
		<el-tabs v-model="tabIndex" @tab-click="handleClick">
			<el-tab-pane v-for="(tab,tabI) in tabBars" :label="tab.name" :key="tabI">
				<buttonSearch ref="buttonSearch" placeholder="搜索的商品名称" @search="searchEvent">
					<!-- 左 -->
					<template #left>
						<el-button size="mini" type="success">发布商品</el-button>
						<el-button size="mini" type="warning">恢复商品</el-button>
						<el-button size="mini" type="danger">批量删除</el-button>
						<el-button size="mini">上架</el-button>
						<el-button size="mini">下架</el-button>
						<el-button size="mini">推荐</el-button>
					</template>
					<!-- 表单 -->
					<template #form>
						<el-form inline ref="form" :model="form" label-width="80px">
							<el-form-item label="商品名称" class="mb-0">
								<el-input v-model="form.name" placeholder="搜索的商品名称" size="mini"></el-input>
							</el-form-item>
							<el-form-item label="商品编码" class="mb-0">
								<el-input v-model="form.code" placeholder="搜索的商品编码" size="mini"></el-input>
							</el-form-item>
							<el-form-item label="商品类型" class="mb-0">
								<el-select size="mini" v-model="form.type" placeholder="请选择商品类型">
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="商品分类" class="mb-0">
								<el-input v-model="form.category" size="mini"></el-input>
							</el-form-item>
							<el-form-item class="mb-0">
								<el-button size="mini" type="info" @click="searchEvent()">搜索</el-button>
								<el-button size="mini" @click="clearSearch()">清空筛选条件</el-button>
							</el-form-item>
						</el-form>
					</template>
				</buttonSearch>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import buttonSearch from '@/components/common/button-search.vue';
	export default {
		components: {
			buttonSearch
		},
		data() {
			return {
				tabIndex: 0,
				tabBars: [{
						name: "审核中"
					},
					{
						name: "出售中"
					},
					{
						name: "已下架"
					},
					{
						name: "库存预警"
					},
					{
						name: "回收站"
					},
				],
				superSearch: false,
				form: {
					name: "",
					code: "",
					type: "",
					category: ""
				}
			}
		},
		methods: {
			handleClick(tab, event) {
				this.tabIndex = tab.index;
			},
			// 清空筛选条件
			clearSearch() {
				this.form = {
					name: "",
					code: "",
					type: "",
					category: ""
				}
				this.$refs.buttonSearch[this.tabIndex].closeSuperSearch();
			},
			// 搜索
			searchEvent(e = false) {
				console.log(e)
				// 简单搜索
				if (e) {
					console.log("简单搜索", e)
				} else {
					console.log("高级搜索")
				}
			}
		}
	}
</script>

<style>
</style>
