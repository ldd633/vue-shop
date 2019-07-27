<template>
    <div>
        <h1>这是account组件</h1>

        <router-link to="/account/login">登录</router-link>
        <router-link to="/account/register">注册</router-link>

        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Account"
    }
</script>

<style scoped lang="less">
 /*style 标签只支持普通的样式，如果想要使用less或者sass，要加lang属性*/
 body{
     div{
         font-style: italic;
     }
 }

</style>
