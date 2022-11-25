<template>
    <el-form ref="form" label-width="70px" :inline="true" :model="form" :rules="rules" class="login-container">
        <h3 class="login_title">系统登录</h3>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit" type="primary" style="margin-top:10px">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import Mock from 'mockjs'
    import {getMenu} from '../api/index'
    import {mapMutations} from 'vuex'
    export default {
        data() {
            return {
                form:{
                    username:'',
                    username:''
                },
                rules:{
                    username:[
                        {required:true,trigger:'blur',message:'请输入用户名'}
                    ],
                    password:[
                        {required:true,trigger:'blur',message:'请输入密码'}
                    ]
                }
            }
        },
        methods:{
            //登录
            submit(){
                // const token = Mock.Random.guid()
                // localStorage.setItem('token',token)


                this.$refs.form.validate((val) => {
                    //校验通过
                    if (val) {
                        getMenu(this.form).then(
                            response => {
                                console.log(response.data);
                                if (response.data.code === 20000) {
                                    //token信息存入localStorage
                                    localStorage.setItem('token',response.data.data.token)


                                    this.$store.commit('tab/setMenu',response.data.data.menu)
                                    this.$store.commit('tab/addMenu',this.$router)


                                    //跳转首页
                                    this.$router.push('/home')
                                }else{
                                    this.$message.error(response.data.data.message)
                                }
                            }
                        )
                    }
                })
                
            }
        }
    }
</script>

<style lang="less" scoped>
    .login-container{
        width: 350px;
        border: 1px solid #eaeaea;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0 0 25px #cac6c6;
        box-sizing: border-box;
        text-align: center;
        .login_title{
            margin-bottom: 40px;
            color: #505458;
        }
        .el-input{
            width: 198px;
        }
    }
</style>