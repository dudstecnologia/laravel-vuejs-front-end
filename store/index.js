export const state = () => ({
  contatos: [],
  selecionado: null
})

export const mutations = {
  setContatos (state, value) {
    state.contatos = value
  },
  addContato (state, value) {
    state.contatos.push(value)
  },
  atualizarContato (state, value) {
    const index = state.contatos.findIndex(c => c.id === value.id)
    state.contatos.splice(index, 1, value)
  },
  selecionarContato (state, value) {
    state.selecionado = value
  },
  excluirContato (state, value) {
    state.contatos.splice(state.contatos.indexOf(value), 1)
  }
}
