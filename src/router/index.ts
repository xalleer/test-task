import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../view/HomePage.vue'
import SeletedCountry from "../view/SeletedCountry.vue";

const routes = [
    { path: '/', redirect: '/main/home' },
    { path: '/main/home', component: HomePage },
    { path: '/main/selected-country', component: SeletedCountry },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;