<template>
  <main>
    <template v-if="banner">
      <BlogBanner
        v-if="!isEmpty(banner)"
        :data="banner?.page_components[0].hero_banner" />
    </template>
    <template v-if="data">
      <div
        class="blog-container"
        :data-pageref="data.uid"
        data-contenttype="blog_post"
        :data-locale="data.locale">
        <div class="blog-detail">
          <h2>{{ data.title }}</h2>
          <span>
            {{ formatData(data.date) }},
            <strong>{{ data.author[0].title }}</strong>
          </span>
          <span v-dompurify-html="data.body"> </span>
        </div>
        <div v-if="data" class="blog-column-right">
          <div class="related-post">
            <div></div>
            <h2>{{ banner?.page_components[2].widget.title_h2 }}</h2>
            <template v-for="(blog, index) in data.related_post" :key="index">
              <div>
                <NuxtLink :key="index" :to="blog.url">
                  <h4>{{ blog.title }}</h4>
                </NuxtLink>
                <div v-dompurify-html="blog.body.slice(0, 80)" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>

<script lang="tsx" setup>
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { useResponseStore } from "~~/store";
import { BlogPost, Page } from "~~/typescript/pages";

const banner = ref<Page>();
const data = ref<BlogPost>();
const store = useResponseStore();
// banner response
const page = (await useEntriesByUrl({
  contentTypeUid: "page",
  entryUrl: "/blog",
  referenceFieldPath: ["page_components.from_blog.featured_blogs"],
  jsonRtePath: [
    "page_components.from_blog.featured_blogs.body",
    "page_components.section_with_buckets.buckets.description",
    "page_components.section_with_html_code.description",
  ],
})) as Page[];
const route = useRoute();
// blog post response
const post = (await useEntriesByUrl({
  contentTypeUid: "blog_post",
  entryUrl: route.path,
  referenceFieldPath: ["author", "related_post"],
  jsonRtePath: ["body", "related_post.body"],
})) as BlogPost[];

banner.value = page[0];
data.value = post[0];
store.setPage(page[0]);
store.setBlogList([]);
store.setBlogPost(post[0]);

const formatData = (param: string) => {
  return dayjs(param).format("ddd, MMM D YYYY");
};
</script>
