import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const articlesRef = db.collection('articles')
const usersRef = db.collection('users')

export const state = () => ({
  linePosition: '',
  favoriteArticles: []
})

export const mutations = {
  setLinePositionState(state, position) {
    state.linePosition = position
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

  getFavoriteArticles({ commit }, user) {
    console.log('start');
    console.log(user.uid);
    // let wendyLocal = localStorage.getItem('wendy')
    // console.log(JSON.parse(wendyLocal).auth.login_user.uid);

    usersRef.doc(`${user.uid}`).collection('favorite_articles').get()
    .then(function(querySnapshot) {

      let i = querySnapshot.size
      let favoriteArticles = [];
      let articleCount = 0;

      querySnapshot.forEach(async doc => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

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

          console.log(favoriteArticles);

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

export const getters = {
  linePosition: state => state.linePosition
}

