<template>
  <div class="coupon-scan">
    <CouponDetailSectionTitle
      class="coupon-scan__section-title"
      :coupon-detail-section-title="'店員さんのQRコードを読み取って下さい'"
    />
    <div>
      <p class="error">{{ error }}</p>

      <p class="decode-result">
        Last result: <b>{{ result }}</b>
      </p>

      <qrcode-stream @decode="onDecode" @init="onInit" :camera="camera"/>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const usersRef = db.collection('users')

export default {
  data() {
    return {
      result: '',
      error: '',
      camera: 'front'
    }
  },
  methods: {
    onDecode(result) {
      let wendyLocal = localStorage.getItem('wendy')
      const user = JSON.parse(wendyLocal).auth.login_user
      if (user) {
        this.result = result
        console.log(resutlt);
        console.log(this.$route.query.start);
        console.log(this.$route.query.end);
        console.log(this.$route.query.title);
        console.log(user.uid);

        const title = this.$route.query.title
        const start = this.$route.query.start
        const end = this.$route.query.end

        usersRef
        .doc(user.uid)
        .collection('visited_articles')
        .doc(resutlt)
        .set({
          article_id: resutlt,
          ref: db.doc('articles/' + resutlt),
          create_time: FieldValue.serverTimestamp(),
          used_coupon_title: title,
          used_coupon_start: start,
          used_coupon_end: end
        })

        // this.$router.push({ name: "index" });

      } else {
        alert('ログインしてください')
      }
    },

    async onInit(promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permisson'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.coupon-scan {
  &__section-title {
    padding: 3.2rem 0;
  }
}
</style>

