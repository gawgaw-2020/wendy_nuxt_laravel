<template>
  <div class="article-detail">
    <div class="modal" v-show="isShow">
      <div class="modal__inner animate__animated animate__fadeIn">
      <div class="modal__image" :style="{ backgroundImage: 'url(' + article.store_main_image + ')' }"></div>
      <p class="modal__title">{{ article.store_name }}</p>
      <p class="modal__info">予約・お問い合わせの際は<br>「WENDYのクーポンを使いたい」<br>とお伝え下さい。</p>
      <ul class="link-list">
        <li class="link-list__item">
          <i class="fas fa-external-link-alt"></i>
          <a class="link-list__link" target="_blank" :href="article.store_url_official">店舗ホームページ</a>
        </li>
        <li class="link-list__item" v-if="article.store_url_hotpepper">
          <i class="fas fa-external-link-alt"></i>
          <a class="link-list__link" target="_blank" :href="article.store_url_hotpepper">ホットペッパーグルメ</a>
        </li>
        <li class="link-list__item" v-if="article.store_url_tabelog">
          <i class="fas fa-external-link-alt"></i>
          <a class="link-list__link" target="_blank" :href="article.store_url_tabelog">食べログ</a>
        </li>
        <li class="link-list__item" v-if="article.store_url_gnavi">
          <i class="fas fa-external-link-alt"></i>
          <a class="link-list__link" target="_blank" :href="article.store_url_gnavi">ぐるなび</a>
        </li>
        <li class="link-list__item" v-if="article.store_url_twitter">
          <i class="fas fa-external-link-alt"></i>
          <a class="link-list__link" target="_blank" :href="article.store_url_twitter">Twitter</a>
        </li>
        <li class="link-list__item" v-if="article.store_url_instagram">
          <i class="fas fa-external-link-alt"></i>
          <a class="link-list__link" target="_blank" :href="article.store_url_instagram">Instagram</a>
        </li>
        <li class="link-list__item">
          <i class="fas fa-times"></i>
          <a class="link-list__link" @click="modalToggle">店舗詳細画面へ戻る</a>
        </li>
      </ul>
      </div>
      <div class="modal__background animate__animated animate__fadeIn" @click="modalToggle"></div>
    </div>
    <div class="gallery" :style="{ backgroundImage: 'url(' + article.store_main_image + ')' }">
      <p class="gallery__area"><i class="fas fa-home"></i>> 東京都 > 渋谷・原宿・表参道 > 渋谷</p>
      <div class="gallery__share"><p><i class="fas fa-share-square"></i></p></div>
      <div v-if="user" class="gallery__like" :class="{ 'active animate__animated animate__bounceIn': likeActive === true }" @click="likeToggle"><p><i class="fas fa-heart"></i></p></div>
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
      <div class="content-reservation">
        <div class="content-reservation__inner">
          <button class="content-reservation__btn btn btn-success" @click="modalToggle">このお店を予約・お問い合わせ</button>
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
      <div class="content-pictures">
        <div class="content-pictures__inner">
          <ArticleSectionTitle class="content-info__title" :section-title="'お店の雰囲気'"/>
        </div>
        <ArticleStorePicturesSlider :store-pictures="article.store_pictures"/>
      </div>
      <div class="content-payment">
        <div class="content-payment__inner">
          <ArticleSectionTitle class="content-payment__title" :section-title="'お店の情報'"/>
          <dl class="payment-list">
            <dt class="payment-list__title">クレジットカード</dt>
            <dd class="payment-list__data">{{ article.store_credit_card }}</dd>
            <dt class="payment-list__title">電子マネー</dt>
            <dd class="payment-list__data">{{ article.store_e_money }}</dd>
          </dl>
          <p class="content-payment__info">※その他のお支払い方法については店舗にお問い合わせください</p>
        </div>
      </div>
      <div class="content-menu">
        <div class="content-menu__inner">
          <ArticleSectionTitle class="content-menu__title" :section-title="'メニュー'"/>
          <p class="content-menu__category-title">おすすめ料理</p>
          <dl class="menu-list">
            <dt class="menu-list__title">マルゲリータ</dt>
            <dd class="menu-list__data">1,500 円</dd>
            <dt class="menu-list__title">マルゲリータ</dt>
            <dd class="menu-list__data">1,500 円</dd>
            <dt class="menu-list__title">マルゲリータ</dt>
            <dd class="menu-list__data">1,500 円</dd>
            <dt v-if="false" class="menu-list__title"></dt>
            <dd v-if="false" class="menu-list__data"></dd>
            <dt class="menu-list__title">マルゲリータ</dt>
            <dd class="menu-list__data">1,500 円</dd>
          </dl>
          <p class="content-menu__category-title">おすすめドリンク</p>
          <dl class="menu-list">
            <dt class="menu-list__title">プレミアム・モルツ（生）</dt>
            <dd class="menu-list__data">500 円</dd>
            <dt class="menu-list__title">デトックスモヒート</dt>
            <dd class="menu-list__data">680 円</dd>
            <dt class="menu-list__title">デトックスモヒート</dt>
            <dd class="menu-list__data">680 円</dd>
          </dl>
        </div>
      </div>
      <div class="content-reservation">
        <div class="content-reservation__inner">
          <button class="content-reservation__btn btn btn-success" @click="modalToggle">このお店を予約・お問い合わせ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

