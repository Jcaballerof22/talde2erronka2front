import { createRouter, createWebHistory } from "vue-router"

import login from './views/Login.vue'
import home from './views/Home.vue'
import produktuak from './views/Produktuak.vue'
import materiala from './views/Materiala.vue'
import langileak from './views/Langileak.vue'
import estatistikak from './views/Estatistikak.vue'
import historiala from './views/Historiala.vue'
import ticket from './views/Ticket.vue'
import fitxa from './views/Fitxa.vue'
import tratamenduak from './views/Tratamenduak.vue'

 
const routes = [
    {
        name: 'login',
        path: '/login',
        component: login,
        meta: {
            title: 'Login'
        }
    },
    {
        name: 'home',
        path: '/',
        component: home,
        meta: {
            title: 'Home'
        }
    },
    {
        name: 'produktuak',
        path: '/productos',
        component: produktuak,
        meta: {
            title: 'Productos'
        }
    },
    {
        name: 'materiala',
        path: '/material',
        component: materiala,
        meta: {
            title: 'Material'
        }
    },
    {
        name: 'langileak',
        path: '/alumnos',
        component: langileak,
        meta: {
            title: 'Alumnos'
        }
    },
    {
        name: 'estatistikak',
        path: '/estadisticas',
        component: estatistikak,
        meta: {
            title: 'Estadísticas'
        }
    },
    {
        name: 'historiala',
        path: '/historial',
        component: historiala,
        meta: {
            title: 'Historial'
        }
    },
    {
        name: 'ticket',
        path: '/tickets',
        component: ticket,
        meta: {
            title: 'Tickets'
        }
    },
    {
        name: 'fitxa',
        path: '/fichas',
        component: fitxa,
        meta: {
            title: 'Fichas'
        }
    },
    {
        name: 'tratamenduak',
        path: '/tratamientos',
        component: tratamenduak,
        meta: {
            title: 'Tratamientos'
        }
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes: routes
})


export default router