<template>
  <section>
    <form @submit.prevent="salvar" class="columns">
      <div class="field column is-10">
        <label for="nomeDoProjeto" class="label">
          Nome do projeto
        </label>
        <input
            type="text"
            class="input"
            id="nomeDoProjeto"
            v-model="nomeDoProjeto"
        />
      </div>
      <div class="field column is-2" style="position: relative;">
        <button class="button is-primary" type="submit" style="width: 80%; position: absolute; left: 0; bottom: 0; margin-left: 15px; margin-bottom: 24px; margin-right: 20px;">
          Salvar
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { useRouter } from "vue-router";

  import { useStore } from "@/stores";
  import { TipoNotificacao } from "@/interfaces/NotificacaoInterface";
  import useNotificador from '@/hooks/notificador';
  import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/stores/tipos-de-acoes";

  export default defineComponent({
    name: 'FormularioView',
    props: {
      id: {
        type: String
      }
    },
    setup(props) {
      const router = useRouter();
      const store = useStore();
      const { notificar } = useNotificador();

      const nomeDoProjeto = ref("");

      if (props.id) {
        const projeto = store.state.moduloProjeto.projetos
          .find(proj => proj.id == props.id);
        nomeDoProjeto.value = projeto?.nome || '';
      }

      const lidaComSucesso = (): void => {
        nomeDoProjeto.value = "";
        notificar(TipoNotificacao.SUCESSO, 'O projeto foi salvo.');
        router.push('/projetos');
      }

      const salvar = (): void => {
        if (props.id) {
          store.dispatch(ALTERAR_PROJETO, {
            id: props.id,
            nome: nomeDoProjeto.value
          }).then(() => lidaComSucesso());
        } else {
          store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
            .then(() => lidaComSucesso());
        }
      }

      return {
        store,
        nomeDoProjeto,
        lidaComSucesso,
        salvar,
      };
    },
  });
</script>