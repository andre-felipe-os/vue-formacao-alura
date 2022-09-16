import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import ProjetoInterface from "../interfaces/ProjetoInterface";

interface EstadoInterface {
    projetos: Array<ProjetoInterface>;
}

export const key: InjectionKey<Store<EstadoInterface>> = Symbol();

export const store = createStore<EstadoInterface>({
    state: {
        projetos: Array<ProjetoInterface>()
    }
});