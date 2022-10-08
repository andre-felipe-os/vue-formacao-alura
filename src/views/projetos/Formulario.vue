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
      const store = useStore();
      const { notificar } = useNotificador();

      const nomeDoProjeto = ref("");

      if (props.id) {
        const projeto = store.state.moduloProjeto.projetos
          .find(proj => proj.id == props.id);
        nomeDoProjeto.value = projeto?.nome || '';
      }

      return {
        store,
        notificar,
        nomeDoProjeto,
      };
    },
    methods: {
      salvar(): void {
        if (this.id) {
          this.store.dispatch(ALTERAR_PROJETO, {
            id: this.id,
            nome: this.nomeDoProjeto
          }).then(() => this.lidaComSucesso());
        } else {
          this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
            .then(() => this.lidaComSucesso());
        }
      },
      lidaComSucesso(): void {
        this.nomeDoProjeto = "";
        this.notificar(TipoNotificacao.SUCESSO, 'O projeto foi salvo.');
        this.$router.push('/projetos');
      },
    },
  });
</script>