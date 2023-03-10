import type { SEO } from "./seo.model";
import type { Img } from "./page.model";

export interface BlogPostModel {
  $: BlogPostModel;
  title: string;
  url: string;
  seo: SEO;
  uid: string;
  body: string;
  locale: string;
  author: [{ $: any; title: string }];
  date: string;
  featured_image: Img;
  related_post: {
    $: any;
    title: string;
    body: string;
  };
  is_archived: boolean;
}
