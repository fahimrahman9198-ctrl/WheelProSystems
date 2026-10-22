import type React from "react";
import { Img, Interactive, interpolate, spring, useCurrentFrame, useVideoConfig, type InteractivitySchema } from "remotion";
import { BrowserFrame } from "./BrowserFrame";
import { Cursor } from "./Cursor";
import { asset, c, clamp, easeOut, funnel, MONO, rise, SANS, SERIF, squish, stretch } from "./common";

type PitchAdminProps = {
  readonly shopName: string;
  readonly tax: string;
  readonly leadsShot: string;
  readonly invoiceShot: string;
  readonly payShot: string;
  readonly paidShot: string;
};

// 18–41s. Their admin, toured with a sliding pill tracker (ref 7):
//   Leads 0 · Invoices 150 · Payments 300 (press 360, PAID stamp 375, ref 1 + ref 5) · Lead funnel 420–690.
// The funnel builds bar by bar on rubber-band springs (ref 6): stages 440+, leak 530, follow-ups 590, channels 625.
// Screens are 1440×900 captures of /demo/<slug>/admin shown at 1200×750 (scale 5/6) inside a browser frame.
const tabs = ["Leads", "Invoices", "Payments", "Lead funnel"];
const at = [0, 150, 300, 420];
const S = 1200 / 1440;
const FRAME = { left: 360, top: 236 };

const PitchAdminInner: React.FC<PitchAdminProps> = ({ shopName, tax, leadsShot, invoiceShot, payShot, paidShot }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = at.filter((t) => frame >= t).length - 1;
  const slide = at.reduce((x, t, i) => (i === 0 ? 0 : x + spring({ frame: frame - t, fps, config: { damping: 15, stiffness: 140 } })), 0);
  const shot = (from: number, to: number) => interpolate(frame, [from, from + 10, to - 6, to], [0, 1, 1, 0], clamp);
  const screenOut = interpolate(frame, [420, 444], [0, 1], { ...clamp, easing: easeOut });
  const stampP = spring({ frame: frame - 375, fps, config: { damping: 13, stiffness: 260, mass: 0.6 } });
  const shake = frame >= 375 && frame < 386 ? Math.sin((frame - 375) * 2.4) * (386 - frame) * 0.9 : 0;

  // Pay button and invoice card, measured in the 1440×900 capture, mapped into the frame.
  const map = (x: number, y: number): [number, number] => [FRAME.left + x * S, FRAME.top + 48 + y * S];
  const [payX, payY] = map(297 + 343, 463 + 24);
  const [cardX, cardY] = map(272 + 368, 97 + 236);

  const caption = (text: React.ReactNode, from: number, to: number) => (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 128,
        textAlign: "center",
        fontFamily: SANS,
        fontWeight: 300,
        fontSize: 54,
        letterSpacing: "-0.035em",
        color: c.ink,
        opacity: interpolate(frame, [from, from + 10, to - 8, to], [0, 1, 1, 0], clamp),
        translate: interpolate(frame, [from, from + 20], ["0px 24px", "0px 0px"], { ...clamp, easing: easeOut }),
      }}
    >
      {text}
    </div>
  );
  const serif = (t: string) => <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>{t}</span>;

  return (
    <>
      <Interactive.Div name="Cream" style={{ position: "absolute", inset: 0, backgroundColor: c.bg }} />

      {/* Tracker */}
      <Interactive.Div
        name="Tracker"
        style={{
          position: "absolute",
          left: 960 - 446,
          top: 44,
          display: "grid",
          gridTemplateColumns: "repeat(4, 220px)",
          padding: 6,
          borderRadius: 18,
          backgroundColor: c.card,
          border: `1px solid ${c.lineStrong}`,
          boxShadow: "0 16px 40px -24px rgb(60 45 20 / 0.4)",
          fontFamily: SANS,
          ...rise(frame, 0, 20),
        }}
      >
        <span style={{ position: "absolute", top: 6, left: 6, width: 220, height: 52, borderRadius: 13, backgroundColor: c.ink, translate: `${slide * 220}px 0px` }} />
        {tabs.map((t, i) => (
          <span key={t} style={{ position: "relative", height: 52, display: "grid", placeItems: "center", fontSize: 21, fontWeight: 500, color: i === active ? "#f9f6ee" : c.ink2 }}>
            {t}
          </span>
        ))}
      </Interactive.Div>

      {caption(<>See every lead: photos, wheels, damage, {serif("how")} they want a reply.</>, 4, 150)}
      {caption(<>Turn a quote into an invoice. {tax} {serif("worked out")} for you.</>, 150, 300)}
      {caption(<>Charge the deposit by card. Paid {serif("before")} the job starts.</>, 300, 422)}

      {/* Admin screens */}
      <Interactive.Div name="Screens" style={{ position: "absolute", inset: 0, opacity: 1 - screenOut, scale: 1 - 0.06 * screenOut, translate: `${shake}px 0px` }}>
        <BrowserFrame label={`${shopName} · Admin`} width={1200} height={750} style={{ ...FRAME, translate: interpolate(frame, [0, 22], ["0px 60px", "0px 0px"], { ...clamp, easing: easeOut }) }}>
          {[
            [leadsShot, 0, 156],
            [invoiceShot, 150, 306],
            [payShot, 300, 384],
            [paidShot, 378, 430],
          ].map(([src, from, to]) =>
            src ? <Img key={String(from)} src={asset(String(src))} style={{ position: "absolute", inset: 0, width: 1200, height: 750, objectFit: "cover", opacity: shot(Number(from), Number(to)) }} /> : null,
          )}
        </BrowserFrame>
        {/* The pay button squishes under the press (drawn over its spot in the capture). */}
        <span
          style={{
            position: "absolute",
            left: payX - (686 * S) / 2,
            top: payY - (48 * S) / 2,
            width: 686 * S,
            height: 48 * S,
            borderRadius: 11 * S,
            backgroundColor: c.accent,
            opacity: frame >= 354 && frame < 378 ? 1 : 0,
            display: "grid",
            placeItems: "center",
            color: "#fff",
            fontFamily: SANS,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.14em",
            ...squish(frame, 360, fps),
          }}
        >
          PAY DEPOSIT
        </span>
        {/* PAID stamp */}
        <div
          style={{
            position: "absolute",
            left: cardX,
            top: cardY,
            translate: "-50% -50%",
            rotate: "-9deg",
            scale: frame >= 375 ? 2.4 - 1.4 * stampP : 0,
            opacity: frame >= 375 ? Math.min(1, stampP * 3) : 0,
            padding: "14px 40px 10px",
            border: `7px solid ${c.accent}`,
            borderRadius: 18,
            color: c.accent,
            fontFamily: SANS,
            fontWeight: 600,
            fontSize: 120,
            lineHeight: 1,
            letterSpacing: "0.04em",
            textAlign: "center",
            backgroundColor: "rgb(249 246 238 / 0.55)",
            mixBlendMode: "multiply",
          }}
        >
          PAID
          <div style={{ fontFamily: MONO, fontSize: 22, letterSpacing: "0.2em", marginTop: 6 }}>DEPOSIT · BY CARD</div>
        </div>
        <Cursor from={[payX + 320, payY + 260]} to={[payX - 4, payY - 4]} start={322} arrive={354} press={360} />
      </Interactive.Div>

      {/* Lead funnel */}
      <Funnel frame={frame - 420} fps={fps} />
      {caption(<>Your lead funnel: every request, all the way to a {serif("paid")} job.</>, 436, 530)}
      {caption(<>See exactly where jobs {serif("slip away")}.</>, 530, 590)}
      {caption(<>Follow-ups {serif("win them back")}.</>, 590, 626)}
      {caption(<>And see which channels {serif("actually")} book.</>, 626, 692)}
    </>
  );
};

