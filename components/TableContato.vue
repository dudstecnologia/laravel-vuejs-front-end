<template>
  <div class="mt-3">
    <b-table bordered head-variant="light" :busy="carregando" :items="contatos" :fields="cabecalho">
      <template v-slot:cell(action)="data">
        <b-button size="sm" variant="info" @click="editar(data.item)">
          Editar
        </b-button>
        <b-button size="sm" variant="danger" @click="confirmaExclusao(data.item)">
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
    this.buscarContatos()
  },
  methods: {
    buscarContatos () {
      this.carregando = true
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
        .then(() => {
          this.carregando = false
        })
    },
    editar (contato) {
      this.$store.commit('selecionarContato', contato)
    },
    confirmaExclusao (contato) {
      this.$swal({
        text: 'Deseja mesmo excluir este contato?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      }).then((result) => {
        if (result.value) {
          this.excluir(contato)
        }
      })
    },
    excluir (contato) {
      this.$axios.$delete(`/contatos/${contato.id}`)
        .then((data) => {
          this.$store.commit('excluirContato', contato)
          this.$swal({
            icon: 'success',
            text: 'Contato excluído com sucesso'
          })
        })
        .catch(() => {
          this.$swal({
            icon: 'error',
            text: 'Ocorreu um erro ao excluir'
          })
        })
    }
  }
}
</script>
