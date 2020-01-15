<template>
	<div>
		<!-- 数据统计 -->
		<el-row :gutter="20">
			<el-col :span="6" v-for="(item,index) in counts" :key="index">
				<el-card class="box-card" shadow="hover">
					<div class="d-flex align-items-center">
						<i :class="[item.icon,item.color]" class="border text-center h4 mb-0 mr-3 text-white" style="width: 40px;height: 40px;line-height: 40px;"></i>
						<div>
							<h4 class="mb-1">{{item.num}}</h4>
							<small class="text-muted">{{item.desc}}</small>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<!-- 店铺、订单提示|统计图 -->
		<el-row :gutter="20">
			<!-- 店铺、订单提示-->
			<el-col :span="12" class="mt-3">
				<!-- 上 -->
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>卡片名称</span>
						<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
					</div>
					<div class="text item"></div>
				</el-card>
				<!-- 下 -->
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>卡片名称</span>
						<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
					</div>
					<div class="text item"></div>
				</el-card>
			</el-col>
			<!-- 统计图 -->
			<el-col :span="12">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>卡片名称</span>
						<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
					</div>
					<div class="text item"></div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				counts: [
					{icon:"el-icon-user-solid",num:"30",desc:"关注人数（个）",color:"bg-primary"},
					{icon:"el-icon-s-finance",num:"120",desc:"订单总数（笔）",color:"bg-success"},
					{icon:"el-icon-s-order",num:"4183.80",desc:"今日订单总金额（元）",color:"bg-danger"},
					{icon:"el-icon-s-data",num:"100",desc:"本月销量（笔）",color:"bg-warning"}
				]
			}
		},
	}
</script>

<style>
</style>