//firebaseのDBを定義する
const db = firebase.firestore()
const articlesRef = db.collection('articles')
const usersRef = db.collection('users')

export default {
  data() {
    return {
      content: '',
      isShow: false,
      likeActive: false,
      user: null
    }
  },
  async asyncData(context) {
    let article
    let coupons = []
    let coupon_id = []
    let article_id = []
    await articlesRef.doc(context.params.id).get()
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
  computed: {
  },
  methods: {
    modalToggle() {
      this.isShow = !this.isShow
      if(document.body.style.overflow === '') {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    // いいね処理
    async likeToggle() {
      // 見た目の切り替え
      this.likeActive = !this.likeActive

      const user = firebase.auth().currentUser;
      const articleId = this.$nuxt.$route.params.id
      if (user) {
        
        articlesRef
        .doc(this.$nuxt.$route.params.id)
        .collection('favorite_users')
        .doc(user.uid)
        .get()
        .then(function(doc) {
          if (!doc.exists) {

            articlesRef
            .doc(articleId)
            .collection('favorite_users')
            .doc(user.uid)
            .set({
              ref: db.doc('users/' + user.uid),
            })

            usersRef
            .doc(user.uid)
            .collection('favorite_articles')
            .doc(articleId)
            .set({
              ref: db.doc('articles/' + articleId),
            })

          } else {

            articlesRef
            .doc(articleId)
            .collection('favorite_users')
            .doc(user.uid)
            .delete()

            usersRef
            .doc(user.uid)
            .collection('favorite_articles')
            .doc(articleId)
            .delete()
          }
        })
      }
    }
  },
  created: async function(){
    
    const user = firebase.auth().currentUser;
    this.user = user
    // お気に入りしていたら、this.likeActiveをtrueにする
    if (user) {
      let likeFlag = false
      await articlesRef
      .doc(this.$nuxt.$route.params.id)
      .collection('favorite_users')
      .doc(user.uid)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          likeFlag = true
        }
      })
      this.likeActive = likeFlag
    }

  }
}
</script>

<style lang="scss" scoped>
.modal {
  text-align: center;
  color: #fff;
  &__inner{
    // overflow: hidden;
    overflow: scroll;
    position: fixed;
    top: 0%;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 85%;
    height: calc(100vh - 75px);
    // background: transparent linear-gradient(180deg, var(--unnamed-color-eb5276) 0%, #EAE5E6 100%) 0% 0% no-repeat padding-box;
    background: transparent linear-gradient(180deg, #ff427a 0%, #EAE5E6 300%) 0% 0% no-repeat padding-box;
    opacity: 1;
    z-index: 10000;
  }
  &__image {
    height: 170px;
    background-size: cover;
    margin-bottom: 1.6rem;
  }
  &__content {
    position: relative;
  }
  &__close {
    position: absolute;
    top: 0;
    right: 5%;
    font-size: 2.4rem;
  }
  &__title {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 2.4rem;
  }
  &__info {
    font-size: 1.2rem;
    font-weight: bold;
  }
  &__background{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.8);
    z-index: 9999;
    cursor: pointer;
  }
  .link-list {
    width: 90%;
    margin: 0 auto;
    padding: 3rem 0;
    &__item {
      border: 2px solid #fff;
      border-radius: 8px;
      position: relative;
      height: 50px;
      margin-bottom: 1.2rem;
    }
    &__link {
      color: #fff;
      font-weight: bold;
      display: inline-block;
      width: 100%;
      height: 100%;
      line-height: 50px;
    }
    .fas {
      position: absolute;
      right: 5%;
      top: 50%;
      transform: translate(0%, -50%);
    }
  }
}

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
  &__like.active {
    background-color: #ff427a;
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
    padding: 2.7rem 0 1.2rem;
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
  .content-reservation {
    text-align: center;
    padding: 0 0 2.4rem;
    &__btn {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
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
      white-space: pre-wrap;
    }
    &__tags {
      display: flex;
      flex-wrap: wrap;
      padding: 2.4rem 0;
    }
    &__tag {
      width: 160px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      border-radius: 10px;
      border: 1px solid #707070;
      margin-right: 1.4rem;
      margin-bottom: 0.8rem;
      .fas {
        margin-right: 0.8rem;
      }
    }
  }
  .content-pictures {
    &__inner {
      width: 93%;
      margin: 0 auto;
    }
  }
  .content-payment {
    padding: 4rem 0 2.4rem;
    font-size: 1.2rem;
    &__inner {
      width: 93%;
      margin: 0 auto;
    }
    &__title {
      margin-bottom: 2.4rem;
    }
    .payment-list {
      padding-bottom: 1.6rem;
      &__title {
        margin-bottom: 0.4rem;
      }
      &__data {
        padding-left: 3.2rem;
      }
      &__data:not(:last-child) {
        margin-bottom: 2.4rem;
      }
    }
    &__info {
      font-size: 1.2rem;
      color: #838383;
    }
  }
  .content-menu {
    padding: 0 0 2.4rem;
    font-size: 1.2rem;
    &__inner {
      width: 93%;
      margin: 0 auto;
    }
    &__title {
      margin-bottom: 2.4rem;
    }
    &__category-title {
      margin-bottom: 1rem;
    }
    .menu-list {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 2.4rem;
      &__title {
        width: 70%;
        padding-left: 2.4rem;
      }
      &__data {
        width: 30%;
        text-align: right;
      }
      &__data:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>

