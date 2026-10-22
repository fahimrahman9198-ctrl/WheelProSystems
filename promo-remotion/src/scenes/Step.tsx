import "../fonts";
import { Audio } from "@remotion/media";
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

// One step of the job, shown inside the real WheelPro admin.
// Every screen in public/screens is 1600×1000 with the browser window at (72, 84, 1180×808).
// Focus/target coordinates are in those SVG units.

type StepProps = {
  readonly time: string;
  readonly label: string;
  readonly headline: string;
  readonly headlineSize: number;
  readonly screen: string;
  readonly focusX: number;
  readonly focusY: number;
  readonly targetX: number;
  readonly targetY: number;
  readonly zoom: number;
  readonly clickAt: number;
  readonly clickSound: string;
  readonly toast: string;
  readonly toastTone: "accent" | "success";
  readonly toastPosition: "top" | "bottom";
};

const VIEW_W = 1656;
const VIEW_H = 720;
const S = VIEW_W / 1180; // px per SVG unit

const StepInner: React.FC<StepProps> = ({
  time,
  label,
  headline,
  headlineSize,
  screen,
  focusX,
  focusY,
  targetX,
  targetY,
  zoom,
  clickAt,
  clickSound,
  toast,
  toastTone,
  toastPosition,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Keep the focus point inside the visible part of the window, then push in on it.
  const fx = (focusX - 72) * S;
  const fy = (focusY - 84) * S;
  const offsetY = Math.max(VIEW_H - 808 * S, Math.min(0, VIEW_H / 2 - fy));
  const zoomNow = interpolate(frame, [0.4 * fps, durationInFrames], [1, zoom], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });
  const tx = (targetX - 72) * S;
  const ty = (targetY - 84) * S;
  const success = toastTone === "success";

  return (
    <>
      <Interactive.Div
        name="Paper"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#FFFFFF",
          backgroundImage:
            "linear-gradient(rgba(10,10,11,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,11,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <Interactive.Div
        name="Time chip"
        style={{
          position: "absolute",
          left: 136,
          top: 92,
          display: "flex",
          gap: 20,
          alignItems: "center",
          fontFamily: "Geist Mono, monospace",
          fontSize: 44,
          letterSpacing: "0.04em",
          color: "#2F5BFF",
          opacity: interpolate(frame, [6, 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [6, 22], ["0px 20px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <span>{time}</span>
        <span style={{ color: "#71717A" }}>{label}</span>
      </Interactive.Div>
      <Interactive.Div
        name="Headline"
        style={{
          position: "absolute",
          left: 128,
          top: 150,
          fontFamily: "Switzer, sans-serif",
          fontSize: headlineSize,
          fontWeight: 600,
          letterSpacing: "-0.045em",
          lineHeight: 1,
          color: "#0A0A0B",
          whiteSpace: "nowrap",
          opacity: interpolate(frame, [10, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [10, 32], ["0px 60px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {headline}
      </Interactive.Div>
      <Interactive.Div
        name="App window"
        style={{
          position: "absolute",
          left: 132,
          top: 372,
          width: VIEW_W,
          height: VIEW_H,
          overflow: "hidden",
          borderRadius: 3,
          border: "1px solid #E4E4E7",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 40px 100px rgba(10,10,11,0.16)",
          translate: interpolate(frame, [4, 30], ["0px 140px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: offsetY,
            width: VIEW_W,
            height: 808 * S,
            transformOrigin: `${fx}px ${fy}px`,
            scale: zoomNow,
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
              left: tx - 60,
              top: ty - 60,
              width: 120,
              height: 120,
              borderRadius: 60,
              border: "3px solid #2F5BFF",
              opacity: interpolate(frame, [clickAt, clickAt + 14], [0.7, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(frame, [clickAt, clickAt + 14], [0.2, 1.2], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            }}
          />
          <svg
            width={44}
            height={56}
            viewBox="0 0 22 28"
            style={{
              position: "absolute",
              left: tx - 4,
              top: ty - 2,
              transformOrigin: "4px 2px",
              translate: interpolate(frame, [12, clickAt - 2], ["320px 260px", "0px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.65, 0, 0.35, 1),
              }),
              scale:
                interpolate(frame, [clickAt - 2, clickAt + 1, clickAt + 6], [1, 0.82, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }) / zoomNow,
              opacity: interpolate(frame, [10, 16], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))",
            }}
          >
            <path d="M2 1 L2 22 L7.5 17 L11 25.5 L14.5 24 L11 15.8 L18.5 15.8 Z" fill="#0A0A0B" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </div>
        {toast ? (
        <Interactive.Div
          name="Toast"
          style={{
            position: "absolute",
            right: 36,
            top: toastPosition === "top" ? 36 : undefined,
            bottom: toastPosition === "bottom" ? 60 : undefined,
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "22px 30px",
            borderRadius: 3,
            backgroundColor: "#0A0A0B",
            color: "#FAFAFA",
            fontFamily: "Switzer, sans-serif",
            fontSize: 40,
            fontWeight: 500,
            letterSpacing: "-0.01em",
            boxShadow: "0 24px 60px rgba(10,10,11,0.3)",
            opacity: interpolate(frame, [clickAt + 4, clickAt + 10], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [clickAt + 4, clickAt + 20], ["0px -40px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          <span
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              display: "grid",
              placeItems: "center",
              backgroundColor: success ? "#16A34A" : "#2F5BFF",
              fontSize: 26,
            }}
          >
            ✓
          </span>
          {toast}
        </Interactive.Div>
        ) : null}
      </Interactive.Div>
      {clickSound ? (
        <Audio name="Click" src={clickSound} from={clickAt - 1} volume={0.7} premountFor={fps} />
      ) : null}
      {success ? (
        <Audio name="Paid chime" src="https://remotion.media/ding.wav" from={clickAt + 6} volume={0.45} premountFor={fps} />
      ) : null}
    </>
  );
};

const stepSchema = {
  time: { type: "string", default: "08:14", description: "Time" },
  label: { type: "string", default: "NEW LEAD", description: "Label" },
  headline: { type: "string", default: "Jordan sends photos.", description: "Headline" },
  headlineSize: { type: "number", default: 150, min: 60, max: 220, step: 1, description: "Headline size", hiddenFromList: false },
  screen: { type: "string", default: "leads", description: "Screen (public/screens/*.svg)" },
  focusX: { type: "number", default: 640, step: 1, description: "Focus X (SVG units)", hiddenFromList: false },
  focusY: { type: "number", default: 414, step: 1, description: "Focus Y (SVG units)", hiddenFromList: false },
  targetX: { type: "number", default: 420, step: 1, description: "Click X (SVG units)", hiddenFromList: false },
  targetY: { type: "number", default: 414, step: 1, description: "Click Y (SVG units)", hiddenFromList: false },
  zoom: { type: "number", default: 1.3, min: 1, max: 3, step: 0.01, description: "Push-in zoom", hiddenFromList: false },
  clickAt: { type: "number", default: 52, min: 0, step: 1, integer: true, description: "Click frame", hiddenFromList: false },
  clickSound: {
    type: "string",
    default: "https://remotion.media/mouse-click.wav",
    description: "Click sound",
  },
  toast: { type: "string", default: "Auto-reply sent", description: "Toast" },
  toastTone: {
    type: "enum",
    default: "accent",
    description: "Toast tone",
    variants: { accent: {}, success: {} },
  },
  toastPosition: {
    type: "enum",
    default: "top",
    description: "Toast position",
    variants: { top: {}, bottom: {} },
  },
} as const satisfies InteractivitySchema;

export const Step = Interactive.withSchema({
  Component: StepInner,
  componentName: "Step",
  schema: stepSchema,
  wrapInSequence: true,
  layout: "absolute-fill",
});
