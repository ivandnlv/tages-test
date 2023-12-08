// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["assets/fonts/stylesheet.css"],
  modules: ["@nuxt/image", "@pinia/nuxt"],
});
