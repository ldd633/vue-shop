<template>
    <div>
        <!--轮播图-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for=" item in lunbotuList" :key="item.id">
                <img :src="item.img">
            </mt-swipe-item>
        </mt-swipe>

        <!--六宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1(1).png">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu2.png">
                <div class="mui-media-body">图片分享</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu3.png">
                <div class="mui-media-body">商品购买</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png">
                <div class="mui-media-body">留言反馈</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png">
                <div class="mui-media-body">视频专区</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png">
                <div class="mui-media-body">联系我们</div>
            </a></li>

        </ul>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        data: function () {
            return {
                lunbotuList: []
            }
        },
        methods: {
            getLunbotu: function () {
                this.$http.get('api/getlunbo').then(result => {
                    if (result.body.status === 0) {
                        this.lunbotuList = result.body.message;
                    } else {
                        Toast({
                            message: '加载失败'
                        })
                    }
                })
            }
        },
        created() {
            this.getLunbotu();
        }
    }
</script>

<style scoped lang="less">
    .mint-swipe {
        height: 150px;

        .mint-swipe-item {
            img {
                width: 100%;
                height: 100%;
            }

            &:nth-child(1) {
                background-color: green;
            }

            &:nth-child(2) {
                background-color: green;
            }

            &:nth-child(3) {
                background-color: green;
            }
        }

    }

    .mui-grid-view.mui-grid-9 {
        background-color: white;
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: 0;

        img {
            width: 60px;
            height: 60px;
        }
    }
</style>