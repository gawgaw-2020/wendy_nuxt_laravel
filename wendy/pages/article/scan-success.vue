<template>
  <div class="coupon-scan-success">
    <div class="result-modal">
      <div class="result-modal__inner animate__animated animate__fadeIn">
        <div class="result-modal__content-wrapper">
          <p class="result-modal__icon"><i class="fas fa-check"></i></p>
          <p class="result-modal__title">読み取りが完了しました。</p>
          <p class="result-modal__message">どうぞごゆっくりお食事をお楽しみ下さい。</p>
          <button class="result-modal__btn btn btn-secondary" @click="$router.push('/')">TOPページへ</button>
        </div>
      </div>
      <div class="result-modal__background animate__animated animate__fadeIn"></div>
    </div>
  </div>
</template>

<script>

export default {
  head() {
    return {
      title: '読み取り完了'
    }
  },
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped>
.result-modal {
  text-align: center;
  color: #fff;
  &__inner{
    padding: 5rem 0 0;
    border-radius: 20px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    width: 85%;
    height: 70vh;
    background: transparent linear-gradient(180deg, #ff427a 0%, #EAE5E6 300%) 0% 0% no-repeat padding-box;
    opacity: 1;
    z-index: 10000;
  }
  &__background{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.8);
    z-index: 9999;
  }
  &__content-wrapper {
    width: 85%;
    margin: 0 auto;
    font-weight: bold;
  }
  &__icon {
    font-size: 8.5rem;
  }
  &__title {
    font-size: 2rem;
    margin-bottom: 3.2rem;
  }
  &__message {
    text-align: left;
    margin-bottom: 8.8rem;
  }
  &__btn {
    width: 100%;
  }
}


</style>

