import firebase from '../plugins/firebase'

const db = firebase.firestore()
const articlesRef = db.collection('articles')

export const state = () => ({
  lastVisible: 'null',
  allArticles: [],
  osoLunchArticles: [],
  hayaDinnerArticles: [],
  osoDinnerArticles: [],
  searchedArticles: [],
})

export const mutations = {
  setLastVisible(state, lastVisible) {
    state.lastVisible = lastVisible
  },
  setAllArticles(state, allArticles) {
    state.allArticles.splice(0)
    state.allArticles.push(...allArticles)
  },
  setAddAllArticles(state, allArticles) {
    state.allArticles.push(...allArticles)
  },
  setOsoLunchArticles(state, osoLunchArticles) {
    state.osoLunchArticles.splice(0)
    state.osoLunchArticles.push(...osoLunchArticles)
  },
  setHayaDinnerArticles(state, hayaDinnerArticles) {
    state.hayaDinnerArticles.splice(0)
    state.hayaDinnerArticles.push(...hayaDinnerArticles)
  },
  setOsoDinnerArticles(state, osoDinnerArticles) {
    state.osoDinnerArticles.splice(0)
    state.osoDinnerArticles.push(...osoDinnerArticles)
  },
  setSearchedArticles(state, searchedArticles) {
    state.searchedArticles.splice(0)
    state.searchedArticles.push(...searchedArticles)
  }
}

export const actions = {

  async getAllArticles({ commit }) {
    await articlesRef
    .orderBy("create_time", 'desc')
    .limit(4)
    .get()
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
          const lastVisible = doc.data()
          commit('setLastVisible', lastVisible)
          commit('setAllArticles', allArticlesData)
        }
      })
    })
  },
  async addAllArticles({ commit, state },) {
    const last = state.lastVisible
    await articlesRef
    .orderBy("create_time", 'desc')
    .startAfter(last.create_time)
    .limit(4)
    .get()
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
          const lastVisible = doc.data()
          commit('setLastVisible', lastVisible)
          commit('setAddAllArticles', allArticlesData)
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
  },
  async getOsoLunchArticles({ commit }, payload) {
    await articlesRef
    .where('coupon_oso_lunch_active', "==", true)
    .limit(6).get()
    .then(snapshot => {

      let i = snapshot.size
      let osoLunchArticlesData = []
      if(i === 0) {
        commit('setOsoLunchArticles', [])
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
        osoLunchArticlesData.push(storeData)
        
        i--
        if (i == 0) {
          commit('setOsoLunchArticles', osoLunchArticlesData)
        }
      })
    })
  },
  async getHayaDinnerArticles({ commit }, payload) {
    await articlesRef
    .where('coupon_haya_dinner_active', "==", true)
    .limit(6).get()
    .then(snapshot => {

      let i = snapshot.size
      let hayaDinnerArticlesData = []
      if(i === 0) {
        commit('setHayaDinnerArticles', [])
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
        hayaDinnerArticlesData.push(storeData)
        
        i--
        if (i == 0) {
          commit('setHayaDinnerArticles', hayaDinnerArticlesData)
        }
      })
    })
  },
  async getOsoDinnerArticles({ commit }, payload) {
    await articlesRef
    .where('coupon_oso_dinner_active', "==", true)
    .limit(6).get()
    .then(snapshot => {

      let i = snapshot.size
      let osoDinnerArticlesData = []
      if(i === 0) {
        commit('setOsoDinnerArticles', [])
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
        osoDinnerArticlesData.push(storeData)
        
        i--
        if (i == 0) {
          commit('setOsoDinnerArticles', osoDinnerArticlesData)
        }
      })
    })
  },

}

export const getters = {
  allArticles: state => state.allArticles,
  osoLunchArticles: state => state.osoLunchArticles,
  hayaDinnerArticles: state => state.hayaDinnerArticles,
  osoDinnerArticles: state => state.osoDinnerArticles,
  searchedArticles: state => state.searchedArticles,
}
