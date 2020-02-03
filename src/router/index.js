import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {path: '/db', name: 'db', component: () => import('../views/Db.vue')},
  {path: '/java', name: 'java', component: () => import('../views/Java.vue')},
  {path: '/operation', name: 'operation', component: () => import('../views/Operation.vue')},
  {path: '/python', name: 'python', component: () => import('../views/Python.vue')},
  {path: '/other', name: 'other', component: () => import('../views/Other.vue')}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
