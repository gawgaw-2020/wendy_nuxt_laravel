<template>
  <div>
    <div v-for="comment in comments" :key="comment.id">
      <span v-if="comment.created">
        <span>
          名前:{{ comment.name }}<br>
          内容:{{ comment.index}}<br>
          投稿時間:{{ comment.created.toDate() | dateFilter}}
        </span>
      </span>
    </div>
    <form @submit.prevent="add">
      <div>
        <div>
          <label>
            名前
          </label>
        </div>
        <input v-model="name">
        <div>
          <label>
            内容
          </label>
        </div>
        <input v-model="index">
      </div>
      <button>投稿する</button> 
    </form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data: function() {
    return {
      name: '',
      index: '',
      done: false
    }
  },
  created: function() {
    this.$store.dispatch('comments/init')
  },
  methods: {
    add() {
      this.$store.dispatch('comments/add', {index: this.index, name: this.name})
      this.name = ''
      this.index = ''
    }
  },
//この部分で上述のcomments.js内のgettersのcomments/orderdCommentsを呼び出して投稿順に整形しています。
  computed: {
    comments() {
      return this.$store.getters['comments/orderdComments']
    }
  },
  filters: {
    dateFilter: function(date) {
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
    }
  }
}
</script>