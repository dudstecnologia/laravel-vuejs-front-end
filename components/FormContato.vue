<template>
  <b-form class="mt-3" inline @submit="onSubmit" @reset="onReset">
    <b-input id="nome" v-model="form.nome" class="mb-2 mr-2" placeholder="Nome *" required />
    <b-input id="telefone" v-model="form.telefone" class="mb-2 mr-2" placeholder="Telefone *" required />
    <b-input id="idade" v-model="form.idade" class="mb-2 mr-2" placeholder="Idade *" required />

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
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset (evt) {
      evt.preventDefault()
      this.form = {
        nome: '',
        telefone: '',
        idade: ''
      }
    }
  }
}
</script>
