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
      managementToken,
      livePreview,
      apiHost,
    } = nuxtApp.$config.public;

    const sdkInit = initializeContentStackSdk({
      apiKey,
      deliveryToken,
      environment,
      region,
      branch,
      managementToken,
      livePreview,
      apiHost,
    });

    // for apiHost cdn url
    const customHost = customHostUrl(apiHost);
    if (isValidCustomHostUrl(customHost)) {
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
