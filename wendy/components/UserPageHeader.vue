<template>
  <div>
    <h1>マイページ</h1>
      <p class="user-icon">
        {{ userPhotoURL }}
        <img v-if="userPhotoURL" :src="userPhotoURL" alt="">
        <img v-if="!userPhotoURL" src="img/user-icon.png" alt="">
      </p>
      <p>{{ userName }}様</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "default",
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('auth', ['userName', 'userPhotoURL'])
  }
}
</script>

<style lang="scss" scoped>
.user-icon img {
  width: 60px;
  border-radius: 50%;
}
</style>
