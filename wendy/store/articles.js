//firebaseの初期化の部分のインストール
import firebase from '../plugins/firebase'
//firestoreのアクション部分のパッケージをインストールする
import { firestoreAction } from 'vuexfire'

//firebaseのDBを定義する
const db = firebase.firestore()
const articlesRef = db.collection('articles')

//ここでstateを定義する。今回使うdbであるarticlesを配列で格納する
export const state = () => ({
  articles: [],
  articlesAarea: [],
  article: {
    store_name: '',
    store_id: '',
    store_area: ''
  }
})

export const mutations = {
}

export const actions = {
  //initは初期化
  //ここでどのデータをバインド（=関連付けするか）を書く
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('articles', articlesRef)
  }),
  getArticleById: firestoreAction(({ bindFirestoreRef }, payload) => {
    bindFirestoreRef('article', articlesRef.doc(`${payload.articleId}`))
  }),
  getArticlesAarea: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('articlesAarea', articlesRef.where("store_area", "==", "A"))
  }),

}
