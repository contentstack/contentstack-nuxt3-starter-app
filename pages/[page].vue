<template>
  <RenderComponents
    v-if="data"
    :components="data.page_components"
    :page="data.title"
    :entry-uid="data.uid"
    :locale="data.locale" />
</template>

<script setup>
import { getPageRes } from "~/helper";
import { onEntryChange } from "~/sdk";
import { ref, onMounted } from "vue";
import { useResponseStore } from "~~/store";

const store = useResponseStore()

const data = ref(null);
const fetchData = async () => {
  let response = await getPageRes(`${window.location.pathname}`);

  data.value = response;
  store.setPage(response)
  store.setBlogList(null)
  store.setBlogPost(null)
};
onMounted(() => {
  onEntryChange(fetchData);
});
</script>
