//firebaseの初期化の部分のインストール
import firebase from '../plugins/firebase'
//firestoreのアクション部分のパッケージをインストールする
import { firestoreAction } from 'vuexfire'

//firebaseのDBを定義する
const db = firebase.firestore()
const commentsRef = db.collection('comments')

//ここでstateを定義する。今回使うdbであるcommentsを配列で格納する
export const state = () => ({
  comments: []
})

export const actions = {
  //initは初期化
  //ここでどのデータをバインド（=関連付けするか）を書く
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('comments', commentsRef)
  }),
  add: firestoreAction((context, {index, name}) => {
    //ここでindexが空白でないことを確認している。
    if (index.trim()) {
      commentsRef.add({
        name: name,
        index: index,
        //ここでサーバーから時刻を取得する。ローカルからだとユーザーが時刻を変更できてしまうので、サーバーから取得する
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  })
}

//以下の部分はlodashをインポートすることにより使っています。（詳細は後述）
export const getters = {
  orderdComments: state => {
    return _.sortBy(state.comments, 'created')
  }
}
