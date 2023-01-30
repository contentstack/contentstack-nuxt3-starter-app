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
                :content="forceUpdate === 1 ? 'copied' : 'copy'"
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
              <JsonViewer :value="json" theme="jv-light" />
          </pre>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { JsonViewer } from "vue3-json-viewer";
import ToolTip from "./ToolTip.vue";
import { useRoute } from "vue-router";
import { useResponseStore } from "~~/store";

function filterObject(inputObject) {
  const unWantedProps = [
    "$",
    "_version",
    "ACL",
    "_owner",
    "_in_progress",
    "created_at",
    "created_by",
    "updated_at",
    "updated_by",
    "publish_details",
  ];
  for (const key in inputObject) {
    unWantedProps.includes(key) && delete inputObject[key];
    if (typeof inputObject[key] !== "object") {
      continue;
    }
    inputObject[key] = filterObject(inputObject[key]);
  }
  return inputObject;
}

const json = ref(null);
const forceUpdate = ref(0);
const route = useRoute();
const url = ref(route.fullPath);
const store = useResponseStore();

const getData = () => {
  const { getHeader, getFooter, getBlogList, getBlogPost, getPage } =
    useResponseStore();

  const response = {
    header: getHeader,
    footer: getFooter,
  };

  getPage && (response.page = getPage);
  getBlogPost && (response.blog_post = getBlogPost);
  getBlogList && (response.blog_lists = getBlogList);
  const jsonData = filterObject(response);
  json.value = jsonData;
  return jsonData;
};

const copyObject = async () => {
  forceUpdate.value = 1;
  await navigator.clipboard.writeText(JSON.stringify(json.value));
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
