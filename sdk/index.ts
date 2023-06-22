import * as Utils from '@contentstack/utils'
import ContentstackLivePreview from '@contentstack/live-preview-utils'
import {
  customHostUrl,
  initializeContentStackSdk,
  isValidCustomHostUrl
} from './utils'

type GetEntry = {
  contentTypeUid: string
  referenceFieldPath?: string[]
  jsonRtePath?: string[]
}

type GetEntryByUrl = {
  entryUrl?: string
  contentTypeUid: string
  referenceFieldPath?: string[]
  jsonRtePath?: string[]
}

const { VITE_CONTENTSTACK_API_HOST } = import.meta.env;
const Stack = initializeContentStackSdk()
let customHostBaseUrl = VITE_CONTENTSTACK_API_HOST as string
customHostBaseUrl = customHostUrl(customHostBaseUrl)

const renderOption = {
  ['span']: (node: any, next: any) => {
    return next(node.children)
  }
}

/**
 * initialize live preview
 */
ContentstackLivePreview.init({
  enable: true,
  // @ts-ignore
  stackSdk: Stack,
  ssr: false
})?.catch((err) => {
  console.error(err)
})

// set host url only for custom host or non prod base url's
if (isValidCustomHostUrl(customHostBaseUrl)) {
  Stack.setHost(customHostBaseUrl)
}

export const onEntryChange = ContentstackLivePreview.onEntryChange

/**
 *
 * fetches all the entries from specific content-type
 * @param {* content-type uid} contentTypeUid
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 *
 */
export const getEntries = ({
  contentTypeUid,
  referenceFieldPath,
  jsonRtePath
}: GetEntry) => {
  return new Promise((resolve, reject) => {
    const query = Stack.ContentType(contentTypeUid).Query()
    if (referenceFieldPath) query.includeReference(referenceFieldPath)
    query
      .toJSON()
      .find()
      .then(
        (result) => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption
            })
          resolve(result)
        },
        (error) => {
          reject(error)
        }
      )
  })
}

/**
 *fetches specific entry from a content-type
 *
 * @param {* content-type uid} contentTypeUid
 * @param {* url for entry to be fetched} entryUrl
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 * @returns
 */
export const getEntryByUrl = ({
  contentTypeUid,
  entryUrl,
  referenceFieldPath,
  jsonRtePath
}: GetEntryByUrl) => {
  return new Promise((resolve, reject) => {
    const blogQuery = Stack.ContentType(contentTypeUid).Query()
    if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath)
    blogQuery.toJSON()
    const data = blogQuery.where('url', `${entryUrl}`).find()
    data.then(
      (result) => {
        jsonRtePath &&
          Utils.jsonToHTML({
            entry: result,
            paths: jsonRtePath,
            renderOption
          })
        resolve(result[0])
      },
      (error) => {
        console.error(error)
        reject(error)
      }
    )
  })
}
