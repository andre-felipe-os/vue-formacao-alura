<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>
    <form @submit.prevent="salvar">
      <div class="field">
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
      <div class="field">
        <button class="button" type="submit">
          Salvar
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import ProjetoInterface from "../interfaces/ProjetoInterface";

  export default defineComponent({
    name: 'ProjetosView',
    data() {
      return {
        nomeDoProjeto: '',
        projetos: new Array<ProjetoInterface>()
      }
    },
    methods: {
      salvar(): void {
        const projeto: ProjetoInterface = {
          id: new Date().toISOString(),
          nome: this.nomeDoProjeto
        }
        this.projetos.push(projeto);
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