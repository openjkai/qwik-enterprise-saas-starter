import { component$, useStyles$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  zod$,
  z,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { api } from "~/lib/api";
import styles from "./auth.css?inline";

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
  zod$({
    email: z.string().email(),
    password: z.string().min(6),
  }),
);

export default component$(() => {
  useStyles$(styles);
  const action = useLoginAction();

  return (
    <div class="auth-page">
      <h1>Sign in</h1>
      <Form action={action} class="auth-form">
        <div>
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            placeholder="••••••••"
          />
        </div>
        {action.value?.failed && (
          <p class="error">
            {action.value.formErrors?.[0] || "Login failed"}
          </p>
        )}
        <button type="submit">Sign in</button>
      </Form>
      <p>
        Don't have an account? <a href="/register">Sign up</a>
      </p>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Sign in",
  meta: [{ name: "description", content: "Sign in to your account" }],
};
