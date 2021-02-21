<template>
  <p class="article-section-title">{{ sectionTitle }}</p>
</template>

<script>
export default {
  props: [
    'sectionTitle'
  ]
}
</script>

<style lang="scss" scoped>
.article-section-title {
  font-size: 1.4rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  text-align: center;
}
.article-section-title::after {
  content: '';
  flex-grow: 1;
  border-bottom: 1px solid #707070;
  margin-left: 1.6rem;
}
</style>