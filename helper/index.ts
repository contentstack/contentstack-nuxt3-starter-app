import { getEntries, getEntryByUrl } from '../sdk'
import { HeaderRes, FooterRes } from '../typescript/response'
import { Page, BlogPost } from '../typescript/pages'

export const getHeader = async (): Promise<HeaderRes> => {
  const response = (await getEntries({
    contentTypeUid: 'header',
    referenceFieldPath: ['navigation_menu.page_reference'],
    jsonRtePath: ['notification_bar.announcement_text'],
  })) as HeaderRes[][]
  return response[0][0]
}

export const getFooter = async (): Promise<FooterRes> => {
  const response = (await getEntries({
    contentTypeUid: 'footer',
    referenceFieldPath: undefined,
    jsonRtePath: ['copyright'],
  })) as FooterRes[][]
  return response[0][0]
}

export const getAllEntries = async (): Promise<Page[]> => {
  const response = (await getEntries({
    contentTypeUid: 'page',
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  })) as Page[]
  return response
}

export const getPage = async (entryUrl: string): Promise<Page> => {
  const response = (await getEntryByUrl({
    contentTypeUid: 'page',
    entryUrl,
    referenceFieldPath: ['page_components.from_blog.featured_blogs'],
    jsonRtePath: [
      'page_components.from_blog.featured_blogs.body',
      'page_components.section_with_buckets.buckets.description',
      'page_components.section_with_html_code.description',
    ],
  })) as Page[]
  return response[0]
}

export const getBlogList = async () => {
  const response = (await getEntries({
    contentTypeUid: 'blog_post',
    referenceFieldPath: ['author', 'related_post'],
    jsonRtePath: ['body'],
  })) as BlogPost[][]
  const recentBlogs: BlogPost[] = []
  const archivedBlogs: BlogPost[] = []
  response[0].forEach((blog) => {
    if (blog.is_archived) {
      archivedBlogs.push(blog)
    } else {
      recentBlogs.push(blog)
    }
  })  
  return {recentBlogs, archivedBlogs}
}

export const getBlogPost = async (entryUrl: string): Promise<BlogPost> => {
  const response = (await getEntryByUrl({
    contentTypeUid: 'blog_post',
    entryUrl,
    referenceFieldPath: ['author', 'related_post'],
    jsonRtePath: ['body', 'related_post.body'],
  })) as BlogPost[]
  return response[0]
}

export const filterHeaderNav = (
  allEntries: Page[],
  headerRes: HeaderRes
): HeaderRes => {
  const navHeaderList = headerRes.navigation_menu
  if (allEntries.length !== navHeaderList.length) {
    allEntries.forEach((entry) => {
      const newNavFound = navHeaderList.find(
        (navLink) => navLink.label === entry.title
      )
      if (!newNavFound) {
        navHeaderList.push({
          label: entry.title,
          page_reference: [{ title: entry.title, url: entry.url }],
        })
      }
    })
  }
  headerRes.navigation_menu = navHeaderList
  return headerRes
}

export const filterFooterLinks = (
  allEntries: Page[],
  footerRes: FooterRes
): FooterRes => {
  const navFooterList = footerRes.navigation.link
  if (allEntries.length !== footerRes.navigation.link.length) {
    allEntries.forEach((entry) => {
      const newLinkFound = footerRes.navigation.link.find(
        (link) => link.title === entry.title
      )
      if (!newLinkFound) {
        navFooterList.push({ title: entry.title, href: entry.url })
      }
    })
  }
  footerRes.navigation.link = navFooterList
  return footerRes
}

export const filterObject = (inputObject: any) => {
  const unWantedProps = [
    'uid',
    '_version',
    '_owner',
    'ACL',
    '_in_progress',
    'created_at',
    'created_by',
    'updated_at',
    'updated_by',
    'publish_details',
  ]
  for (const key in inputObject) {
    unWantedProps.includes(key) && delete inputObject[key]
    if (typeof inputObject[key] !== 'object') {
      continue
    }
    inputObject[key] = filterObject(inputObject[key])
  }
  return inputObject
}
