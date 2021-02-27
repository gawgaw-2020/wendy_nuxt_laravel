<template>
  <div class="add_article_data">
    <button @click="add">登録する</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const articlesRef = db.collection('articles')

export default {
  data() {
    return {
      store_id: '',
      owner_id: '',
      published: true,
      access_count: 0,
      area: '新宿・代々木',
      name: '居酒屋 兎',
      address: '広島県広島市美鈴が丘西4-11-4',
      map_image: 'https://firebasestorage.googleapis.com/v0/b/wendy-nuxt-firebase.appspot.com/o/article_images%2FMzcZn7ie00dYig8YWlZ1%2Fmap_image%2Fstore-map.png?alt=media&token=a032f30f-2691-4137-8fcd-5c3040c4725b',
      nearest_station: 'JR山陽本線 橋本駅',
      business_hour: 'LUNCH TIME: 11:00 ~ 14:00\\nDINNER TIME: 17:00 ~ 23:00\\n不定休',
      cashless: false,
      non_smoke: true,
      category: '魚介系居酒屋',
      credit_card: 'VISA MASTER',
      e_money: '交通系電子マネー メルペイ iD',
      main_image: 'https://firebasestorage.googleapis.com/v0/b/wendy-nuxt-firebase.appspot.com/o/jakub-kapusnak-4f4YZfDMLeU-unsplash.jpg?alt=media&token=de8808b5-be0e-4658-ab9a-07410254e7af',
      main_text: '「Ba Lat (バラッ)」はハイセンスで高級感溢れるエリア・狎鴎亭(アックジョン)にあり、芸能事務所が集まる場所柄、有名人も頻繁に訪れる人気の海鮮料理専門店です。\\n落ち着いた雰囲気の中でゆっくりと食事を味わうことが出来ます。\\n日本からの観光客に人気のメニューは「カニ身ビビンバ」で、カニ身と濃厚なカニ味噌がたっぷり入った一般のビビンバとは一味違うリッチな一品。\\n野菜もたっぷり入っていてシャキシャキした食感も食べ応えがあります。\\nその他にも、４～10月にはウニをふんだんに使用した「ウニビビンバ」、冬には石鍋でぐつぐつ煮込まれたピリ辛味の「太刀魚の煮物」、夏には新鮮な旬の魚介類をシャーベット氷入りの酢コチュジャンスープでいただく「名品盛合せ水刺身」も人気です。',
      pictures: [
        'https://firebasestorage.googleapis.com/v0/b/wendy-nuxt-firebase.appspot.com/o/nick-karvounis-Ciqxn7FE4vE-unsplash.jpg?alt=media&token=89845930-8de6-4115-a6b3-18781650f802',
        'https://firebasestorage.googleapis.com/v0/b/wendy-nuxt-firebase.appspot.com/o/jay-wennington-N_Y88TWmGwA-unsplash.jpg?alt=media&token=6d3c2727-cdb6-4ec2-956a-66a48cf8701a',
        'https://firebasestorage.googleapis.com/v0/b/wendy-nuxt-firebase.appspot.com/o/stefan-johnson-xIFbDeGcy44-unsplash.jpg?alt=media&token=d74ef460-fbdf-4dda-9b06-282edd74525c'
      ],
      small_text: '夏には新鮮な旬の魚介類をシャーベット氷入りの酢コチュジャンスープでいただく「名品盛合せ水刺身」も人気です。',
      url_gnavi: 'https://r.gnavi.co.jp/954k73zg0000/',
      url_hotpepper: 'https://www.hotpepper.jp/strJ001155200/',
      url_instagram: 'https://www.instagram.com/miobar_hiroshima/',
      url_official: 'http://maplecity.jp/zona/',
      url_tabelog: 'https://tabelog.com/chiba/A1201/A120104/12020535/',
      url_twitter: 'https://twitter.com/usagihirosima',
      food01_name: 'マルゲリータ',
      food01_price: 1480,
      food02_name: 'カプリチョーザ',
      food02_price: 1780,
      food03_name: '4種のチーズのピッツァ',
      food03_price: 2280,
      food04_name: '海老のアヒージョ',
      food04_price: 980,
      food05_name: 'フライドポテトトリュフ風味',
      food05_price: 480,
      drink01_name: 'キリン 一番搾り',
      drink01_price: 480,
      drink02_name: '各種グラスワイン',
      drink02_price: 780,
      drink03_name: 'デトックスモヒート',
      drink03_price: 680,
      coupon_oso_lunch_active: true,
      coupon_haya_dinner_active: true,
      coupon_oso_dinner_active: true,
      favorite_counter: 0,
    };
  },
  computed: {},
  methods: {
    add() {
      const createdID = articlesRef.doc().id
      articlesRef.doc(createdID)
      .set({
      store_id: createdID,
      owner_id: this.owner_id,
      published: this.published,
      access_count: this.access_count,
      area: this.area,
      name: this.name,
      address: this.address,
      map_image: this.map_image,
      nearest_station: this.nearest_station,
      business_hour: this.business_hour,
      cashless: this.cashless,
      non_smoke: this.non_smoke,
      category: this.category,
      credit_card: this.credit_card,
      e_money: this.e_money,
      main_image: this.main_image,
      main_text: this.main_text,
      pictures: this.pictures,
      small_text: this.small_text,
      url_gnavi: this.url_gnavi,
      url_hotpepper: this.url_hotpepper,
      url_instagram: this.url_instagram,
      url_official: this.url_official,
      url_tabelog: this.url_tabelog,
      url_twitter: this.url_twitter,
      food01_name: this.food01_name,
      food01_price: this.food01_price,
      food02_name: this.food02_name,
      food02_price: this.food02_price,
      food03_name: this.food03_name,
      food03_price: this.food03_price,
      food04_name: this.food04_name,
      food04_price: this.food04_price,
      food05_name: this.food05_name,
      food05_price: this.food05_price,
      drink01_name: this.drink01_name,
      drink01_price: this.drink01_price,
      drink02_name: this.drink02_name,
      drink02_price: this.drink02_price,
      drink03_name: this.drink03_name,
      drink03_price: this.drink03_price,
      coupon_oso_lunch_active: this.coupon_oso_lunch_active,
      coupon_haya_dinner_active: this.coupon_haya_dinner_active,
      coupon_oso_dinner_active: this.coupon_oso_dinner_active,
      favorite_counter: 0,
      create_time: firebase.firestore.FieldValue.serverTimestamp()
    })
      .then((docRef) => {
          console.log("Document written with ID: ", createdID);
          articlesRef.doc(createdID).collection('coupons').doc('oso-lunch').set({
            article_id: createdID,
            category: '遅ランチ',
            end: '16:30',
            start: '14:00',
            title: '14時以降限定★遅めのランチがお得★店主自慢の日替わり定食1,080円→800円（なくなり次第終了となります）',
            information: '当日でも使えますが、予約をしていただけると嬉しいです！',
            rule: '席利用２時間まで',
            how_to_use: '予約時・来店時・注文時・会計時に掲示'
          })
          articlesRef.doc(createdID).collection('coupons').doc('haya-dinner').set({
            article_id: createdID,
            category: '早ディナー',
            end: '17:30',
            start: '18:00',
            title: '窓側のお席確約！【誕生日・記念日に☆】 『主役へメッセージ入り特製デザート盛り合わせ』プレゼント♪',
            information: '当日でも使えますが、予約をしていただけると嬉しいです！',
            rule: '席利用２時間まで',
            how_to_use: '予約時・来店時・注文時・会計時に掲示'
          })
          articlesRef.doc(createdID).collection('coupons').doc('oso-dinner').set({
            article_id: createdID,
            category: '遅ディナー',
            end: '22:30',
            start: '21:00',
            title: '【星付きレストランををカフェとして利用OK】おまかせドルチェ３種盛りが900円!!１ドリンク付き★',
            information: '当日でも使えますが、予約をしていただけると嬉しいです！',
            rule: '席利用２時間まで',
            how_to_use: '予約時・来店時・注文時・会計時に掲示'
          })
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });

    }
  },
  created: function () {},
};
</script>

<style lang="scss" scoped>

</style>
