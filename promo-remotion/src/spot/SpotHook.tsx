import "../fonts";
import { brightness } from "@remotion/effects/brightness";
import { grayscale } from "@remotion/effects/grayscale";
import { vignette } from "@remotion/effects/vignette";
import type React from "react";
import {
  CanvasImage,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";

type SpotHookProps = {
  readonly lineOne: string;
  readonly lineTwo: string;
};

// 0–3.5s. VO: "Every slow reply… is a wheel job you just lost."
// Captions land on the words: line one at frame 9 (VO start), line two at frame 53 (after the pause).
const SpotHookInner: React.FC<SpotHookProps> = ({ lineOne, lineTwo }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const waited = Math.floor(
    interpolate(frame, [12, 100], [0, 47], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );

  return (
    <>
      <CanvasImage
        name="Curb-rashed wheel"
        src={staticFile("photos/rash-lip.jpg")}
        width={width}
        height={height}
        fit="cover"
        premountFor={fps}
        effects={[
          grayscale({ amount: 0.35 }),
          brightness({ amount: -0.5 }),
          vignette({ amount: 0.85, radius: 0.5, feather: 0.55 }),
        ]}
        style={{
          position: "absolute",
          inset: 0,
          scale: interpolate(frame, [0, 3.5 * fps], [1.06, 1.2], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            output: "perceptual-scale",
          }),
        }}
      />
      <Interactive.Div
        name="Lead notification"
        style={{
          position: "absolute",
          left: 960,
          top: 170,
          width: 900,
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "26px 32px",
          borderRadius: 3,
          backgroundColor: "rgba(24,24,27,0.86)",
          border: "1px solid #27272A",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
          fontFamily: "Switzer, sans-serif",
          opacity: interpolate(frame, [2, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [2, 20], ["-50% 40px", "-50% 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            backgroundColor: "#2F5BFF",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
            <rect x="3" y="5" width="18" height="14" rx="1" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 36, fontWeight: 600, color: "#FAFAFA", letterSpacing: "-0.01em" }}>
            New quote request
          </div>
          <div style={{ fontSize: 28, color: "#A1A1AA", marginTop: 6 }}>4 × 21″ · Curb rash · “Price today?”</div>
        </div>
        <div style={{ textAlign: "right", fontFamily: "Geist Mono, monospace" }}>
          <div style={{ fontSize: 26, color: "#A1A1AA" }}>2:14 PM</div>
          <div style={{ fontSize: 30, color: "#F59E0B", marginTop: 6 }}>{waited > 0 ? `${waited}m unanswered` : ""}</div>
        </div>
      </Interactive.Div>
      <Interactive.Div
        name="Caption line one"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 520,
          textAlign: "center",
          fontFamily: "Switzer, sans-serif",
          fontSize: 150,
          fontWeight: 600,
          letterSpacing: "-0.045em",
          lineHeight: 1,
          color: "#FAFAFA",
          opacity: interpolate(frame, [9, 17], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [9, 30], ["0px 60px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {lineOne}
      </Interactive.Div>
      <Interactive.Div
        name="Caption line two"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 690,
          textAlign: "center",
          fontFamily: "Switzer, sans-serif",
          fontSize: 112,
          fontWeight: 600,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "#F59E0B",
          opacity: interpolate(frame, [53, 61], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [53, 74], ["0px 50px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {lineTwo}
      </Interactive.Div>
    </>
  );
};

const spotHookSchema = {
  lineOne: { type: "string", default: "Every slow reply", description: "Caption line one" },
  lineTwo: { type: "string", default: "is a wheel job you just lost.", description: "Caption line two" },
} as const satisfies InteractivitySchema;

export const SpotHook = Interactive.withSchema({
  Component: SpotHookInner,
  componentName: "SpotHook",
  schema: spotHookSchema,
  wrapInSequence: true,
  layout: "absolute-fill",
});
