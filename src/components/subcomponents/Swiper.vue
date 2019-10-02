<template>
    <div>
        <mt-swipe :auto="4000">
            <!--将来，谁使用轮播图组件，谁为我们传递lunbotuList
            父组件向子组件传值来设置
            -->
            <mt-swipe-item v-for=" item in lunbotuList" :key="item.id">
                <img :src="item.img" :class="{full : isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>


    <!--
        分析：为什么商品评论中的轮播图那么丑
        1. 首页中的图片，它的宽和高都是用了100%
        2. 在商品详情页面中，轮播图的图片，如果也是用宽高100%的话，页面就不好看
        3. 商品详情页面中的图片期望，高度100%，宽度自适应
        4. 经过分析，得到问题的原因：首页中的轮播图和详情中的轮播图分歧点事宽度
            到底是100%，还是自适应。
        5. 既然这两个轮播图，其它方面是没有分歧的，只是宽度有分歧，那么我们可以定义一个
            属性，让使用轮播图的调用者，手动指定是否为100%的宽度
    -->
</template>

<script>
    export default {
        name: "Swiper",
        props:['lunbotuList','isfull']
    }
</script>

<style scoped lang="less">
    .mint-swipe {
        height: 150px;

        .mint-swipe-item {
            text-align: center;
            img {
                /*width: 100%;*/
                height: 100%;
            }


        }

    }
    .full{
        width: 100%;
    }
</style>