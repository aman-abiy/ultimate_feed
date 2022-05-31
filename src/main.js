/*
=========================================================
Muse - Vue Ant Design Dashboard - v1.0.0
=========================================================

Product Page: https://www.creative-tim.com/product/vue-ant-design-dashboard
Copyright 2021 Creative Tim (https://www.creative-tim.com)
Coded by Creative Tim

=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. 
*/

import Vue from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import axios from 'axios'
import DefaultLayout from './layouts/Default.vue'
import DashboardLayout from './layouts/Dashboard.vue'
import DashboardRTLLayout from './layouts/DashboardRTL.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ValidationProvider } from 'vee-validate';
import { ValidationObserver } from 'vee-validate';
import axiosInterceptors from './utils/interceptors';

import { AXIOS_TIMEOUT } from './utils/consts'
// import './plugins/click-away'

import './scss/app.scss';

Vue.use(Antd);

axios.defaults.baseURL = `${process.env.VUE_APP_SERVER_URL}`
axios.defaults.headers = {
    "Content-type": "application/json",
    "Authorization": `Bearer ${store.getters.sessionToken ? store.getters.sessionToken.accessToken : null}`
}
axios.defaults.timeout = AXIOS_TIMEOUT

axiosInterceptors()

Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
    // Adding template layouts to the vue components.
Vue.component("layout-default", DefaultLayout);
Vue.component("layout-dashboard", DashboardLayout);
Vue.component("layout-dashboard-rtl", DashboardRTLLayout);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')