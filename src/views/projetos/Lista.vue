<template>
  <section>
    <router-link to="/projetos/adicionar-projeto" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>
        Novo projeto
      </span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>NOME</th>
          <th>AÇÕES</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto of projetos" v-bind:key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <router-link v-bind:to="`/projetos/editar-projeto/${projeto.id}`"
                class="button is-warning">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";

  import { useStore } from "@/stores";
  import { OBTER_PROJETOS, REMOVER_PROJETO } from "@/stores/tipos-de-acoes";

  export default defineComponent({
    name: 'ListaView',
    methods: {
      excluir(id: string): void {
        this.store.dispatch(REMOVER_PROJETO, id);
      }
    },
    setup() {
      const store = useStore();
      store.dispatch(OBTER_PROJETOS);
      return {
        store,
        projetos: computed(() => store.state.projeto.projetos)
      };
    }
  });
</script>