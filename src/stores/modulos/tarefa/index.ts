import clienteHttp from "@/http";
import TarefaInterface from "@/interfaces/TarefaInterface";
import { EstadoInterface } from "@/stores";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from "@/stores/tipos-de-acoes";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS } from "@/stores/tipos-de-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
    tarefas: Array<TarefaInterface>;
}

export const moduloTarefa: Module<EstadoTarefa, EstadoInterface> = {
    actions: {
        [OBTER_TAREFAS]({ commit }) {
            clienteHttp.get("tarefas")
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data));
        },
        [CADASTRAR_TAREFA](contexto, tarefa: TarefaInterface): Promise<void> {
            return clienteHttp.post("/tarefas", tarefa)
                .then(resposta => this.commit(ADICIONA_TAREFA, resposta.data));
        },
        [ALTERAR_TAREFA](contexto, tarefa: TarefaInterface): Promise<void> {
            return clienteHttp.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => this.commit(ALTERA_TAREFA, tarefa));
        },
    },
    mutations: {
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
}