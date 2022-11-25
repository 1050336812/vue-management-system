import Vue from 'vue'
import App from './App.vue'
import { Pagination,Button, Select,Container,Aside,Header,Main,Menu,Submenu,MenuItemGroup,MenuItem,Dropdown,DropdownMenu,DropdownItem,Row,Col,Card,Table,TableColumn,Breadcrumb,BreadcrumbItem,Tag,Dialog,Form,FormItem,Input,Option,DatePicker,MessageBox,Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import store from './store/index'
import './api/mock'
Vue.prototype.$confirm = MessageBox.confirm
Vue.component(Message.name,Message)
Vue.prototype.$message = Message;

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Select)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Pagination)

new Vue({
  render: h => h(App),
  router,
  store,
  created(){
    this.$store.commit('tab/addMenu',router)
  }
}).$mount('#app')
