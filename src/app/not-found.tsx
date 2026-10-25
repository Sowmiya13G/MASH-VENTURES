import Link from "next/link";
import { btnPrimary } from "@/components/ui/styles";

export default function NotFound() {
  return (
    <section className="grid min-h-svh place-items-center px-5 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-mash-red">Error 404</p>
        <h1 className="mt-4 text-5xl font-bold uppercase sm:text-7xl">Signal lost.</h1>
        <p className="mx-auto mt-5 max-w-md text-chrome/70">
          The page you were looking for doesn&apos;t exist or has moved.
        </p>
        <Link href="/" className={`${btnPrimary} mt-8`}>
          Back to home
        </Link>
      </div>
    </section>
  );
}