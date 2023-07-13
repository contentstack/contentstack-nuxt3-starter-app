import { LivePreviewQuery } from "contentstack";

export default defineNuxtRouteMiddleware((to, from) => {
  const { $stack } = useNuxtApp();
  const { $_ } = useNuxtApp();
  const { query } = to as unknown as { query: LivePreviewQuery };
  if (!$_.isEmpty(to.query)) {
    $stack.livePreviewQuery(query);
  }
});
