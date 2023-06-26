import { Page } from "~/typescript/pages"

export const usePageEntries = async():Promise<Page[]>=>{
  return await useEntries({contentTypeUid:"page"}) as Page[]
}