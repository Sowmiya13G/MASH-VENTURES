"use client";

import { Toaster as Sonner } from "sonner";

export default function Toaster() {
  return (
    <Sonner
      position="top-right"
      theme="dark"
      richColors
      closeButton
      toastOptions={{
        style: {
          background: "#14171c",
          borderColor: "rgba(255, 255, 255, 0.12)",
          color: "#ffffff",
        },
      }}
    />
  );
}

