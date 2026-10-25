import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MASH VENTURES",
    short_name: "MASH",
    description: "Robotic character experiences. Engineered to impress. Bring your brand to life.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0c0e",
    theme_color: "#e10600",
    icons: [{ src: "/icon", sizes: "32x32", type: "image/png" }],
  };
}