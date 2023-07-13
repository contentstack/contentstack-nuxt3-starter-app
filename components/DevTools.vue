<template>
  <div
    id="staticBackdrop"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabIndex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true">
    <div
      class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="staticBackdropLabel" class="modal-title">JSON Preview</h2>
          <div class="tooltip-wrapper ms-auto">
            <span
              class="json-copy"
              v-on:click="copyObject(JSON.stringify(json))"
              aria-hidden="true">
              <ToolTip
                :content="forceUpdate === 0 ? 'copy' : 'copied'"
                direction="top">
                <img src="../static/copy.svg" alt="copy icon" />
              </ToolTip>
            </span>
          </div>
          <button
            type="button"
            class="btn-close m-0 ms-3"
            data-bs-dismiss="modal"
            aria-label="Close" />
        </div>
        <div class="modal-body">
          <pre v-if="json" id="jsonViewer">
              <JsonViewer :value="json" theme="jv-light" :expand-depth="1" />
          </pre>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { JsonViewer } from "vue3-json-viewer";
import { useRoute } from "vue-router";
import { useResponseStore } from "~~/store";
import { JSONProp } from "~~/typescript/components";
import { FooterRes, HeaderRes } from "~~/typescript/response";
import { BlogPost, Page } from "~~/typescript/pages";
import { useFilters } from "~/composables/useFilters";

const json = ref(null);
const forceUpdate = ref(0);
const route = useRoute();
const url = ref(route.fullPath);
const { jsonFilter } = useFilters();

const getData = () => {
  const { getHeader, getFooter, getBlogList, getBlogPost, getPage } =
    useResponseStore();

  const response: JSONProp = {
    header: getHeader as HeaderRes,
    footer: getFooter as FooterRes,
  };

  const { $_ } = useNuxtApp();
  !$_.isEmpty(getPage) && (response.page = getPage as Page);
  !$_.isEmpty(getBlogPost) && (response.blog_post = getBlogPost as BlogPost);
  !$_.isEmpty(getBlogList) && (response.blog_lists = getBlogList as BlogPost[]);
  const jsonData = jsonFilter(response);
  json.value = jsonData;
  return jsonData;
};

const copyObject = async (json: string) => {
  forceUpdate.value = 1;
  await navigator.clipboard.writeText(json);
  setTimeout(() => {
    forceUpdate.value = 0;
  }, 3000);
};
onMounted(() => {
  getData();
});
watchEffect(() => {
  url.value = route.fullPath;
  getData();
});
</script>
