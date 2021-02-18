import firebase from '~/plugins/firebase'

export const state = () => ({
  linePosition: ''
})

export const mutations = {
  setLinePositionState(state, position) {
    state.linePosition = position
  }
}

export const actions = {

  setLinePosition({ commit }, position) {
    $nuxt.$router.push(`/user/mypage-${position}`)
    setTimeout(() => {
      commit('setLinePositionState', position)
    }, 80);
  }
}

export const getters = {
  linePosition: state => state.linePosition
}

