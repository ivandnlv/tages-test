<template>
  <div class="goods">
    <div class="goods__items">
      <GoodsItemCard
        v-for="goodsItem in goods"
        :goods-item="goodsItem"
        :key="goodsItem.id"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface GoodsItemsProps {
  goods: GoodsItem[];
}

const props = defineProps<GoodsItemsProps>();
const { goods } = toRefs(props);
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
