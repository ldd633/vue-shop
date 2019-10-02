<template>
    <div class="goodsdesc-container">
        <h3>{{ info.title }}</h3>

        <hr>

        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
    export default {
        name: "GoodsDesc",
        data(){
            return {
                info : {},//图文数据
            }
        },
        created(){
            this.getDesc();
        },
        methods:{
            getDesc(){
                this.$http.get('api/goods/getdesc/' + this.$route.params.id)
                    .then(result => {
                        this.info = result.body.message[0]
                    }, err => {
                        console.log(err);
                    })
            }
        }
    }
</script>

<style lang="less">
.goodsdesc-container{
    padding: 4px;
    h3{
        font-size:16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>