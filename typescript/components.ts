import { BlogPost, Img, Link, Page } from "./pages";
import { FooterRes, HeaderRes } from "./response";

export type HeroBanner = {
  banner_title: string;
  bg_color: string;
  banner_image?: Img;
  text_color?: string;
  call_to_action?: Link;
  banner_description?: string;
};

export type Section = {
  image: Img;
  title_h2: string;
  description: string;
  call_to_action: Link;
  image_alignment: string;
};

export type SectionWithBuckets = {
  buckets: {
    icon: Img;
    title_h3: string;
    description: string;
    call_to_action: Link;
  }[];
  title_h2: string;
  description: string;
  bucket_tabular: boolean;
};

export type FromBlog = {
  title_h2: string;
  view_articles: Link;
  featured_blogs: {
    url: string;
    body: string;
    date: string;
    title: string;
    featured_image: Img;
  }[];
};

export type SectionWithCards = {
  cards: {
    title_h3: string;
    description: string;
    call_to_action: Link;
  }[];
};

export type OurTeam = {
  title_h2: string;
  description: string;
  employees: {
    image: Img;
    name: string;
    designation: string;
  }[];
};

export type SectionWithHtmlCode = {
  title: string;
  html_code: string;
  description: string;
  html_code_alignment: string;
};

export type Widget = {
  widget: {
    title_h2: string;
    type: string;
  };
};

export type Seo = {
  property: string;
  content: string;
  keywords: string;
};

export type JSONProp = {
  header: HeaderRes;
  footer: FooterRes;
  page?: Page;
  blog_post?: BlogPost;
  blog_lists?: BlogPost[];
};
