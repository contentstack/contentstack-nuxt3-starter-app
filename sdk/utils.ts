import contentstack from 'contentstack'

const {
  VITE_CONTENTSTACK_API_KEY,
  VITE_CONTENTSTACK_DELIVERY_TOKEN,
  VITE_CONTENTSTACK_ENVIRONMENT,
  VITE_CONTENTSTACK_BRANCH,
  VITE_CONTENTSTACK_REGION,
  VITE_CONTENTSTACK_MANAGEMENT_TOKEN,
  VITE_CONTENTSTACK_API_HOST,
  VITE_CONTENTSTACK_APP_HOST,
  VITE_CONTENTSTACK_LIVE_PREVIEW,
}= import.meta.env;

export const isBasicConfigValid = () => {
  if (
    !!VITE_CONTENTSTACK_API_KEY &&
    !!VITE_CONTENTSTACK_DELIVERY_TOKEN &&
    !!VITE_CONTENTSTACK_ENVIRONMENT
  ) {
    return true
  }
  return false
}
export const isLpConfigValid = () => {
  if (
    !!VITE_CONTENTSTACK_LIVE_PREVIEW &&
    !!VITE_CONTENTSTACK_MANAGEMENT_TOKEN &&
    !!VITE_CONTENTSTACK_API_HOST &&
    !!VITE_CONTENTSTACK_APP_HOST
  ) {
    return true
  }
  return false
}

const setRegion = ():contentstack.Region => {
  let region = 'US' as keyof typeof contentstack.Region
  if (!!VITE_CONTENTSTACK_REGION && VITE_CONTENTSTACK_REGION !== 'us') {
    const envRegion = VITE_CONTENTSTACK_REGION as keyof typeof contentstack.Region
    region = envRegion.toLocaleUpperCase().replace(
      '-',
      '_'
    ) as keyof typeof contentstack.Region
  }
  return contentstack.Region[region]
}

const setLivePreviewConfig = (): contentstack.LivePreview => {
  if (!isLpConfigValid())
    throw new Error('Please first configure you LP config in .env file')
  return {
    management_token: VITE_CONTENTSTACK_MANAGEMENT_TOKEN as string,
    enable: VITE_CONTENTSTACK_LIVE_PREVIEW === 'true',
    host: VITE_CONTENTSTACK_API_HOST as string
  } as contentstack.LivePreview
}

export const initializeContentStackSdk = (): contentstack.Stack => {
  if (!isBasicConfigValid())
    throw new Error('Please set you .env file before running starter app')
  const stackConfig: contentstack.Config = {
    api_key: VITE_CONTENTSTACK_API_KEY as string,
    delivery_token: VITE_CONTENTSTACK_DELIVERY_TOKEN as string,
    environment: VITE_CONTENTSTACK_ENVIRONMENT as string,
    region: setRegion(),
    branch: VITE_CONTENTSTACK_BRANCH as string ?? 'main'
  }
  if (VITE_CONTENTSTACK_LIVE_PREVIEW === 'true') {
    stackConfig.live_preview = setLivePreviewConfig()
  }
  return contentstack.Stack(stackConfig)
}

export const customHostUrl = (baseUrl: string):string => {
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
  return url? !generateUrlBasedOnRegion().includes(url):false;
};
