<template>
  <div class="default-layout">
    <nav>
      <NuxtLink href="/">Главная</NuxtLink>
      <NuxtLink href="/systemi-hranenia">Системы хранения</NuxtLink>
      <NuxtLink href="/systemi-hranenia/komplekti-stellajnih-sistem"
        >Комплекты стеллажных систем</NuxtLink
      >
    </nav>
    <page-history :current-url="$route.path" />
    <slot />
  </div>
</template>
