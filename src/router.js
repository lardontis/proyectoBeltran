import Vue from 'vue'
import Router from 'vue-router'
import sesion1 from "./views/sesion1.vue"
import sesion2 from "./views/sesion2.vue"
import login from "./views/login.vue"
import banner from "./components/banner.vue"
import estadisticas from "./views/estadisticas.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/sesion1',
      name: 'sesion1',
      component: sesion1
    },
    {
      path: '/sesion2',
      name: 'sesion2',
      component: sesion2
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
    {
      path: '/banner',
      name: 'banner',
      component: banner
    },
  ]
})
