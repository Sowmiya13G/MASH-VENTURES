import { ImageResponse } from "next/og";

export const alt = "MASH VENTURES: Robotic character experiences. Engineered to impress.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0b0c0e 0%, #1c1f24 60%, #3a0300 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 72,
              height: 72,
              background: "#e10600",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: 900,
            }}
          >
            M
          </div>
          <div style={{ marginLeft: 24, fontSize: 40, letterSpacing: 10, fontWeight: 700 }}>MASH VENTURES</div>
        </div>
        <div style={{ marginTop: 56, fontSize: 84, fontWeight: 800, lineHeight: 1.05, textTransform: "uppercase" }}>
          Engineered to impress.
        </div>
        <div style={{ marginTop: 20, fontSize: 52, fontWeight: 700, color: "#e10600", textTransform: "uppercase" }}>
          Bring your brand to life.
        </div>
        <div style={{ marginTop: 40, fontSize: 28, color: "#c9ced6" }}>
          Robotic character experiences in India
        </div>
      </div>
    ),
    size,
  );
}