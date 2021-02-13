<template>
  <div>
    <UserPageHeader/>
    <MyPageNavigation/>
    <h2>メール・パスワードの再設定</h2>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
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