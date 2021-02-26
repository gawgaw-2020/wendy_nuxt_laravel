<template>
  <p class="coupon-detail-section-title">{{ CouponDetailSectionTitle }}</p>
</template>

<script>
export default {
  props: [
    'CouponDetailSectionTitle'
  ]
}
</script>

<style lang="scss" scoped>
.coupon-detail-section-title {
  color: #ff427a;
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
}

</style>