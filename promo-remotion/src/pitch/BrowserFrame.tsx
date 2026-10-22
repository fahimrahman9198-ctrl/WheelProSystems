import type React from "react";
import { c, SANS } from "./common";

/** A plain browser window in the demo's cream world: title bar with traffic lights and a label. */
export const BrowserFrame: React.FC<{
  readonly label: string;
  readonly width: number;
  readonly height: number;
  readonly style?: React.CSSProperties;
  readonly children: React.ReactNode;
}> = ({ label, width, height, style, children }) => (
  <div
    style={{
      position: "absolute",
      width,
      height: height + 48,
      borderRadius: 18,
      overflow: "hidden",
      backgroundColor: c.card,
      border: `1px solid ${c.line}`,
      boxShadow: "0 2px 4px rgb(60 45 20 / 0.05), 0 50px 100px -40px rgb(60 45 20 / 0.45)",
      ...style,
    }}
  >
    <div style={{ height: 48, display: "flex", alignItems: "center", gap: 10, padding: "0 20px", backgroundColor: c.subtle, borderBottom: `1px solid ${c.line}` }}>
      {["#e8705a", "#e9b54d", "#5fae7c"].map((col) => (
        <span key={col} style={{ width: 13, height: 13, borderRadius: 7, backgroundColor: col }} />
      ))}
      <span style={{ marginLeft: 14, fontFamily: SANS, fontSize: 19, fontWeight: 500, color: c.ink2, whiteSpace: "nowrap" }}>{label}</span>
    </div>
    <div style={{ position: "relative", width, height, overflow: "hidden" }}>{children}</div>
  </div>
);
