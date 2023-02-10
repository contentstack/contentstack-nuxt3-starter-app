// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "contentstack-nuxt3-starter-app",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1,minimum-scale=1",
        },
        { name: "theme-color", content: "#000000" },
        {
          name: "description",
          content: "Website created using Nuxtjs version 3",
        },
      ],
      htmlAttrs: {
        lang: "en",
      },
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js",
          integrity:
            "sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa",
          crossorigin: "anonymous",
        },
      ],
      link: [
        {
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css",
          rel: "stylesheet",
          integrity:
            "sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx",
          crossorigin: "anonymous",
        },
      ],
    },
  },
  css: [
    "~/assets/styles/style.css",
    "~/assets/styles/third-party.css",
    "~/assets/styles/tooltip.css",
  ],
  modules: [
    // ...
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // automatically imports `defineStore`
          "defineStore", // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],
});
