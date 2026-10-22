import "../fonts";
import type React from "react";
import { Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FanCard } from "./FanCard";

// 19–23s. VO (local 10): "Built only for wheel refinishers."
// Five tools deal into one fan (stagger 3 frames, under the 0.5s budget), centre card on top.
export const SpotFan: React.FC = () => {
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
      <Interactive.Div
        name="Headline"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 110,
          textAlign: "center",
          fontFamily: "Switzer, sans-serif",
          fontSize: 150,
          fontWeight: 600,
          letterSpacing: "-0.045em",
          lineHeight: 1,
          color: "#0A0A0B",
          opacity: interpolate(frame, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: interpolate(frame, [0, 20], ["0px 60px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Five tools. <span style={{ color: "#2F5BFF" }}>One system.</span>
      </Interactive.Div>
      <Interactive.Div
        name="Fan"
        style={{
          position: "absolute",
          inset: 0,
          scale: interpolate(frame, [0, 120], [1, 1.04], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        <FanCard name="Leads card" from={4} premountFor={fps} screen="leads" label="Leads" style={{ position: "absolute", left: 60, top: 400, rotate: "-4.4deg", zIndex: 8 }} />
        <FanCard name="Payments card" from={16} premountFor={fps} screen="pay" label="Payments" style={{ position: "absolute", left: 1260, top: 400, rotate: "4.4deg", zIndex: 8 }} />
        <FanCard name="Quotes card" from={7} premountFor={fps} screen="quote" label="Quotes" style={{ position: "absolute", left: 360, top: 380, rotate: "-2.2deg", zIndex: 9 }} />
        <FanCard name="Invoices card" from={13} premountFor={fps} screen="invoice" label="Invoices" style={{ position: "absolute", left: 960, top: 380, rotate: "2.2deg", zIndex: 9 }} />
        <FanCard name="Follow-ups card" from={10} premountFor={fps} screen="email" label="Follow-ups" style={{ position: "absolute", left: 660, top: 360, rotate: "0deg", zIndex: 10 }} />
      </Interactive.Div>
      <Interactive.Div
        name="Proof caption"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 880,
          textAlign: "center",
          fontFamily: "Switzer, sans-serif",
          fontSize: 84,
          fontWeight: 500,
          letterSpacing: "-0.03em",
          color: "#3F3F46",
          opacity: interpolate(frame, [10, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: interpolate(frame, [10, 30], ["0px 40px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Built only for wheel refinishers.
      </Interactive.Div>
    </>
  );
};
