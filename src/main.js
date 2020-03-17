import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router.js'
import store from './store/index.js';
// 引入全局配置文件
import $conf from './common/config/config.js' 
Vue.config.productionTip = false
Vue.prototype.$conf = $conf
new Vue({
	router,	
	store,
	render: h => h(App),
}).$mount('#app')
