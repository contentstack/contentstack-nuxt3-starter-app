import {
  initializeContentStackSdk,
  isValidCustomHostUrl,
  customHostUrl,
} from "./utils/helper";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

export default defineNuxtPlugin({
  name: "contentstack-sdk",
  enforce: "pre",
  async setup(nuxtApp) {
    const {
      apiKey,
      deliveryToken,
      environment,
      region,
      branch,
      previewToken,
      livePreview,
      previewHost,
      apiHost
    } = nuxtApp.$config.public;

    const sdkInit = initializeContentStackSdk({
      apiKey,
      deliveryToken,
      environment,
      region,
      branch,
      previewToken,
      livePreview,
      previewHost,
    });

    // for apiHost cdn url
    const customHost = apiHost ? customHostUrl(apiHost): "";
    if (customHost && isValidCustomHostUrl(customHost)) {
      // only for non prod apiHost urls/ custom hosts
      sdkInit.setHost(customHost);
    }
    // Live preview initialization
    ContentstackLivePreview.init({
      enable: livePreview === "true",
      stackDetails: sdkInit,
      ssr: true,
    })?.catch((err) => {
      console.error("error...", err);
    });
    return {
      provide: {
        stack: sdkInit,
      },
    };
  },
});
