<template>
  <div>
    <h2>新規登録画面</h2>
    <p><input type="email" v-model="email"></p>
    <p><input type="password" v-model="password"></p>
    <button @click="signup">新規登録</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    
  },
  methods: {
    signup() {},
  },
  created: function() {
  },
}
</script>