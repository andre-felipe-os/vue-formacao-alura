import { NotificacaoInterface } from "@/interfaces/NotificacaoInterface";
import TarefaInterface from "@/interfaces/TarefaInterface";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import ProjetoInterface from "../interfaces/ProjetoInterface";
import { EstadoProjeto, moduloProjeto } from "./modulos/projeto";
import { EstadoTarefa, moduloTarefa } from "./modulos/tarefa";
import { NOTIFICAR, REMOVE_NOTIFICACAO } from "./tipos-de-mutacoes";

export interface EstadoInterface {
    moduloTarefa: EstadoTarefa;
    moduloProjeto: EstadoProjeto;
    notificacoes: Array<NotificacaoInterface>;
}

export const key: InjectionKey<Store<EstadoInterface>> = Symbol();

export const store = createStore<EstadoInterface>({
    state: {
        moduloTarefa: {
            tarefas: Array<TarefaInterface>(),
        },
        moduloProjeto: {
            projetos: Array<ProjetoInterface>(),
        },
        notificacoes: Array<NotificacaoInterface>(),
    },
    modules: {
        moduloTarefa,
        moduloProjeto,
    },
    mutations: {
        [NOTIFICAR](state, novaNotificacao: NotificacaoInterface) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => {
                    notificacao.id != novaNotificacao.id;
                });
            }, 10000);
        },
        [REMOVE_NOTIFICACAO](state, idDaNotificacao: number): void {
            state.notificacoes = state.notificacoes.filter(notificacao => {
                notificacao.id != idDaNotificacao;
            });
        },
    },
});

export function useStore(): Store<EstadoInterface> {
    return vuexUseStore(key);
}