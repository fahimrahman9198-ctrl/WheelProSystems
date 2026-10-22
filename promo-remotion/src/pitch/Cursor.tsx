import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp, easeInOut } from "./common";

/** A pointer that travels from one point to another and dips on the press frame. */
export const Cursor: React.FC<{ from: [number, number]; to: [number, number]; start: number; arrive: number; press: number }> = ({ from, to, start, arrive, press }) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [start, arrive], [from[0], to[0]], { ...clamp, easing: easeInOut });
  const y = interpolate(frame, [start, arrive], [from[1], to[1]], { ...clamp, easing: easeInOut });
  const s = interpolate(frame, [press - 3, press, press + 5], [1, 0.82, 1], clamp);
  const o = interpolate(frame, [start - 6, start], [0, 1], clamp);
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" style={{ position: "absolute", left: x, top: y, opacity: o, scale: s, transformOrigin: "4px 3px", filter: "drop-shadow(0 4px 6px rgb(0 0 0 / 0.3))" }}>
      <path d="M4 2.5 L4 19 L8.6 14.8 L11.6 21.2 L14.4 19.9 L11.4 13.6 L17.6 13.4 Z" fill="#141413" stroke="#f9f6ee" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
};
