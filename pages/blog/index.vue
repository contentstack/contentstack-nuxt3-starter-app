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
                <p v-html="list.body.slice(0, 250)" />
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
                <p v-html="component.body.slice(0, 80)" />
              </div>
            </NuxtLink> </template
        ></template>
      </div>
    </div>
  </main>
</template>

<script lang="tsx" setup>
import { getBlogList, getPage } from "~/helper";
import { onEntryChange } from "~/sdk";
import { ref, onMounted } from "vue";
import { useResponseStore } from "~~/store";
import dayjs from "dayjs";
import { BlogPost, Page } from "~~/typescript/pages";

const store = useResponseStore();
const banner = ref<Page>();
const recent = ref<BlogPost[]>([]);
const archived = ref<BlogPost[]>([]);

const fetchData = async () => {
  const response = await getPage("/blog");
  const { recentBlogs, archivedBlogs } = await getBlogList();
  const blogList = recentBlogs.concat(archivedBlogs);
  banner.value = response;
  recent.value = recentBlogs;
  archived.value = archivedBlogs;
  store.setPage(response);
  store.setBlogList(blogList);
  store.setBlogPost(null);
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
