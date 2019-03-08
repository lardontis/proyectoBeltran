import Vue from 'vue'
import Router from 'vue-router'
import home from "./components/home.vue"
import login from "./components/login.vue"
import estadisticas from "./components/estadisticas.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/estadisticas',
      name: 'estadisticas',
      component: estadisticas
    },
  ]
})
