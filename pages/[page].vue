<template>
  <RenderComponents
    v-if="data"
    :components="data.page_components"
    :page="data.title"
    :entry-uid="data.uid"
    :locale="data.locale" />
</template>

<script lang="tsx" setup>
import { ref } from "vue";
import { useResponseStore } from "~~/store";
import { Page } from "~~/typescript/pages";

const store = useResponseStore();

const data = ref<Page>();
const route = useRoute();
const page = (await useEntriesByUrl({
  contentTypeUid: "page",
  entryUrl: route.path,
  referenceFieldPath: ["page_components.from_blog.featured_blogs"],
  jsonRtePath: [
    "page_components.from_blog.featured_blogs.body",
    "page_components.section_with_buckets.buckets.description",
    "page_components.section_with_html_code.description",
  ],
})) as Page[];
data.value = page[0];
store.setPage(page[0]);
store.setBlogList([]);
store.setBlogPost({});
</script>
