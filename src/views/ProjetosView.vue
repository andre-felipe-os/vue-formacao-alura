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
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>NOME</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto of projetos" v-bind:key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import { useStore } from "@/stores";

  import ProjetoInterface from "../interfaces/ProjetoInterface";

  export default defineComponent({
    name: 'ProjetosView',
    data() {
      return {
        nomeDoProjeto: '',
        projetos: new Array<ProjetoInterface>()
      }
    },
    setup() {
      const store = useStore();
      return { store };
    },
    methods: {
      salvar(): void {
        this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto);
        this.nomeDoProjeto = '';
      }
    }
  });
</script>

<style scoped>
  .projetos {
    padding: 1.25rem;
  }
</style>