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

const data = ref(null);
const fetchData = async () => {
  let response = await getPageRes("/");
  data.value = response;
};

onMounted(() => {
  onEntryChange(fetchData);
});
</script>
