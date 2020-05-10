<template>
  <div>
    <b-navbar type="dark" variant="primary">
      <b-navbar-nav class="container">
        <b-nav-item href="#" active>
          Contatos
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div class="container">
      <form-contato />
      <table-contato />
    </div>
  </div>
</template>

<script>
import FormContato from '~/components/FormContato.vue'
import TableContato from '~/components/TableContato.vue'

export default {
  components: {
    FormContato,
    TableContato
  }
}
</script>
