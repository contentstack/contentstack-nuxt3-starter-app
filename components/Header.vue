<template>
  <header class="header" v-if="!$_.isEmpty(headerData)">
    <template v-if="headerData.notification_bar.show_announcement">
      <div class="note-div">
        <span
          v-dompurify-html="headerData.notification_bar.announcement_text" />
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
            <NuxtLink
              :to="navItems.page_reference[0].url"
              :exact-active-class="'active'">
              {{ navItems.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="json-preview">
        <client-only>
          <ToolTip content="JSON Preview" direction="top">
            <span data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              <img src="../static/json.svg" alt="JSON Preview icon" />
            </span>
          </ToolTip>
        </client-only>
      </div>
    </div>
  </header>
</template>

<script lang="tsx" setup>
import { useFilters } from "~/composables/useFilters";
import { useAllEntries } from "~/composables/useAllEntries";
import { usePageEntries } from "~/composables/usePageEntries";
import { useResponseStore } from "~~/store";
import { HeaderRes } from "~~/typescript/response";

const store = useResponseStore();
const headerData = ref<HeaderRes>();
const { headerFilter } = useFilters();
const header = (await useAllEntries({
  contentTypeUid: "header",
  referenceFieldPath: ["navigation_menu.page_reference"],
  jsonRtePath: ["notification_bar.announcement_text"],
})) as HeaderRes[][];

const allEntries = await usePageEntries();
// to create nav routes for dynamic pages
const updatedHeader = headerFilter(allEntries, header[0][0]);
headerData.value = updatedHeader;

// global store to access header data
store.setHeader(updatedHeader);
</script>
