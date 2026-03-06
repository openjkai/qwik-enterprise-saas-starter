import { component$ } from "@builder.io/qwik";
import { QwikLogo } from "../icons/qwik";

export default component$(() => {
  return (
    <header class="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-background)]/60">
      <div class="container flex h-14 items-center justify-between px-4 md:px-6">
        <a href="/" class="flex items-center gap-2" title="Home">
          <QwikLogo height={32} width={90} />
        </a>
        <nav class="flex items-center gap-4">
          <a
            href="/login"
            class="text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
          >
            Sign in
          </a>
          <a
            href="/register"
            class="text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
          >
            Sign up
          </a>
          <a
            href="/dashboard"
            class="text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
          >
            Dashboard
          </a>
          <a
            href="https://qwik.dev/docs"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
          >
            Docs
          </a>
        </nav>
      </div>
    </header>
  );
});
