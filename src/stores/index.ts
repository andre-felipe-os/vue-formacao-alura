import { createStore } from "vuex";
import ProjetoInterface from "../interfaces/ProjetoInterface";

interface EstadoInterface {
    projetos: Array<ProjetoInterface>;
}

export const store = createStore<EstadoInterface>({
    state: {
        projetos: [
            {
                id: new Date().toISOString(),
                nome: 'Formação TypeScript'
            },
            {
                id: new Date().toISOString(),
                nome: 'Formação Vue.js 3'
            },
            {
                id: new Date().toISOString(),
                nome: 'Formação Spring'
            }
        ]
    }
});