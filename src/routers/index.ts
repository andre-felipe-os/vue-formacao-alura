import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import TarefasView from '../views/TarefasView.vue'
import ProjetosView from '../views/ProjetosView.vue'
import FormularioView from '../views/projetos/Formulario.vue'
import ListaView from '../views/projetos/Lista.vue'

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
        component: ProjetosView,
        children: [
            {
                path: '',
                name: 'Projetos',
                component: ListaView
            },
            {
                path: 'adicionar-projeto',
                name: 'Adicionar projeto',
                component: FormularioView
            },
            {
                path: 'editar-projeto/:id',
                name: 'Editar projeto',
                component: FormularioView,
                props: true
            }
        ]
    }
];

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
});

export default roteador;