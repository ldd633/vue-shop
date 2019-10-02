<template>
    <div class="goodsinfo-container">

        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        >
            <div class="ball" v-show="ballPlag" ref="ball"></div>
        </transition>

        <!--这是商品轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">

                    <!--isfull:指定是否为全屏100%的宽度-->
                    <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>

        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsInfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>{{ goodsInfo.market_price }}</del>&nbsp;销售价：{{ goodsInfo.sell_price }}<span class="now_price">￥2199</span>
                    </p>
                    <p>购买数量：<numbox @getCount="getSelectedCount" :max="goodsInfo.stock_quantity"></numbox></p>
                    <p class="opt">
                        <mt-button type="primary" size="large">立即购买</mt-button>
                        <mt-button type="danger" size="large" @click="addToShopCart">加入购物车</mt-button>

                        <!--通过子组件向父组件传值的方式，将numbox中的数字，传给goodsInfo-->
                    </p>
                </div>
            </div>
        </div>

        <!--参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsInfo.goods_no }}</p>
                    <p>库存情况：{{ goodsInfo.stock_quantity }}件</p>
                    <p>上架时间：{{ goodsInfo.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import swiper from '../subcomponents/Swiper.vue'
    import numbox from '../subcomponents/GoodsInfo_Numbox.vue'
    export default {
        name: "GoodsInfo",
        data(){
            return {
                id: this.$route.params.id,
                lunbotu:[],//轮播图数据
                goodsInfo:{},//商品详请信息
                ballPlag: false ,//控制小球隐藏和显示的标识符
                selectedCount :1,//保存用户选中的商品数量，默认用户买一个
            }
        },
        created(){
            this.getLunBoTu();
            this.getGoodsInfo();
        },
        methods: {
            //轮播图数据
           getLunBoTu(){
               this.$http.get('api/getthumimages/' + this.id)
                   .then(result => {
                        //先为轮播图数组添加一个img属性，为了实现公用，轮播图组件里面是img属性
                       result.body.message.forEach(item => {
                            item.img = item.src;
                        });
                       this.lunbotu = result.body.message
                   },err => {
                       console.log(err)
                   })
            },
            //获取商品信息
            getGoodsInfo(){
                this.$http.get('api/goods/getinfo/' + this.id)
                    .then(result => {
                        this.goodsInfo = result.body.message[0];
                    },err => {
                        console.log(err)
                    })
            },
            //点击使用编程式导航跳转到图文介绍页面，
            goDesc(id){
                this.$router.push({ name: 'goodsdesc', params : { id }})
            },
            //跳转到评论页面
            goComment(id){
                this.$router.push({ name: 'goodscomment', params : { id }})
            },
            //添加到购物车
            addToShopCart(){
                this.ballPlag = !this.ballPlag;
                //{id:商品id,count:商品数量,price:商品单价,selected:true}
                //凭借出一个要保存到store中car数组里的商品信息对象
                let goodsInfo = {
                    id: this.id,
                    count: this.selectedCount,
                    price: this.goodsInfo.sell_price,
                    selected:true,
                };
                this.$store.commit('addToCar',goodsInfo);
            },
            beforeEnter(el){
               el.style.transform = "translate(0,0)"
            },
            enter(el,done){
                el.offsetWidth;//要设置这个，不然没动画，没有原因哈哈哈

                //小球动画优化思路
                //1. 先分析导致动画不准确的原因：我么能把小球最终位移到的位置固定到了某一分辨率滚动条为滚动的原因的某一位置
                //2. 知道分辨率和测试的时候不一样，或者滚动条有一定的滚动位置之后，问题就出现了
                //3. 因此，我们经过分析得到结论：不能把位移写死，应该根据不同的情况计算坐标值
                //4. 思路：先得到徽标横纵坐标，再得到小球的横纵坐标，然后求x，y分别差值，差值就是要位移的距离
                //5. 如何获取徽标和小球的距离？ domObject.getBoundingClientRect()

                //获取小球在页面中的位置
                let ballPosition = this.$refs.ball.getBoundingClientRect();
                //获取徽标在页面中的位置
                let badgePosition = document.getElementById('badge').getBoundingClientRect();

                let xDist = badgePosition.left - ballPosition.left;
                let yDist = badgePosition.top - ballPosition.top;


                el.style.transform = `translate(${ xDist }px,${ yDist }px)`;
                el.style.transition = 'all 0.5s cubic-bezier(.4,-0.3,1,.68)';
                done();

            },
            afterEnter(el){
                this.ballPlag = !this.ballPlag
            },

            getSelectedCount(count){
                this.selectedCount = count;
            }


        },
        components:{
            swiper,
            numbox,
        }
    }
</script>

<style scoped lang="less">
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;

    .now_price{
        color:red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
    .opt{
        display: flex;
        button{
            margin:  0 5px;
        }
    }
}
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 340px;
        left: 146px;
    }
</style>