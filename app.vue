<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const router = useRouter();

onMounted(() => {
  router.push("/systemi-hranenia/komplekti-stellajnih-sistem");
});
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "SF UI Display";
}

h1 {
  font-size: 36px;
  font-weight: 600;
}
</style>
