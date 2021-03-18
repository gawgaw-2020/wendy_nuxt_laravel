import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const suspendedArticlesRef = db.collection('suspended_articles')

export const state = () => ({

})

export const mutations = {

}

export const actions = {
  updateLinks({ commit }, payload) {
    console.log(payload.tell);
    firebase.firestore().doc(`suspended_articles/${payload.store_id}`).update({
      url_gnavi: payload.url_gnavi,
      url_hotpepper: payload.url_hotpepper,
      url_instagram: payload.url_instagram,
      url_official: payload.url_official,
      url_tabelog: payload.url_tabelog,
      url_twitter: payload.url_twitter,
    })
  }
}

export const getters = {
}

