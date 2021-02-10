<template>
  <div>
    <h1>トップページ</h1>
    <p><nuxt-link :to="`/article/all-articles/`">全店舗一覧</nuxt-link></p>
    <vuetifyLogo/>
  </div>
</template>

<script>
import VuetifyLogo from '../components/VuetifyLogo.vue'
export default {
  components: { VuetifyLogo },
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