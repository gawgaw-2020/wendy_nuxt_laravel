import firebase from '../plugins/firebase'

const db = firebase.firestore()
const articlesRef = db.collection('articles')

export const state = () => ({
  allArticles: [],
  searchedArticles: []
})

export const mutations = {
  setAllArticles(state, allArticles) {
    state.allArticles.splice(0)
    state.allArticles.push(...allArticles)
  },
  setSearchedArticles(state, searchedArticles) {
    state.searchedArticles.splice(0)
    state.searchedArticles.push(...searchedArticles)
  }
}

export const actions = {

  async getAllArticles({ commit }) {
    await articlesRef.get()
    .then(snapshot => {

      let i = snapshot.size
      let allArticlesData = []
      snapshot.forEach(async (doc) => {
        let id = {}
        let coupon_id = {}
        let storeData = {}
        let coupons = []
        id.id = doc.id
        storeData = { ...id, ...doc.data() }

        const subCollection = await doc.ref.collection('coupons').orderBy('start').get()
        subCollection.forEach(doc => {
          coupon_id.coupon_id = doc.id
          const couponData = { ...coupon_id, ...doc.data() }
          coupons.push(couponData)
        })

        storeData['coupons'] = coupons
        allArticlesData.push(storeData)
        
        i--
        if (i == 0) {
          commit('setAllArticles', allArticlesData)
        }
      })
    })
  },
  async getSearchedArticles({ commit }, payload) {
    await articlesRef
    .where("area", "==", payload.selectedArea)
    .where(payload.selectedTime, "==", true)
    .get()
    .then(snapshot => {

      let i = snapshot.size
      let searchedArticlesData = []
      if(i === 0) {
        commit('setSearchedArticles', [])
      }
      snapshot.forEach(async (doc) => {
        let id = {}
        let coupon_id = {}
        let storeData = {}
        let coupons = []
        id.id = doc.id
        storeData = { ...id, ...doc.data() }

        const subCollection = await doc.ref.collection('coupons').orderBy('start').get()
        subCollection.forEach(doc => {
          coupon_id.coupon_id = doc.id
          const couponData = { ...coupon_id, ...doc.data() }
          coupons.push(couponData)
        })

        storeData['coupons'] = coupons
        searchedArticlesData.push(storeData)
        
        i--
        if (i == 0) {
          commit('setSearchedArticles', searchedArticlesData)
        }
      })
    })
  }

}

export const getters = {
  allArticles: state => state.allArticles,
  searchedArticles: state => state.searchedArticles,
}
