<template>
  <div>
    <div class="search-top">
      <div class="search-top__inner">
        <form class="search-top__container" action="#" method="#">
          <input
            class="search-top__search"
            type="text"
            placeholder="店舗名・エリア名・キーワード"
          />
        </form>
      </div>
    </div>
    <h1>トップページ</h1>
    <p class="test">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, ad! Dolores libero rerum sunt modi, eligendi nesciunt aspernatur magni fugit deleniti impedit sint sit, consequuntur quibusdam ea aut ad repellat nemo quas, et labore! Asperiores et porro pariatur eum quisquam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit aliquam eligendi amet voluptatibus ut cum quaerat corporis facilis beatae, quam tempore iusto eius blanditiis. Iste et est cupiditate, ut accusamus qui fuga quos aliquid impedit numquam provident vitae facilis magni neque quibusdam, inventore eum quia! Quisquam incidunt minus, tempore accusantium dolor nisi perspiciatis. Fugit omnis voluptate assumenda unLorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, ad! Dolores libero rerum sunt modi, eligendi nesciunt aspernatur magni fugit deleniti impedit sint sit, consequuntur quibusdam ea aut ad repellat nemo quas, et labore! Asperiores et porro pariatur eum quisquam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit aliquam eligendi amet voluptatibus ut cum quaerat corporis facilis beatae, quam tempore iusto eius blanditiis. Iste et est cupiditate, ut accusamus qui fuga quos aliquid impedit numquam provident vitae facilis magni neque quibusdam, inventore eum quia! Quisquam incidunt minus, tempore accusantium dolor nisi perspiciatis. Fugit omnis voluptate assumenda unLorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, ad! Dolores libero rerum sunt modi, eligendi nesciunt aspernatur magni fugit deleniti impedit sint sit, consequuntur quibusdam ea aut ad repellat nemo quas, et labore! Asperiores et porro pariatur eum quisquam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit aliquam eligendi amet voluptatibus ut cum quaerat corporis facilis beatae, quam tempore iusto eius blanditiis. Iste et est cupiditate, ut accusamus qui fuga quos aliquid impedit numquam provident vitae facilis magni neque quibusdam, inventore eum quia! Quisquam incidunt minus, tempore accusantium dolor nisi perspiciatis. Fugit omnis voluptate assumenda unLorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, ad! Dolores libero rerum sunt modi, eligendi nesciunt aspernatur magni fugit deleniti impedit sint sit, consequuntur quibusdam ea aut ad repellat nemo quas, et labore! Asperiores et porro pariatur eum quisquam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit aliquam eligendi amet voluptatibus ut cum quaerat corporis facilis beatae, quam tempore iusto eius blanditiis. Iste et est cupiditate, ut accusamus qui fuga quos aliquid impedit numquam provident vitae facilis magni neque quibusdam, inventore eum quia! Quisquam incidunt minus, tempore accusantium dolor nisi perspiciatis. Fugit omnis voluptate assumenda unLorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, ad! Dolores libero rerum sunt modi, eligendi nesciunt aspernatur magni fugit deleniti impedit sint sit, consequuntur quibusdam ea aut ad repellat nemo quas, et labore! Asperiores et porro pariatur eum quisquam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit aliquam eligendi amet voluptatibus ut cum quaerat corporis facilis beatae, quam tempore iusto eius blanditiis. Iste et est cupiditate, ut accusamus qui fuga quos aliquid impedit numquam provident vitae facilis magni neque quibusdam, inventore eum quia! Quisquam incidunt minus, tempore accusantium dolor nisi perspiciatis. Fugit omnis voluptate assumenda unde nisi? Temporibus?</p>
    <p><nuxt-link :to="`/article/all-articles/`">全店舗一覧</nuxt-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  created: function () {},
};
</script>

<style lang="scss" scoped>
.test {
  font-size: 1.6rem;
  line-height: 2;
  background-color: #ddd;
}

.search-top {
  &__inner {
    max-width: 1366px;
    padding: 0 16px;
    margin: 0 auto;
  }
  &__search {
    width: 100%;
    height: 36px;
    padding: 0 0 0 2rem;
    background-color: #efefef;
    border: none;
    border-radius: 18px;
  }
  &__search::placeholder {
    color: #aaa;
    text-align: center;
  }
  &__search:focus {
    outline: none;
  }
}

</style>
