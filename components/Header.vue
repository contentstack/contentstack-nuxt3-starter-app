<template>
  <header class="header" v-if="!isEmpty(headerData)">
    <template v-if="headerData.notification_bar.show_announcement">
      <div class="note-div">
        <span v-html="headerData.notification_bar.announcement_text" />
      </div>
    </template>
    <div class="max-width header-div">
      <div class="wrapper-logo">
        <NuxtLink
          aria-current="page"
          class="logo-tag"
          :title="headerData.title"
          to="/">
          <img
            class="logo"
            :src="headerData.logo.url"
            :alt="headerData.title" />
        </NuxtLink>
      </div>
      <input id="menu-btn" type="checkbox" class="menu-btn" />
      <label class="menu-icon" for="menu-btn">
        <span class="navicon" />
      </label>
      <nav class="menu">
        <ul class="nav-ul header-ul">
          <li
            v-for="navItems in headerData.navigation_menu"
            :key="navItems.label"
            class="nav-li">
            <NuxtLink :to="navItems.page_reference[0].url" :exact-active-class="'active'">
              {{ navItems.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="json-preview">
        <ToolTip content="JSON Preview" direction="top">
          <span data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <img src="../static/json.svg" alt="JSON Preview icon" />
          </span>
        </ToolTip>
      </div>
    </div>
  </header>
</template>

<script lang="tsx" setup>
import {isEmpty} from "lodash";
import { useFilter } from "~/composables/useFilter";
import { usePageEntries } from "~/composables/usePageEntries";
import { useResponseStore } from "~~/store";
import { HeaderRes } from "~~/typescript/response";

const store = useResponseStore();
const headerData = ref<HeaderRes>();
const {headerFilter} = useFilter()
const route = useRoute();
const header = (await useEntries({
  contentTypeUid: "header",
  referenceFieldPath: ["navigation_menu.page_reference"],
  jsonRtePath: ["notification_bar.announcement_text"],
})) as HeaderRes[][];
const allEntries =await usePageEntries()
const updatedHeader = headerFilter(allEntries, header[0][0])
headerData.value = updatedHeader;
store.setHeader(updatedHeader);
</script>
