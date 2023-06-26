import { isEmpty } from "lodash";
import { LivePreviewQuery } from "contentstack";

export default defineNuxtRouteMiddleware((to, from) => {
  const { $stack } = useNuxtApp();
  const {query}= to as unknown as {query:LivePreviewQuery}
  if (!isEmpty(to.query)) {
    $stack.livePreviewQuery(query);
  }
});
