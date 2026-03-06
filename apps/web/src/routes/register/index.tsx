import { component$, useStyles$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  zod$,
  z,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { api } from "~/lib/api";
import styles from "~/routes/login/auth.css?inline";

export const useRegisterAction = routeAction$(
  async (data, { redirect, cookie }) => {
    const res = await api
      .post<{ accessToken: string }>("/auth/register", {
        email: data.email,
        password: data.password,
      })
      .catch((err) => {
        throw new Error(err?.message || "Registration failed");
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
  const action = useRegisterAction();

  return (
    <div class="auth-page">
      <h1>Create account</h1>
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
            {action.value.formErrors?.[0] || "Registration failed"}
          </p>
        )}
        <button type="submit">Sign up</button>
      </Form>
      <p>
        Already have an account? <a href="/login">Sign in</a>
      </p>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Sign up",
  meta: [{ name: "description", content: "Create a new account" }],
};
