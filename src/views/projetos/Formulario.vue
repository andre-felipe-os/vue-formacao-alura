<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>
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
    setup() {
      const store = useStore();
      return {
        store
      };
    },
    methods: {
      salvar(): void {
        this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto);
        this.nomeDoProjeto = '';
        this.$router.push('/projetos');
      }
    }
  });
</script>

<style scoped>
  .projetos {
    padding: 1.25rem;
  }
</style>