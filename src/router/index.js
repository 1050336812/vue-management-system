import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Mall from '../views/Mall.vue'
import User from '../views/User.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

// 创建 router 实例
const router = new VueRouter({
    // 定义路由
    routes:[
        //主路由
        {
            path:'/',
            component:Main,
            name:'Main',
            //重定向
            redirect:'/home',
            children:[
                // 子路由
                //首页
                // {
                //     path:'home',
                //     name:'home',
                //     component:Home
                // },
                // //商品管理
                // {
                //     path:'mall',
                //     name:'mall',
                //     component:Mall
                // },
                // //用户管理
                // {
                //     path:'user',
                //     name:'user',
                //     component:User
                // },
                // //页面1
                // {
                //     path:'page1',
                //     name:'page1',
                //     component:PageOne
                // },
                // //页面2
                // {
                //     path:'page2',
                //     name:'page2',
                //     component:PageTwo
                // }
            ]
        },
        {
            path:'/login',
            name:'login',
            component:Login
        }
    ]
})

//添加全局前置路由守卫
router.beforeEach((to,from,next) => {
    const token = localStorage.getItem('token')
    //token不存在，说明用户没登录，应该跳转登录页
    if (!token && to.name !== 'login') {
        next({name:'login'})
    }else{
        next()
    }
})

export default router