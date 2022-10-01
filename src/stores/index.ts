import clienteHttp from "@/http";
import { NotificacaoInterface } from "@/interfaces/NotificacaoInterface";
import TarefaInterface from "@/interfaces/TarefaInterface";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import ProjetoInterface from "../interfaces/ProjetoInterface";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from "./tipos-de-acoes";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS, NOTIFICAR, REMOVE_NOTIFICACAO } from "./tipos-de-mutacoes";

export interface EstadoInterface {
    tarefas: Array<TarefaInterface>;
    projetos: Array<ProjetoInterface>;
    notificacoes: Array<NotificacaoInterface>;
}

export const key: InjectionKey<Store<EstadoInterface>> = Symbol();

export const store = createStore<EstadoInterface>({
    state: {
        tarefas: Array<TarefaInterface>(),
        notificacoes: Array<NotificacaoInterface>(),
        projetos: Array<ProjetoInterface>()
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
        [ADICIONA_TAREFA](state, tarefa: TarefaInterface): void {
            state.tarefas.push(tarefa);
        },
        [DEFINIR_TAREFAS](state, tarefas: Array<TarefaInterface>): void {
            state.tarefas = tarefas;
        },
        [ALTERA_TAREFA](state, tarefaAlterada: TarefaInterface): void {
            const index = state.tarefas
                .findIndex(tarefa => tarefa.id == tarefaAlterada.id);
            state.tarefas[index] = tarefaAlterada;
        },
    },
    actions: {
        [OBTER_TAREFAS]({ commit }) {
            clienteHttp.get("tarefas")
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data));
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: TarefaInterface): Promise<void> {
            return clienteHttp.post("/tarefas", tarefa)
                .then(resposta => this.commit(ADICIONA_TAREFA, resposta.data));
        },
        [ALTERAR_TAREFA]({ commit }, tarefa: TarefaInterface): Promise<void> {
            return clienteHttp.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(resposta => this.commit(ALTERA_TAREFA, tarefa));
        },
    },
});

export function useStore(): Store<EstadoInterface> {
    return vuexUseStore(key);
}