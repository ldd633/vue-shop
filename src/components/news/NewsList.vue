<template>
    <div>
        <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
            <router-link :to="'/home/newsinfo/'+ item.id" class="">
                <img class="mui-media-object mui-pull-left" :src="item.img_url">
                <div class="mui-media-body">
                    <h4>{{ item.title }}</h4>
                    <p class="mui-ellipsis">
                        <span>发布时间：{{ item.add_time | dateFormat }}</span>
                        <span>点击：{{ item.click }}次</span>
                    </p>
                </div>
            </router-link>
        </li>


    </ul>
    </div>
</template>
<script>
    import Toast from 'mint-ui';
    export default {
        data:function(){
            return {
                newslist : [],
            }
        },
        created(){
            this.getNewsList();
        },
        methods:{
            getNewsList:function () {
                this.$http.get('api/getnewslist').then( result => {
                    if(result.body.status === 0){
                        this.newslist = result.body.message;
                    }else {
                        Toast('加载数据失败');
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
.mui-table-view{
    li{
        h4{
            font-size: 14px;
        }
        .mui-ellipsis{
            display: flex;
            font-size: 12px;
            justify-content: space-between;
        }
    }
}
</style>