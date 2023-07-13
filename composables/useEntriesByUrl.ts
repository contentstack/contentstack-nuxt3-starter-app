import * as Utils from "@contentstack/utils";
type GetEntryByUrl = {
  entryUrl?: string;
  contentTypeUid: string;
  referenceFieldPath?: string[];
  jsonRtePath?: string[];
};

export const useEntriesByUrl = ({
  entryUrl,
  contentTypeUid,
  referenceFieldPath,
  jsonRtePath,
}: GetEntryByUrl) => {
  const renderOption = {
    ["span"]: (node: any, next: any) => {
      return next(node.children);
    },
  };
  const { $stack } = useNuxtApp();
  return new Promise((resolve, reject) => {
    const blogQuery = $stack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
    blogQuery.toJSON();
    const data = blogQuery.where("url", `${entryUrl}`).find();
    data.then(
      (result) => {
        jsonRtePath &&
          Utils.jsonToHTML({
            entry: result,
            paths: jsonRtePath,
            renderOption,
          });
        resolve(result[0]);
      },
      (error) => {
        console.error(error);
        reject(error);
      }
    );
  });
};
