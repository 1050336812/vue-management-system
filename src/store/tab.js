export default {
    namespaced:true,
    actions : {

    },
    mutations : {
        collapseMenu(state){
            //修改菜展开收起的方法
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑数据
        selectMenu(state,value){
            if(value.name !== 'home'){
                const index = state.tabsList.findIndex(item => item.name === value.name)
                //判断是否存在，不存在就等于-1
                if(index === -1){
                    state.tabsList.push(value)
                }
            }
        },
        //删除指定的tag数据
        closeTag(state,value){
            const index = state.tabsList.findIndex(item => item.name === value.name)
            state.tabsList.splice(index,1)
        },
        //设置menu数据
        setMenu(state,value){
            state.menu = value
            localStorage.setItem('menu',JSON.stringify(value))
        },
        //动态注册路由
        addMenu(state,value){
            //判断缓存中是否有数据
            if(!localStorage.getItem('menu')) return
            const menu  = JSON.parse(localStorage.getItem('menu'))
            state.menu = menu
            //组装动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(itemIn => {
                        itemIn.component = () => import(`../views/${itemIn.url}`)
                        return itemIn
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            //路由动态添加
            menuArray.forEach(item => {
                value.addRoute('Main',item)
            })
        }
    },
    state : {
        isCollapse:false,//用于控制菜单的展开还是收起
        //面包屑数据
        tabsList:[
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            },
        ],
        menu:[]
    },
    getters : {
    
    }
}