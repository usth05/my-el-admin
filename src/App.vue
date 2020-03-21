<template>
	<div id="app">
		<router-view></router-view>
		<images-dialog ref="imagesDialog" :max="maxChooseImage"></images-dialog>
		
	</div>
</template>

<script>
	import imagesDialog from "@/components/image/images-dialog.vue"
	export default {
		name: 'app',
		// 依赖注入
		provide() {
			return {
				app: this
			}
		},
		components:{
			imagesDialog
		},
		data(){
			return {
				maxChooseImage:9
			}
		},
		methods:{
			chooseImage(callback,max = 9){
				this.maxChooseImage = max;
				this.$refs.imagesDialog.chooseImage(callback)
			}
		}
	}
</script>

<style>
	::-webkit-scrollbar-track {
		background-color: rgba(0, 0, 0, .1);
		border-radius: 0;
	}

	::-webkit-scrollbar {
		-webkit-appearance: none;
		width: 5px;
		/* height: 5px; */
	}

	::-webkit-scrollbar-thumb {
		cursor: pointer;
		border-radius: 5px;
		background-color: rgba(0, 0, 0, .2);
		transition: color .2s ease;
	}
</style>
