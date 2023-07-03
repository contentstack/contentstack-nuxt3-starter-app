<template>
  <main v-if="banner">
    <BlogBanner :data="banner.page_components[0].hero_banner" />
    <div
      class="blog-container"
      :data-pageref="banner.uid"
      data-contenttype="page"
      :data-locale="banner.locale">
      <div class="blog-column-left" v-if="recent">
        <template v-for="(list, index) in recent" :key="index">
          <div class="blog-list">
            <NuxtLink :to="list.url">
              <img
                alt="blog img"
                class="blog-list-img"
                :src="list.featured_image.url" />
            </NuxtLink>
            <div class="blog-content">
              <NuxtLink :to="list.url">
                <h3>{{ list.title }}</h3>
              </NuxtLink>
              <p>
                {{ formatData(list.date) }},
                <template v-if="list.author">
                  <strong>{{ list.author[0].title }}</strong>
                </template>
              </p>
              <template v-if="list.body">
                <client-only>
                  <div v-dompurify-html="list.body.slice(0, 250)" />
                </client-only>
              </template>
              <NuxtLink :to="list.url">
                <span>Read more --&gt;</span>
              </NuxtLink>
            </div>
          </div>
        </template>
      </div>
      <div class="blog-column-right">
        <h2>{{ banner.page_components[1].widget.title_h2 }}</h2>
        <template v-if="archived">
          <template v-for="(component, index) in archived" :key="index">
            <NuxtLink :to="component.url">
              <div>
                <h4>{{ component.title }}</h4>
                <client-only>
                  <div v-dompurify-html="component.body.slice(0, 80)" />
                </client-only>
              </div>
            </NuxtLink> </template
        ></template>
      </div>
    </div>
  </main>
</template>

<script lang="tsx" setup>
import { ref } from "vue";
import { useResponseStore } from "~~/store";
import dayjs from "dayjs";
import { BlogPost, Page } from "~~/typescript/pages";

const store = useResponseStore();
const banner = ref<Page>();
const recent = ref<BlogPost[]>([]);
const archived = ref<BlogPost[]>([]);
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
banner.value = page[0];
const { recentBlogs, archivedBlogs } = await useBlogLists();
recent.value = recentBlogs;
archived.value = archivedBlogs;
store.setPage(page[0]);
store.setBlogList(recentBlogs.concat(archivedBlogs));
store.setBlogPost({});
const formatData = (param: string) => {
  return dayjs(param).format("ddd, MMM D YYYY");
};
</script>
