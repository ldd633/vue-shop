import Vue from 'vue';
//1、导入包
import VueRouter from 'vue-router';
//2、手动安装vue-router
Vue.use(VueRouter);
import { Header } from 'mint-ui';
Vue.component(Header.name,Header);
import 'mint-ui/lib/header/style.css'

import '../lib/mui/css/mui.css'
import  app from  './app.vue'

import router from './router.js'
var vm = new Vue({
    el: '#app',
    data: {

    },
    methods:{

    },
    render: c=> c(app),
    router
});
