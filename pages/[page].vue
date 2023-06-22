<template>
  <RenderComponents
    v-if="data"
    :components="data.page_components"
    :page="data.title"
    :entry-uid="data.uid"
    :locale="data.locale" />
</template>

<script lang="tsx" setup>
import { getPage } from "~/helper";
import { onEntryChange } from "~/sdk";
import { ref, onMounted } from "vue";
import { useResponseStore } from "~~/store";
import { Page } from "~~/typescript/pages";

const store = useResponseStore()

const data = ref<Page>();
const fetchData = async () => {
  let response = await getPage(`${window.location.pathname}`);

  data.value = response;
  store.setPage(response)
  store.setBlogList(null)
  store.setBlogPost(null)
};
onMounted(() => {
  onEntryChange(fetchData);
});
</script>
