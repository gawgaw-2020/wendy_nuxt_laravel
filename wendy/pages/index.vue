<template>
  <div>
    <h1>トップページ</h1>
    <p><nuxt-link :to="`/article/all-articles/`">全店舗一覧</nuxt-link></p>
    <MixinTest/>
  </div>
</template>

<script>
import MixinTest from '~/components/MixinTest.vue'
export default {
  components: { MixinTest },
  data() {
    return {

    }
  },
  computed: {
    
  },
  created: function() {
  },
}
</script>