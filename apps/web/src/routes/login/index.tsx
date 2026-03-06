import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, zod$, type DocumentHead } from "@builder.io/qwik-city";
import { api } from "~/lib/api";
import { loginSchema } from "@qwik-enterprise-saas/shared";

export const useLoginAction = routeAction$(
  async (data, { redirect, cookie }) => {
    const res = await api
      .post<{ accessToken: string }>("/auth/login", {
        email: data.email,
        password: data.password,
      })
      .catch((err) => {
        throw new Error(err?.message || "Login failed");
      });
    cookie.set("auth_token", res.accessToken, {
      path: "/",
      maxAge: 60 * 60 * 24,
      httpOnly: false,
    });
    throw redirect(302, "/dashboard");
  },
  zod$(loginSchema),
);

export default component$(() => {
  const action = useLoginAction();

  return (
    <div class="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 py-12">
      <div class="w-full max-w-[400px] space-y-6">
        <div class="space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p class="text-sm text-[var(--color-muted-foreground)]">
            Enter your credentials to access your account
          </p>
        </div>
        <Form
          action={action}
          class="space-y-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)]/50 p-6"
        >
          <div class="space-y-2">
            <label
              for="email"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              class="flex h-9 w-full rounded-md border border-[var(--color-input)] bg-[var(--color-background)] px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-[var(--color-muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div class="space-y-2">
            <label
              for="password"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              class="flex h-9 w-full rounded-md border border-[var(--color-input)] bg-[var(--color-background)] px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-[var(--color-muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          {action.value?.failed && (
            <p class="text-sm text-red-600 dark:text-red-400">
              {action.value.formErrors?.[0] || "Login failed"}
            </p>
          )}
          <button
            type="submit"
            class="inline-flex h-9 w-full items-center justify-center rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] shadow transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] disabled:pointer-events-none disabled:opacity-50"
          >
            Sign in
          </button>
        </Form>
        <p class="text-center text-sm text-[var(--color-muted-foreground)]">
          Don't have an account?{" "}
          <a
            href="/register"
            class="font-medium text-[var(--color-foreground)] underline underline-offset-4 hover:opacity-80"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Sign in",
  meta: [{ name: "description", content: "Sign in to your account" }],
};
