# alura-tracker
Esse projeto foi desenvolvido ao longo dos três cursos da formação Vue.js 3 da Alura.

## Sobre o projeto

O Tracker é uma ferramenta para **cronometrar o tempo** gasto com tarefas.

Para **registrar uma tarefa** basta iniciar o crônometro e encerrá-lo ao concluir a tarefa.
Você pode adicionar uma descrição e escolher um projeto para cada tarefa, mas isso é opcional.
As tarefas registradas são listadas abaixo da barra de pesquisa.
Você pode **pesquisar tarefas** pelo nome usando a barra de pesquisa.

![texto alternativo][tracker-tarefas]

A página de Projetos lista os **projetos cadastrados**.
Aqui é possível remover e editar os projetos existentes, assim como **adicionar novos projetos**.
Após adicionados, os projetos podem ser usados no registro de novas tarefas.

![texto alternativo][tracker-projetos]

O Tracker também possui um **modo escuro**. Para ativá-lo basta usar o botão na barra lateral.

[tracker-tarefas]: ./docs/images/tracker-tarefas.png
[tracker-projetos]: ./docs/images/tracker-projetos.png

---

## Executando o projeto

Primeiro, clone esse repositório e entre no diretório criado:

```
git clone git@github.com:andrefelipeos/vue-js-alura.git && cd vue-js-alura
```

Antes de executar o projeto, é preciso simular um *back end*. Para isso instale o pacote **json-server**.

```
sudo npm install -g json-server
```

Com o **json-server** você pode simular uma API que armazena os dados das tarefas e dos projetos.

```
json-server --watch db.json
```

Agora basta instalar as dependências do projeto.

```
npm install
```

E então executá-lo.

```
npm run serve
```

Você pode acessar o Tracker pelo seu navegador no endereço http://localhost:8080.
Alternativamente, você pode acessar https://tracker-afos.vercel.app logo após iniciar o json-server.

---

## Sobre a formação Vue.js 3 da Alura
A formação é composta por três cursos ao longo dos quais conheci vários detalhes do Vue.
Alguns conteúdos foram mais praticados que outros e por isso geraram um apredizado mais profundo.

Alguns dos pontos abordados foram os seguintes:
- o uso do `vue-cli` para criar novos projetos Vue.js
- a utilização do **TypeScript** e as vantagens disso
- a criação de **componentes** e a interação com e entre eles
- bastante da **Options API**, um pouco da **Compositon API**
- o **ciclo de vida** dos componetes
- a passagem de dados para componetes com `props`
- a emissão de eventos utilizando `emit`
- várias **diretivas**, como `v-model`, `v-for`, `v-bind`, etc
- rederização condicional com `v-if` e `v-show`
- o uso extensivo do **Vuex**, incluindo estados, *stores*, *mutations*, *actions* e módulos
- a utilização básica do **Vue Router**
- o uso do **Vue DevTools** para depuração da aplicação
