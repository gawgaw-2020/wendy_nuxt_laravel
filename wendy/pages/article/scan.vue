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

      <qrcode-stream @decode="onDecode" @init="onInit" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: '',
      error: ''
    }
  },
  methods: {
    onDecode(result) {
      this.result = result
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

