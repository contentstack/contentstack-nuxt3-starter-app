<template>
  <div v-if="data" class="home-advisor-section">
    <template v-if="data.image_alignment === 'Left'">
      <img :src="data.image.url" :alt="data.image.filename" />
      <div class="home-content">
        <h2>{{ data.title_h2 }}</h2>
        <p>
          {{ data.description }}
        </p>
        <router-link
          v-if="data.call_to_action.title"
          aria-current="page"
          class="btn secondary-btn"
          to="/">
          {{ data.call_to_action.title }}
        </router-link>
      </div>
    </template>
    <template v-else>
      <div class="home-content">
        <h2>{{ data.title_h2 }}</h2>
        <p>
          {{ data.description }}
        </p>
        <router-link
          v-if="data.call_to_action.title"
          aria-current="page"
          class="btn secondary-btn"
          to="/">
          {{ data.call_to_action.title }}
        </router-link>
      </div>
      <img :src="data.image.url" :alt="data.image.filename" />
    </template>
  </div>
</template>

<script setup lang="tsx">
import { PropType } from "nuxt/dist/app/compat/capi";
import { Section } from "~~/typescript/components";
const props = defineProps({
  data: {
    required: true,
    type: Object as PropType<Section>,
  },
});
</script>
