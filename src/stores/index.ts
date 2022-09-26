import clienteHttp from "@/http";
import { NotificacaoInterface } from "@/interfaces/NotificacaoInterface";
import { AxiosResponse } from "axios";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import ProjetoInterface from "../interfaces/ProjetoInterface";
import { CADASTRAR_PROJETO, OBTER_PROJETOS } from "./tipos-de-acoes";
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, EXCLUI_PROJETO, NOTIFICAR, REMOVE_NOTIFICACAO } from "./tipos-de-mutacoes";

interface EstadoInterface {
    projetos: Array<ProjetoInterface>;
    notificacoes: Array<NotificacaoInterface>;
}

export const key: InjectionKey<Store<EstadoInterface>> = Symbol();

export const store = createStore<EstadoInterface>({
    state: {
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
        }
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
    },
});

export function useStore(): Store<EstadoInterface> {
    return vuexUseStore(key);
}