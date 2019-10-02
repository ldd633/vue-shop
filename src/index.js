import Vue from 'vue';
//1、导入包
import VueRouter from 'vue-router';
//2、手动安装vue-router
Vue.use(VueRouter);

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex);
//每次进入网站，先去localStorage中吧够驱车的数据拿出来
let car = JSON.parse(localStorage.getItem('car') || '[]') ;
let store = new Vuex.Store({
    state:{ //this.$store.state.XX
        car:car , //将购物车商品的数据用数组存储起来。{id:商品id,count:商品数量,price:商品单价,selected:true}
    },
    mutations:{ //this.$store.commit('方法名'，一个唯一的参数)
        //点击加入购物车，把商品信息保存到car中
        addToCar(state,goodsinfo){
            //分析：
            //1. 如果数组中已经有这个商品了，只更新数量
            //2. 如果没有，直接push

            let flag = false;
            state.car.some(item => {
                if(item.id === goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    flag = true;
                    return true;
                }
            });
            if(!flag){
                state.car.push(goodsinfo);
            }

            //当更新car之后，把car存储到localstorage中
            localStorage.setItem('car',JSON.stringify(state.car))

        },

        //修改购物车种商品的数据值
        updateGoodsInfo(state,goodsinfo){
            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count);
                    return true;
                }
            } );
            //当修改完商品的数量，把最新的购物车数据保存到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car))

        },

        //根据id删除对应的商品数据
        removeFromCar(state,id){
            state.car.some( (item,i) => {
                if(item.id ==id ){
                    state.car.splice(i,1);
                    return true;
                }
            });
            //将删除完毕后的最新的购物车数据同步到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car))
        },

        updateGoodsSelected(state,info){
            state.car.some(item => {
                if(item.id == info.id){
                    item.selected = info.selected;
                }
            });
            localStorage.setItem('car',JSON.stringify(state.car))

        }
    },
    getters:{ //this.$store.getters.XX
        //相当于计算属性，也相当于filter

        getAllCount(state){
            let c = 0;
            state.car.forEach(item => {
                c += item.count;
            });
            return c;
        },
        getGoodsCount(state){
            let obj = {};
            state.car.forEach(item =>{
                obj[item.id] = item.count;
            });
            return obj;
        },

        getGoodsSelected(state){
            let obj = {};
            state.car.forEach(item =>{
                obj[item.id] = item.selected
            });
            return obj;
        },
        getGoodsCountAndAmount(state){
            let obj = {
                count: 0,//勾选的数量
                amount:0,//勾选的总价
            };
            state.car.forEach( item => {
                if(item.selected){
                    obj.count += item.count,
                    obj.amount += item.price * item.count;
                }
            });
            return obj;
        }
    }
});

// import { Header,Swipe,SwipeItem ,Button,Lazyload} from 'mint-ui';
// Vue.component(Header.name,Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
//
// Vue.use(Lazyload);
import MintUI from 'mint-ui';
Vue.use(MintUI);
//导入缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
import  'mint-ui/lib/style.css';

//
// import 'mint-ui/lib/header/style.css'
// import 'mint-ui/lib/swipe/style.css'
// import 'mint-ui/lib/swipe-item/style.css'
// import 'mint-ui/lib/button/style.css'

import VueResource from 'vue-resource'
Vue.use(VueResource);
//设置根请求的路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/'
//设置post 表单数据格式的组织形式
Vue.http.options.emulateJSON = true;

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
    router,
    store,//挂载store对象
});
