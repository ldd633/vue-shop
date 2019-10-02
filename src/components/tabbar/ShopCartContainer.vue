<template>
    <div class="shopcar-container">
        <!--商品列表区域-->
        <div class="goods-list">
            <div class="mui-card">
                <div class="mui-card-content" v-for="(item,i) in goodslist">
                    <div class="mui-card-content-inner">
                        <mt-switch @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])" v-model="$store.getters.getGoodsSelected[item.id]"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>

                                <!--
                                如何从购物车中获取商品的数量
                                    1. 我们可以先创建一个空对象，然后循环购物车中的数据，把当前循环这条商品的id作为对象的属性名
                                    count作为对象的属性值，当把所有的商品遍历完，就会得到一个对象{88:2,89:3}
                                -->
                                <a href="##" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!--结算区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选<span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span>  件，总价<span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
        <p>{{ $store.getters.getGoodsSelected }}</p>
    </div>
</template>


<script>
    import numbox from '../subcomponents/ShopCar_Number.vue'
    export default {
        name: "ShopCartContainer",
        data(){
            return {
                goodslist:[],//购物车中所有商品的数据
            }
        },
        created(){
          this.getGoodsList();
        },
        methods:{


            //获取购物车商品列表
            getGoodsList(){
                //获取store中所有的id，然后凭借出一个用逗号分隔的字符串
                let idArr = [];
                this.$store.state.car.forEach(item => idArr.push(item.id));
                //如果购物车里面没有商品，则直接return，不需要请求，否则会报错。
                if(idArr.length <= 0){
                    return ;
                }
                this.$http.get('api/goods/getshopcarlist/'+idArr.join(',') )
                    .then(result => {
                        this.goodslist = result.body.message;
                    },err =>{
                        console.log(err)
                    })
            },

            //把商品根据id从store中删除，同时根据index删除goodslist里面的数据
            remove(id,index){
                this.goodslist.splice(index,1);
                this.$store.commit('removeFromCar',id)
            },
            //每当点击开关，把最新的开关状态同步到store中
            selectedChanged(id,value){
                this.$store.commit('updateGoodsSelected',{id,selected: value})
            },
        },
        components:{
            numbox,
        },
    }
</script>

<style scoped lang="less">
.shopcar-container{
    background-color: #eee;
    overflow: hidden;

    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            width: 60px;
            height: 60px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            h1{
                font-size: 13px;
            }
            .price{
                color: red;
                font-weight: bold;
            }
        }
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red{
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>