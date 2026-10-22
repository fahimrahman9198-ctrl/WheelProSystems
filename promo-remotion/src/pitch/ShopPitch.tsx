import { Audio } from "@remotion/media";
import { TransitionSeries } from "@remotion/transitions";
import { Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { PitchAdmin } from "./PitchAdmin";
import { PitchBurst } from "./PitchBurst";
import { PitchClose } from "./PitchClose";
import { PitchHook } from "./PitchHook";
import { PitchWebsite } from "./PitchWebsite";

// 48s outreach video made for one shop. Script: promo-voiceover/SHOP-PITCH-SCRIPT.md.
// We build them (1) a custom website in the latest design and (2) a one-stop admin panel:
// leads, invoices, card payments and, given the most time, the lead funnel.
// Music: public/music/pitch-track.wav (scripts/make-pitch-track.mjs), 120 BPM, cues on the scene cuts.
// Scenes: 150 + 270 + 120 + 690 + 210 = 1440. Batch render: node scripts/render-pitches.mjs
export const shopPitchSchema = z.object({
  shopName: z.string(),
  city: z.string(),
  tax: z.string().describe('Sales tax name for their province, e.g. "HST" or "GST + PST"'),
  pageUrl: z.string().describe("Their demo, shown without https://"),
  demoShots: z.string().describe("Path prefix of the demo screenshots: <prefix>-site/-leads/-quote/-pay/-paid.png"),
});

export const ShopPitch: React.FC<z.infer<typeof shopPitchSchema>> = ({ shopName, tax, pageUrl, demoShots }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <TransitionSeries name="Pitch timeline">
        <TransitionSeries.Sequence
          name="Hook"
          durationInFrames={150}
          premountFor={fps}
          style={{
            scale: 0.999
          }}
        >
          <PitchHook shopName={shopName} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="Website" durationInFrames={270} premountFor={fps}>
          <PitchWebsite shopName={shopName} siteShot={`${demoShots}-site.png`} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="Admin burst" durationInFrames={120} premountFor={fps}>
          <PitchBurst />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="Admin tour and lead funnel" durationInFrames={690} premountFor={fps}>
          <PitchAdmin
            shopName={shopName}
            tax={tax}
            leadsShot={`${demoShots}-leads.png`}
            invoiceShot={`${demoShots}-quote.png`}
            payShot={`${demoShots}-pay.png`}
            paidShot={`${demoShots}-paid.png`}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="Close" durationInFrames={210} premountFor={fps}>
          <PitchClose shopName={shopName} pageUrl={pageUrl} cta="Book a 20-minute walkthrough" />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Audio
        name="Music"
        src={staticFile("music/pitch-track.wav")}
        premountFor={fps}
        volume={interpolate(frame, [0, 1400, 1439], [0.85, 0.85, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.4, 0, 0.2, 1) })}
      />
    </>
  );
};
