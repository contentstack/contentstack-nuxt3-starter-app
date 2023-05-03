import Contentstack from "contentstack";
import * as Utils from "@contentstack/utils";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

type GetEntry = {
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

type GetEntryByUrl = {
  entryUrl: string | undefined;
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

const Stack = Contentstack.Stack({
  api_key: `${import.meta.env.VITE_CONTENTSTACK_API_KEY}`,
  delivery_token: `${import.meta.env.VITE_CONTENTSTACK_DELIVERY_TOKEN}`,
  environment: `${import.meta.env.VITE_CONTENTSTACK_ENVIRONMENT}`,
  branch: `${import.meta.env.VITE_CONTENTSTACK_BRANCH}`
    ? `${import.meta.env.VITE_CONTENTSTACK_BRANCH}`
    : "main",
  //@ts-ignore
  region: `${import.meta.env.VITE_CONTENTSTACK_REGION}`
    ? `${import.meta.env.VITE_CONTENTSTACK_REGION}`
    : "us",
  live_preview: {
    management_token: `${import.meta.env.VITE_CONTENTSTACK_MANAGEMENT_TOKEN}`
      ? `${import.meta.env.VITE_CONTENTSTACK_MANAGEMENT_TOKEN}`
      : "",
    enable: true,
    host: `${import.meta.env.VITE_CONTENTSTACK_API_HOST}`
      ? `${import.meta.env.VITE_CONTENTSTACK_API_HOST}`
      : "",
  },
});

if (import.meta.env.VITE_CONTENTSTACK_API_HOST) {
  Stack.setHost(`${import.meta.env.VITE_CONTENTSTACK_API_HOST}`);
}

const renderOption = {
  span: (node: any, next: any) => next(node.children),
};

ContentstackLivePreview.init({
  //@ts-ignore
  stackSdk: Stack,
  clientUrlParams: {
    host: `${import.meta.env.VITE_CONTENTSTACK_APP_HOST}`,
  },
  stackDetails: {
    apiKey: `${import.meta.env.VITE_API_KEY}`,
    environment: `${import.meta.env.VITE_ENVIRONMENT}`,
  },
  ssr: false,
});
export const { onEntryChange } = ContentstackLivePreview;

const getter = {
  getEntry({ contentTypeUid, referenceFieldPath, jsonRtePath }: GetEntry) {
    return new Promise((resolve, reject) => {
      const Query = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) Query.includeReference(referenceFieldPath);
      Query.includeOwner()
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
            resolve(result[0]);
          },
          (error) => reject(error)
        );
    });
  },
  getEntryByUrl({
    contentTypeUid,
    entryUrl,
    referenceFieldPath,
    jsonRtePath,
  }: GetEntryByUrl) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
      blogQuery.includeOwner().toJSON();
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
        (error) => reject(error)
      );
    });
  },
};

export default getter;
