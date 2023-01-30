import { defineStore } from "pinia";

export const useResponseStore = defineStore("Response", {
  state: () => ({
    header: {},
    footer: {},
    page: {},
    blogPost: {},
    blogList: [],
  }),
  getters: {
    getHeader: (state) => state.header,
    getFooter: (state) => state.footer,
    getPage: (state) => state.page,
    getBlogPost: (state) => state.blogPost,
    getBlogList: (state) => state.blogList,
  },
  actions: {
    setHeader(payload) {
      this.$state.header = payload;
    },
    setFooter(payload) {
      this.$state.footer = payload;
    },
    setPage(payload) {
      this.$state.page = payload;
    },
    setBlogPost(payload) {
      this.$state.blogPost = payload;
    },
    setBlogList(payload) {
      this.$state.blogList = payload;
    },
  },
});
