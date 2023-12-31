<template>
  <div class="group" ref="groupRef">
    <span class="group__title"><slot /></span>
    <div class="group__wrapper">
      <button class="group__item group__current" @click="toggleGroupVisible">
        <span>{{ output.title }}</span>
        <NuxtImg
          src="/icons/arrow-down.svg"
          :class="isGroupVisible ? '_up' : null"
        />
      </button>
      <div class="group__items" v-if="isGroupVisible">
        <button
          class="group__item"
          v-for="(groupItem, i) in allGroupItems"
          :key="i"
          @click="onOutputChange(groupItem)"
        >
          {{ groupItem.title }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { GroupItem } from "~/types/ui";

interface UiGroupEmits {
  (e: "changeOutput", item: any): void;
}

interface UiGroupProps {
  output: GroupItem;
  allGroupItems: GroupItem[];
}

const groupRef = ref<HTMLDivElement | null>(null);

const props = defineProps<UiGroupProps>();
const emit = defineEmits<UiGroupEmits>();
const { output, allGroupItems } = toRefs(props);

const onOutputChange = (groupItem: GroupItem) => {
  toggleGroupVisible();
  emit("changeOutput", groupItem);
};

const isGroupVisible = ref(false);

const handler = (e: Event) => {
  if (
    groupRef.value &&
    e.target instanceof HTMLElement &&
    !groupRef.value.contains(e.target)
  ) {
    isGroupVisible.value = false;
    document.removeEventListener("mousedown", handler);
  }
};

const toggleGroupVisible = () => {
  if (!isGroupVisible.value) {
    document.addEventListener("mousedown", handler);
    isGroupVisible.value = true;
  } else {
    document.removeEventListener("mousedown", handler);
    isGroupVisible.value = false;
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/variables";
.group {
  width: 100%;
  margin-top: 20px;
  &__title {
    color: #4f4f4f;
    font-size: 12px;
    font-weight: 400;
    padding-left: 16px;
  }
  &__wrapper {
    margin-top: 6px;
    width: 100%;
    position: relative;
  }
  &__item {
    display: block;
    border: none;
    background: #f2f2f2;
    font-size: 14px;
    font-weight: 400;
    padding: 10px 16px;
    width: 100%;
    span {
      text-align: left;
    }
  }
  &__current {
    cursor: pointer;
    display: flex;
    align-items: center;
    img {
      transition: transform $animation-duration ease-in-out;
      &._up {
        position: absolute;
        z-index: 101;
        top: 8px;
        right: 16px;
        transform: rotate(180deg);
      }
    }
    span {
      flex: 1 1 auto;
    }
    img {
      width: 24px;
      height: 24px;
    }
  }
  &__items {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    button {
      display: block;
      border: none;
      text-align: left;
    }
  }
}
</style>
