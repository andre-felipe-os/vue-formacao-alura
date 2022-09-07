import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import TarefasView from '../views/TarefasView.vue'

const rotas: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Tarefas',
        component: TarefasView
    }
];

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
});

export default roteador;