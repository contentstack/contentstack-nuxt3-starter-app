import getter from "~/sdk";
import { addEditableTags } from "@contentstack/utils";

// const liveEdit = import.meta.env.VITE_CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const getHeaderRes = async () => {
  const response: any = await getter.getEntry({
    contentTypeUid: "header",
    referenceFieldPath: ["navigation_menu.page_reference"],
    jsonRtePath: ["notification_bar.announcement_text"],
  });
  if (typeof window !== "undefined") {
    addEditableTags(response[0], "header", true);
  }
  // liveEdit && addEditableTags(response[0], "header", true);
  return response[0];
};

export const getFooterRes = async () => {
  const response: any = await getter.getEntry({
    contentTypeUid: "footer",
    referenceFieldPath: undefined,
    jsonRtePath: ["copyright"],
  });
  // liveEdit && addEditableTags(response[0], "footer", true);
  return response[0];
};

export const getAllEntries = async () => {
  const response: any = await getter.getEntry({
    contentTypeUid: "page",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  });
  // liveEdit && response.forEach((entry: any) => addEditableTags(entry, "page", true));
  return response;
};

export const getPageRes = async (entryUrl: string) => {
  const response: any = await getter.getEntryByUrl({
    contentTypeUid: "page",
    entryUrl,
    referenceFieldPath: ["page_components.from_blog.featured_blogs"],
    jsonRtePath: [
      "page_components.from_blog.featured_blogs.body",
      "page_components.section_with_buckets.buckets.description",
      "page_components.section_with_html_code.description",
    ],
  });
  // liveEdit && addEditableTags(response[0], "page", true);
  return response[0];
};

export const getBlogListRes = async () => {
  const response: any = await getter.getEntry({
    contentTypeUid: "blog_post",
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body"],
  });
  // liveEdit && response.forEach((entry: any) => addEditableTags(entry, "blog_post", true));
  return response;
};

export const getBlogPostRes = async (entryUrl: string) => {
  const response: any = await getter.getEntryByUrl({
    contentTypeUid: "blog_post",
    entryUrl,
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body", "related_post.body"],
  });
  // liveEdit && addEditableTags(response[0], "blog_post", true);
  return response[0];
};
