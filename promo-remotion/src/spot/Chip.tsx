import "../fonts";
import type React from "react";
import { Easing, Interactive, interpolate, useCurrentFrame, type InteractivitySchema } from "remotion";

// One piece of inbox noise (missed call, DM, sticky note). Lands with a small snap on its beat.
type ChipProps = {
  readonly text: string;
  readonly warn: boolean;
  readonly style?: React.CSSProperties;
};

const ChipInner: React.FC<ChipProps> = ({ text, warn, style }) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Chip"
      style={{
        padding: "18px 28px",
        borderRadius: 3,
        backgroundColor: "rgba(24,24,27,0.92)",
        border: warn ? "1px solid rgba(217,119,6,0.6)" : "1px solid #27272A",
        boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
        fontFamily: "Switzer, sans-serif",
        fontSize: 36,
        fontWeight: 500,
        color: warn ? "#F59E0B" : "#FAFAFA",
        whiteSpace: "nowrap",
        opacity: interpolate(frame, [0, 4], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        scale: interpolate(frame, [0, 8], [1.14, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          output: "perceptual-scale",
        }),
        ...style,
      }}
    >
      {text}
    </Interactive.Div>
  );
};

const chipSchema = {
  text: { type: "string", default: "Missed call", description: "Text" },
  warn: { type: "boolean", default: false, description: "Warning colour" },
} as const satisfies InteractivitySchema;

export const Chip = Interactive.withSchema({
  Component: ChipInner,
  componentName: "Chip",
  schema: chipSchema,
  wrapInSequence: true,
});
