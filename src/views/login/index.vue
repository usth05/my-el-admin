<template>
	<div>
		<div class="container">
			<div class="row">
				<div class="col-12 col-sm-9 col-md-7 col-lg-5 m-auto pt-5">
					<div class="card mt-5">
						<div class="card-header bg-white">
							<h3 class="text-center mb-0">UNI_ADMIN</h3>
						</div>
						<div class="card-body">
							<el-form ref="rulesForm" :model="form" :rules="rules">
								<el-form-item prop="userName">
									<el-input placeholder="请输入用户名" v-model="form.userName" size="medium"></el-input>
								</el-form-item>
								<el-form-item prop="password">
									<el-input placeholder="请输入密码" v-model="form.password" size="medium" type="password"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button class="w-100" type="primary" @click="onSubmit" size="medium">登录</el-button>
								</el-form-item>
							</el-form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				form: {
					userName: '',
					password: '',
				},
				rules: {
					userName: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 15,
							message: '长度在3 到 15 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 15,
							message: '长度在6 到 15 个字符',
							trigger: 'blur'
						}
					]
				}
			}
		},
		methods: {
			onSubmit() {
				this.$refs.rulesForm.validate(e => {
					if(!e)return
					// 提交表单
					this.$router.push({name:'index'});
				});
			}
		},

	}
</script>

<style>
</style>
