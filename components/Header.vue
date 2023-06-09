<template>
  <header class="header" v-if="headerData">
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
            :key="navItems.title"
            class="nav-li">
            <NuxtLink :to="navItems.page_reference[0].url">
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
import { getHeader, getAllEntries, filterHeaderNav } from "~/helper";
import { onEntryChange } from "~~/sdk";
import { useResponseStore } from "~~/store";
import { HeaderRes } from "~~/typescript/response";
const store = useResponseStore();

const headerData = ref<HeaderRes>();
const fetchHeaderData = async () => {
  const result = await getHeader();
  // only for dynamic pages
  const responsePages = await getAllEntries();
  const newHeaderRes = filterHeaderNav(responsePages, result);
  headerData.value = newHeaderRes;
  //ends
  store.setHeader(newHeaderRes);
};
onMounted(() => {
  onEntryChange(fetchHeaderData);
});
</script>
