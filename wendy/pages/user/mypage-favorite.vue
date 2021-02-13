<template>
  <div>
    <UserProfile/>
    <h2>お気に入りした<span>店舗</span>一覧</h2>
  </div>
</template>

<script>
import UserProfile from '~/components/UserProfile.vue'
export default {

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

<style lang="scss" scoped>
  h2 {
    color: red;
    span {
      color: blue;
    }
  }
</style>