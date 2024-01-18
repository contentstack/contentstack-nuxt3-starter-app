import ContentstackLivePreview from "@contentstack/live-preview-utils";
import contentstack from "contentstack";
type BasicConfig = {
  apiKey: string;
  deliveryToken: string;
  environment: string;
  branch?: string;
  region?: string;
};
type LPConfig = {
  livePreview: string;
  previewToken: string;
  previewHost: string;
};
type StackConfig = BasicConfig & LPConfig;
export const isBasicConfigValid = ({
  apiKey,
  deliveryToken,
  environment,
}: BasicConfig) => {
  if (!!apiKey && !!deliveryToken && !!environment) {
    return true;
  }
  return false;
};
export const isLpConfigValid = ({
  livePreview,
  previewToken,
  previewHost,
}: LPConfig) => {
  if (!!livePreview && !!previewToken && !!previewHost) {
    return true;
  }
  return false;
};

const setRegion = (region: string): contentstack.Region => {
  let Region = "US" as keyof typeof contentstack.Region;
  if (!!region && region !== "us") {
    const envRegion = region as keyof typeof contentstack.Region;
    Region = envRegion
      .toLocaleUpperCase()
      .replace("-", "_") as keyof typeof contentstack.Region;
  }
  return contentstack.Region[Region];
};

const setLivePreviewConfig = ({
  livePreview,
  previewToken,
  previewHost,
}: LPConfig): contentstack.LivePreview => {
  if (!isLpConfigValid({ previewToken, livePreview, previewHost }))
    throw new Error("Please first configure you LP config in .env file");
  return {
    preview_token: previewToken,
    enable: livePreview === "true",
    host: previewHost,
  } as contentstack.LivePreview;
};

export const initializeContentStackSdk = ({
  apiKey,
  deliveryToken,
  environment,
  region,
  branch,
  livePreview,
  previewToken,
  previewHost,
}: StackConfig): contentstack.Stack => {
  if (!isBasicConfigValid({ apiKey, deliveryToken, environment }))
    throw new Error("Please set you .env file before running starter app");
  const stackConfig: contentstack.Config = {
    api_key: apiKey,
    delivery_token: deliveryToken,
    environment: environment,
    region: setRegion(region || "us"),
    branch: branch ?? "main",
  };
  if (livePreview === "true") {
    stackConfig.live_preview = setLivePreviewConfig({
      livePreview,
      previewToken,
      previewHost,
    });
  }
  return contentstack.Stack(stackConfig);
};

export const initializeLivePreviewSdk = (Stack: contentstack.Stack) => {
  ContentstackLivePreview.init({
    stackDetails: Stack,
    ssr: true,
  })?.catch((err) => {
    console.error(err);
  });
};

export const customHostUrl = (baseUrl: string): string => {
  return baseUrl.replace("api", "cdn");
};

export const generateUrlBasedOnRegion = (): string[] => {
  return Object.keys(contentstack.Region).map((region) => {
    if (region === "US") {
      return `cdn.contentstack.io`;
    }
    return `${region}-cdn.contentstack.com`;
  });
};

export const isValidCustomHostUrl = (url: string): boolean => {
  return url ? !generateUrlBasedOnRegion().includes(url) : false;
};
