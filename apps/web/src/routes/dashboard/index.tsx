import { component$, useStyles$ } from "@builder.io/qwik";
import {
  routeLoader$,
  routeAction$,
  Form,
  type DocumentHead,
} from "@builder.io/qwik-city";
import styles from "../login/auth.css?inline";

export const useDashboardLoader = routeLoader$(async ({ redirect, cookie }) => {
  const token = cookie.get("auth_token")?.value;
  if (!token) {
    throw redirect(302, "/login");
  }
  return { authenticated: true };
});

export const useLogoutAction = routeAction$((_, { redirect, cookie }) => {
  cookie.delete("auth_token", { path: "/" });
  throw redirect(302, "/login");
});

export default component$(() => {
  useStyles$(styles);
  useDashboardLoader(); // Required: runs loader, redirects if not authenticated
  const logout = useLogoutAction();

  return (
    <div class="dashboard-page">
      <h1>Dashboard</h1>
      <p>Welcome! You're authenticated.</p>
      <Form action={logout}>
        <button type="submit">Sign out</button>
      </Form>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Dashboard",
  meta: [{ name: "description", content: "Your dashboard" }],
};
