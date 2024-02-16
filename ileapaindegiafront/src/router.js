import { createRouter, createWebHistory } from "vue-router"

import menu from './views/Menu.vue'
import wiki from './views/wiki.vue'
import home from './views/Home.vue'




 
const routes = [
    {
        name: 'menu',
        path: '/',
        component: menu
    },
    {
        name: 'wiki',
        path: '/wiki',
        component: wiki
    },
    {
        name: 'home',
        path: '/home',
        component: home
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes: routes
})


export default router