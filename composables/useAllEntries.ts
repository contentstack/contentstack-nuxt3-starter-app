import * as Utils from "@contentstack/utils";
type GetEntry = {
  contentTypeUid: string;
  referenceFieldPath?: string[];
  jsonRtePath?: string[];
};

export const useAllEntries = ({
  contentTypeUid,
  referenceFieldPath,
  jsonRtePath,
}: GetEntry) => {
  const renderOption = {
    ["span"]: (node: any, next: any) => {
      return next(node.children);
    },
  };
  const { $stack } = useNuxtApp();

  return new Promise((resolve, reject) => {
    const query = $stack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) query.includeReference(referenceFieldPath);
    query
      .toJSON()
      .find()
      .then(
        (result) => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption,
            });
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
  });
};
