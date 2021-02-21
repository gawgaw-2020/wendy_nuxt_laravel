<template>
  <div class="article-detail">
    <div class="gallery" :style="{ backgroundImage: 'url(' + article.store_main_image + ')' }">
      <p class="gallery__area"><i class="fas fa-home"></i>> 東京都 > 渋谷・原宿・表参道 > 渋谷</p>
      <div class="gallery__share"><p><i class="fas fa-share-square"></i></p></div>
      <div class="gallery__like"><p><i class="fas fa-heart"></i></p></div>
    </div>
    <div class="content">
      <div class="content-header">
        <div class="content-header__inner">
          <p class="content-header__title">{{ article.store_name }}</p>
          <p class="content-header__category">{{ article.store_category }}</p>
          <div  class="business-hours">
            <ul class="business-hours__list">
              <li class="business-hours__item" v-if="article.store_business_hours_lunch">{{ article.store_business_hours_lunch }}</li>
              <li class="business-hours__item" v-if="article.store_business_hours_cafe">{{ article.store_business_hours_cafe }}</li>
              <li class="business-hours__item" v-if="article.store_business_hours_dinner">{{ article.store_business_hours_dinner }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content-coupons">
        <ul class="coupons-list">
          <li class="coupon" v-for="(coupon, index) in article.coupons" :key="index" :style="{ backgroundImage: 'url(/img/' + coupon.coupon_id + '-bg.png)' }">
            <div  class="coupon__content">
              <p class="coupon__category">{{ coupon.coupon_category }}</p>
              <p class="coupon__time">{{ coupon.coupon_start }}~{{ coupon.coupon_end }}の入店で</p>
              <p class="coupon__title">{{ coupon.coupon_title }}</p>
            </div>
            <p class="coupon__link"><nuxt-link :to="`/article/${article.article_id}/${coupon.coupon_id}`"></nuxt-link></p>
          </li>
        </ul>
      </div>
      <div class="content-map">
        <div class="content-map__inner">
          <p class="content-map__address">{{ article.store_address }}</p>
          <p class="content-map__image"><img src="/img/store-map.png" alt=""></p>
          <p class="content-map__link"><a target="_blank" :href="`https://www.google.com/maps/search/?api=1&query=${article.store_address}`">別ウィンドウで開く >></a></p>
        </div>
      </div>
      <div class="content-info">
        <div class="content-info__inner">
          <ArticleSectionTitle class="content-info__title" :section-title="'お店情報'"/>
          <p class="content-info__description" v-for="(str, index) in (article.store_main_text).split('\\n')" :key="index">{{str}}</p>
          <div class="content-info__tags">
            <div class="content-info__tag" v-if="article.store_cashless">
              <p><i class="fas fa-credit-card"></i>キャッシュレス</p>
            </div>
            <div class="content-info__tag" v-if="article.store_non_smoke">
              <p><i class="fas fa-smoking-ban"></i>完全禁煙</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import firebase from 'firebase'
//firestoreのアクション部分のパッケージをインストールする
import { firestoreAction } from 'vuexfire'

//firebaseのDBを定義する
const db = firebase.firestore()
const articlesRef = db.collection('articles')


export default {
  data() {
    return {
    }
  },
  async asyncData(context) {
    let article
    let coupons = []
    let coupon_id = []
    let article_id = []
    const collection = await articlesRef.doc(context.params.id).get()
    .then(async function(doc) {
      article_id.article_id = doc.id
      const articleData = {...article_id, ...doc.data()}
      article = articleData
      const subCollection = await doc.ref.collection('coupons').orderBy('coupon_start').get();
      subCollection.forEach(doc => {
        coupon_id.coupon_id = doc.id
        const allData = {...coupon_id, ...doc.data()}
        coupons.push(allData)
      });
    })
    article['coupons'] = coupons
    return { article }
  },
  // computed: {
  //   ...mapState('articles', ['article'])
  // },
  // methods: {
  //   ...mapActions('articles', ['getArticleById'])
  // },
  // created: function(){
  //   this.getArticleById({
  //     articleId: this.$route.params.id
  //   })
  // }
}
</script>

<style lang="scss" scoped>
.article-detail {
  padding-bottom: 8rem;
}
.gallery {
  height: 170px;
  background-size: cover;
  position: relative;
  &__area {
    font-size: 1rem;
    color: #fff;
    padding: 0.5rem 1.6rem;
    backdrop-filter: blur(4px);
    .fas {
      margin-right: 0.4rem;
    }
  }
  &__share {
    width: 30px;
    height: 30px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 16px;
    right: 16px;
    .fas {
      font-size: 1.2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &__like {
    width: 51px;
    height: 51px;
    background-color: #ddd;
    border-radius: 50%;
    position: absolute;
    bottom: -32px;
    right: 32px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    .fas {
      color: #fff;
      font-size: 2.1rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.content {
  color: #444;
  .content-header {
    padding: 1rem 0 0.8rem;
    &__inner {
      width: 93%;
      margin: 0 auto;
    }
    &__title {
      font-size: 1.6rem;
      font-weight: bold;
      margin-bottom: 0.4rem;
    }
    &__category {
      font-size: 1rem;
      padding: 0.2rem 1rem;
      border-radius: 999px;
      border: 1px solid #707070;
      display: inline-block;
    }
    .business-hours {
      &__list {
        padding-top: 0.8rem;
      }
      &__item {
        font-size: 1.6rem;
      }
      &__item:not(:last-child) {
        margin-bottom: 0.4rem;
      }
    }
  }
  .content-coupons {
    background-color: #efefef;
    padding: 2rem 0 2rem;
    .coupon {
      width: 340px;
      height: 112px;
      margin: 0 auto 0.8rem;
      color: #2e6171;
      font-weight: bold;
      position: relative;
      display: flex;
      background-position: center;
      &__content {
        width: 75%;
      }
      &__category {
        font-size: 1.4rem;
        color: #ff427a;
        position: absolute;
        left: 16px;
        top: 10px;
      }
      &__time {
        font-size: 1.2rem;
        padding: 1.2rem 0 0.6rem 6rem;
        text-align: center;
      }
      &__title {
        font-size: 1.2rem;
        padding-left: 1.5rem;
        line-height: 1.7;
      }
      &__link {
        width: 25%;
      }
      &__link a {
        font-size: 1rem;
        display: inline-block;
        width: 100%;
        height: 100%;
        color: #fff;
      }
    }
  }
  .content-map {
    padding: 2.7rem 0;
    &__inner {
      width: 93%;
      margin: 0 auto;
    }
    &__address {
      margin-bottom: 0.8rem;
    }
    &__image {
      margin-bottom: 0.4rem;
    }
    &__link {
      font-size: 1.2rem;
      text-align: right;
    }
    &__link a {
      color: #2e6171;
    }
  }
  .content-info {
    &__inner {
      width: 93%;
      margin: 0 auto;
    }
    &__title {
      margin-bottom: 2.4rem;
    }
    &__description {
      font-size: 1.4rem;
    }
    &__tags {
      display: flex;
      padding: 2.4rem 0;
    }
    &__tag {
      width: 160px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      border-radius: 10px;
      border: 1px solid #707070;
      margin-right: 1.6rem;
      .fas {
        margin-right: 0.8rem;
      }
    }
  }
}
</style>

