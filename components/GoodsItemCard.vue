<template>
  <div class="goods-card">
    <ui-card>
      <div class="goods-card__sale" v-if="goodsItem.price.old_price">
        Скидка
      </div>
      <div class="goods-card__img">
        <NuxtImg :src="goodsItem.image.url" :alt="goodsItem.name + '-image'" />
      </div>
      <div class="goods-card__code">{{ goodsItem.code }}</div>
      <div class="goods-card__name">{{ goodsItem.name }}</div>
      <div class="goods-card__info">
        <div class="goods-card__wrapper">
          <div class="goods-card__old-price" v-if="goodsItem.price.old_price">
            {{ goodsItem.price.old_price }}
          </div>
          <div class="goods-card__price">
            {{ goodsItem.price.current_price }}
          </div>
        </div>
        <div class="goods-card__wrapper">
          <button class="goods-card__btn">
            <NuxtImg
              src="/icons/cart.svg"
              alt="add to Cart / remove from Cart"
            />
          </button>
          <button class="goods-card__btn">
            <NuxtImg
              src="icons/heart.svg"
              alt="add to Favs / remove from Favs"
            />
          </button>
        </div>
      </div>
    </ui-card>
  </div>
</template>

<script lang="ts" setup>
interface GoodsCardProps {
  goodsItem: GoodsItem;
}

const { goodsItem } = defineProps<GoodsCardProps>();
</script>

<style lang="scss" scoped></style>
