<template>
  <div class="community-section">
    <div v-if="data" class="community-head">
      <h2>{{ data.title_h2 }}</h2>
      <NuxtLink
        class="btn secondary-btn article-btn"
        :to="data.view_articles.href">
        {{ data.view_articles.title }}
      </NuxtLink>
    </div>
    <div v-if="data" class="home-featured-blogs">
      <template v-for="index in data.featured_blogs" :key="index.titles">
        <div class="featured-blog">
          <img
            :src="index.featured_image.url"
            class="blog-post-img"
            :alt="index.featured_image.title" />
          <div class="featured-content">
            <h3>{{ index.title }}</h3>
            <p v-html="index.body.slice(0, 255)"></p>
            <p>
              <NuxtLink class="blogpost-readmore" :to="index.url">
                Read More -->
              </NuxtLink>
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { PropType } from "nuxt/dist/app/compat/capi";
import { FromBlog } from "~~/typescript/components";
const props = defineProps({
  data: {
    required: true,
    type: Object as PropType<FromBlog>,
  },
});
</script>
