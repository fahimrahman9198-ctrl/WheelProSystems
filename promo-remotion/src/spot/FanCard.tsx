import "../fonts";
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

// One WheelPro tool as a cropped browser window with its name. Deals up from below.
type FanCardProps = {
  readonly screen: string;
  readonly label: string;
  readonly style?: React.CSSProperties;
};

const CARD_W = 600;
const S = CARD_W / 1180; // the window inside every screen SVG is 1180 units wide at (72, 84)

const FanCardInner: React.FC<FanCardProps> = ({ screen, label, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Interactive.Div
      name="Fan card"
      style={{
        width: CARD_W,
        height: 372,
        overflow: "hidden",
        borderRadius: 3,
        border: "1px solid #E4E4E7",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 30px 70px rgba(10,10,11,0.16)",
        opacity: interpolate(frame, [0, 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        translate: interpolate(frame, [0, 18], ["0px 140px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.05, 0.7, 0.1, 1),
        }),
        ...style,
      }}
    >
      <CanvasImage
        name="Screen"
        src={staticFile(`screens/${screen}.svg`)}
        width={Math.round(1600 * S)}
        height={Math.round(1000 * S)}
        fit="fill"
        premountFor={fps}
        style={{ position: "absolute", left: -72 * S, top: -84 * S }}
      />
      <div
        style={{
          position: "absolute",
          left: 18,
          top: 18,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 18px",
          borderRadius: 999,
          backgroundColor: "#0A0A0B",
          color: "#FAFAFA",
          fontFamily: "Switzer, sans-serif",
          fontSize: 28,
          fontWeight: 500,
        }}
      >
        <span
          style={{
            color: "#4ADE80",
            opacity: interpolate(frame, [16, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          ✓
        </span>
        {label}
      </div>
    </Interactive.Div>
  );
};

const fanCardSchema = {
  screen: { type: "string", default: "leads", description: "Screen (public/screens/*.svg)" },
  label: { type: "string", default: "Leads", description: "Label" },
} as const satisfies InteractivitySchema;

export const FanCard = Interactive.withSchema({
  Component: FanCardInner,
  componentName: "FanCard",
  schema: fanCardSchema,
  wrapInSequence: true,
});
