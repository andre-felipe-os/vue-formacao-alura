import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import ProjetoInterface from "../interfaces/ProjetoInterface";

interface EstadoInterface {
    projetos: Array<ProjetoInterface>;
}

export const key: InjectionKey<Store<EstadoInterface>> = Symbol();

export const store = createStore<EstadoInterface>({
    state: {
        projetos: Array<ProjetoInterface>()
    },
    mutations: {
        'ADICIONA_PROJETO'(state, nomeDoProjeto: string): void {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as ProjetoInterface;
            state.projetos.push(projeto);
        }
    }
});

export function useStore(): Store<EstadoInterface> {
    return vuexUseStore(key);
}