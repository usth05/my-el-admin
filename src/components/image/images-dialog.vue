<template>
	<el-dialog title="图片管理" :visible.sync="imageModel" width="80%" top="5vh">
		<el-container style="height: 70vh;position: relative; margin: -30px -20px;">
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
				<el-button type="warning" size="mini" @click="unChoose({all:true})" v-if="chooseList.length">取消选中</el-button>
			</el-header>
			<el-container>
				<el-aside width="200px" class="bg-white border-right" style="position: absolute;top: 60px;left: 0;bottom: 60px;background-color: #FFFFFF;">
					<!-- 侧边 | 相册列表-->
					<ul class="list-group list-group-flush">
						<album-item :item="item" :index="index" :active="albumIndex===index" v-for="(item,index) in albums" :key="index"
						 @change="albumsChange" :showOptions="false"></album-item>
					</ul>
				</el-aside>
				<el-container>
					<el-main style="position: absolute;top: 60px;left: 200px;bottom: 60px;right: 0;">
						<!-- 主体 -->
						<el-row :gutter="10">
							<el-col :span="24" :lg="4" :md="6" :sm="8" v-for="(item,index) in imageList" :key="index">
								<el-card class="box-card mb-3 position-relative" shadow="hover" style="cursor: pointer;" :body-style="{'padding':'0'}">
									<div class="border" :class="{'border-danger':item.isCheck}">
										<span v-if="item.isCheck" class="badge badge-danger" style="position: absolute;right: 0;top: 0;">{{item.checkOrder}}</span>
										<img @click="choose(item)" :src="item.url" class="w-100" style="height: 100px;">
										<!-- <img @click="choose(item)" src="../../assets/demo/1.jpg" class="w-100" style="height: 100px;"> -->
										<div class="w-100 text-white position-absolute px-1" style="background-color: rgba(0,0,0,.5);margin-top: -25px;">
											<span class="small">{{item.name}}</span>
										</div>
										<div class="p-2 text-center">
											<el-button-group>
												<el-button icon="el-icon-edit" size="mini" class="p-2" @click="editImage(item,index)"></el-button>
												<el-button icon="el-icon-delete" size="mini" class="p-2" @click="imageDel({index})"></el-button>
											</el-button-group>
										</div>
									</div>
								</el-card>
							</el-col>
						</el-row>
					</el-main>
				</el-container>
			</el-container>
			<el-footer class="d-flex border-top align-items-center px-0">
				<!-- 底部 -->
				<div style="width: 200px;flex-shrink: 0;" class="h-100 d-flex align-items-center justify-content-center border-right">
					<el-button-group>
						<el-button size="mini">上一页</el-button>
						<el-button size="mini">下一页</el-button>
					</el-button-group>
				</div>
				<div style="flex:1" class="px-2">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
					 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
					</el-pagination>
				</div>
			</el-footer>
		</el-container>
		<div slot="footer" class="dialog-footer">
			<el-button @click="hide">取 消</el-button>
			<el-button type="primary" @click="confirm">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import albumItem from "@/components/image/album-item.vue"
	export default {
		props:{
			max:{
				type:Number,
				default:9
			}
		},
		components: {
			albumItem
		},
		data() {
			return {
				imageModel: false,
				callback: false,
				searchForm: { //修改|创建 内容
					order: "",
					keyword: ""
				},
				albumIndex: 0, //当前选中的是那个相册
				albums: [],
				imageList: [],  //图片数据模块
				chooseList: [], //选中的数据
				currentPage: 1, //分页
			}
		},
		created() {
			this.__init()
		},
		methods: {
			__init() {
				for (let i = 0; i < 20; i++) {
					this.albums.push({
						name: "相册" + i,
						num: Math.floor(Math.random() * 100),
						order: 17
					})
				}
				for (let j = 0; j < 30; j++) {
					this.imageList.push({
						url: "@/src/assets/demo/1.jpg",
						name: "图片" + j,
						isCheck: false,
						checkOrder: 0,
						id: j,
					})
				}
			},
			// 打开弹出层
			chooseImage(callback) {
				this.unChoose();
				this.callback = callback;
				this.imageModel = true;
			},
			// 定点确定
			confirm() {
				// 选中的图片
				if (typeof this.callback === 'function') {
					this.callback(this.chooseList);
					this.hide();
				}
			},
			// 关闭弹窗层
			hide() {
				this.imageModel = false;
				this.callback = false;
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
			// 修改图片名称
			editImage(item) {
				this.$prompt('请输入新名称', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputValue: item.name,
					inputValidator(val) {
						if (val === "") {
							return '图片名称不能为空'
						}
					},
				}).then(({
					value
				}) => {
					item.name = value;
					this.$message({
						type: 'success',
						message: '修改成功'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});
			},
			// 删除图片
			imageDel(obj) {
				this.$confirm(obj.all ? '是否删除选中图片?' : '是否删除该图片?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (obj.all) {
						let list = this.imageList.filter(v => {
							return !this.chooseList.some(c => c.id === v.id)
						})
						this.imageList = list;
						this.chooseList = [];
					} else {
						this.imageList.splice(obj.index, 1)
					}
					this.$message({
						message: '删除成功',
						type: 'success'
					})
				})
			},
			// 选中图片
			choose(item) {
				// 选中
				if (!item.isCheck) {
					// 限制选中数量
					if(this.chooseList.length >= this.max){
						return this.$message({message:'最多选中'+this.max+'张图片',type:'warning'})
					}
					// 加入选中列表
					this.chooseList.push({
						id: item.id,
						url: item.url
					});
					// 计算序号
					item.checkOrder = this.chooseList.length;
					// 显示选中
					item.isCheck = true;
					return
				}
				// 取消选中
				// 找到在chooseList中的索引
				let i = this.chooseList.findIndex(v => v.id === item.id)
				if (i === -1) return;
				//删除
				// 重新计算序号
				let length = this.chooseList.length;
				// 取消选中中间部分
				if (i + 1 < length) {
					for (let j = i; j < length; j++) {
						let no = this.imageList.findIndex(v => v.id === this.chooseList[j].id)
						if (no > -1) {
							this.imageList[no].checkOrder--;
						}
					}
				}
				this.chooseList.splice(i, 1);
				// 修改状态
				item.isCheck = false;
				// 重置序号
				item.checkOrder = 0
			},
			// 取消选中
			unChoose() {
				this.imageList.forEach(v => {
					// 找到所以的选中的图片
					let i = this.chooseList.findIndex(item => item.id === v.id);
					if (i > -1) {
						// 取消选中样式，排序归0
						v.isCheck = false;
						v.checkOrder = 0;
						// 从chooseList中移除
						this.chooseList.splice(i, 1)
					}
				})
			},
			// 分页
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		}
	}
</script>

<style>
</style>
