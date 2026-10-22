import type React from "react";
import { Img, Interactive, interpolate, useCurrentFrame, useVideoConfig, type InteractivitySchema } from "remotion";
import { BrowserFrame } from "./BrowserFrame";
import { Cursor } from "./Cursor";
import { asset, c, clamp, easeInOut, easeOut, fitSize, MONO, rise, SANS, SERIF, squish } from "./common";

type PitchWebsiteProps = { readonly shopName: string; readonly siteShot: string };

// 5–14s. A diagonal wipe (ref 4) reveals their new website scrolling in a browser (0–150). Then the
// site's photo-quote panel, up close, fills itself in and the button squishes on a press (ref 5) at 230.
const PitchWebsiteInner: React.FC<PitchWebsiteProps> = ({ shopName, siteShot }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const wipe = interpolate(frame, [0, 22], [125, -25], { ...clamp, easing: easeInOut });
  const scroll = interpolate(frame, [36, 150], [0, -620], { ...clamp, easing: easeInOut });
  const phaseB = interpolate(frame, [146, 170], [0, 1], { ...clamp, easing: easeOut });
  const capA = interpolate(frame, [70, 80], [1, 0], clamp);
  const capB = interpolate(frame, [80, 92, 140, 150], [0, 1, 1, 0], clamp);
  const line = (at: number) => ({ opacity: interpolate(frame, [at, at + 8], [0, 1], clamp), translate: interpolate(frame, [at, at + 12], ["-10px 0px", "0px 0px"], { ...clamp, easing: easeOut }) });
  const wheels = frame >= 186 ? 2 : 1;
  const curb = frame >= 198;

  const head: React.CSSProperties = { fontFamily: SANS, fontWeight: 300, fontSize: 86, lineHeight: 1.02, letterSpacing: "-0.04em", color: c.ink };

  return (
    <>
      <Interactive.Div name="Dark" style={{ position: "absolute", inset: 0, backgroundColor: c.dark }} />
      <Interactive.Div name="World" style={{ position: "absolute", inset: 0, backgroundColor: c.bg, clipPath: `polygon(${wipe}% 0, 140% 0, 140% 100%, ${wipe - 22}% 100%)` }}>
        {/* Phase A: the site, scrolling */}
        <div style={{ position: "absolute", left: 120, top: 300, width: 600, ...head, opacity: capA * interpolate(frame, [14, 26], [0, 1], clamp) }}>
          A custom website
          <br />
          <span style={{ color: c.teal, fontSize: fitSize(`for ${shopName}.`, 640, 86, 0.48) }}>
            for <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>{shopName}</span>.
          </span>
        </div>
        <div style={{ position: "absolute", left: 120, top: 300, width: 600, ...head, opacity: capB }}>
          Latest design.
          <br />
          <span style={{ color: c.teal }}>
            Not a <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>template</span>.
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 1 - phaseB,
            translate: `${interpolate(phaseB, [0, 1], [0, -120])}px 0px`,
            scale: interpolate(phaseB, [0, 1], [1, 0.94]),
          }}
        >
          <BrowserFrame label={shopName} width={1040} height={700} style={{ left: 770, top: 170, translate: interpolate(frame, [10, 34], ["0px 80px", "0px 0px"], { ...clamp, easing: easeOut }) }}>
            {siteShot ? <Img src={asset(siteShot)} style={{ width: 1040, translate: `0px ${scroll}px` }} /> : null}
          </BrowserFrame>
        </div>

        {/* Phase B: the photo-quote panel, up close */}
        <div style={{ position: "absolute", left: 120, top: 330, width: 620, ...head, ...rise(frame, 156) }}>
          Customers price
          <br />
          their wheels
          <br />
          <span style={{ color: c.teal }}>
            from a <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>photo</span>.
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            left: 860,
            top: 200,
            width: 900,
            padding: 34,
            borderRadius: 30,
            backgroundColor: c.card,
            border: `1px solid ${c.line}`,
            boxShadow: "0 2px 4px rgb(60 45 20 / 0.05), 0 50px 100px -40px rgb(60 45 20 / 0.45)",
            opacity: phaseB,
            translate: `0px ${interpolate(phaseB, [0, 1], [70, 0])}px`,
            fontFamily: SANS,
          }}
        >
          <div style={{ fontSize: 34, letterSpacing: "-0.02em", color: c.ink }}>What would yours cost?</div>
          <div style={{ display: "flex", gap: 18, marginTop: 24 }}>
            <div style={{ flex: 1.6, borderRadius: 20, backgroundColor: c.dark, padding: 26, fontFamily: MONO, fontSize: 22, color: c.readout, lineHeight: 1.5 }}>
              <div style={{ color: c.green, fontSize: 15, letterSpacing: "0.14em", marginBottom: 14 }}>● YOUR REQUEST</div>
              <div style={line(160)}>
                <span style={{ color: c.accent }}>→ </span>
                <span style={{ color: "#fff" }}>{wheels} wheel{wheels > 1 ? "s" : ""}</span>, size not sure
              </div>
              <div style={line(172)}>
                <span style={{ color: c.accent }}>→ </span>
                <span style={{ color: "#fff" }}>Damage</span> {curb ? "curb rash" : "not picked yet"}
              </div>
              <div style={line(184)}>
                <span style={{ color: c.accent }}>→ </span>
                <span style={{ color: "#fff" }}>Finish</span> match original
              </div>
              <div style={line(196)}>
                <span style={{ color: c.green }}>→ </span>
                <span style={{ color: "#fff" }}>Photos</span> add 2 next
              </div>
            </div>
            <div style={{ flex: 1, display: "grid", gap: 12 }}>
              {["Wheels", "Size", "Finish"].map((k, i) => (
                <div key={k} style={{ borderRadius: 16, border: `1px solid ${c.line}`, backgroundColor: "#fdfbf6", padding: "14px 18px" }}>
                  <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: "0.14em", color: c.ink3 }}>{k.toUpperCase()}</div>
                  {i === 0 ? (
                    <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                      {[1, 2, 3, 4].map((n) => (
                        <span key={n} style={{ width: 36, height: 36, borderRadius: 9, display: "grid", placeItems: "center", fontFamily: MONO, fontSize: 20, backgroundColor: n === wheels ? c.ink : "transparent", color: n === wheels ? "#f9f6ee" : c.ink2 }}>
                          {n}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontFamily: MONO, fontSize: 21, color: c.ink, marginTop: 6 }}>{i === 1 ? "Not sure" : "Match original"}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18, padding: 16, borderRadius: 18, backgroundColor: c.subtle, border: `1px solid ${c.line}` }}>
            {["Curb rash", "Scratches", "Bent"].map((d) => {
              const on = d === "Curb rash" && curb;
              return (
                <span key={d} style={{ height: 50, padding: "0 20px", borderRadius: 13, display: "grid", placeItems: "center", fontSize: 21, border: `1px solid ${on ? c.ink : c.lineStrong}`, backgroundColor: on ? c.ink : "#fdfbf6", color: on ? "#f9f6ee" : c.ink2 }}>
                  {d}
                </span>
              );
            })}
            <span
              style={{
                marginLeft: "auto",
                height: 56,
                padding: "0 26px",
                borderRadius: 13,
                display: "grid",
                placeItems: "center",
                backgroundColor: frame >= 230 && frame < 242 ? "#d8431f" : c.accent,
                color: "#fff",
                fontSize: 17,
                fontWeight: 600,
                letterSpacing: "0.14em",
                ...squish(frame, 230, fps),
              }}
            >
              GET A PRICE →
            </span>
          </div>
        </div>
        <Cursor from={[1720, 980]} to={[1640, 702]} start={206} arrive={226} press={230} />
      </Interactive.Div>
    </>
  );
};

const schema = {
  shopName: { type: "string", default: "London Wheel Repair", description: "Shop name" },
  siteShot: { type: "string", default: "pitch/london-wheel-repair-site.png", description: "Screenshot of their demo website" },
} as const satisfies InteractivitySchema;

export const PitchWebsite = Interactive.withSchema({ Component: PitchWebsiteInner, componentName: "PitchWebsite", schema, wrapInSequence: true, layout: "absolute-fill" });
