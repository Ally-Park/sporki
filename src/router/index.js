import Vue from 'vue'
import VueRouter from 'vue-router'
import LivePage from '../views/LivePage.vue'
import LiveDetail from '../views/LiveDetail.vue'
import ThemePage from '../views/ThemePage.vue'
import SportsHome from '../views/SportsHome'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
  },
  {
    path: '/home',
    name: 'home',
    component: SportsHome
  },
  {
    path: '/live',
    name: 'live',
    component: LivePage
  },
  {
    path: '/liveDetail',
    name: 'liveDetail',
    component: LiveDetail
  },
  {
    path: '/theme',
    name: 'theme',
    component: ThemePage
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
