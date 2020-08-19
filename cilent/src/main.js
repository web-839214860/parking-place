import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Checkbox, NavBar, Col, Row, Toast, Tabbar, TabbarItem, CellGroup, Cell, PullRefresh, Dialog, Search, Uploader, SwipeCell, Icon, NoticeBar, Empty, Tab, Tabs, Sidebar, SidebarItem, Collapse, CollapseItem } from 'vant';
import { Form, FormItem, Input, Select, Option, TimePicker } from 'element-ui';
import api from './api/install'
import moment from 'moment'
import '@/permission' 


Vue.use(api)

Vue.use(Button).use(Checkbox).use(NavBar).use(Col).use(Row).use(Toast).use(Tabbar).use(TabbarItem).use(CellGroup).use(Cell).use(PullRefresh).use(Dialog).use(Search).use(Uploader).use(SwipeCell).use(Icon).use(NoticeBar).use(Empty).use(Tab).use(Tabs).use(Sidebar).use(SidebarItem).use(Collapse).use(CollapseItem);
Vue.use(Form).use(FormItem).use(Input).use(Select).use(Option).use(TimePicker)

Vue.config.productionTip = false
Vue.prototype.$moment = moment;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')