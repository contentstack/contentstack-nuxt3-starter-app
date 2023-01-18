<template>
  <div class="member-main-section">
    <div v-if="data" class="member-head">
      <h2>{{ data.title_h2 }}</h2>
      <p>{{ data.description }}</p>
    </div>
    <div v-if="data" class="member-section">
      <template v-for="index in data.buckets" :key="index.title_h3">
        <div class="content-section">
          <img :src="index.icon.url" :alt="index.icon.title" />
          <h3>{{ index.title_h3 }}</h3>
          <p v-html="index.description"></p>
          <NuxtLink
            v-if="index.call_to_action.href"
            :to="index.call_to_action.href">
            {{ index.call_to_action.title }}--&gt;
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    required: true,
    type: Object,
  },
});
</script>
