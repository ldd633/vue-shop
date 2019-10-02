<template>
    <div>
        <!--顶部滑动条-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted" data-scroll="1">
                <div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px);">
                    <a :class="['mui-control-item', item.id == 0?'mui-active' : ''] " v-for="item in cates" :key="item.id"
                    @click="getPhotoListByCateId(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>

        </div>

        <!--图片列表区域-->
        <ul class="photo-list">
            <router-link :to="'/home/photoinfo/'+ item.id" v-for="item in list" :key="item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    //导入mui的js文件
    import mui from '../../../lib/mui/js/mui.js'

    export default {
        name: "PhotoList",
        data(){
            return {
                cates:[],//所有分类的列表数组
                list:[],//图片列表的数组
            }
        },
        created(){
            this.getAllCategory();
            //默认进入页面就主动请求所有图片的列表的数据
            this.getPhotoListByCateId(0);
        },
        mounted() {
            // // 初始化滑动空间
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods:{
            getAllCategory(){
                //获取所有图片分类
                this.$http.get('api/getimgcategory')
                    .then(result => {
                        //手动拼接处一个完整的分类
                        result.body.message.unshift({ title: "全部",id : 0 });
                        this.cates = result.body.message;
                    },err => {
                        console.log(err)
                    })
            },
            //根据分类id获取图片列表
            getPhotoListByCateId(cateId){
                this.$http.get('api/getimages/' + cateId)
                    .then(result => {
                        this.list = result.body.message;
                    },err => {

                    })
            }
        }
    }
//
</script>

<style scoped lang="less">
    *{

        touch-action: none;
    }
    .photo-list{
        list-style: none;
        margin: 0;
        padding: 10px;
        li{
            position: relative;
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            padding-bottom: 0;
            box-shadow: 0 0 8px #999;
            .info{
                color: white;
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color: rgba(0,0,0,0.4);
                max-height: 84px;
                .info-title{
                    font-size: 14px;
                }
                .info-body{
                    font-size: 13px;
                }
            }
            img{
                width: 100%;
                vertical-align: middle;
            }
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
        }
    }

</style>