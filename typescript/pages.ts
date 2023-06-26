import {
  Widget,
  Section,
  OurTeam,
  FromBlog,
  HeroBanner,
  SectionWithCards,
  SectionWithBuckets,
  SectionWithHtmlCode,
} from "./components";

export type SEO = {
  enable_search_indexing: boolean;
  keywords: string;
  meta_description: string;
  meta_title: string;
};

export type AllEntries = {
  title: string;
  url: string;
  uid: string;
};

export type Img = {
  url: string;
  title: string;
  filename: string;
};

export type Link = {
  title: string;
  href: string;
};

export type ComponentsProps = {
  widget: Widget;
  section: Section;
  our_team: OurTeam;
  from_blog: FromBlog;
  hero_banner: HeroBanner;
  section_with_cards: SectionWithCards;
  section_with_buckets: SectionWithBuckets;
  section_with_html_code: SectionWithHtmlCode;
};
export type Page = {
  title: string;
  url: string;
  seo: SEO;
  uid: string;
  locale: string;
  page_components: ComponentsProps[];
};

export type BlogPost = {
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
    title: string;
    url: string;
    body: string;
  }[];
  is_archived: boolean;
};
