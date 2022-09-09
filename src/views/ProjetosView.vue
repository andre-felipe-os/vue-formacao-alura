<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>
    <form>
      <div class="field">
        <label for="nomeDoProjeto" class="label">
          Nome do projeto
        </label>
        <input
            type="text"
            class="input"
            id="nomeDoProjeto"
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

  export default defineComponent({
    name: 'ProjetosView'
  });
</script>