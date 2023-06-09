<template>
  <main>
    <template v-if="banner">
      <BlogBanner
        v-show="banner !== null"
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
          <p v-html="data.body" />
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
                <p v-html="blog.body.slice(0, 80)" />
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
import { getBlogPost, getPage } from "~/helper";
import { onEntryChange } from "~/sdk";
import { useResponseStore } from "~~/store";
import { BlogPost, Page } from "~~/typescript/pages";

const banner = ref<Page>();
const data = ref<BlogPost>();
const store = useResponseStore();

const fetchData = async () => {
  const response = await getPage("/blog");
  const blogPost = await getBlogPost(`${window.location.pathname}`);
  banner.value = response;
  data.value = blogPost;
  store.setBlogPost(blogPost);
  store.setPage(response);
  store.setBlogList(null);
};
const formatData = (param: string) => {
  return dayjs(param).format("ddd, MMM D YYYY");
};
onMounted(() => {
  onEntryChange(() => {
    fetchData().catch((err) => console.error(err));
  });
});
</script>
