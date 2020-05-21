import Vue from 'vue'

import App from 'renderer/components/App.vue'

Vue.config.productionTip = false;

new Vue({
	template: '<app />',
	components: { App }
}).$mount('#js-mount')
