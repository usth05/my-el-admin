<template>
	<div class="bg-white px-2" style="margin: -20px;margin-top: -1rem;margin-bottom: 3rem !important;">
		<el-tabs v-model="tabIndex" @tab-click="handleClick">
			<el-tab-pane v-for="(tab,tabI) in tabBars" :label="tab.name" :key="tabI">
				<buttonSearch ref="buttonSearch" placeholder="搜索的商品名称" @search="searchEvent">
					<!-- 左 -->
					<template #left>
						<router-link :to="{name:'shop_goods_create'}">
							<el-button size="mini" type="success">发布商品</el-button>
						</router-link>
						<el-button size="mini" type="warning">恢复商品</el-button>
						<el-button size="mini" type="danger">批量删除</el-button>
						<el-button size="mini">上架</el-button>
						<el-button size="mini">下架</el-button>
						<el-button size="mini">推荐</el-button>
					</template>
					<!-- 表单 高级搜索 -->
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
				<!-- 商品列表 -->
				<!-- 商品
						 图片 ../../assets/demo/datapic/3.jpg
						 名称 
						分类 手机
					 商品类型（普通商品）
					 实际销量（20）
					 商品排序（100）
					 商品状态（上架）
					 总库存（200）
					 价格(元)（1000.00）
				 -->
				<el-table class="mt-3" border :data="tableData[tabI].list" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="45" align="center">
					</el-table-column>
					<el-table-column label="商品信息" width="400">
						<template slot-scope="scope">
							<div class="media">
								<img class="mr-3" style="width: 60px;height: 60px;" :src="scope.row.cover">
								<div class="media-body">
									<p class="my-0 font-md font-weight-bold text-primary">{{scope.row.title}}</p>
									<p class="mb-0 font-md text-muted">分类： {{scope.row.category}}</p>
									<p class="mb-0 font-md text-muted">时间： {{scope.row.create_time}}</p>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="type" align="center" label="商品类型">
					</el-table-column>
					<el-table-column prop="sale_count" align="center" label="实际销量">
					</el-table-column>
					<el-table-column prop="order" align="center" label="商品排序">
					</el-table-column>
					<el-table-column align="center" label="商品状态">
						<template slot-scope="scope">
							<el-button type="success" @click="scope.row.ischeck = 1" size="mini" plain>
								审核通过
							</el-button>

							<el-button class="ml-0 mt-2" type="danger" @click="scope.row.ischeck = 2" size="mini" plain>
								审核拒绝
							</el-button>

							<!-- <el-button
							:type="scope.row.status ? 'success':'danger'"
							@click="changeStatus(scope.row)"
							size="mini" plain>
							{{scope.row.status ? '上架':'下架'}}
							</el-button> -->
						</template>
					</el-table-column>
					<el-table-column prop="stock" align="center" label="总库存">
					</el-table-column>
					<el-table-column prop="price" align="center" label="价格(元)">
					</el-table-column>
					<el-table-column align="center" width="150" label="操作">
						<template slot-scope="scope">
							<el-button-group>
								<el-button type="primary" size="mini" plain>修改</el-button>
								<el-button type="danger" size="mini" plain @click="delectItem(scope.$index)">删除</el-button>
							</el-button-group>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<el-footer class="d-flex bg-white border-top align-items-center px-0 position-fixed" style="bottom: 0;left: 200px;right: 0;z-index: 100;">
					<!-- 底部 -->
					<div style="flex:1" class="px-2">
						<el-pagination
						:current-page="tableData[tabI].currentPage"
						:page-sizes="[100, 200, 300, 400]"
						:page-size="100"
						layout="total, sizes, prev, pager, next, jumper"
						:total="400">
						</el-pagination>
					</div>
				</el-footer>
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
				},
				tableData: [],
				multipleSelection: [],
			}
		},
		created() {
			this._getData();
		},
		methods: {
			_getData() {
				for (let i = 0; i < this.tabBars.length; i++) {
					this.tableData.push({
						currentPage: 1, //当前显示的页面
						list: [], //当前显示的数据
					});
					for (let j = 0; j < 20; j++) {
						this.tableData[i].list.push({
							id: j,
							title: '荣耀 V10全网通 标配版 4GB+64GB 魅丽红' + i + '-' + j,
							cover: 'http://static.yoshop.xany6.com/2018071718294208f086786.jpg',
							create_time: '2019-07-17 18:34:14',
							category: "手机",
							type: "普通商品",
							sale_count: 20, //销量
							order: 100,
							status: 1,
							stock: 200, //库存
							price: 1000, //销售价格
							ischeck: 1
							// 0未审核，1通过，2不通过
						})
					}
				}
			},
			// 删除当前商品
			delectItem(index) {
				this.$confirm('此操作将永久删除该文件?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.tableData[this.tabIndex].list.splice(index, 1)
				})
			},
			// 上下架
			changeStatus(item) {
				item.status = item.status === 1 ? 0 : 1;
			},
			// 表格多选选中
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},

			// 加载数据
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
			},
		}
	}
</script>

<style>
</style>
