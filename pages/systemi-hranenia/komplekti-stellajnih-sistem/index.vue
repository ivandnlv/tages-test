<template>
  <div class="complects">
    <h1>Комплекты стеллажных систем</h1>
    <div class="complects__filters">
      <goods-filters />
    </div>
    <div class="complects__goods" v-if="goods">
      <goods-items :goods="filteredGoods ?? goods" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useGoodsStore } from "~/store/complects-goods";

const goodsStore = useGoodsStore();
const { fetchGoodsItems } = goodsStore;
const { filteredGoods, goods } = storeToRefs(goodsStore);

await fetchGoodsItems();
</script>

<style lang="scss" scoped>
.complects {
  &__goods {
    margin-top: 23px;
  }
}
</style>
