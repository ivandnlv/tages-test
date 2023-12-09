<template>
  <div class="goods-card">
    <ui-card>
      <div class="goods-card__sale" v-if="goodsItem.price.old_price">
        Скидка
      </div>
      <div class="goods-card__img">
        <NuxtImg :src="goodsItem.image.url" :alt="goodsItem.name + '-image'" />
      </div>
      <div class="goods-card__code">
        {{ goodsItem.code ?? "Код отсутствует" }}
      </div>
      <div class="goods-card__name">{{ goodsItem.name }}</div>
      <div class="goods-card__info">
        <div class="goods-card__wrapper">
          <div class="goods-card__old-price" v-if="goodsItem.price.old_price">
            {{ Math.floor(goodsItem.price.old_price) }}₽
          </div>
          <div class="goods-card__price">
            {{ Math.floor(goodsItem.price.current_price) }}₽
          </div>
        </div>
        <div class="goods-card__wrapper">
          <button class="goods-card__btn" @click="() => onBtnClick('cart')">
            <NuxtImg
              :src="
                alreadyInCart ? '/icons/cart-complete.svg' : '/icons/cart.svg'
              "
              alt="add to Cart / remove from Cart"
            />
          </button>
          <button class="goods-card__btn" @click="() => onBtnClick('favs')">
            <NuxtImg
              :src="
                alreadyInFavs ? '/icons/heart-filled.svg' : 'icons/heart.svg'
              "
              alt="add to Favs / remove from Favs"
            />
          </button>
        </div>
      </div>
    </ui-card>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useGoodsStore } from "~/store/complects-goods";

interface GoodsCardProps {
  goodsItem: GoodsItem;
}

const { goodsItem } = defineProps<GoodsCardProps>();

const goodsStore = useGoodsStore();
const { addToCart, addToFavs, removeFromCart, removeFromFavs } = goodsStore;
const { goodsCart, goodsFavorites } = storeToRefs(goodsStore);

const alreadyInCart = computed(
  () =>
    !!goodsCart.value.filter((cartItem) => cartItem.id === goodsItem.id).length
);
const alreadyInFavs = computed(
  () =>
    !!goodsFavorites.value.filter((favsItem) => favsItem.id === goodsItem.id)
      .length
);

const onBtnClick = (place: "favs" | "cart") => {
  if (place === "favs") {
    if (!alreadyInFavs.value) {
      addToFavs(goodsItem);
    } else {
      removeFromFavs(goodsItem);
    }
  } else {
    if (!alreadyInCart.value) {
      addToCart(goodsItem);
    } else {
      removeFromCart(goodsItem);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/variables";
.goods-card {
  height: 100%;
  position: relative;
  &__sale {
    position: absolute;
    left: 0;
    top: 8px;
    font-size: 14px;
    color: #fff;
    background: $red-color;
    padding: 3px 16px;
  }
  &__img {
    width: 238px;
    height: 237px;
    margin: 0 auto;
    img {
      width: inherit;
      height: inherit;
      object-fit: cover;
    }
  }
  &__code {
    color: #888;
    font-size: 10px;
    font-weight: 400;
  }
  &__name {
    margin-top: 13px;
    font-size: 16px;
    font-weight: 500;
  }
  &__info {
    display: flex;
    justify-content: space-between;
    margin-top: 13px;
    button {
      display: block;
    }
  }
  &__wrapper {
    display: flex;
    gap: 10px;
  }
  &__old-price {
    font-size: 16px;
    font-weight: 400;
    color: #888;
    text-decoration: line-through;
    text-decoration-line: strikethrough;
  }
  &__btn {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0 7px;
    transition: opacity $animation-duration ease-in-out;
    &:hover {
      opacity: 0.7;
    }
    img {
      width: 21px;
      height: 21px;
    }
  }
}
</style>
