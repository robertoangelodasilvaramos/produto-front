<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Produtos Front</a>
      </div>
    </nav>

    <div class="container">
      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          <p class="card-panel #ffebee red lighten-5">
            campo -
            <b>{{ erro }}</b>
          </p>
        </li>
      </ul>
      <form @submit.prevent="salvar">
        <label>Nome</label>
        <input type="text" placeholder="Nome" v-model="prod.nome" />
        <label>Quantidade</label>
        <input type="number" placeholder="QTD" v-model="prod.quantidade" />
        <label>Valor</label>
        <input type="text" placeholder="Valor" v-model="prod.valor" />

        <button class="waves-effect waves-light btn-small">
          Salvar
          <i class="material-icons left">save</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>QTD</th>
            <th>VALOR</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="produto of produtos" :key="produto.id">
            <td>{{ produto.nome }}</td>
            <td>{{ produto.quantidade }}</td>
            <td>{{ produto.valor }}</td>
            <td>
              <button @click="editar(produto)" class="waves-effect btn-small blue darken-1">
                <i class="material-icons">create</i>
              </button>
              <button @click="remover(produto)" class="waves-effect btn-small red darken-1">
                <i class="material-icons">delete_sweep</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Produto from "./services/produtos";
export default {
  data() {
    return {
      prod: {
        id: "",
        nome: "",
        quantidade: "",
        valor: ""
      },
      produtos: [],
      errors: []
    };
  },

  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      Produto.listar().then(resposta => {
        this.produtos = resposta.data;
      });
    },
    salvar() {
      if (!this.prod.id) {
        Produto.salvar(this.prod)
          .then(resposta => {
            alert("Salvo com sucesso!");
            resposta.data;
            this.produtos = {};
            this.listar();
            this.errors = [];
            this.prod = {};
          })
          .catch(e => {
            this.errors = e.response.data.errors;
          });
      } else {
        Produto.atualizar(this.prod)
          .then(resposta => {
            alert("Atualizado com sucesso!");
            this.produtos = {};
            resposta.data;
            this.listar();
            this.errors = [];
            this.prod = {};
          })
          .catch(e => {
            this.errors = e.response.data.errors;
          });
      }
    },
    editar(produto) {
      this.prod = produto;
    },
    remover(produto) {
      if (confirm("Deseja excluir o produto?")) {
        Produto.apagar(produto)
          .then(resposta => {
            this.listar();
            this.errors = [];
            resposta.data;
          })
          .catch(e => {
            this.errors = e.response.data.errors;
          });
      }
    }
  }
};
</script>

<style>
</style>
