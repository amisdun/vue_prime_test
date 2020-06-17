import Vue from 'vue'
import App from './App.vue'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import VueRouter from 'vue-router'
import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'
import UserDashboard from './components/UserDashboard.vue'
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Menubar from 'primevue/menubar'
import Sidebar from 'primevue/sidebar'
import PanelMenu from 'primevue/panelmenu'
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import VueSession from 'vue-session'
import Message from 'primevue/message'

Vue.use(VueSession)
Vue.component('Message', Message)
Vue.component('Accordion',Accordion)
Vue.component('AccordionTab', AccordionTab)
Vue.component('Sidebar', Sidebar)
Vue.component('Menubar', Menubar)
Vue.component('Checkbox', Checkbox)
Vue.component('InputText', InputText)
Vue.component('Card', Card)
Vue.component('Button', Button)
Vue.component('PanelMenu', PanelMenu)
Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {path: '/', name: 'SignUp', component: SignUp},
    {path: '/SignIn', name: 'SignIn', component: SignIn},
    {path: '/UserDashboard', name: 'UserDashboard', component: UserDashboard}
  ],
  mode: 'history'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
