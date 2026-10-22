import type React from "react";
import { Img, Interactive, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, type InteractivitySchema } from "remotion";
import { c, clamp, easeInOut, fitSize, MONO, rise, SANS, SERIF } from "./common";

type PitchCloseProps = { readonly shopName: string; readonly pageUrl: string; readonly cta: string };

// 41–48s. The old way goes in the bin (ref 1): a handwritten paper quote crumples (14–30) and arcs
// into a bin (30–54). Then the end card: line 96 · shop 110 · link 130 · button 150 · wordmark 168.
const PitchCloseInner: React.FC<PitchCloseProps> = ({ shopName, pageUrl, cta }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const crumple = interpolate(frame, [14, 30], [0, 1], { ...clamp, easing: easeInOut });
  const toss = interpolate(frame, [30, 54], [0, 1], clamp);
  const ballX = 960;
  const ballY = 470 + interpolate(toss, [0, 0.4, 1], [0, -170, 300]);
  const binIn = spring({ frame: frame - 8, fps, config: { damping: 14 } });
  const binBump = frame >= 54 ? Math.sin((frame - 54) * 0.6) * Math.max(0, 12 - (frame - 54)) * 0.6 : 0;
  const oldOut = interpolate(frame, [78, 92], [1, 0], clamp);
  const madeFor = `Built for ${shopName}.`;

  return (
    <>
      <Interactive.Div name="Cream" style={{ position: "absolute", inset: 0, backgroundColor: c.bg }} />

      <Interactive.Div name="Old way" style={{ position: "absolute", inset: 0, opacity: oldOut }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 120,
            textAlign: "center",
            fontFamily: SANS,
            fontWeight: 300,
            fontSize: 70,
            letterSpacing: "-0.04em",
            color: c.ink,
            ...rise(frame, 0, 20),
          }}
        >
          Paper quotes and sticky notes? <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, color: c.teal }}>Done.</span>
        </div>
        {/* Paper quote → crumpled ball */}
        <div
          style={{
            position: "absolute",
            left: ballX,
            top: ballY,
            translate: "-50% -50%",
            width: interpolate(crumple, [0, 1], [380, 120]),
            height: interpolate(crumple, [0, 1], [480, 120]),
            borderRadius: `${interpolate(crumple, [0, 1], [6, 60])}px`,
            rotate: `${interpolate(crumple, [0, 1], [-4, 160]) + toss * 220}deg`,
            backgroundColor: "#fdfbf6",
            boxShadow: "0 30px 60px -30px rgb(60 45 20 / 0.5)",
            backgroundImage:
              crumple > 0.3
                ? "linear-gradient(35deg, rgb(0 0 0 / 0.06) 20%, transparent 21% 45%, rgb(0 0 0 / 0.05) 46% 60%, transparent 61%), linear-gradient(-50deg, transparent 30%, rgb(0 0 0 / 0.07) 31% 40%, transparent 41%)"
                : "repeating-linear-gradient(transparent 0 46px, rgb(18 128 122 / 0.18) 46px 47px)",
            overflow: "hidden",
            padding: crumple < 0.25 ? "40px 34px" : 0,
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 30,
            color: c.ink2,
            lineHeight: "47px",
            opacity: frame >= 54 ? interpolate(frame, [54, 58], [1, 0], clamp) : 1,
          }}
        >
          {crumple < 0.25 && (
            <div style={{ opacity: 1 - crumple * 4 }}>
              Quote
              <br />2 wheels, curb rash
              <br />call back re price??
              <br />Tues or Wed
              <br />
              <span style={{ textDecoration: "line-through" }}>$</span> ...
            </div>
          )}
        </div>
        {/* Bin */}
        <div
          style={{
            position: "absolute",
            left: 960,
            top: 760 + binBump,
            translate: "-50% 0px",
            width: 240,
            height: 270,
            scale: binIn,
            backgroundColor: c.dark,
            clipPath: "polygon(0 0, 100% 0, 88% 100%, 12% 100%)",
            borderRadius: 18,
            boxShadow: "inset 0 18px 0 rgb(255 255 255 / 0.06)",
          }}
        />
      </Interactive.Div>

      <Interactive.Div name="End card" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 210, fontFamily: SANS }}>
        <div style={{ fontWeight: 300, fontSize: 104, letterSpacing: "-0.045em", lineHeight: 1, color: c.ink, ...rise(frame, 96) }}>Website + admin panel.</div>
        <div style={{ marginTop: 16, fontWeight: 300, fontSize: fitSize(madeFor, 1600, 104, 0.47), letterSpacing: "-0.045em", lineHeight: 1.05, color: c.teal, ...rise(frame, 110) }}>
          Built for <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>{shopName}</span>.
        </div>
        <div
          style={{
            marginTop: 54,
            padding: "22px 40px",
            borderRadius: 18,
            backgroundColor: c.card,
            border: `1.5px solid ${c.ink}`,
            fontFamily: MONO,
            fontSize: fitSize(pageUrl, 1500, 46, 0.6),
            color: c.ink,
            ...rise(frame, 130, 24),
          }}
        >
          {pageUrl}
        </div>
        <div
          style={{
            marginTop: 30,
            height: 76,
            padding: "0 40px",
            borderRadius: 16,
            display: "grid",
            placeItems: "center",
            backgroundColor: c.accent,
            color: "#fff",
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "0.14em",
            ...rise(frame, 150, 24),
          }}
        >
          {cta.toUpperCase()} →
        </div>
        <Img src={staticFile("logo/wheelpro-wordmark-black.svg")} style={{ marginTop: 70, width: 330, opacity: interpolate(frame, [168, 180], [0, 1], clamp) }} />
      </Interactive.Div>
    </>
  );
};

const schema = {
  shopName: { type: "string", default: "London Wheel Repair", description: "Shop name" },
  pageUrl: { type: "string", default: "wheelprosystems.com/demo/london-wheel-repair", description: "Their demo" },
  cta: { type: "string", default: "Book a 20-minute walkthrough", description: "Call to action" },
} as const satisfies InteractivitySchema;

export const PitchClose = Interactive.withSchema({ Component: PitchCloseInner, componentName: "PitchClose", schema, wrapInSequence: true, layout: "absolute-fill" });
