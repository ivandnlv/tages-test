<template>
  <div class="default-layout">
    <nav>
      <NuxtLink href="/">Главная</NuxtLink>
      <NuxtLink href="/systemi-hranenia">Системы хранения</NuxtLink>
      <NuxtLink href="/systemi-hranenia/komplekti-stellajnih-sistem"
        >Комплекты стеллажных систем</NuxtLink
      >
    </nav>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { GroupItem } from "~/types/ui";

const { currentRoute } = useRouter();

const sort = ref<GroupItem>({
  title: "По возрастанию",
  value: "ASC",
});

const changeSort = (val: GroupItem) => {
  sort.value = val;
};

const sorts = [
  {
    title: "По возрастанию",
    value: "ASC",
  },
  {
    title: "По убыванию",
    value: "DESC",
  },
];
</script>

<style lang="scss" scoped>
.default-layout {
  max-width: 1489px;
  margin: 32px auto 103px auto;
}
</style>
