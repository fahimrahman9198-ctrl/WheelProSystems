import "../fonts";
import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  type InteractivitySchema,
} from "remotion";

type SpotEndProps = {
  readonly cta: string;
  readonly url: string;
};

// 23–30s end card for the voiceover spot, retimed so every line lands on its words:
// "Less time on the phone." local 12 · "More wheels in the bay." 69 · "Book a meeting," 102 · "at wheelprosystems.com" 133.
// The Fitment mark draws itself on the resolve hit (local 0), then holds clean for the CTA (launch-video: hold ≥ 2s).
const SpotEndInner: React.FC<SpotEndProps> = ({ cta, url }) => {
  const frame = useCurrentFrame();
  
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
          top: 170,
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
            strokeOpacity={interpolate(frame, [18, 24], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            strokeDasharray={1}
            strokeDashoffset={interpolate(frame, [0, 14], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.65, 0, 0.35, 1),
            })}
            fill="#0A0A0B"
            fillOpacity={interpolate(frame, [12, 18], [0, 1], {
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
            strokeOpacity={interpolate(frame, [24, 30], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            strokeDasharray={1}
            strokeDashoffset={interpolate(frame, [6, 20], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.65, 0, 0.35, 1),
            })}
            fill="#0A0A0B"
            fillOpacity={interpolate(frame, [18, 24], [0, 1], {
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
          opacity={interpolate(frame, [20, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          style={{
            translate: interpolate(frame, [20, 40], ["-16px 0px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        />
      </Interactive.Svg>
      <Interactive.Div
        name="Tagline line one"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 440,
          textAlign: "center",
          fontFamily: "Switzer, sans-serif",
          fontSize: 112,
          fontWeight: 600,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "#0A0A0B",
          opacity: interpolate(frame, [12, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [12, 34], ["0px 40px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Less time on the phone.
      </Interactive.Div>
      <Interactive.Div
        name="Tagline line two"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 564,
          textAlign: "center",
          fontFamily: "Switzer, sans-serif",
          fontSize: 112,
          fontWeight: 600,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "#71717A",
          opacity: interpolate(frame, [69, 77], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [69, 91], ["0px 40px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        More wheels in the bay.
      </Interactive.Div>
      <Interactive.Div
        name="CTA"
        style={{
          position: "absolute",
          left: 960,
          top: 770,
          translate: interpolate(frame, [102, 122], ["-50% 30px", "-50% 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          opacity: interpolate(frame, [102, 112], [0, 1], {
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
          top: 930,
          textAlign: "center",
          fontFamily: "Geist Mono, monospace",
          fontSize: 44,
          color: "#71717A",
          opacity: interpolate(frame, [133, 143], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {url}
      </Interactive.Div>
    </>
  );
};

const spotEndSchema = {
  cta: { type: "string", default: "Book a meeting", description: "Call to action" },
  url: { type: "string", default: "wheelprosystems.com", description: "URL" },
} as const satisfies InteractivitySchema;

export const SpotEnd = Interactive.withSchema({
  Component: SpotEndInner,
  componentName: "SpotEnd",
  schema: spotEndSchema,
  wrapInSequence: true,
  layout: "absolute-fill",
});
