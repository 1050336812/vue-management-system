<template>
    <div class="tags">
        <el-tag
            v-for="(item,index) in tabsList"
            :key="item.path"
            :closable="item.name !== 'home'"
            @click="changeMenu(item)"
            @close="handleClose(item,index)"
            size="small"
            :effect="$route.name === item.name ? 'dark' : 'plain'">
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    export default {
        name:'CommonTag',
        data() {
            return {
                
            }
        },
        computed:{
            ...mapState('tab',['tabsList'])
        },
        methods:{
            //点击tag跳转的功能
            changeMenu(item){
                if (this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/')) {
                    this.$router.push({
                        name:item.name
                    })
                }
            },
            ...mapMutations('tab',['closeTag']),
            //点击tag删除的功能
            handleClose(item,index){
                this.closeTag(item)
                const length = this.tabsList.length
                //删除之后的跳转逻辑

                //如果删除的tag不是在当前路由
                if(item.name !== this.$route.name) return
                //表示删除的是最后一项
                if (index === length) {
                    this.$router.push({
                        name:this.tabsList[index - 1].name
                    })
                }else{
                    this.$router.push({
                        name:this.tabsList[index].name
                    })
                }
            },
        },
    }
</script>

<style lang="less" scoped>
    .tags{
        padding: 20px 0 0 20px;
        .el-tag{
            margin-right: 15px;
            cursor: pointer;
        }
    }
</style>