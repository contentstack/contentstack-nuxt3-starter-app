<template>
  <footer>
    <div class="max-width footer-div" v-if="footerData">
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
            <NuxtLink :to="index.link.href" :title="index.title">
              <img :src="index.icon.url" :alt="index.icon.title" />
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
    <div
      class="copyright"
      v-if="footerData?.copyright"
      v-html="footerData?.copyright" />
  </footer>
</template>

<script lang="tsx" setup>
import { getFooter,getAllEntries,filterFooterLinks } from "~/helper";
import { onEntryChange } from "~~/sdk";
import { useResponseStore } from "~~/store";
import { FooterRes } from "~~/typescript/response";
const store = useResponseStore();
const footerData = ref<FooterRes>();
const fetchFooterData = async () => {
  let response = await getFooter();
  // only for dynamic pages
  const responsePages = await getAllEntries();
  const newFooterRes = filterFooterLinks(responsePages, response);
  footerData.value = newFooterRes;
  // ends
  store.setFooter(response);
};
onMounted(() => {
  onEntryChange(fetchFooterData);
});
</script>
