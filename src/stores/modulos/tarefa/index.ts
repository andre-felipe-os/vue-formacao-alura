import TarefaInterface from "@/interfaces/TarefaInterface";
import { EstadoInterface } from "@/stores";
import { Module } from "vuex";

export interface EstadoTarefa {
    tarefas: Array<TarefaInterface>;
}

export const moduloTarefa: Module<EstadoTarefa, EstadoInterface> = {
    actions: {

    },
    mutations: {

    },
}