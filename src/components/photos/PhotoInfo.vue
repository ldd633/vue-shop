<template>
    <div class="photoInfo">
        <h3>{{ photoInfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoInfo.add_time | dateFormat }}</span>
            <span>点击：{{ photoInfo.click }}次</span>
        </p>

        <hr>

        <!--缩略图区域-->
        <div class="thumbs">
            <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
        </div>

        <!--图片内容区-->
        <div class="content" v-html="photoInfo.content">

        </div>

        <!--评论子组件-->
        <comment :id="id"></comment>

    </div>
</template>

<script>
    //导入评论子组件
    import comment from '../subcomponents/comment.vue'
    export default {
        name: "PhotoInfo",
        data(){
            return {
              id :this.$route.params.id, //从路由上面获取的图片id
              photoInfo:{},
                slide1:[],
            }
        },
        created(){
            this.getPhotoInfo();
            this.getThumbs();
        },
        methods:{
            //获取图片的详请
            getPhotoInfo(){
                this.$http.get('api/getimageInfo/' + this.id)
                    .then(result => {
                        this.photoInfo = result.body.message[0];
                    },err => {
                        console.log(err);
                    })
            },
            //获取缩略图
            getThumbs(){
                this.$http.get('api/getthumimages/' + this.id )
                    .then(result => {
                        let arr = JSON.parse(result.bodyText).message
                        arr.forEach(item => {
                            item.w = 800;
                            item.h = 600;
                            item.msrc = item.src;
                        });
                        this.slide1 = arr;
                        console.log(this.slide1)
                    },err => {
                        console.log(err)
                    })
            },
            handleClose () {
                console.log('close event')
            }

        },
        components:{
            comment,
        }
    }
</script>

<style scoped lang="less">
.photoInfo{
    padding: 3px;
    h3{
        color: #26a2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }


}
    .thumbs{
        /deep/ .my-gallery{ // /deep/深层作用选择器
            display: flex;
            flex-wrap: wrap;
            figure{
                width: 30%;
                margin: 5px;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>