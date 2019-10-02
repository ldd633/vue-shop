<template>


    <div class="mui-numbox" data-numbox-min="1" style="height: 25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input ref="numbox" @change="countChanged" id="test" class="mui-input-numbox" type="number" :value="initcount">
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>


</template>

<script>
    import mui from '../../../lib/mui/js/mui.js'
    export default {
        name: "ShopCar_Number",
        mounted() {
            //初始化数字选择框
            mui('.mui-numbox').numbox();
        },
        props:[
            'initcount',
            'goodsid'
        ],
        methods:{
            //每当文本框的时间修改时，就把值传递给父组件
            countChanged(){
                //每当数量值改变，则立即把最新的数据同步到购物车的store中，覆盖之前的数据值
                this.$store.commit('updateGoodsInfo',{ id: this.goodsid, count: this.$refs.numbox.value })
            }
        }
    }
</script>

<style scoped lang="less">

</style>

