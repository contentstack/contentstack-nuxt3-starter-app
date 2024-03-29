<template>
  <footer>
    <div class="max-width footer-div" v-if="!$_.isEmpty(footerData)">
      <div class="col-quarter">
        <NuxtLink
          aria-current="page"
          class="logo-tag"
          :title="footerData.title"
          to="/">
          <img
            class="logo"
            :src="footerData.logo.url"
            :alt="footerData.title" />
        </NuxtLink>
      </div>
      <div class="col-half">
        <nav>
          <ul class="nav-ul">
            <li
              v-for="navItems in footerData.navigation.link"
              :key="navItems.title"
              class="footer-nav-li">
              <NuxtLink :to="navItems.href">
                {{ navItems.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-quarter social-link">
        <div class="social-nav">
          <template
            v-for="index in footerData.social.social_share"
            :key="index.title">
            <NuxtLink :to="index.link.href" :title="index.link.title">
              <img :src="index.icon.url" :alt="index.icon.title" />
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
    <div
      class="copyright"
      v-if="footerData?.copyright"
      v-dompurify-html="footerData?.copyright" />
  </footer>
</template>

<script lang="tsx" setup>
import { useFilters } from "~/composables/useFilters";
import { useAllEntries } from "~/composables/useAllEntries";
import { usePageEntries } from "~/composables/usePageEntries";
import { useResponseStore } from "~~/store";
import { FooterRes } from "~~/typescript/response";

const store = useResponseStore();
const footerData = ref<FooterRes>();
const { footerFilter } = useFilters();

const footer = (await useAllEntries({
  contentTypeUid: "footer",
  referenceFieldPath: undefined,
  jsonRtePath: ["copyright"],
})) as FooterRes[][];
const allEntries = await usePageEntries();
// to create nav routes for dynamic pages
const updatedFooter = footerFilter(allEntries, footer[0][0]);

footerData.value = updatedFooter;
// global store for footer
store.setFooter(updatedFooter);
</script>
