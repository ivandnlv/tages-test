<template>
  <div class="default-layout">
    <nav class="default-layout__nav">
      <NuxtLink href="/" class="default-layout__nav-item" active-class="_active"
        >Главная</NuxtLink
      >
      <NuxtLink
        href="/systemi-hranenia"
        class="default-layout__nav-item"
        active-class="_active"
        >Системы хранения</NuxtLink
      >
      <NuxtLink
        href="/systemi-hranenia/komplekti-stellajnih-sistem"
        class="default-layout__nav-item"
        active-class="_active"
        >Комплекты стеллажных систем</NuxtLink
      >
    </nav>
    <div class="default-layout__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/sass/variables";
.default-layout {
  max-width: 1489px;
  margin: 32px auto 103px auto;
  @media (max-width: 1550px) {
    max-width: 1200px;
  }
  @media (max-width: 1250px) {
    max-width: 900px;
  }
  @media (max-width: 950px) {
    max-width: 600px;
  }
  @media (max-width: 650px) {
    max-width: 100%;
    padding: 0 50px;
  }
  &__content {
    margin-top: 32px;
  }
  &__nav {
    display: flex;
    overflow-x: auto;
    gap: 30px;
    width: 100%;
    @media (max-width: 650px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &-item {
        &::before {
          display: none;
        }
      }
    }
    &-item {
      position: relative;
      text-decoration: none;
      color: #828282;
      font-size: 16px;
      font-weight: 400;
      transition: color $animation-duration ease-in-out;
      &:first-of-type {
        &::before {
          display: none;
        }
      }
      &::before {
        position: absolute;
        left: -15px;
        color: #828282;
        content: "/";
      }
      &._active {
        color: #000;
      }
    }
  }
}
</style>
