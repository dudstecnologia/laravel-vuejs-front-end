<template>
  <div class="mt-3">
    <b-table bordered head-variant="light" :busy="carregando" :items="contatos" :fields="cabecalho">
      <template v-slot:cell(action)="data">
        <b-button size="sm" variant="info" @click="editar(data.item)">
          Editar
        </b-button>
        <b-button size="sm" variant="danger" @click="excluir(data.item)">
          Excluir
        </b-button>
      </template>
      <template v-slot:table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle" />
          <strong>Carregando...</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      carregando: false,
      cabecalho: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'nome', label: 'Nome', sortable: true },
        { key: 'telefone', label: 'Telefone', sortable: true },
        { key: 'idade', label: 'Idade', sortable: true },
        { key: 'action', label: 'Ações' }
      ]
    }
  },
  computed: {
    contatos () {
      return this.$store.state.contatos
    }
  },
  mounted () {
    this.$axios.$get('/contatos')
      .then((data) => {
        this.$store.commit('setContatos', data)
      })
      .catch(() =>
        this.$swal({
          icon: 'error',
          text: 'Ocorreu um erro ao listar'
        })
      )
  },
  methods: {
    editar (contato) {
      this.$store.commit('selecionarContato', contato)
    },
    excluir (contato) {
      this.$store.commit('excluirContato', contato)
    }
  }
}
</script>
