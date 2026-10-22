import "../fonts";
import type React from "react";
import { Easing, Interactive, interpolate, useCurrentFrame, type InteractivitySchema } from "remotion";

// One stop on the recap timeline: a dot, a name and a time.
type MilestoneProps = {
  readonly label: string;
  readonly time: string;
  readonly done: boolean;
  readonly style?: React.CSSProperties;
};

const MilestoneInner: React.FC<MilestoneProps> = ({ label, time, done, style }) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Milestone"
      style={{
        width: 340,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 26,
        fontFamily: "Switzer, sans-serif",
        ...style,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          display: "grid",
          placeItems: "center",
          backgroundColor: done ? "#16A34A" : "#2F5BFF",
          color: "#FFFFFF",
          fontSize: 28,
          boxShadow: done ? "0 0 0 12px rgba(22,163,74,0.18)" : "0 0 0 12px rgba(47,91,255,0.18)",
          scale: interpolate(frame, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        {done ? "✓" : ""}
      </div>
      <div
        style={{
          fontSize: 60,
          fontWeight: 600,
          letterSpacing: "-0.03em",
          color: "#FAFAFA",
          opacity: interpolate(frame, [3, 11], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [3, 18], ["0px 24px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: -10,
          fontFamily: "Geist Mono, monospace",
          fontSize: 38,
          color: done ? "#4ADE80" : "#A1A1AA",
          opacity: interpolate(frame, [6, 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {time}
      </div>
    </Interactive.Div>
  );
};

const milestoneSchema = {
  label: { type: "string", default: "Lead", description: "Label" },
  time: { type: "string", default: "08:14", description: "Time" },
  done: { type: "boolean", default: false, description: "Completed (green)" },
} as const satisfies InteractivitySchema;

export const Milestone = Interactive.withSchema({
  Component: MilestoneInner,
  componentName: "Milestone",
  schema: milestoneSchema,
  wrapInSequence: true,
});
