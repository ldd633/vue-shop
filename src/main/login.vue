<template>
        <mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>

</template>

<script>
    export default {
        name: "login"
    }
</script>

<style scoped>
    /*scoped 作用于的意思，不加就是全局样式*/
div{
    color: red;
}
</style>