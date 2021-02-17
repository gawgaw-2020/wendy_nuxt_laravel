import firebase from '~/plugins/firebase'

export const state = () => ({
  boxPosition: ''
})

export const mutations = {
  setBoxPositionState(state, position) {
    state.boxPosition = position
  }
}

export const actions = {

  setBoxPosition({ commit }, position) {
    localStorage.setItem('boxPosition', position);
    $nuxt.$router.push(`/login/${position}`)
    setTimeout(() => {
      commit('setBoxPositionState', position)
    }, 80);
  }
}

export const getters = {
  boxPosition: state => state.boxPosition
}

