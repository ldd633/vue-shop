<template>
    <div class="goods-list">
        <!--<router-link :to="'/home/goodsinfo/'+item.id" tag="div" class="goods-item" v-for="item in goodsList" :key="item.id">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </router-link>-->


        <!--在网页中有两种跳转方式：
            1.使用a标签的形势，叫做标签跳转
            2.使用window.location.href的形势，叫做编程式导航
        -->
        <div class="goods-item" @click="goDetail(item.id)" v-for="item in goodsList" :key="item.id">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        name: "GoodsList",
        data(){
            return {
                pageIndex:1 ,//分页的页数
                goodsList:[],//商品列表
            }
        },
        created(){
          this.getGoodsList();
        },
        methods:{
            //获取商品列表
            getGoodsList(){
                this.$http.get('api/getgoods?pageindex=' + this.pageIndex)
                    .then(result => {
                        this.goodsList = this.goodsList.concat(result.body.message);
                        // this.goodsList = result.body.message;
                    },err => {
                        console.log(err);
                    })
            },
            getMore(){
                this.pageIndex++;
                this.getGoodsList();
            },
            //使用js的形势进行路由导航
            //注意：一定要区分this.$route和this.$router这两个对象
            //其中：this.$route是路由参数对象，所有路由中的参数，包括params 和query 都属于它
            //this.$router是哟个路由导航对象，用它可以方便的使用js代码，实现路由的前进，后退，跳转到新的url地址。
            goDetail(id){
                //1.最简单的方式
                this.$router.push('/home/goodsinfo/' + id)
                //2.传递对象的方式
                // this.$router.push({ path : '/home/goodsinfo/' + id})
                //3.传递一个命名的路由
                // this.$router.push({ name: 'goodsinfo', params: { id }})
                // 带查询参数，变成 /home/goodsinfo?id=id
                // this.$router.push({ path: '/home/goodsinfo', query: {id }})

            }
        }
    }
</script>

<style scoped lang="less">
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 8px;
    justify-content: space-between;
    .goods-item{
        width: 49%;
        border: 1px solid rgba(38, 162, 255, 0.6);
        overflow: hidden;
        border-radius: 5px;
        margin: 5px 0;
        padding: 3px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width: 100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
    }
}
</style>