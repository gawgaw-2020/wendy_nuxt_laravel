<template>
  <div>
    <h2>掲載の停止・再開TOP画面</h2>
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