import { TipoNotificacao } from "@/interfaces/NotificacaoInterface";
import { store } from "@/stores";
import { NOTIFICAR } from "@/stores/tipos-de-mutacoes";

export const notificacaoMixin = {
    methods: {
        notificar(tipo: TipoNotificacao, mensagem: string): void {
            store.commit(NOTIFICAR, { tipo, mensagem });
          }
    }
}