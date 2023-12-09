<template>
  <div class="goods">
    <div class="goods__items" v-if="!filteredGoods">
      <GoodsItemCard
        v-for="goodsItem in goods"
        :goods-item="goodsItem"
        :key="goodsItem.id"
      />
    </div>
    <div class="goods__items" v-else>
      <GoodsItemCard
        v-for="goodsItem in filteredGoods"
        :goods-item="goodsItem"
        :key="goodsItem.id"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useGoodsStore } from "~/store/complects-goods";

const goodsStore = useGoodsStore();
const { fetchGoodsItems } = goodsStore;
const { goods, filteredGoods } = storeToRefs(goodsStore);

await fetchGoodsItems();
</script>

<style lang="scss" scoped>
.goods {
  &__items {
    display: grid;
    grid-template-columns: repeat(auto-fit, 336px);
    grid-template-rows: repeat(auto-fit, 352px);
    width: 100%;
    column-gap: 48px;
    row-gap: 40px;
  }
}
</style>
