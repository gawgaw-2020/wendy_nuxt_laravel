import firebase from '../plugins/firebase'

const db = firebase.firestore()
const articlesRef = db.collection('articles')

export const state = () => ({
  allArticles: [],
})

export const mutations = {
  setAllArticles(state, allArticles) {
    state.allArticles.splice(0)
    state.allArticles.push(...allArticles)
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
  }

}

export const getters = {
  allArticles: state => state.allArticles,
}
