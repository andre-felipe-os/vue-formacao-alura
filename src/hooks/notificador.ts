import { TipoNotificacao } from "@/interfaces/NotificacaoInterface"
import { store } from "@/stores";
import { NOTIFICAR } from "@/stores/tipos-de-mutacoes";

type Notificador = {
    notificar: (tipo: TipoNotificacao, mensagem: string) => void;
}

export default (): Notificador => {
    const notificar = (tipo: TipoNotificacao, mensagem: string): void => {
        store.commit(NOTIFICAR, { tipo, mensagem });
    };
    return { notificar };
}