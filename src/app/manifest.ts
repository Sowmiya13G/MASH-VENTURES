import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MASH VENTURES - Robotic Character Experiences",
    short_name: "MASH VENTURES",
    description:
      "Extraordinary robotic character experiences engineered to impress brands, malls, exhibitions, and corporate events across India.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0c",
    theme_color: "#e5a00d",
    categories: ["entertainment", "technology", "events", "business"],
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/mash-logo-transparent.png",
        sizes: "962x302",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
