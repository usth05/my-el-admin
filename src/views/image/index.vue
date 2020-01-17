<template>
	<div>
		<el-container style="position: absolute;top: 55px;right: 0;left: 0;bottom: 0;">
			<el-header class="d-flex align-items-center border-bottom">
				<!-- 头部 -->
				<div class="d-flex mr-auto">
					<el-select v-model="searchForm.order" class="mr-2" style="width: 150px;" placeholder="请选择图片排序方式" size="medium">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
					<el-input class="mr-2" style="width: 150px;" size="medium" placeholder="请输入相册名称" v-model="searchForm.keyword"></el-input>
					<el-button type="success" size="medium">搜索</el-button>
				</div>
				<el-button type="success" size="medium" @click="openAlbumModel()">创建相册</el-button>`
				<el-button type="warning" size="medium">上传图片</el-button>
			</el-header>
			<el-container>
				<el-aside width="200px" class="bg-white border-right" style="position: absolute;top: 60px;left: 0;bottom: 60px;background-color: #FFFFFF;">
					<!-- 侧边 | 相册列表-->
					<ul class="list-group list-group-flush">
						<album-item :item="item"
						:index="index"
						:active="albumIndex===index"
						v-for="(item,index) in albums"
						:key="index"
						@change="albumsChange"
						@edit="openAlbumModel"
						@del="alibumDel"></album-item>
					</ul>
				</el-aside>
				<el-container>
					<el-main style="position: absolute;top: 60px;left: 200px;bottom: 60px;right: 0;">
						<!-- 主体 -->
					</el-main>
				</el-container>
			</el-container>
			<el-footer>
				<!-- 底部 -->
			</el-footer>
		</el-container>
		<!-- 修改|创建相册 -->
		<el-dialog title="修改相册" :visible.sync="albumModel">
			<el-form ref="form" :model="albumForm" label-width="80px">
				<el-form-item label="相册名称">
					<el-input v-model="albumForm.name" size="medium" placeholder="请输入相册名称"></el-input>
				</el-form-item>
				<el-form-item label="相册排序">
					<el-input-number v-model="albumForm.order" :min="0"></el-input-number>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="albumModel = false">取 消</el-button>
				<el-button type="primary" @click="confirmAlbumModel()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import albumItem from "@/components/image/album-item.vue"
	export default {
		components:{
			albumItem
		},
		data() {
			return {
				searchForm: {
					order: "",
					keyword: ""
				},
				albumIndex: 0,
				albumModel: false,
				albumEditIndex: -1,
				albums: [],
				albumForm: {
					name: "",
					order: 0,
				}
			}
		},
		created() {
			this.__init()
		},
		methods: {
			__init() {
				for (var i = 0; i < 20; i++) {
					this.albums.push({
						name: "相册" + i,
						num: Math.floor(Math.random() * 100),
						order: 17
					})
				}
			},
			// 切换相册
			albumsChange(index) {
				this.albumIndex = index;
			},
			// 删除相册
			alibumDel(index) {
				this.$confirm('是否删除该相册?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.albums.splice(index, 1);
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			// 打开相册修改|创建框
			openAlbumModel(obj) {
				console.log(obj)
				if (obj) { // 修改
					let {
						item,
						index
					} = obj;
					// 初始化表单
					this.albumForm.name = item.name;
					this.albumForm.order = item.order;
					this.albumEditIndex = index;
				} else { // 创建
					this.albumForm = {
						name: "",
						order: 0
					}
					this.albumEditIndex = -1;
				}
				// 打开模态框
				return this.albumModel = true;
			},
			// 点击确定修改|创建相册
			confirmAlbumModel() {
				// 判断是否位修改
				if (this.albumEditIndex > -1) {
					this.alibumEdit();
				} else { //创建
					this.albums.push({
						name: this.albumForm.name,
						order: this.albumForm.order,
						num: 0
					})
					this.$message({
						type: 'success',
						message: '创建相册成功!'
					});
				}
				return this.albumModel = false;
				// 
			},
			// 修改相册
			alibumEdit() {
				this.albums[this.albumEditIndex].name = this.albumForm.name;
				this.albums[this.albumEditIndex].order = this.albumForm.order;
				this.$message({
					type: 'success',
					message: '修改相册成功!'
				});
			},

		},
	}
</script>

<style>
	.sum-active {
		color: #67C23A !important;
		background-color: #f0f9eb !important;
		border-color: #c2e7b0 !important;
	}
</style>
