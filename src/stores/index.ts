import clienteHttp from "@/http";
import { NotificacaoInterface } from "@/interfaces/NotificacaoInterface";
import TarefaInterface from "@/interfaces/TarefaInterface";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import ProjetoInterface from "../interfaces/ProjetoInterface";
import { EstadoProjeto, moduloProjeto } from "./modulos/projeto";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from "./tipos-de-acoes";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS, NOTIFICAR, REMOVE_NOTIFICACAO } from "./tipos-de-mutacoes";

export interface EstadoInterface {
    tarefas: Array<TarefaInterface>;
    notificacoes: Array<NotificacaoInterface>;
    moduloProjeto: EstadoProjeto;
}

export const key: InjectionKey<Store<EstadoInterface>> = Symbol();

export const store = createStore<EstadoInterface>({
    state: {
        tarefas: Array<TarefaInterface>(),
        notificacoes: Array<NotificacaoInterface>(),
        moduloProjeto: {
            projetos: Array<ProjetoInterface>(),
        }
    },
    modules: {
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