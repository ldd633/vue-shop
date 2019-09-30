import Vue from 'vue';
//1、导入包
import VueRouter from 'vue-router';
//2、手动安装vue-router
Vue.use(VueRouter);
import { Header,Swipe,SwipeItem ,Button} from 'mint-ui';
Vue.component(Header.name,Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
import 'mint-ui/lib/header/style.css'
import 'mint-ui/lib/swipe/style.css'
import 'mint-ui/lib/swipe-item/style.css'
import 'mint-ui/lib/button/style.css'

import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.root = 'http://www.liulongbin.top:3005/'

//导入时间处理对象
import moment from 'moment';

import '../lib/mui/css/mui.css'
import '../lib/mui/css/icons-extra.css'
import  app from  './app.vue'

import router from './router.js'

//处理时间格式的过滤器
Vue.filter('dateFormat',function (datastr,format = 'YYYY-MM-DD HH:mm:ss') {
    return moment(datastr).format(format);
});
var vm = new Vue({
    el: '#app',
    data: {

    },
    methods:{

    },
    render: c=> c(app),
    router
});
