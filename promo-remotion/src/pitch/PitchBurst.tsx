import { CreditCard, FileText, Funnel, Inbox, Send, Zap } from "lucide-react";
import type React from "react";
import { Interactive, interpolate, spring, useCurrentFrame, useVideoConfig, type InteractivitySchema } from "remotion";
import { c, clamp, easeOut, rise, SANS, SERIF } from "./common";

// 14–18s. Radial burst (ref 2): a "+" turns into "×" and the admin's modules fly out on springs,
// blurring in from the centre. Plus at 4, burst at 18, labels land ~30, caption beats 6 and 46.
const modules = [
  { icon: Inbox, label: "Leads" },
  { icon: Send, label: "Quotes" },
  { icon: FileText, label: "Invoices" },
  { icon: CreditCard, label: "Payments" },
  { icon: Funnel, label: "Lead funnel" },
  { icon: Zap, label: "Automations" },
];

const PitchBurstInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cx = 960;
  const cy = 650;
  const plusIn = spring({ frame: frame - 4, fps, config: { damping: 12, stiffness: 160 } });
  const turn = interpolate(frame, [16, 26], [0, 45], { ...clamp, easing: easeOut });

  return (
    <>
      <Interactive.Div name="Cream" style={{ position: "absolute", inset: 0, backgroundColor: c.bg }} />
      <Interactive.Div
        name="Caption"
        style={{ position: "absolute", left: 0, right: 0, top: 110, textAlign: "center", fontFamily: SANS, fontWeight: 300, fontSize: 84, letterSpacing: "-0.04em", lineHeight: 1.04, color: c.ink }}
      >
        <div style={rise(frame, 6)}>Then your admin panel.</div>
        <div style={{ color: c.teal, ...rise(frame, 46) }}>
          One stop for the <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }}>whole</span> job.
        </div>
      </Interactive.Div>

      {modules.map(({ icon: Icon, label }, i) => {
        const p = spring({ frame: frame - 18 - i * 2, fps, config: { damping: 11, stiffness: 110, mass: 0.8 } });
        const a = (-90 + i * 60) * (Math.PI / 180);
        const r = 290 * p;
        const blur = interpolate(frame, [18 + i * 2, 34 + i * 2], [14, 0], clamp);
        return (
          <Interactive.Div
            key={label}
            name={label}
            style={{
              position: "absolute",
              left: cx + Math.cos(a) * r - 75,
              top: cy + Math.sin(a) * r * 0.82 - 75,
              width: 150,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              opacity: Math.min(1, p * 1.4),
              filter: `blur(${blur}px)`,
              scale: 0.4 + 0.6 * p,
            }}
          >
            <span
              style={{
                width: 112,
                height: 112,
                borderRadius: 34,
                display: "grid",
                placeItems: "center",
                backgroundColor: c.card,
                border: `1px solid ${c.line}`,
                boxShadow: "0 24px 50px -24px rgb(60 45 20 / 0.45)",
                color: i === 4 ? c.accent : c.ink,
              }}
            >
              <Icon size={46} strokeWidth={1.6} />
            </span>
            <span style={{ fontFamily: SANS, fontSize: 24, fontWeight: 500, color: c.ink, whiteSpace: "nowrap" }}>{label}</span>
          </Interactive.Div>
        );
      })}

      <Interactive.Div
        name="Plus"
        style={{
          position: "absolute",
          left: cx - 62,
          top: cy - 62,
          width: 124,
          height: 124,
          borderRadius: 62,
          backgroundColor: c.dark,
          display: "grid",
          placeItems: "center",
          scale: plusIn,
          rotate: `${turn}deg`,
          boxShadow: "0 30px 60px -24px rgb(20 15 10 / 0.6)",
        }}
      >
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#f9f6ee" strokeWidth="2.4" strokeLinecap="round">
          <path d="M12 4v16M4 12h16" />
        </svg>
      </Interactive.Div>
    </>
  );
};

const schema = {} as const satisfies InteractivitySchema;

export const PitchBurst = Interactive.withSchema({ Component: PitchBurstInner, componentName: "PitchBurst", schema, wrapInSequence: true, layout: "absolute-fill" });
