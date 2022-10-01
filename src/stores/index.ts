import clienteHttp from "@/http";
import { NotificacaoInterface } from "@/interfaces/NotificacaoInterface";
import TarefaInterface from "@/interfaces/TarefaInterface";
import { AxiosResponse } from "axios";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import ProjetoInterface from "../interfaces/ProjetoInterface";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./tipos-de-acoes";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, ALTERA_TAREFA, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EXCLUI_PROJETO, NOTIFICAR, REMOVE_NOTIFICACAO } from "./tipos-de-mutacoes";

interface EstadoInterface {
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
        [ADICIONA_PROJETO](state, nomeDoProjeto: string): void {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as ProjetoInterface;
            state.projetos.push(projeto);
        },
        [ALTERA_PROJETO](state, projetoAlterado: ProjetoInterface): void {
            const index = state.projetos
                .findIndex(projeto => projeto.id == projetoAlterado.id);
            state.projetos[index] = projetoAlterado;
        },
        [EXCLUI_PROJETO](state, idDoProjeto: string): void {
            state.projetos = state.projetos
                .filter(projeto => projeto.id != idDoProjeto);
        },
        [DEFINIR_PROJETOS](state, projetos: Array<ProjetoInterface>): void {
            state.projetos = projetos;
        },
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
        [OBTER_PROJETOS]({ commit }) {
            clienteHttp.get("projetos")
                .then(resposta => commit(DEFINIR_PROJETOS, resposta.data));
        },
        [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string): Promise<AxiosResponse> {
            return clienteHttp.post("/projetos", {
                nome: nomeDoProjeto,
            });
        },
        [ALTERAR_PROJETO](contexto, projeto: ProjetoInterface): Promise<AxiosResponse> {
            return clienteHttp.put(`/projetos/${projeto.id}`, projeto);
        },
        [REMOVER_PROJETO]({ commit }, idDoProjeto: string) {
            return clienteHttp.delete(`/projetos/${idDoProjeto}`)
                .then(() => commit(EXCLUI_PROJETO, idDoProjeto));
        },
        [OBTER_TAREFAS]({ commit }) {
            clienteHttp.get("tarefas")
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data));
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: TarefaInterface): Promise<void> {
            return clienteHttp.post("/tarefas", tarefa)
                .then(resposta => this.commit(ADICIONA_TAREFA, resposta.data));
        },
    },
});

export function useStore(): Store<EstadoInterface> {
    return vuexUseStore(key);
}