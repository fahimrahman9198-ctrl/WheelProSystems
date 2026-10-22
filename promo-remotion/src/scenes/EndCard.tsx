import "../fonts";
import { Audio } from "@remotion/media";
import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

type EndCardProps = {
  readonly cta: string;
  readonly url: string;
};

// The Fitment mark draws itself (wheel, then the arch over it), fills, and the wordmark follows.
// Geometry is the master from brand/logo/final-kit (256 grid → lockup at ×0.375 + (0, 8)).
const EndCardInner: React.FC<EndCardProps> = ({ cta, url }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <Interactive.Div
        name="Paper"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#FFFFFF",
          backgroundImage:
            "linear-gradient(rgba(10,10,11,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,11,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <Interactive.Svg
        name="Logo"
        width={1000}
        height={195}
        viewBox="0 0 575 112"
        style={{
          position: "absolute",
          left: 460,
          top: 210,
          overflow: "visible",
          translate: interpolate(frame, [0, 34], ["0px 20px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <g transform="translate(0 8) scale(0.375)">
          <Interactive.Path
            name="Wheel"
            d="M62 147 A66 66 0 1 1 194 147 A66 66 0 1 1 62 147 Z M108 147 A20 20 0 1 1 148 147 A20 20 0 1 1 108 147 Z"
            fillRule="evenodd"
            pathLength={1}
            stroke="#0A0A0B"
            strokeWidth={4}
            strokeOpacity={interpolate(frame, [26, 34], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            strokeDasharray={1}
            strokeDashoffset={interpolate(frame, [2, 22], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.65, 0, 0.35, 1),
            })}
            fill="#0A0A0B"
            fillOpacity={interpolate(frame, [18, 26], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
          <Interactive.Path
            name="Arch"
            d="M16 43 H174 A64 64 0 0 1 238 107 V147 H206 A78 78 0 0 0 50 147 H16 Z"
            pathLength={1}
            stroke="#0A0A0B"
            strokeWidth={4}
            strokeOpacity={interpolate(frame, [36, 44], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            strokeDasharray={1}
            strokeDashoffset={interpolate(frame, [12, 32], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.65, 0, 0.35, 1),
            })}
            fill="#0A0A0B"
            fillOpacity={interpolate(frame, [28, 36], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
        </g>
        <image
          href={staticFile("logo/wheelpro-wordmark-black.svg")}
          x={112}
          y={10}
          width={463}
          height={92}
          opacity={interpolate(frame, [32, 44], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          style={{
            translate: interpolate(frame, [32, 54], ["-16px 0px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        />
      </Interactive.Svg>
      <Interactive.Div
        name="Tagline"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 480,
          textAlign: "center",
          fontFamily: "Switzer, sans-serif",
          fontSize: 104,
          fontWeight: 600,
          letterSpacing: "-0.04em",
          lineHeight: 1.08,
          color: "#0A0A0B",
          opacity: interpolate(frame, [44, 54], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [44, 66], ["0px 40px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Less time on the phone.
        <br />
        <span style={{ color: "#71717A" }}>More wheels in the bay.</span>
      </Interactive.Div>
      <Interactive.Div
        name="CTA"
        style={{
          position: "absolute",
          left: 960,
          top: 800,
          translate: interpolate(frame, [60, 80], ["-50% 30px", "-50% 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          opacity: interpolate(frame, [60, 70], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          display: "flex",
          alignItems: "center",
          gap: 22,
          padding: "14px 14px 14px 44px",
          borderRadius: 999,
          backgroundColor: "#F5F5F6",
          fontFamily: "Switzer, sans-serif",
          fontSize: 56,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "#0A0A0B",
          whiteSpace: "nowrap",
        }}
      >
        {cta}
        <span
          style={{
            width: 84,
            height: 84,
            borderRadius: 42,
            display: "grid",
            placeItems: "center",
            backgroundColor: "#0A0A0B",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </Interactive.Div>
      <Interactive.Div
        name="URL"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 948,
          textAlign: "center",
          fontFamily: "Geist Mono, monospace",
          fontSize: 44,
          color: "#71717A",
          opacity: interpolate(frame, [72, 84], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {url}
      </Interactive.Div>
      <Audio name="Logo whoosh" src="https://remotion.media/whoosh.wav" from={0} volume={0.35} premountFor={fps} />
      <Audio name="CTA click" src="https://remotion.media/switch.wav" from={62} volume={0.5} premountFor={fps} />
    </>
  );
};

const endCardSchema = {
  cta: { type: "string", default: "Book a meeting", description: "Call to action" },
  url: { type: "string", default: "wheelprosystems.com", description: "URL" },
} as const satisfies InteractivitySchema;

export const EndCard = Interactive.withSchema({
  Component: EndCardInner,
  componentName: "EndCard",
  schema: endCardSchema,
  wrapInSequence: true,
  layout: "absolute-fill",
});
