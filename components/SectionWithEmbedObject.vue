<template>
  <div v-if="data">
    <div
      v-if="data.html_code_alignment === 'Left'"
      class="contact-page-section max-width">
      <div class="contact-page-content">
        <h1>{{ data.title }}</h1>
        <client-only>
          <div
            v-if="data.description"
            v-dompurify-html="data.description"></div>
        </client-only>
      </div>
      <div class="contact-page-form" v-dompurify-html="data.html_code"></div>
    </div>
    <div
      v-if="data.html_code_alignment === 'Right'"
      class="contact-maps-section max-width">
      <div class="maps-details" v-dompurify-html="data.html_code"></div>
      <div class="contact-maps-content">
        <h2>{{ data.title }}</h2>
        <div v-if="data.description" v-dompurify-html="data.description"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { PropType } from "nuxt/dist/app/compat/capi";
import { SectionWithHtmlCode } from "~~/typescript/components";
const props = defineProps({
  data: {
    required: true,
    type: Object as PropType<SectionWithHtmlCode>,
  },
});
</script>
