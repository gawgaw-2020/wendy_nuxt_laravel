import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const suspendedArticlesRef = db.collection('suspended_articles')
const articlesRef = db.collection('articles')

export const state = () => ({

})

export const mutations = {

}

export const actions = {
  async updateCoupon({ commit }, payload) {
    await firebase.firestore().doc(`suspended_articles/${payload.article_id}`).get()
    .then(async (doc) => {
      if(doc.exists) {
        await firebase.firestore().doc(`suspended_articles/${payload.article_id}`).collection('coupons')
        .doc(payload.coupon_id).update(payload)
      } else {
        await firebase.firestore().doc(`articles/${payload.article_id}`).collection('coupons')
        .doc(payload.coupon_id).update(payload)
      }
    })
    alert('登録しました')
    location.reload()
  },
  async updateLinks({ commit }, payload) {
    const updateLinks = {
      url_gnavi: payload.url_gnavi,
      url_hotpepper: payload.url_hotpepper,
      url_instagram: payload.url_instagram,
      url_official: payload.url_official,
      url_tabelog: payload.url_tabelog,
      url_twitter: payload.url_twitter,
    }
    await firebase.firestore().doc(`suspended_articles/${payload.store_id}`).get()
    .then(async (doc) => {
      if(doc.exists) {
        await firebase.firestore().doc(`suspended_articles/${payload.store_id}`).update(updateLinks)
      } else {
        await firebase.firestore().doc(`articles/${payload.store_id}`).update(updateLinks)
      }
    })
    alert('登録しました')
    location.reload()
  },
  async suspendPublication({ commit }, payload) {
    const batch = db.batch();

    batch.delete(db.collection("articles").doc(payload.storeData.store_id).collection('coupons').doc('oso-lunch'))
    batch.delete(db.collection("articles").doc(payload.storeData.store_id).collection('coupons').doc('haya-dinner'))
    batch.delete(db.collection("articles").doc(payload.storeData.store_id).collection('coupons').doc('oso-dinner'))
    const articlesRef = db.collection("articles").doc(payload.storeData.store_id);
    batch.delete(articlesRef);

    const suspendedArticlesRef = db.collection("suspended_articles").doc(payload.storeData.store_id)
    batch.set(suspendedArticlesRef, payload.storeData)
    const osoLunchRef = db.collection("suspended_articles").doc(payload.storeData.store_id).collection('coupons').doc('oso-lunch')
    batch.set(osoLunchRef, payload.osoLunchData)
    const hayaDinnerRef = db.collection("suspended_articles").doc(payload.storeData.store_id).collection('coupons').doc('haya-dinner')
    batch.set(hayaDinnerRef, payload.hayaDinnerData)
    const osoDinnerRef = db.collection("suspended_articles").doc(payload.storeData.store_id).collection('coupons').doc('oso-dinner')
    batch.set(osoDinnerRef, payload.osoDinnerData)

    await batch.commit()
    location.reload()
  },
  async resumePublication({ commit }, payload) {
    const batch = db.batch();

    batch.delete(db.collection("suspended_articles").doc(payload.storeData.store_id).collection('coupons').doc('oso-lunch'))
    batch.delete(db.collection("suspended_articles").doc(payload.storeData.store_id).collection('coupons').doc('haya-dinner'))
    batch.delete(db.collection("suspended_articles").doc(payload.storeData.store_id).collection('coupons').doc('oso-dinner'))
    const suspendedArticlesRef = db.collection("suspended_articles").doc(payload.storeData.store_id);
    batch.delete(suspendedArticlesRef);

    const articlesRef = db.collection("articles").doc(payload.storeData.store_id)
    batch.set(articlesRef, payload.storeData)
    const osoLunchRef = db.collection("articles").doc(payload.storeData.store_id).collection('coupons').doc('oso-lunch')
    batch.set(osoLunchRef, payload.osoLunchData)
    const hayaDinnerRef = db.collection("articles").doc(payload.storeData.store_id).collection('coupons').doc('haya-dinner')
    batch.set(hayaDinnerRef, payload.hayaDinnerData)
    const osoDinnerRef = db.collection("articles").doc(payload.storeData.store_id).collection('coupons').doc('oso-dinner')
    batch.set(osoDinnerRef, payload.osoDinnerData)

    await batch.commit()
    location.reload()
  },
  async suspendCoupon({ commit }, payload) {
    let targetField = ''
    if(payload.targetTime === 'oso-lunch') {
      targetField = 'coupon_oso_lunch_active'
    }
    if(payload.targetTime === 'haya-dinner') {
      targetField = 'coupon_haya_dinner_active'
    }
    if(payload.targetTime === 'oso-dinner') {
      targetField = 'coupon_oso_dinner_active'
    }

    await suspendedArticlesRef.doc(payload.storeData.store_id).get()
    .then(async function(doc) {
      if(doc.exists) {
        suspendedArticlesRef.doc(payload.storeData.store_id)
        .update({
          [targetField]: false
        })
        suspendedArticlesRef.doc(payload.storeData.store_id).collection('coupons').doc(payload.targetTime)
        .update({
          active: false
        })
        .then(() => {
          location.reload()
        })
      } else {
        articlesRef.doc(payload.storeData.store_id).get()
        .then(async (doc) => {
          articlesRef.doc(payload.storeData.store_id)
          .update({
            [targetField]: false
          })
          articlesRef.doc(payload.storeData.store_id).collection('coupons').doc(payload.targetTime)
          .update({
            active: false
          })
          .then(() => {
            location.reload()
          })
        })
      }
    })
  },
  resumeCoupon({ commit }, payload) {
    let targetField = ''
    if(payload.targetTime === 'oso-lunch') {
      targetField = 'coupon_oso_lunch_active'
    }
    if(payload.targetTime === 'haya-dinner') {
      targetField = 'coupon_haya_dinner_active'
    }
    if(payload.targetTime === 'oso-dinner') {
      targetField = 'coupon_oso_dinner_active'
    }

    suspendedArticlesRef.doc(payload.storeData.store_id).get()
    .then(async function(doc) {
      if(doc.exists) {
        suspendedArticlesRef.doc(payload.storeData.store_id)
        .update({
          [targetField]: true
        })
        suspendedArticlesRef.doc(payload.storeData.store_id).collection('coupons').doc(payload.targetTime)
        .update({
          active: true
        })
        .then(() => {
          location.reload()
        })
      } else {
        articlesRef.doc(payload.storeData.store_id).get()
        .then(async (doc) => {
          articlesRef.doc(payload.storeData.store_id)
          .update({
            [targetField]: true
          })
          articlesRef.doc(payload.storeData.store_id).collection('coupons').doc(payload.targetTime)
          .update({
            active: true
          })
          .then(() => {
            location.reload()
          })
        })
      }
    })
  }
}

export const getters = {
}

