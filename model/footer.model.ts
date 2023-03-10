import type { Img, Link } from "./page.model";

export interface FooterModel {
  $: FooterModel;
  uid: string;
  title: string;
  copyright: string;
  logo: Img;
  navigation: {
    link: Link[];
  };
  social: {
    social_share: {
      icon: Img;
      link: Link;
    }[];
  };
}
