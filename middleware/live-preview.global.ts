import { isEmpty } from "lodash";

export default defineNuxtRouteMiddleware((to, from) => {
  const { $stack } = useNuxtApp();
  if (!isEmpty(to.query)) {
    //@ts-ignore
    $stack.livePreviewQuery(to.query);
  }
});
