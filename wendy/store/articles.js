import firebase from '../plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const articlesRef = db.collection('articles')

export const state = () => ({
  allArticles: [],
  article: null
})

export const mutations = {
  setAllArticles(state, allArticles) {
    state.allArticles = allArticles
  },
  setArticle(state, articleData) {
    state.article = articleData
  }
}

export const actions = {

  async getAllArticles({ commit }) {
    let data = []
    let id = {}
    await articlesRef.get()
    .then(snapshot => {
      snapshot.forEach((doc) => {
        id.id = doc.id
        const allData = {...id, ...doc.data()}
        data.push(allData)
      })
    })
    const allArticlesData = data
    commit('setAllArticles', allArticlesData)
  },

  async getArticleById({ commit }, payload) {
    let data
    await articlesRef.doc(`${payload.articleId}`).get()
    .then(function(doc) {
      data = doc.data()
    })
    const articleData = data
    commit('setArticle', articleData)
  }

}
