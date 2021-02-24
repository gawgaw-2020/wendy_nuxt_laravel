import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const articlesRef = db.collection('articles')
const usersRef = db.collection('users')

export const state = () => ({
  linePosition: 'login',
  favoriteArticles: []
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
  
        querySnapshot.forEach(async doc => {
  
            const addData = {
              store_name: '',
              store_category: '',
              store_area: '',
              store_small_text: ''
            }
  
            favoriteArticles.push(addData)
  
            const articleSnapshot = await doc.data().ref.get();
            favoriteArticles[articleCount].store_name = articleSnapshot.get('store_name')
            favoriteArticles[articleCount].store_category = articleSnapshot.get('store_category')
            favoriteArticles[articleCount].store_area = articleSnapshot.get('store_area')
            favoriteArticles[articleCount].store_small_text = articleSnapshot.get('store_small_text')
            articleCount++
  
            i--
            if (i == 0) {
              commit('setFavoriteArticles', favoriteArticles)
            }  
        });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    }
  }
}

export const getters = {
  linePosition: state => state.linePosition
}

