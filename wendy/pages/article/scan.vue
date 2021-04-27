<template>
  <div class="coupon-scan">
    <CouponDetailSectionTitle
      class="coupon-scan__section-title"
      :coupon-detail-section-title="'店員さんのQRコードを読み取って下さい'"
    />
    <div class="coupon-scan__window">
      <qrcode-stream @decode="onDecode" @init="onInit"/>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const usersRef = db.collection('users')

export default {
  head() {
    return {
      title: '店舗QR読み取り'
    }
  },
  data() {
    return {
      result: '',
      error: '',
    }
  },
  methods: {
    onDecode(result) {
      let wendyLocal = localStorage.getItem('wendy')
      const user = JSON.parse(wendyLocal).auth.login_user

      if(result) {

        if (user) {
          this.result = result
  
          const title = this.$route.query.title
          const start = this.$route.query.start
          const end = this.$route.query.end
          const id = this.$route.query.article_id

          if(id !== result) {
            alert('読み取りエラー：店舗が違います')
            return
          }
  
          usersRef
          .doc(user.uid)
          .collection('visited_articles')
          .add({
            article_id: result,
            ref: db.doc('articles/' + result),
            create_time: firebase.firestore.FieldValue.serverTimestamp(),
            used_coupon_title: title,
            used_coupon_start: start,
            used_coupon_end: end
          })
          .then(() => {
            this.$router.push({ name: "article-scan-success" });
          })
  
  
        } else {
          alert('ログインしてください')
        }

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
  },
  mounted() {
    const video = document.querySelector('.qrcode-stream-camera')
    video.style.borderRadius = "20px"
  },
}
</script>

<style lang="scss" scoped>
.coupon-scan {
  &__section-title {
    padding: 3.2rem 0;
  }
  &__window {
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }
}
</style>

