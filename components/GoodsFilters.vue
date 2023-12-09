<template>
  <div class="filters">
    <div class="filters__item">
      <ui-group
        :all-group-items="allSortObjects"
        @change-output="changeSort"
        :output="currentSortObject"
        >Сортировать по:</ui-group
      >
    </div>
    <div class="filters__item">
      <ui-group
        @click="onMaterialsClick"
        :all-group-items="allMaterials ?? []"
        @change-output="changeMaterial"
        :output="currentMaterial"
      >
        Метериал
      </ui-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import type { SortObject } from "~/store/complects-goods";
import { useComplectsGoodsStore, useGoodsStore } from "~/store/complects-goods";
import type { GroupItem } from "~/types/ui";

const complectsGoodsStore = useComplectsGoodsStore();
const {
  allSortObjects,
  setCurrentMaterial,
  setCurrentSortObject,
  fetchMaterials,
} = complectsGoodsStore;
const { currentSortObject, currentMaterial, allMaterials } =
  storeToRefs(complectsGoodsStore);

const goodsStore = useGoodsStore();
const { changeFilter, filterGoodsByMaterial, sortGoods } = goodsStore;

const changeSort = (item: SortObject) => {
  setCurrentSortObject(item);
  sortGoods(item.value);
};

const onMaterialsClick = () => {
  fetchMaterials();
};

const changeMaterial = (item: GroupItem) => {
  setCurrentMaterial(item);
  changeFilter("material", Number(item.value));
  filterGoodsByMaterial(Number(item.value));
};
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  gap: 24px;
  width: 100%;
  &__item {
    width: 288px;
  }
}
</style>
~/store/complects-goods/complects-goods~/store/complects-goods/complects-goods
