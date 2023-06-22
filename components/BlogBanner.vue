<template v-if="data">
  <div>
    <div class="blog-page-banner" :style="{ background: `${data.bg_color}` }">
      <div class="blog-page-content">
        <h1 class="hero-title">
          {{ data.banner_title }}
        </h1>
        <p class="hero-description">
          {{ data.banner_description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { PropType } from "nuxt/dist/app/compat/capi";
import { HeroBanner } from "~~/typescript/components";
const props = defineProps({
  data: {
    required: true,
    type: Object as PropType<HeroBanner>,
  },
});
</script>
