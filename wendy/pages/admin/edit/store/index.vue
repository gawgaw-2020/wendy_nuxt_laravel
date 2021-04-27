<template>
  <div>
    <h2>店舗情報編集TOP画面</h2>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";


export default {
  head() {
    return {
      title: '店舗情報編集'
    }
  },
  middleware: 'storeAuthenticated',
  layout: 'admin',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters("store-auth", ["storeName"]),
  },
  methods: {
  },
  created: function() {
  },
}
</script>

<style lang="scss" scoped>
</style>