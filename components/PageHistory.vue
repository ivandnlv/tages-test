<template>
  <div class="history">
    <div class="history__item" v-for="(link, i) in linksArr" :key="i">
      <NuxtLink :href="link.href">{{ link.name }}</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const linksArr = ref();
</script>

<style lang="scss" scoped>
.history {
  display: flex;
  gap: 20px;
}
</style>
