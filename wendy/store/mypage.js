import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const articlesRef = db.collection('articles')
const usersRef = db.collection('users')

export const state = () => ({
  linePosition: 'login',
  favoriteArticles: [],
  historyArticles: []
})

export const mutations = {
  setLinePositionState(state, position) {
    state.linePosition = position
  },
  deleteLinePositionState(state) {
    state.linePosition = ''
  },
  setFavoriteArticles(state, favoriteArticles) {
    state.favoriteArticles.splice(0)
    state.favoriteArticles.push(...favoriteArticles)
  },
  setHistoryArticles(state, historyArticles) {
    state.historyArticles.splice(0)
    state.historyArticles.push(...historyArticles)
  }
}

export const actions = {

  setLinePosition({ commit }, position) {
    $nuxt.$router.push(`/user/mypage-${position}`)
    setTimeout(() => {
      commit('setLinePositionState', position)
    }, 80);
  },

  getFavoriteArticles({ commit }) {
    let wendyLocal = localStorage.getItem('wendy')
    const user = JSON.parse(wendyLocal).auth.login_user
    if (user) {
      usersRef.doc(`${user.uid}`).collection('favorite_articles').get()
      .then(function(querySnapshot) {
        
        let i = querySnapshot.size
        let favoriteArticles = [];
        let articleCount = 0;

        if(i === 0) {
          commit('setFavoriteArticles', [])
        }
        
        querySnapshot.forEach(async doc => {
  
            const addData = {
              store_name: '',
              store_category: '',
              nearest_station: '',
              store_small_text: '',
              store_main_image: '',
              store_id: ''
            }
  
            favoriteArticles.push(addData)
  
            const articleSnapshot = await doc.data().ref.get();
            favoriteArticles[articleCount].store_name = articleSnapshot.get('store_name')
            favoriteArticles[articleCount].store_category = articleSnapshot.get('store_category')
            favoriteArticles[articleCount].nearest_station = articleSnapshot.get('nearest_station')
            favoriteArticles[articleCount].store_small_text = articleSnapshot.get('store_small_text')
            favoriteArticles[articleCount].store_main_image = articleSnapshot.get('store_main_image')
            favoriteArticles[articleCount].store_id = articleSnapshot.get('store_id')
            articleCount++
  
            i--
            if (i == 0) {
              commit('setFavoriteArticles', favoriteArticles)
            }  
        });
      })
    }
  },
  getHistoryArticles({ commit }) {
    let wendyLocal = localStorage.getItem('wendy')
    const user = JSON.parse(wendyLocal).auth.login_user
    if (user) {
      usersRef.doc(`${user.uid}`).collection('visited_articles').get()
      .then(function(querySnapshot) {
  
        let i = querySnapshot.size
        let historyArticles = [];
        let articleCount = 0;

        if(i === 0) {
          commit('setHistoryArticles', [])
        }

  
        querySnapshot.forEach(async doc => {
    
          const addData = {
            used_coupon_title: doc.data().used_coupon_title,
            used_coupon_start: doc.data().used_coupon_start,
            used_coupon_end: doc.data().used_coupon_end,
            create_time: doc.data().create_time.toDate(),
            article_id: doc.data().article_id
          }

          historyArticles.push(addData)

          // 名前だけreferenceする
          const articleSnapshot = await doc.data().ref.get();
          historyArticles[articleCount].store_name = articleSnapshot.get('store_name')
          articleCount++

          i--
          if (i == 0) {
            commit('setHistoryArticles', historyArticles)
          }  
        });
      })
    }
  }
}

export const getters = {
  linePosition: state => state.linePosition
}

