"use client";

import dynamic from "next/dynamic";

const RobotCharacterCanvas = dynamic(
  () => import("./RobotCharacterCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-charcoal">
        <div className="flex flex-col items-center gap-2">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-mash-red border-t-transparent" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-chrome/60 font-tech">
            Loading 3D Model...
          </span>
        </div>
      </div>
    ),
  }
);

export default function RobotCharacterWrapper({ slug }: { slug: string }) {
  return <RobotCharacterCanvas slug={slug} />;
}

