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
} from "remotion";
import { Chip } from "./Chip";

// 3.5–9.0s (local frame 0 = 3.5s). VO: "You're in the bay, hands full, while leads pile up in texts, DMs and voicemail."
// Caption cues from the VO pauses: bay 7, hands full 35, leads pile up 61, Texts 99, DMs 116, Voicemail 132.
// Chips land on every beat from 5.0s (local 45), then 8ths into the drop. Tension pushes in; the drop is at local 165.
export const SpotPain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  return (
    <Interactive.Div
      name="Pressure"
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#0B0B0D",
        scale: interpolate(frame, [100, 165], [1, 1.07], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.3, 0, 1, 1),
        }),
      }}
    >
      <CanvasImage
        name="Wheel in the bay"
        src={staticFile("photos/rash-chips.jpg")}
        width={width}
        height={height}
        fit="cover"
        premountFor={fps}
        effects={[
          grayscale({ amount: 0.4 }),
          brightness({ amount: -0.6 }),
          vignette({ amount: 0.9, radius: 0.45, feather: 0.6 }),
        ]}
        style={{
          position: "absolute",
          inset: 0,
          scale: interpolate(frame, [0, 165], [1.04, 1.16], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            output: "perceptual-scale",
          }),
        }}
      />
      <Chip name="Missed call" from={45} premountFor={fps} text="Missed call · (604) 555-0142" warn={false} style={{ position: "absolute", left: 130, top: 130, rotate: "-2deg" }} />
      <Chip name="Photos DM" from={60} premountFor={fps} text="“Did you get my photos?”" warn={false} style={{ position: "absolute", right: 150, top: 110, rotate: "1.5deg" }} />
      <Chip name="Sticky note" from={75} premountFor={fps} text="Quote #? — on a sticky note" warn={false} style={{ position: "absolute", left: 170, bottom: 150, rotate: "1deg" }} />
      <Chip name="Waiting" from={90} premountFor={fps} text="“Still waiting on a price…”" warn={false} style={{ position: "absolute", right: 170, bottom: 170, rotate: "-1.5deg" }} />
      <Chip name="Voicemail" from={105} premountFor={fps} text="Voicemail (3)" warn={false} style={{ position: "absolute", right: 110, top: 300, rotate: "2deg" }} />
      <Chip name="Unpaid" from={120} premountFor={fps} text="Invoice unpaid · 21 days" warn style={{ position: "absolute", left: 760, top: 60, rotate: "-1deg" }} />
      <Chip name="Saturday" from={135} premountFor={fps} text="“Can you do Saturday?”" warn={false} style={{ position: "absolute", left: 90, top: 300, rotate: "-1deg" }} />
      <Chip name="Lost" from={143} premountFor={fps} text="“Found someone else, thanks.”" warn style={{ position: "absolute", left: 700, bottom: 60, rotate: "1deg" }} />
      <Chip name="DMs" from={150} premountFor={fps} text="3 unread DMs" warn={false} style={{ position: "absolute", left: 300, bottom: 320, rotate: "2deg" }} />
      <Chip name="Deposit" from={158} premountFor={fps} text="Deposit? — asked by text" warn={false} style={{ position: "absolute", right: 330, bottom: 330, rotate: "-2deg" }} />
      <Interactive.Div
        name="Caption bay"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 400,
          textAlign: "center",
          fontFamily: "Switzer, sans-serif",
          fontSize: 140,
          fontWeight: 600,
          letterSpacing: "-0.045em",
          lineHeight: 1,
          color: "#FAFAFA",
          opacity: interpolate(frame, [7, 14, 54, 60], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [7, 28, 54, 60], ["0px 50px", "0px 0px", "0px 0px", "0px -30px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [Easing.bezier(0.16, 1, 0.3, 1), Easing.linear, Easing.bezier(0.3, 0, 1, 1)],
          }),
        }}
      >
        You're in the bay.
      </Interactive.Div>
      <Interactive.Div
        name="Caption hands full"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 560,
          textAlign: "center",
          fontFamily: "Switzer, sans-serif",
          fontSize: 140,
          fontWeight: 600,
          letterSpacing: "-0.045em",
          lineHeight: 1,
          color: "#A1A1AA",
          opacity: interpolate(frame, [35, 42, 54, 60], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [35, 52, 54, 60], ["0px 50px", "0px 0px", "0px 0px", "0px -30px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [Easing.bezier(0.16, 1, 0.3, 1), Easing.linear, Easing.bezier(0.3, 0, 1, 1)],
          }),
        }}
      >
        Hands full.
      </Interactive.Div>
      <Interactive.Div
        name="Caption leads pile up"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 400,
          textAlign: "center",
          fontFamily: "Switzer, sans-serif",
          fontSize: 140,
          fontWeight: 600,
          letterSpacing: "-0.045em",
          lineHeight: 1,
          color: "#FAFAFA",
          opacity: interpolate(frame, [61, 68], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [61, 82], ["0px 50px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Leads pile up.
      </Interactive.Div>
      <Interactive.Div
        name="Caption channels"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 560,
          display: "flex",
          justifyContent: "center",
          gap: 44,
          fontFamily: "Switzer, sans-serif",
          fontSize: 140,
          fontWeight: 600,
          letterSpacing: "-0.045em",
          lineHeight: 1,
          color: "#F59E0B",
        }}
      >
        <span
          style={{
            opacity: interpolate(frame, [99, 104], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            translate: interpolate(frame, [99, 116], ["0px 40px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          Texts.
        </span>
        <span
          style={{
            opacity: interpolate(frame, [116, 121], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            translate: interpolate(frame, [116, 133], ["0px 40px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          DMs.
        </span>
        <span
          style={{
            opacity: interpolate(frame, [132, 137], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            translate: interpolate(frame, [132, 149], ["0px 40px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          Voicemail.
        </span>
      </Interactive.Div>
      <Interactive.Div
        name="Dim into the drop"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#000000",
          opacity: interpolate(frame, [150, 165], [0, 0.4], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.3, 0, 1, 1),
          }),
        }}
      />
    </Interactive.Div>
  );
};
