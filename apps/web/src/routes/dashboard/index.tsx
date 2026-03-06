import { component$ } from "@builder.io/qwik";
import {
  routeLoader$,
  routeAction$,
  Form,
  type DocumentHead,
} from "@builder.io/qwik-city";

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
  useDashboardLoader();
  const logout = useLogoutAction();

  return (
    <div class="container mx-auto max-w-2xl px-4 py-12">
      <div class="space-y-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)]/30 p-6">
        <div class="space-y-2">
          <h1 class="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p class="text-sm text-[var(--color-muted-foreground)]">
            Welcome! You're authenticated.
          </p>
        </div>
        <Form action={logout}>
          <button
            type="submit"
            class="inline-flex h-9 items-center justify-center rounded-md border border-[var(--color-input)] bg-[var(--color-background)] px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] disabled:pointer-events-none disabled:opacity-50"
          >
            Sign out
          </button>
        </Form>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Dashboard",
  meta: [{ name: "description", content: "Your dashboard" }],
};
