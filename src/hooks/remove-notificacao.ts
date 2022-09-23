import { store } from "@/stores";
import { REMOVE_NOTIFICACAO } from "@/stores/tipos-de-mutacoes";

type Removedor = {
    removerNotificacao: (idDaNotificacao: number) => void;
}

export default (): Removedor => {
    const removerNotificacao = (idDaNotificacao: number): void => {
        store.commit(REMOVE_NOTIFICACAO, { idDaNotificacao });
    };
    return { removerNotificacao };
}