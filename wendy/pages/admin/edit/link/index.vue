<template>
  <div>
    <h2>外部リンク編集TOP画面</h2>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";


export default {
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