import type { SEO } from "./seo.model";

export interface Img {
  $: Img;
  url: string;
  title: string;
  filename: string;
}

export interface Link {
  $: Link;
  title: string;
  href: string;
}
export interface HeroBanner {
  $: HeroBanner;
  banner_title: string;
  bg_color: string;
  banner_image: Img;
  text_color: string;
  call_to_action: Link;
  banner_description: string;
}

export interface Section {
  $: Section;
  image: Img;
  title_h2: string;
  description: string;
  call_to_action: Link;
  image_alignment: string;
}

export interface SectionWithBuckets {
  $: SectionWithBuckets;
  buckets: {
    $: any;
    icon: Img;
    title_h3: string;
    description: string;
    call_to_action: Link;
  }[];
  title_h2: string;
  description: string;
  bucket_tabular: boolean;
}

export interface FromBlog {
  $: FromBlog;
  title_h2: string;
  view_articles: Link;
  featured_blogs: {
    $: any;
    url: string;
    body: string;
    date: string;
    title: string;
    featured_image: Img;
  }[];
}

export interface SectionWithCards {
  $: SectionWithCards;
  cards: {
    title_h3: string;
    description: string;
    call_to_action: Link;
  }[];
}

export interface OurTeam {
  $: OurTeam;
  title_h2: string;
  description: string;
  employees: {
    $: any;
    image: Img;
    name: string;
    designation: string;
  }[];
}

export interface SectionWithHtmlCode {
  $: SectionWithHtmlCode;
  title: string;
  html_code: string;
  description: string;
  html_code_alignment: string;
}

export interface Widget {
  $: Widget;
  widget: {
    title_h2: string;
    type: string;
    $: any;
  };
}
export interface Page {
  $: Page;
  title: string;
  url: string;
  seo: SEO;
  uid: string;
  locale: string;
  page_components: [
    {
      widget: Widget;
      section: Section;
      our_team: OurTeam;
      from_blog: FromBlog;
      hero_banner: HeroBanner;
      section_with_cards: SectionWithCards;
      section_with_buckets: SectionWithBuckets;
      section_with_html_code: SectionWithHtmlCode;
    }
  ];
}
