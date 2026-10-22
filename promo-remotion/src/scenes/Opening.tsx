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

type OpeningProps = {
  readonly title: string;
  readonly subtitle: string;
};

// The first thing the viewer sees is the damage: one wheel, one job.
const OpeningInner: React.FC<OpeningProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

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
          grayscale({ amount: 0.3 }),
          brightness({ amount: -0.45 }),
          vignette({ amount: 0.8, radius: 0.55, feather: 0.5 }),
        ]}
        style={{
          position: "absolute",
          inset: 0,
          scale: interpolate(frame, [0, 4 * fps], [1.05, 1.18], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            output: "perceptual-scale",
          }),
        }}
      />
      <Interactive.Div
        name="Kicker"
        style={{
          position: "absolute",
          left: 140,
          top: 380,
          fontFamily: "Geist Mono, monospace",
          fontSize: 44,
          letterSpacing: "0.08em",
          color: "#93A8FF",
          opacity: interpolate(frame, [4, 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [4, 20], ["0px 24px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        JOB Q-1044 · 2022 TESLA MODEL Y
      </Interactive.Div>
      <Interactive.Div
        name="Title"
        style={{
          position: "absolute",
          left: 132,
          top: 450,
          fontFamily: "Switzer, sans-serif",
          fontSize: 190,
          fontWeight: 600,
          letterSpacing: "-0.045em",
          lineHeight: 1,
          color: "#FAFAFA",
          opacity: interpolate(frame, [8, 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [8, 30], ["0px 70px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {title}
      </Interactive.Div>
      <Interactive.Div
        name="Subtitle"
        style={{
          position: "absolute",
          left: 136,
          top: 660,
          fontFamily: "Switzer, sans-serif",
          fontSize: 96,
          fontWeight: 500,
          letterSpacing: "-0.03em",
          color: "#A1A1AA",
          opacity: interpolate(frame, [26, 36], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [26, 48], ["0px 50px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {subtitle}
      </Interactive.Div>
    </>
  );
};

const openingSchema = {
  title: { type: "string", default: "One wheel job.", description: "Title" },
  subtitle: {
    type: "string",
    default: "Lead to paid, in one system.",
    description: "Subtitle",
  },
} as const satisfies InteractivitySchema;

export const Opening = Interactive.withSchema({
  Component: OpeningInner,
  componentName: "Opening",
  schema: openingSchema,
  wrapInSequence: true,
  layout: "absolute-fill",
});
