import { defineStore } from "pinia";
import { BlogPost, Page } from "~~/typescript/pages";
import { FooterRes, HeaderRes } from "~~/typescript/response";
export const useResponseStore = defineStore("Response", {
  state: () => ({
    header: {} as HeaderRes,
    footer: {} as FooterRes,
    page: {} as Page | {},
    blogPost: {} as BlogPost | {},
    blogList: [] as BlogPost[] | [],
  }),
  getters: {
    getHeader: (state):HeaderRes => state.header,
    getFooter: (state):FooterRes => state.footer,
    getPage: (state):Page | {} => state.page,
    getBlogPost: (state):BlogPost | {} => state.blogPost,
    getBlogList: (state):BlogPost[] => state.blogList,
  },
  actions: {
    setHeader(payload:HeaderRes) {
      this.$state.header = payload;
    },
    setFooter(payload:FooterRes) {
      this.$state.footer = payload;
    },
    setPage(payload:Page | {}) {
      this.$state.page = payload;
    },
    setBlogPost(payload:BlogPost | {}) {
      this.$state.blogPost = payload;
    },
    setBlogList(payload:BlogPost[]) {
      this.$state.blogList = payload;
    },
  },
});
