<template>
  <div class="history">
    <div class="history__item" v-for="(link, i) in pageHistory" :key="i">
      <NuxtLink :href="link.path">{{ link.name }}</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Router } from "vue-router";

interface PageHistoryProps {
  router: Router;
}

const props = defineProps<PageHistoryProps>();

const { router } = toRefs(props);

const pageHistory = ref<{ name: string; path: string }[]>([]);

const getPageName = (path: string) => {
  const pageName = path.replace("/", "").replace("-", " ");
  return pageName.charAt(0).toUpperCase() + pageName.slice(1);
};

watch(
  router,
  (to, _) => {
    pageHistory.value.push({
      name: getPageName(to.currentRoute.value.path),
      path: to.currentRoute.value.path,
    });
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.history {
  display: flex;
  gap: 20px;
}
</style>
