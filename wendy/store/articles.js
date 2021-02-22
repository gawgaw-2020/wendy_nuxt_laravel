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
    let allArticlesData = []
    await articlesRef.get()
    .then(snapshot => {
      snapshot.forEach(async(doc) => {
        let id = {}
        let coupon_id = {}
        let storeData = {}
        let coupons = []
        id.id = doc.id
        storeData = {...id, ...doc.data()}
        const subCollection = await doc.ref.collection('coupons').orderBy('coupon_start').get();
        
        subCollection.forEach(doc => {
          coupon_id.coupon_id = doc.id
          const couponData = { ...coupon_id, ...doc.data() }
          coupons.push(couponData)
        });
        
        storeData['coupons'] = coupons
        console.log(storeData);
        allArticlesData.push(storeData)
      })
    })
    console.log(allArticlesData);
    await commit('setAllArticles', allArticlesData)
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
