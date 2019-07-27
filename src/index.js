import Vue from 'vue';
//1、导入包
import VueRouter from 'vue-router';
//2、手动安装vue-router
Vue.use(VueRouter);
import { Header,Swipe,SwipeItem } from 'mint-ui';
Vue.component(Header.name,Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import 'mint-ui/lib/header/style.css'
import 'mint-ui/lib/swipe/style.css'
import 'mint-ui/lib/swipe-item/style.css'

import VueResource from 'vue-resource'
Vue.use(VueResource);


import '../lib/mui/css/mui.css'
import '../lib/mui/css/icons-extra.css'
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
