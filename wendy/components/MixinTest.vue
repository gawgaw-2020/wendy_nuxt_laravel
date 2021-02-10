<template>
  <div>
    <p>mixin test（400px以上で文字色変更）</p>
  </div>
</template>

<style lang="scss" scoped>
  p {
    font-size: 1.6rem;
    color: gold;
    @include mq(sm) {
      color: blue;
    }
  }
</style>
