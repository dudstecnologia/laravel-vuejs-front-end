<template>
  <b-form class="mt-3" inline @submit="onSubmit" @reset="onReset">
    <b-input v-model="form.nome" class="mb-2 mr-2" placeholder="Nome *" required />
    <b-input v-model="form.telefone" class="mb-2 mr-2" placeholder="Telefone *" required />
    <b-input v-model="form.idade" class="mb-2 mr-2" placeholder="Idade *" required />

    <b-button class="mr-2" type="submit" variant="info">
      Salvar
    </b-button>
    <b-button type="reset" variant="danger">
      Limpar
    </b-button>
  </b-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        nome: '',
        telefone: '',
        idade: ''
      }
    }
  },
  computed: {
    selecionado () {
      return this.$store.state.selecionado
    }
  },
  watch: {
    selecionado (value) {
      this.form = Object.assign({}, value)
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$axios({ method: this.getMetodo(), url: this.getUrl(), data: this.form })
        .then(({ data }) => {
          this.$swal({
            icon: 'success',
            text: 'Contato salvo com sucesso'
          })
          this.contatoStore(data)
          this.onReset()
        })
        .catch(() =>
          this.$swal({
            icon: 'error',
            text: 'Ocorreu um erro ao salvar'
          })
        )
    },
    contatoStore (contato) {
      if (this.selecionado) {
        this.$store.commit('atualizarContato', contato)
      } else {
        this.$store.commit('addContato', contato)
      }
    },
    getMetodo () {
      return this.selecionado ? 'put' : 'post'
    },
    getUrl () {
      return this.selecionado ? `/contatos/${this.selecionado.id}` : '/contatos'
    },
    onReset () {
      this.$store.commit('selecionarContato', null)
      this.form = {
        nome: '',
        telefone: '',
        idade: ''
      }
    }
  }
}
</script>
