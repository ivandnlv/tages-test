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
import type { SortObject } from "~/store/complects-goods";
import { useComplectsGoodsStore } from "~/store/complects-goods";
import type { GroupItem } from "~/types/ui";

const complectsGoodsStore = useComplectsGoodsStore();
const {
  allSortObjects,
  setCurrentMaterial,
  setCurrentSortObject,
  fetchMaterials,
} = complectsGoodsStore;
const { currentSortObject, currentMaterial, allMaterials, materialStatus } =
  toRefs(complectsGoodsStore);

const changeSort = (item: SortObject) => {
  setCurrentSortObject(item);
};

const onMaterialsClick = () => {
  fetchMaterials();
};

const changeMaterial = (item: GroupItem) => {
  setCurrentMaterial(item);
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