/** The funnel board: stage bars on rubber-band springs, the leak, follow-ups and channels. */
const Funnel: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  if (frame < 0) return null;
  const top = funnel.stages[0].n;
  const leakPulse = frame >= 110 ? 0.5 + 0.5 * Math.sin((frame - 110) * 0.25) : 0;
  const card: React.CSSProperties = {
    position: "absolute",
    borderRadius: 28,
    backgroundColor: c.card,
    border: `1px solid ${c.line}`,
    boxShadow: "0 2px 4px rgb(60 45 20 / 0.05), 0 40px 80px -36px rgb(60 45 20 / 0.4)",
    fontFamily: SANS,
  };
  const lost = funnel.stages[funnel.leakAt - 1].n - funnel.stages[funnel.leakAt].n;

  return (
    <>
      <div style={{ ...card, left: 120, top: 236, width: 1040, padding: "30px 36px", ...rise(frame, 6, 50) }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 30, letterSpacing: "-0.02em", color: c.ink }}>From request to paid job</span>
          <span style={{ fontFamily: MONO, fontSize: 15, letterSpacing: "0.14em", padding: "6px 14px", borderRadius: 999, border: `1px solid ${c.lineStrong}`, color: c.ink2 }}>SAMPLE · LAST 30 DAYS</span>
        </div>
        <div style={{ marginTop: 18, display: "grid", gap: 6 }}>
          {funnel.stages.map((st, i) => {
            const t0 = 20 + i * 12;
            const p = stretch(frame, t0, fps, 8);
            const n = Math.round(interpolate(frame, [t0, t0 + 18], [0, st.n], clamp));
            const isLeak = i === funnel.leakAt;
            const prev = i ? funnel.stages[i - 1].n : 0;
            return (
              <div key={st.label} style={{ opacity: interpolate(frame, [t0 - 4, t0 + 4], [0, 1], clamp) }}>
                {i > 0 && (
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: 17,
                      padding: "4px 4px",
                      color: isLeak && frame >= 110 ? c.accent : c.ink3,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    ↓ {Math.round((st.n / prev) * 100)}% moved on · {prev - st.n} dropped
                    {isLeak && frame >= 110 && (
                      <span style={{ fontSize: 13, letterSpacing: "0.14em", padding: "4px 12px", borderRadius: 999, border: `1.5px solid ${c.accent}`, boxShadow: `0 0 0 ${6 * leakPulse}px rgb(238 81 49 / ${0.18 * leakPulse})` }}>
                        BIGGEST LEAK
                      </span>
                    )}
                  </div>
                )}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 90px",
                    alignItems: "center",
                    gap: 20,
                    padding: "14px 20px",
                    borderRadius: 18,
                    border: `1px solid ${isLeak && frame >= 110 ? c.accent : c.line}`,
                    backgroundColor: c.bg,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 23, fontWeight: 500, color: c.ink }}>{st.label}</div>
                    <div style={{ marginTop: 10, height: 14, borderRadius: 999, backgroundColor: c.muted, overflow: "visible" }}>
                      <div style={{ height: "100%", width: `${(st.n / top) * 100 * p}%`, borderRadius: 999, background: `linear-gradient(90deg, ${c.accent}, ${c.teal})` }} />
                    </div>
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 40, textAlign: "right", color: c.ink }}>{n}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ ...card, left: 1200, top: 236, width: 600, padding: "26px 30px", ...rise(frame, 116, 50) }}>
        <div style={{ fontSize: 28, letterSpacing: "-0.02em", color: c.ink }}>The biggest leak</div>
        <div style={{ marginTop: 6, fontSize: 19, color: c.ink3 }}>Quote sent → Deposit paid: {lost} didn&rsquo;t go ahead.</div>
        {[
          ["No reply after the quote", 11],
          ["Price", 5],
          ["Went elsewhere", 2],
        ].map(([r, k], i) => (
          <div key={String(r)} style={{ marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 19, color: c.ink }}>
              <span>{r}</span>
              <span style={{ fontFamily: MONO }}>{k}</span>
            </div>
            <div style={{ marginTop: 6, height: 8, borderRadius: 999, backgroundColor: c.muted }}>
              <div style={{ height: "100%", width: `${(Number(k) / lost) * 100 * stretch(frame, 124 + i * 8, fps, 8)}%`, borderRadius: 999, backgroundColor: c.accent }} />
            </div>
          </div>
        ))}
        <div style={{ marginTop: 20, padding: "18px 22px", borderRadius: 18, backgroundColor: c.dark, ...rise(frame, 170, 20) }}>
          <div style={{ fontFamily: MONO, fontSize: 14, letterSpacing: "0.14em", color: c.green }}>FOLLOW-UPS</div>
          <div style={{ marginTop: 8, fontSize: 21, color: "#f3efe3" }}>
            <span style={{ fontFamily: MONO, fontSize: 30 }}>{funnel.wonBack}</span> deposits came in after an automatic follow-up.
          </div>
        </div>
      </div>

      <div style={{ ...card, left: 1200, top: 712, width: 600, padding: "22px 30px", ...rise(frame, 205, 50) }}>
        <div style={{ fontSize: 24, letterSpacing: "-0.02em", color: c.ink }}>Where they come from</div>
        {funnel.sources.map((s, i) => {
          const p = stretch(frame, 212 + i * 6, fps, 8);
          return (
            <div key={s.name} style={{ marginTop: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, color: c.ink }}>
                <span>{s.name}</span>
                <span style={{ fontFamily: MONO, color: c.ink3 }}>
                  {s.leads} leads · {s.booked} booked
                </span>
              </div>
              <div style={{ marginTop: 5, height: 8, display: "flex", borderRadius: 999, backgroundColor: c.muted, overflow: "hidden" }}>
                <div style={{ width: `${(s.booked / top) * 100 * p}%`, backgroundColor: c.teal }} />
                <div style={{ width: `${((s.leads - s.booked) / top) * 100 * p}%`, backgroundColor: "rgb(18 128 122 / 0.3)" }} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const schema = {
  shopName: { type: "string", default: "London Wheel Repair", description: "Shop name" },
  tax: { type: "string", default: "HST", description: "Sales tax name" },
  leadsShot: { type: "string", default: "pitch/london-wheel-repair-leads.png", description: "Admin: lead detail" },
  invoiceShot: { type: "string", default: "pitch/london-wheel-repair-quote.png", description: "Admin: quote/invoice" },
  payShot: { type: "string", default: "pitch/london-wheel-repair-pay.png", description: "Admin: invoice, deposit due" },
  paidShot: { type: "string", default: "pitch/london-wheel-repair-paid.png", description: "Admin: deposit paid" },
} as const satisfies InteractivitySchema;

export const PitchAdmin = Interactive.withSchema({ Component: PitchAdminInner, componentName: "PitchAdmin", schema, wrapInSequence: true, layout: "absolute-fill" });
