<template>
  <div class="member-main-section">
    <div v-if="data" class="member-head">
      <h2>{{ data.title_h2 }}</h2>
    </div>
    <div class="mission-section">
      <div class="mission-content-top">
        <template v-for="(bucket, index) in data.buckets">
          <template v-if="index < 2">
            <div :key="bucket.title_h3" class="mission-content-section">
              <img class="mission-icon" :src="bucket.icon.url" alt="art work" />
              <div class="mission-section-content">
                <h3>{{ bucket.title_h3 }}</h3>
                <div v-dompurify-html="bucket.description"></div>
              </div>
            </div>
          </template>
        </template>
      </div>
      <div v-if="data" class="mission-content-bottom">
        <template v-for="(bucket, index) in data.buckets">
          <template v-if="index >= 2">
            <div :key="bucket.title_h3" class="mission-content-section">
              <img class="mission-icon" :src="bucket.icon.url" alt="art work" />
              <div class="mission-section-content">
                <h3>{{ bucket.title_h3 }}</h3>
                <div v-dompurify-html="bucket.description"></div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { PropType } from "nuxt/dist/app/compat/vue-demi";
import { SectionWithBuckets } from "~~/typescript/components";
const props = defineProps({
  data: {
    required: true,
    type: Object as PropType<SectionWithBuckets>,
  },
});
</script>
