export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    public: {
      apiKey: process.env.CONTENTSTACK_API_KEY,
      deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN,
      environment: process.env.CONTENTSTACK_ENVIRONMENT,
      region: process.env.CONTENTSTACK_REGION,
      managementToken: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
      apiHost: process.env.CONTENTSTACK_API_HOST,
      appHost: process.env.CONTENTSTACK_APP_HOST,
      branch: process.env.CONTENTSTACK_BRANCH,
      livePreview: process.env.CONTENTSTACK_LIVE_PREVIEW,
    },
  },
  plugins: [
    { src: "~/plugins/lodash.ts" },
    { src: "~/plugins/contentstack.ts" },
  ],
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
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
      },
    ],
  ],
  typescript: {
    tsConfig: {
      allowJs: true,
      noImplicitAny: false,
    },
  },
});
