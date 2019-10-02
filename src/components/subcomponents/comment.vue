<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>

        <textarea placeholder="请输入要BB的内容（最多BB120字）"
        maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat}}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '此用户很懒，什么都没说' : item.content }}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>

    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    export default {
        data:function(){
            return {
                pageindex:1,
                comments:[],
                msg:''//评论的内容
            }
        },
        created(){
          this.getComment();
        },
        methods:{
            //获取评论
            getComment(){
                this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageindex).then( result =>{
                        // this.comments = result.body.message;
                    //每当获取新评论数据的时候，不要把以前的数据覆盖，应该老数据加上新数据
                    this.comments = this.comments.concat(result.body.message)
                },err => {
                    console.log(err);
                })
            },
            //加载更多
            getMore(){
                this.pageindex++;
                this.getComment();
            },
            //发表评论
            postComment(){
                //校验是否为空
                if(this.msg.trim().length === 0){
                    return Toast('评论内容不能为空')
                }

                //参数1：请求的地址
                //参数2：提交给服务器的数据对象,{content :this.msg}
                //参数3：定义提交时候表表单中数据的格式{ emulateJSON：true }

                this.$http.post('api/postcomment/' + this.$route.params.id,
                    { content:this.msg.trim() })
                    .then(result => {
                        //拼接出一个评论对象
                        let cmt = {
                            user_name : '匿名用户' ,
                            add_time: Date.now(),
                            content:this.msg.trim(),
                        };
                        this.comments.unshift(cmt)
                        this.msg="";
                    },err => {
                        console.log(err)
                    })
            }
        },
        props:['id']
    }
</script>

<style scoped lang="less">
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin:5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>