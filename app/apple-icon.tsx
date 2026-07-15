import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Brand ">_" prompt mark, same as app/icon.svg. Full-bleed background,
 * no rounded corners — iOS applies its own mask to apple touch icons.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0d0a",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 32 32">
          <path
            d="M8 10.5 L14.5 16 L8 21.5"
            fill="none"
            stroke="#8cd195"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="17.5" y="20.4" width="7.5" height="2.6" rx="1.3" fill="#8cd195" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
