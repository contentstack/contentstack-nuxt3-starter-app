import { BlogPost } from "~/typescript/pages";

export const useBlogLists = async () => {
  const blogPosts = (await useAllEntries({
    contentTypeUid: "blog_post",
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body"],
  })) as unknown as BlogPost[][];
  const recentBlogs: BlogPost[] = [];
  const archivedBlogs: BlogPost[] = [];
  blogPosts[0].forEach((blog) => {
    if (blog.is_archived) {
      archivedBlogs.push(blog);
    } else {
      recentBlogs.push(blog);
    }
  });
  return { recentBlogs, archivedBlogs };
};
