import { NotificacaoInterface } from "@/interfaces/NotificacaoInterface";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import ProjetoInterface from "../interfaces/ProjetoInterface";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUI_PROJETO } from "./tipos-de-mutacoes";

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
        }
    }
});

export function useStore(): Store<EstadoInterface> {
    return vuexUseStore(key);
}