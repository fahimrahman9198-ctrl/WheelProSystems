import { lightLeak } from "@remotion/effects/light-leak";
import type React from "react";
import { interpolate, Solid, useCurrentFrame, useVideoConfig } from "remotion";

// Torque-blue light leak played over the cut from the dark recap into the end card.
export const LightLeakOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps, height, width } = useVideoConfig();

  return (
    <Solid
      width={width}
      height={height}
      premountFor={fps}
      effects={[
        lightLeak({
          seed: 3,
          hueShift: 180,
          progress: interpolate(frame, [0, durationInFrames - 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }),
      ]}
    />
  );
};
