import { ImageResponse } from "next/og";

export const alt = "karim khalifeh — full-stack web developer, beirut";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "0 120px",
          background: "#0d0f0d",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            color: "rgb(150, 212, 172)",
            marginBottom: 40,
          }}
        >
          {">_"}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#f2f4f2",
          }}
        >
          karim khalifeh
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            marginTop: 24,
            color: "#9aa39c",
          }}
        >
          full-stack web developer · beirut
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
