import { Img, Link } from "./pages"

export type FooterRes= {
  uid: string
  title: string
  copyright: string
  logo: Img
  navigation: {
    link: Link[]
  }
  social: {
    social_share: {
      icon: Img
      link: Link
    }[]
  }
}

export type HeaderRes= {
  title: string
  uid: string
  logo: Img
  navigation_menu: {
    label: string
    page_reference: {
      title: string
      url: string
    }[]
  }[]
  notification_bar: {
    show_announcement: boolean
    announcement_text: string
  }
}