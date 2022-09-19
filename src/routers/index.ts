import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import TarefasView from '../views/TarefasView.vue'
import ProjetosView from '../views/ProjetosView.vue'
import FormularioView from '../views/projetos/Formulario.vue'

const rotas: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: { name: 'Tarefas'}
    },
    {
        path: '/tarefas',
        name: 'Tarefas',
        component: TarefasView
    },
    {
        path: '/projetos',
        name: 'Projetos',
        component: ProjetosView
    },
    {
        path: '/projetos/adicionar-projeto',
        name: 'Adicionar projeto',
        component: FormularioView
    },
    {
        path: '/projetos/editar-projeto/:id',
        name: 'Editar projeto',
        component: FormularioView
    }
];

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
});

export default roteador;