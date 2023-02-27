<template>
  <Navbar />
  <DevTools />
  <NuxtPage />
  <Footer />
</template>

<script>
import "@contentstack/live-preview-utils/dist/main.css";
import "vue3-json-viewer/dist/index.css";
</script>
<style>
#cslp-tooltip {
  display: none !important;
}
</style>
