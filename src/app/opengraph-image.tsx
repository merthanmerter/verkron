import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Verkron — Transforming industrial expertise into cutting-edge digital solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontDir = join(
    process.cwd(),
    "node_modules/geist/dist/fonts/geist-sans",
  );
  const [geistUltraBlack, geistBold] = await Promise.all([
    readFile(join(fontDir, "Geist-UltraBlack.ttf")),
    readFile(join(fontDir, "Geist-Bold.ttf")),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        padding: "96px 112px",
        gap: 96,
        fontFamily: "Geist",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 56,
          flexShrink: 0,
        }}
      >
        <svg
          width="360"
          height="202"
          viewBox="0 0 100 56"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M69 14L28 56L28 56L28 56L0 28L11 17L28 33L58 3L69 14ZM44 44L89 0L100 11L83 28L100 44L89 56L72 39L56 56L44 44Z"
            fill="#FFFFFF"
          />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#f23e65",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          verkron.com
        </div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 64,
          fontWeight: 900,
          color: "#FFFFFF",
          lineHeight: 1.05,
          textTransform: "uppercase",
          letterSpacing: "-0.03em",
        }}
      >
        Transforming industrial expertise into cutting-edge digital solutions
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Geist",
          data: geistUltraBlack,
          style: "normal",
          weight: 900,
        },
        {
          name: "Geist",
          data: geistBold,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
