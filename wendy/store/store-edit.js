import firebase from '~/plugins/firebase'

const db = firebase.firestore()

export const state = () => ({

})

export const mutations = {

}

export const actions = {
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
        await doc.update(updateLinks)
      } else {
        await firebase.firestore().doc(`articles/${payload.store_id}`).update(updateLinks)
      }
    })
    alert('登録しました')
    location.reload()
  },
  suspendPublication({ commit }, payload) {
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

    batch.commit()
    location.reload()
  },
  resumePublication({ commit }, payload) {
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

    batch.commit()
    location.reload()
  }
}

export const getters = {
}

