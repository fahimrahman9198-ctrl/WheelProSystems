import type React from "react";
import { Img, Interactive, interpolate, staticFile, useCurrentFrame, type InteractivitySchema } from "remotion";
import { c, clamp, easeInOut, easeOut, fitSize, SANS, SERIF } from "./common";

type PitchHookProps = { readonly shopName: string };

// 0–5s. Kinetic type (ref 3): each line rolls up out of a mask, a wheel photo slides into the
// sentence like a word, then everything rolls away on the cut. Lines land at 0 · 25 · 70; exit 132.
const Line: React.FC<{ at: number; exit: number; children: React.ReactNode; size: number }> = ({ at, exit, children, size }) => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [at, at + 18, exit, exit + 14], [105, 0, 0, -105], { ...clamp, easing: easeInOut });
  return (
    <div style={{ overflow: "hidden", paddingBottom: size * 0.16, marginBottom: -size * 0.1 }}>
      <div style={{ translate: `0px ${y}%`, display: "flex", alignItems: "center", justifyContent: "center", gap: size * 0.22, whiteSpace: "nowrap" }}>{children}</div>
    </div>
  );
};

const PitchHookInner: React.FC<PitchHookProps> = ({ shopName }) => {
  const frame = useCurrentFrame();
  const size = 124;
  const chipW = interpolate(frame, [36, 58], [0, size * 1.7], { ...clamp, easing: easeOut });

  return (
    <>
      <Interactive.Div name="Cream" style={{ position: "absolute", inset: 0, backgroundColor: c.bg }} />
      <Interactive.Div
        name="Lines"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontFamily: SANS,
          fontWeight: 300,
          fontSize: size,
          letterSpacing: "-0.045em",
          lineHeight: 1,
          color: c.ink,
        }}
      >
        <Line at={0} exit={132} size={size}>
          <span style={{ fontSize: fitSize(`${shopName},`, 1700, size, 0.5) }}>{shopName},</span>
        </Line>
        <Line at={25} exit={135} size={size}>
          <span>your work is</span>
          <span style={{ display: "inline-block", width: chipW, height: size * 0.82, borderRadius: size * 0.41, overflow: "hidden", flexShrink: 0 }}>
            <Img src={staticFile("photos/rash-lip.jpg")} style={{ width: size * 1.7, height: size * 0.82, objectFit: "cover" }} />
          </span>
          <span>premium.</span>
        </Line>
        <Line at={70} exit={138} size={size}>
          <span>
            Your website should <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em" }}>look it</span>.
          </span>
        </Line>
      </Interactive.Div>
    </>
  );
};

const schema = { shopName: { type: "string", default: "London Wheel Repair", description: "Shop name" } } as const satisfies InteractivitySchema;

export const PitchHook = Interactive.withSchema({ Component: PitchHookInner, componentName: "PitchHook", schema, wrapInSequence: true, layout: "absolute-fill" });
