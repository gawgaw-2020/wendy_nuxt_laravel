import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const articlesRef = db.collection('suspended_articles')

export const state = () => ({
  login_store: null,
  storeAuthenticated: false
})

export const mutations = {
  setLoginStore(state, store) {
    state.login_store = store
    state.storeAuthenticated = true
  },
  deleteLoginStore(state) {
    state.login_store = null
    state.storeAuthenticated = false
  }
}

export const actions = {

  async firebaseLogin({ commit }, payload) {
    await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
  },
  async firebaseSignUp({ commit }, payload) {
    await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then((res) => {
      firebase.firestore().doc(`suspended_articles/${res.user.uid}`).set({
        store_id: res.user.uid,
        email: payload.email,
        tell: payload.tell,
        name_kana: payload.name_kana,
        published: false,
        access_count: 0,
        area: payload.area,
        name: payload.name,
        address: payload.address,
        nearest_station: payload.nearest_station,
        business_hour: '営業時間を入力してください',
        cashless: false,
        non_smoke: false,
        category: '料理カテゴリー',
        credit_card: '対応しているクレジットカードを入力してください',
        e_money: '対応している電子マネーを入力してください',
        main_image: '/img/coupon-image-sample/coupon_image-sample10.jpg',
        main_text: 'お店の紹介文を入力してください',
        pictures: [
          '/img/slide-sample01.jpg',
          '/img/slide-sample02.jpg',
          '/img/slide-sample03.jpg'
        ],
        small_text: '見出し用の紹介文を入力して下さい',
        url_gnavi: '',
        url_hotpepper: '',
        url_instagram: '',
        url_official: '',
        url_tabelog: '',
        url_twitter: '',
        food01_name: 'おすすめフードその１',
        food01_price: 1980,
        food02_name: 'おすすめフードその２',
        food02_price: 1450,
        food03_name: 'おすすめフードその３',
        food03_price: 1280,
        food04_name: 'おすすめフードその４',
        food04_price: 980,
        food05_name: 'おすすめフードその５',
        food05_price: 300,
        drink01_name: 'おすすめドリンクその１',
        drink01_price: 450,
        drink02_name: 'おすすめドリンクその２',
        drink02_price: 300,
        drink03_name: 'おすすめドリンクその３',
        drink03_price: 400,
        coupon_oso_lunch_active: true,
        coupon_haya_dinner_active: true,
        coupon_oso_dinner_active: true,
        favorite_counter: 0,
        create_time: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then((docRef) => {
        console.log("Document written with ID: ", res.user.uid);
        articlesRef.doc(res.user.uid).collection('coupons').doc('oso-lunch').set({
          active: true,
          article_id: res.user.uid,
          category: '遅ランチ',
          end: '16:30',
          start: '14:00',
          title: 'クーポンのタイトルを入力してください',
          information: '当日でも使えますが、予約をしていただけると嬉しいです！',
          rule: '席利用２時間まで',
          how_to_use: '予約時・来店時・注文時・会計時に掲示',
          discount_rate : 50,
          normal_price: 1800,
          image: '/img/coupon-image-sample/coupon_image-sample10.jpg',
        })
        articlesRef.doc(res.user.uid).collection('coupons').doc('haya-dinner').set({
          active: true,
          article_id: res.user.uid,
          category: '早ディナー',
          end: '17:30',
          start: '18:00',
          title: 'クーポンのタイトルを入力してください',
          information: '当日でも使えますが、予約をしていただけると嬉しいです！',
          rule: '席利用２時間まで',
          how_to_use: '予約時・来店時・注文時・会計時に掲示',
          discount_rate : 50,
          normal_price: 1800,
          image: '/img/coupon-image-sample/coupon_image-sample10.jpg',
        })
        articlesRef.doc(res.user.uid).collection('coupons').doc('oso-dinner').set({
          active: true,
          article_id: res.user.uid,
          category: '遅ディナー',
          end: '22:30',
          start: '21:00',
          title: 'クーポンのタイトルを入力してください',
          information: '当日でも使えますが、予約をしていただけると嬉しいです！',
          rule: '席利用２時間まで',
          how_to_use: '予約時・来店時・注文時・会計時に掲示',
          discount_rate : 50,
          normal_price: 1800,
          image: '/img/coupon-image-sample/coupon_image-sample10.jpg',
        })
      })
    })
  },


  logout() {
    firebase.auth().signOut()
  }
}

export const getters = {
  storeName: state => state.login_store ? state.login_store.store_name :'',
  loginStore: state => state.login_store ? state.login_store :'',
}

