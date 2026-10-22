import "../fonts";
import type React from "react";
import { Easing, Interactive, interpolate, staticFile, useCurrentFrame } from "remotion";

// 9.0–11.0s. Local frame 0 is the music drop.
// launch-video: the mark SNAPS on the drop (1.18 → 1 in 0.2s). motion-design: rigid "metal" material, no bounce after.
// The arch then seats over the wheel and leaves the fitment gap; the wordmark wipes in under "Meet WheelPro Systems" (VO at local 12).
export const SpotReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const wheelScale = interpolate(frame, [0, 6], [1.18, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

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
        name="Drop glow"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 32% 50%, rgba(47,91,255,0.28) 0%, rgba(47,91,255,0) 38%)",
          opacity: interpolate(frame, [0, 30], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
        }}
      />
      <Interactive.Svg
        name="Lockup"
        width={1200}
        height={234}
        viewBox="0 0 575 112"
        style={{
          position: "absolute",
          left: 360,
          top: 423,
          overflow: "visible",
          scale: interpolate(frame, [0, 60], [1, 1.03], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            output: "perceptual-scale",
          }),
        }}
      >
        <defs>
          <clipPath id="spot-wordmark-wipe">
            <rect
              x={100}
              y={0}
              height={112}
              width={interpolate(frame, [20, 38], [0, 480], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.2, 0, 0, 1),
              })}
            />
          </clipPath>
        </defs>
        <g transform="translate(0 8) scale(0.375)">
          <Interactive.Path
            name="Arch"
            d="M16 43 H174 A64 64 0 0 1 238 107 V147 H206 A78 78 0 0 0 50 147 H16 Z"
            fill="#0A0A0B"
            opacity={interpolate(frame, [4, 9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            transform={`translate(0 ${interpolate(frame, [4, 17], [-70, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.05, 0.7, 0.1, 1),
            })})`}
          />
          <Interactive.Path
            name="Wheel"
            d="M62 147 A66 66 0 1 1 194 147 A66 66 0 1 1 62 147 Z M108 147 A20 20 0 1 1 148 147 A20 20 0 1 1 108 147 Z"
            fill="#0A0A0B"
            fillRule="evenodd"
            transform={`translate(128 147) scale(${wheelScale}) translate(-128 -147)`}
          />
        </g>
        <g clipPath="url(#spot-wordmark-wipe)">
          <image href={staticFile("logo/wheelpro-wordmark-black.svg")} x={112} y={10} width={463} height={92} />
        </g>
      </Interactive.Svg>
    </>
  );
};
