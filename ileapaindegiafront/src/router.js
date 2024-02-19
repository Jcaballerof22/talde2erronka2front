import { createRouter, createWebHistory } from "vue-router"

import wiki from './views/wiki.vue'
import home from './views/Home.vue'
import produktuak from './views/Produktuak.vue'
import materiala from './views/Materiala.vue'
import langileak from './views/Langileak.vue'
import taldeak from './views/Taldeak.vue'
import estatistikak from './views/Estatistikak.vue'
import historiala from './views/Historiala.vue'
import ticket from './views/Ticket.vue'


 
const routes = [
    {
        name: 'home',
        path: '/',
        component: home,
        meta: {
            title: 'HOME'
        }
    },
    {
        name: 'wiki',
        path: '/wiki',
        component: wiki,
        meta: {
            title: 'Wiki'
        }
    },
    {
        name: 'produktuak',
        path: '/productos',
        component: produktuak,
        meta: {
            title: 'PRODUKTUAK'
        }
    },
    {
        name: 'materiala',
        path: '/material',
        component: materiala,
        meta: {
            title: 'MATERIALA'
        }
    },
    {
        name: 'langileak',
        path: '/alumnos',
        component: langileak,
        meta: {
            title: 'LANGILEAK'
        }
    },
    {
        name: 'taldeak',
        path: '/grupos',
        component: taldeak,
        meta: {
            title: 'TALDEAK'
        }
    },
    {
        name: 'estatistikak',
        path: '/estadisticas',
        component: estatistikak,
        meta: {
            title: 'ESTATISTIKAK'
        }
    },
    {
        name: 'historiala',
        path: '/historial',
        component: historiala,
        meta: {
            title: 'HISTORIALA'
        }
    },
    {
        name: 'ticket',
        path: '/tickets',
        component: ticket,
        meta: {
            title: 'TICKET'
        }
    },
    
]


const router = createRouter({
    history: createWebHistory(),
    routes: routes
})


export default router