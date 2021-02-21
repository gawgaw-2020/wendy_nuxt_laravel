<template>
  <div>
    <swiper
      :options="swiperOption">
      <swiper-slide class="swiper-slide" v-for="(storePicture, index) in storePictures" :key="index">
        <img :src="storePicture" alt="">
      </swiper-slide>
      <div slot="button-prev" class="swiper-button swiper-button-prev"><i class="fas fa-angle-left"></i></div>
      <div slot="button-next" class="swiper-button swiper-button-next"><i class="fas fa-angle-right"></i></div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: [
    'storePictures'
  ],
  data() {
    return {
      swiperOption: {
        speed: 1000,//スライドの切り替わりスピード
        spaceBetween: 0,//各スライドの余白
        centeredSlides: true,//スライダーを真ん中に
        loop: true, //無限ループ
        autoplay: { //スライドの自動切り替え
          delay: 5000,//スライドの自動切り替えの秒数
          disableOnInteraction: false//何らかのアクション後の自動切り替えを再開
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
}
</script>

<style  scoped  lang="scss">
.swiper-slide {
  height: 170px;
}
.swiper-slide img {
  margin-top: -40px;
}
.swiper-button {
  color: #fff;
  width: 50px;
  height: 50px;
  background-color:rgba(46, 97, 113, 0.87);
  border-radius: 50%;
  font-size: 3.2rem;
  &-prev {
    .fas {
      transform: translateX(-2px);
    }
  }
  &-next {
    .fas {
      transform: translateX(2px);
    }
  }
}

</style>