<template>
  <div class="article-detail">
    <div class="modal" v-show="isShow">
      <div class="modal__inner animate__animated animate__fadeIn">
      <div class="modal__image" :style="{ backgroundImage: 'url(' + article.main_image + ')' }"></div>
      <p class="modal__title">{{ article.name }}</p>
      <p class="modal__info">予約・お問い合わせの際は<br>「WENDYのクーポンを使いたい」<br>とお伝え下さい。</p>
      <ul class="link-list">
        <li class="link-list__item">
          <i class="fas fa-external-link-alt"></i>
          <a class="link-list__link" target="_blank" :href="article.url_official">店舗ホームページ</a>
        </li>
        <li class="link-list__item" v-if="article.url_hotpepper">
          <i class="fas fa-external-link-alt"></i>
          <a class="link-list__link" target="_blank" :href="article.url_hotpepper">ホットペッパーグルメ</a>
        </li>
        <li class="link-list__item" v-if="article.url_tabelog">
          <i class="fas fa-external-link-alt"></i>
          <a class="link-list__link" target="_blank" :href="article.url_tabelog">食べログ</a>
        </li>
        <li class="link-list__item" v-if="article.url_gnavi">
          <i class="fas fa-external-link-alt"></i>
          <a class="link-list__link" target="_blank" :href="article.url_gnavi">ぐるなび</a>
        </li>
        <li class="link-list__item" v-if="article.url_twitter">
          <i class="fas fa-external-link-alt"></i>
          <a class="link-list__link" target="_blank" :href="article.url_twitter">Twitter</a>
        </li>
        <li class="link-list__item" v-if="article.url_instagram">
          <i class="fas fa-external-link-alt"></i>
          <a class="link-list__link" target="_blank" :href="article.url_instagram">Instagram</a>
        </li>
        <li class="link-list__item">
          <i class="fas fa-times"></i>
          <a class="link-list__link" @click="modalToggle">店舗詳細画面へ戻る</a>
        </li>
      </ul>
      </div>
      <div class="modal__background animate__animated animate__fadeIn" @click="modalToggle"></div>
    </div>
    <div class="gallery" :style="{ backgroundImage: 'url(' + article.main_image + ')' }">
      <p class="gallery__area"><i class="fas fa-home" @click="$router.push('/')"></i>> 東京都 > {{ article.area }}</p>
      <div class="gallery__share"><p><i class="fas fa-share-square"></i></p></div>
      <div v-if="user" class="gallery__like" :class="{ 'active animate__animated animate__bounceIn': likeActive === true }" @click="likeToggle"><p><i class="fas fa-heart"></i></p></div>
    </div>
    <div class="content">
      <div class="content-header">
        <div class="content-header__inner">
          <p class="content-header__title">{{ article.name }}</p>
          <p class="content-header__category">{{ article.category }}</p>
          <div  class="business-hours">
            <ul class="business-hours__list">
              <li class="business-hours__item" v-for="(str, index) in (article.business_hour).split('\\n')" :key="index">{{ str }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content-coupons">
        <div class="content-coupons__title" v-if="!activeCoupons.length">現在掲載されているクーポンはありません</div>
        <div v-else>
          <p class="content-coupons__title">＼ 詳細と利用方法はクーポンをクリック ／</p>
          <ul class="coupons-list">
            <li class="coupon" v-for="(coupon, index) in activeCoupons" :key="index">
              <nuxt-link :to="`/article/${article.article_id}/${coupon.coupon_id}`">
                <div class="coupon__header">
                  <div class="coupon__image">
                    <div class="coupon__tag">
                      <p class="coupon__category">{{ coupon.category }}</p>
                      <p class="coupon__time">{{ coupon.start }}~{{ coupon.end }}の入店限定</p>
                    </div>
                    <img :src="coupon.image" alt="">
                    <p class="coupon__badge"><img :src="`/img/discount-badge/discount-badge${coupon.discount_rate}.png`" alt=""></p>
                  </div>
                </div>
                <div  class="coupon__content" :style="{ backgroundImage: 'url(/img/' + coupon.coupon_id + '-bg.png)' }">
                  <p class="coupon__title">{{ coupon.title }}</p>
                  <div class="coupon__discount-rate"><p><span :class="coupon.coupon_id">{{ coupon.category }}で{{ coupon.discount_rate }}%OFF</span></p></div>
                  <p class="coupon__normal-price">通常 {{ coupon.normal_price.toLocaleString() }}円</p>
                  <p class="coupon__discount-price">Wendy特別価格 <span>{{ Math.floor(coupon.normal_price * ((100 - coupon.discount_rate) / 100)).toLocaleString() }}円</span></p>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="content-map">
        <div class="content-map__inner">
            <p class="content-map__address">{{ article.address }}</p>
          <a target="_blank" :href="`https://www.google.com/maps/search/?api=1&query=${article.address}`">
            <p class="content-map__image"><iframe :src="`https://maps.google.co.jp/maps?&output=embed&q=${article.address}&z=16`"></iframe></p>
            <!-- <p class="content-map__image"><img src="/img/store-map.png" alt=""></p> -->
            <p class="content-map__link">別ウィンドウで開く >></p>
          </a>
        </div>
      </div>
      <div class="content-reservation">
        <div class="content-reservation__inner">
          <button class="content-reservation__btn btn btn-success" @click="modalToggle">このお店を予約・お問い合わせ</button>
        </div>
      </div>
      <div class="content-info">
        <div class="content-info__inner">
          <ArticleSectionTitle class="content-info__title" :section-title="'お店の紹介'"/>
          <p class="content-info__description" v-for="(str, index) in (article.main_text).split('\\n')" :key="index">{{str}}</p>
        </div>
      </div>
      <div class="content-pictures">
        <div class="content-pictures__inner">
          <ArticleSectionTitle class="content-info__title" :section-title="'お店の雰囲気'"/>
        </div>
        <ArticleStorePicturesSlider :store-pictures="article.pictures"/>
      </div>
      <div class="content-payment">
        <div class="content-payment__inner">
          <ArticleSectionTitle class="content-payment__title" :section-title="'お店の情報'"/>
          <dl class="payment-list">
            <dt class="payment-list__title">クレジットカード</dt>
            <dd class="payment-list__data">{{ article.credit_card }}</dd>
            <dt class="payment-list__title">電子マネー</dt>
            <dd class="payment-list__data">{{ article.e_money }}</dd>
          </dl>
          <p class="content-payment__info">※その他のお支払い方法については店舗にお問い合わせください</p>
          <div class="content-payment__tags">
            <div class="content-payment__tag" v-if="article.cashless">
              <p><i class="fas fa-credit-card"></i>キャッシュレス</p>
            </div>
            <div class="content-payment__tag" v-if="article.non_smoke">
              <p><i class="fas fa-smoking-ban"></i>完全禁煙</p>
            </div>
          </div>
        </div>
      </div>
      <div class="content-menu">
        <div class="content-menu__inner">
          <ArticleSectionTitle class="content-menu__title" :section-title="'メニュー'"/>
          <p class="content-menu__category-title">おすすめ料理</p>
          <dl class="menu-list">
            <dt class="menu-list__title">{{ article.food01_name }}</dt>
            <dd class="menu-list__data">{{ article.food01_price.toLocaleString() }} 円</dd>
            <dt class="menu-list__title">{{ article.food02_name }}</dt>
            <dd class="menu-list__data">{{ article.food02_price.toLocaleString() }} 円</dd>
            <dt class="menu-list__title">{{ article.food03_name }}</dt>
            <dd class="menu-list__data">{{ article.food03_price.toLocaleString() }} 円</dd>
            <dt class="menu-list__title">{{ article.food04_name }}</dt>
            <dd class="menu-list__data">{{ article.food04_price.toLocaleString() }} 円</dd>
            <dt class="menu-list__title">{{ article.food05_name }}</dt>
            <dd class="menu-list__data">{{ article.food05_price.toLocaleString() }} 円</dd>
          </dl>
          <p class="content-menu__category-title">おすすめドリンク</p>
          <dl class="menu-list">
            <dt class="menu-list__title">{{ article.drink01_name }}</dt>
            <dd class="menu-list__data">{{ article.drink01_price.toLocaleString() }} 円</dd>
            <dt class="menu-list__title">{{ article.drink02_name }}</dt>
            <dd class="menu-list__data">{{ article.drink02_price.toLocaleString() }} 円</dd>
            <dt class="menu-list__title">{{ article.drink03_name }}</dt>
            <dd class="menu-list__data">{{ article.drink03_price.toLocaleString() }} 円</dd>
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
      const subCollection = await doc.ref.collection('coupons').orderBy('start').get();
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
    activeCoupons: function() {
      const allCoupons = this.article.coupons
      const activeCoupons = allCoupons.filter((obj) => {
        return obj['active'] === true;
      })
      return activeCoupons
    }
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
    overflow: scroll;
    position: fixed;
    top: 0%;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 85%;
    max-width: 678px;
    height: calc(100vh - 75px);
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
  max-width: 768px;
  margin: 0 auto;
  background-size: cover;
  position: relative;
  @include mq(sm) {
    height: 340px;
  }
  @include mq() {
    border-radius: 0 0  8px 8px;
  }
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
      max-width: 768px;
    }
    &__title {
      font-size: 1.8rem;
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
        font-size: 1.4rem;
      }
      &__item:not(:last-child) {
        margin-bottom: 0.4rem;
      }
    }
  }
  .content-coupons {
    background-color: #efefef;
    padding: 2rem 0 2rem;
    overflow: scroll;

    &__title {
      font-size: 1.4rem;
      text-align: center;
      color: #2E6171;
      font-weight: bold;
    }
    .coupon {
      max-width: 768px;
      margin: 1.6rem auto 4rem;
      color: #2e6171;
      font-weight: bold;
      @include mq() {
        padding: 2rem 12rem 2rem;
      }
      &__image {
        position: relative;
      }
      &__image img {
        @include mq() {
          border-radius: 10px;
        }
      }
      &__tag {
        padding: 0.5rem 1rem;
        backdrop-filter: blur(4px);
        width: 100%;
        position: absolute;
        border-radius: 10px 10px 0 0;
      }
      &__category {
        font-size: 1.4rem;
        color: #ff427a;
        display: inline-block;
        margin-right: 0.8rem;
        text-shadow:0 0 5px #888;
      }
      &__time {
        font-size: 1.2rem;
        color: #fff;
        display: inline-block;
        text-shadow:0 0 5px #000;
      }
      &__badge {
        width: 80px;
        position: absolute;
        top: 10px;
        right: 10px;
        border-radius: 50%;
        overflow: hidden;
      }
      &__badge img {
        border-radius: 50%;
        transform: scale(1.2);
      }
      &__content {
        height: 120px;
        max-width: 375px;
        margin: -6px auto;
        padding: 2rem 2.4rem 1.4rem;
        position: relative;
        display: flex;
        flex-direction: column;
        background-size: cover;
      }
      &__title {
        font-size: 1.2rem;
        width: 240px;
      }
      &__normal-price {
        margin-top: auto;
        font-weight: normal;
        font-size: 1.2rem;
        text-decoration: line-through;
        color: #838383;
      }
      &__discount-rate {
        font-size: 1.4rem;
        .oso-lunch {
          color: rgb(72, 179, 245);
        }
        .haya-dinner {
          color: rgba(236, 103, 63, 1);
        }
        .oso-dinner {
          color: rgba(66, 58, 141, 1);
        }
      }
      &__discount-price {
        position: absolute;
        bottom: 10px;
        right: 88px;
        font-size: 1.2rem;
        font-weight: normal;
        span {
          margin-left: 0.2rem;
          font-size: 2.4rem;
          color: #ff427a;
          font-weight: bold;
        }
      }
    }
  }
  .content-map {
    padding: 2.7rem 0 2.7rem;
    &__inner {
      width: 93%;
      margin: 0 auto;
      max-width: 768px;
    }
    &__address {
      margin-bottom: 0.8rem;
      @include mq() {
        padding: 5px 120px;
      }
    }
    &__image {
      overflow: hidden;
      border-radius: 8px;
      margin-bottom: 0.2rem;
    }
    &__image iframe {
      height: 170px;
      border: none;
      width: 100%;
      @include mq() {
        padding: 0 120px;
        height: 380px;
      }
    }
    &__link {
      font-size: 1.4rem;
      text-align: right;
      @include mq() {
        padding: 5px 120px;
      }
    }
    &__link a {
      color: #2e6171;
    }
  }
  .content-reservation {
    text-align: center;
    padding: 0 0 3.2rem;
    &__btn {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    }
  }
  .content-info {
    padding: 0 0 2.4rem;
    &__inner {
      width: 93%;
      margin: 0 auto;
      max-width: 768px;
    }
    &__title {
      margin-bottom: 2.4rem;
    }
    &__description {
      font-size: 1.4rem;
      line-height: 1.8;
      white-space: pre-wrap;
    }
  }
  .content-pictures {
    &__inner {
      max-width: 768px;
      width: 93%;
      margin: 0 auto;
    }
  }
  .content-payment {
    padding: 4rem 0 2.4rem;
    font-size: 1.4rem;
    &__inner {
      width: 93%;
      margin: 0 auto;
      max-width: 768px;
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
    &__tags {
      display: flex;
      flex-wrap: wrap;
      padding: 2.4rem 0;
    }
    &__tag {
      color: #2E6171;
      background-color: #eee;
      font-size: 1.4rem;
      width: calc((100% / 2) - 4px);
      height: 35px;
      line-height: 35px;
      text-align: center;
      border-radius: 999px;
      margin-bottom: 0.8rem;
      .fas {
        margin-right: 0.8rem;
      }
    }
    &__tag:nth-child(odd) {
      margin-right: 0.8rem;
    }
  }
  .content-menu {
    padding: 0 0 2.4rem;
    font-size: 1.4rem;
    &__inner {
      width: 93%;
      margin: 0 auto;
      max-width: 768px;
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

