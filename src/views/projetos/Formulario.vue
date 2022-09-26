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
  import { defineComponent } from "vue";

  import { useStore } from "@/stores";
  import { ALTERA_PROJETO } from "@/stores/tipos-de-mutacoes";
  import { TipoNotificacao } from "@/interfaces/NotificacaoInterface";
  import useNotificador from '@/hooks/notificador';
  import { CADASTRAR_PROJETO } from "@/stores/tipos-de-acoes";

  export default defineComponent({
    name: 'FormularioView',
    props: {
      id: {
        type: String
      }
    },
    data() {
      return {
        nomeDoProjeto: '',
      }
    },
    mounted() {
      if (this.id) {
        const projeto = this.store.state.projetos
          .find(proj => proj.id == this.id);
        this.nomeDoProjeto = projeto?.nome || '';
      }
    },
    setup() {
      const store = useStore();
      const { notificar } = useNotificador();
      return {
        store,
        notificar,
      };
    },
    methods: {
      salvar(): void {
        if (this.id) {
          this.store.commit(ALTERA_PROJETO, {
            id: this.id,
            nome: this.nomeDoProjeto
          });
        } else {
          this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
            .then(() => {
              this.nomeDoProjeto = "";
              this.notificar(TipoNotificacao.SUCESSO, 'O projeto foi salvo.');
              this.$router.push('/projetos');
            });
        }
      },
    },
  });
</script>