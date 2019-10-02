<template>
    
    <!--我们不知道什么时候能拿到max，但是总会有一刻会得到
        我们可以使用watch监听max，不管watch会被触发几次，但是最后一次，肯定是一个合法的max、数值
    -->
    <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input ref="numbox" @change="countChanged" id="test" class="mui-input-numbox" type="number" value="1">
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>


    <!--
        分析：子组件什么时候把数据传给父组件
        1.
    -->
</template>

<script>
    import mui from '../../../lib/mui/js/mui.js'
    export default {
        name: "GoodsInfo_Numbox",
        mounted() {
                //初始化数字选择框
            mui('.mui-numbox').numbox();
        },
        methods:{
            //每当文本框的时间修改时，就把值传递给父组件
            countChanged(){
                this.$emit('getCount',parseInt(this.$refs.numbox.value));
            }
        },
        props:['max'],
        watch:{
            'max': function (newValue,oldValue) {
                mui('.mui-numbox').numbox().setOption('max',newValue);
            }
        },
    }
</script>

<style scoped lang="less">

</style>