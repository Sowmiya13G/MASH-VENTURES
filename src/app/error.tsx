"use client";

import Link from "next/link";
import { useEffect } from "react";
import { btnGhost, btnPrimary } from "@/components/ui/styles";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="grid min-h-svh place-items-center px-5 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-mash-red">Something went wrong</p>
        <h1 className="mt-4 text-4xl font-bold uppercase sm:text-6xl">System error.</h1>
        <p className="mx-auto mt-5 max-w-md text-chrome/70">An unexpected error occurred. Please try again.</p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <button type="button" onClick={reset} className={btnPrimary}>
            Try again
          </button>
          <Link href="/" className={btnGhost}>
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}