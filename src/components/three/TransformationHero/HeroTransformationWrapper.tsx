"use client";

import dynamic from "next/dynamic";

const TransformationCanvas = dynamic(
  () => import("./TransformationCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[520px] w-full max-w-2xl flex-col items-center justify-center rounded-3xl border border-white/10 bg-charcoal/80 p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-mash-red border-t-transparent" />
          <span className="text-xs font-bold uppercase tracking-widest text-chrome/60">
            Initializing Cybernetic Core...
          </span>
        </div>
      </div>
    ),
  }
);

export default function HeroTransformationWrapper() {
  return <TransformationCanvas />;
}

