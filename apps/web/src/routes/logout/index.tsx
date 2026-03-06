import { routeAction$ } from "@builder.io/qwik-city";

export const useLogoutAction = routeAction$((_, { redirect, cookie }) => {
  cookie.delete("auth_token", { path: "/" });
  throw redirect(302, "/login");
});
