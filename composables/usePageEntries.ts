import { Page } from "~/typescript/pages";

export const usePageEntries = async (): Promise<Page[]> => {
  return (await useAllEntries({ contentTypeUid: "page" })) as Page[];
};
