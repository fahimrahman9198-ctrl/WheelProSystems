import "../fonts";
import type React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import { Milestone } from "./Milestone";

type RecapProps = {
  readonly headline: string;
  readonly footer: string;
};

// The one dark block: the whole job laid out as a single line, drawn left to right.
const RecapInner: React.FC<RecapProps> = ({ headline, footer }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <Interactive.Div
        name="Dark ground"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#0B0B0D",
          backgroundImage: "radial-gradient(ellipse at 50% 60%, rgba(47,91,255,0.16) 0%, rgba(11,11,13,0) 60%)",
        }}
      />
      <Interactive.Div
        name="Headline"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 150,
          textAlign: "center",
          fontFamily: "Switzer, sans-serif",
          fontSize: 150,
          fontWeight: 600,
          letterSpacing: "-0.045em",
          color: "#FAFAFA",
          opacity: interpolate(frame, [4, 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [4, 26], ["0px 60px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {headline}
      </Interactive.Div>
      <Interactive.Div
        name="Track"
        style={{
          position: "absolute",
          left: 290,
          top: 530,
          width: 1340,
          height: 4,
          backgroundColor: "#27272A",
        }}
      />
      <Interactive.Div
        name="Progress line"
        style={{
          position: "absolute",
          left: 290,
          top: 530,
          width: 1340,
          height: 4,
          transformOrigin: "0% 50%",
          backgroundImage: "linear-gradient(90deg, #2F5BFF 0%, #2F5BFF 80%, #16A34A 100%)",
          scale: interpolate(frame, [16, 16 + 2.2 * fps], ["0 1", "1 1"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.65, 0, 0.35, 1),
          }),
        }}
      />
      <Milestone name="Lead" from={16} premountFor={fps} label="Lead" time="08:14" done={false} style={{ position: "absolute", left: 120, top: 508 }} />
      <Milestone name="Quote" from={28} premountFor={fps} label="Quote" time="08:20" done={false} style={{ position: "absolute", left: 455, top: 508 }} />
      <Milestone name="Follow-up" from={42} premountFor={fps} label="Follow-up" time="Day 1" done={false} style={{ position: "absolute", left: 790, top: 508 }} />
      <Milestone name="Invoice" from={56} premountFor={fps} label="Invoice" time="Apr 24" done={false} style={{ position: "absolute", left: 1125, top: 508 }} />
      <Milestone name="Paid" from={70} premountFor={fps} label="Paid" time="$879.00" done style={{ position: "absolute", left: 1460, top: 508 }} />
      <Interactive.Div
        name="Footer"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 860,
          textAlign: "center",
          fontFamily: "Switzer, sans-serif",
          fontSize: 80,
          fontWeight: 500,
          letterSpacing: "-0.03em",
          color: "#A1A1AA",
          opacity: interpolate(frame, [90, 102], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [90, 112], ["0px 40px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {footer}
      </Interactive.Div>
    </>
  );
};

const recapSchema = {
  headline: { type: "string", default: "One job. One system.", description: "Headline" },
  footer: { type: "string", default: "No sticky notes. No phone tag.", description: "Footer" },
} as const satisfies InteractivitySchema;

export const Recap = Interactive.withSchema({
  Component: RecapInner,
  componentName: "Recap",
  schema: recapSchema,
  wrapInSequence: true,
  layout: "absolute-fill",
});
