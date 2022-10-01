import clienteHttp from "@/http";
import ProjetoInterface from "@/interfaces/ProjetoInterface";
import { EstadoInterface } from "@/stores";
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, REMOVER_PROJETO } from "@/stores/tipos-de-acoes";
import { DEFINIR_PROJETOS, EXCLUI_PROJETO, ADICIONA_PROJETO, ALTERA_PROJETO } from "@/stores/tipos-de-mutacoes";
import { AxiosResponse } from "axios";
import { Module } from "vuex";

export interface EstadoProjeto {
    projetos: Array<ProjetoInterface>;
}

export const projeto: Module<EstadoProjeto, EstadoInterface> = {
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
    },
}