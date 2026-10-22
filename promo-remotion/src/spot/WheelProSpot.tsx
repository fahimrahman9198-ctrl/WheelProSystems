import { Audio } from "@remotion/media";
import { TransitionSeries } from "@remotion/transitions";
import { Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Step } from "../scenes/Step";
import { SpotEnd } from "./SpotEnd";
import { SpotFan } from "./SpotFan";
import { SpotHook } from "./SpotHook";
import { SpotPain } from "./SpotPain";
import { SpotReveal } from "./SpotReveal";

// 30s sales spot with voiceover. Script: promo-voiceover/SCRIPT.md.
// Music (public/music/spot-track.wav, 120 BPM, bars from 1.0s) was written first; picture and VO cut to it:
//   drop 270 (9.0s) · benefit bars 330/390/450/510 · proof 570 · end-card resolve 690.
// Scenes: 105 + 165 + 60 + 4×60 + 120 + 210 = 900. Hard cuts on the beat, no transitions.
export const WheelProSpot = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      <TransitionSeries name="Spot timeline">
        <TransitionSeries.Sequence name="Hook" durationInFrames={105} premountFor={fps}>
          <SpotHook lineOne="Every slow reply" lineTwo="is a wheel job you just lost." />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="Pain" durationInFrames={165} premountFor={fps}>
          <SpotPain />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="Reveal (drop)" durationInFrames={60} premountFor={fps}>
          <SpotReveal />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="Benefit: leads" durationInFrames={60} premountFor={fps}>
          <Step
            time="01"
            label="LEADS"
            headline="Every lead, one inbox."
            headlineSize={140}
            screen="leads"
            focusX={560}
            focusY={414}
            targetX={420}
            targetY={414}
            zoom={1.22}
            clickAt={34}
            clickSound=""
            toast=""
            toastTone="accent"
            toastPosition="top"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="Benefit: quotes" durationInFrames={60} premountFor={fps}>
          <Step
            time="02"
            label="QUOTES"
            headline="Quotes out in minutes."
            headlineSize={140}
            screen="quote"
            focusX={960}
            focusY={240}
            targetX={1117}
            targetY={175}
            zoom={1.22}
            clickAt={34}
            clickSound=""
            toast=""
            toastTone="accent"
            toastPosition="top"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="Benefit: follow-ups" durationInFrames={60} premountFor={fps}>
          <Step
            time="03"
            label="FOLLOW-UPS"
            headline="Follow-ups send themselves."
            headlineSize={124}
            screen="email"
            focusX={560}
            focusY={347}
            targetX={654}
            targetY={347}
            zoom={1.3}
            clickAt={34}
            clickSound=""
            toast=""
            toastTone="accent"
            toastPosition="top"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="Benefit: deposits" durationInFrames={60} premountFor={fps}>
          <Step
            time="04"
            label="PAYMENTS"
            headline="Deposits paid online."
            headlineSize={140}
            screen="invoice"
            focusX={760}
            focusY={700}
            targetX={820}
            targetY={761}
            zoom={1.22}
            clickAt={34}
            clickSound=""
            toast="Payment received · $879.00"
            toastTone="success"
            toastPosition="top"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="Proof" durationInFrames={120} premountFor={fps}>
          <SpotFan />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="End card" durationInFrames={210} premountFor={fps}>
          <SpotEnd cta="Book a meeting" url="wheelprosystems.com" />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Audio
        name="Music"
        src={staticFile("music/spot-track.wav")}
        premountFor={fps}
        volume={interpolate(
          frame,
          [0, 6, 262, 268, 278, 286, 560, 568, 574, 580, 642, 652, 684, 690, 698, 706, 884, 899],
          [0.55, 0.32, 0.32, 1, 1, 0.38, 0.38, 0.6, 0.6, 0.34, 0.34, 0.7, 0.7, 1, 1, 0.3, 0.3, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          },
        )}
      />
      <Audio name="VO 1 · hook" src={staticFile("vo/vo1-hook.wav")} from={9} premountFor={fps} />
      <Audio name="VO 2 · pain" src={staticFile("vo/vo2-pain.wav")} from={112} premountFor={fps} />
      <Audio name="VO 3 · reveal" src={staticFile("vo/vo3-reveal.wav")} from={282} premountFor={fps} />
      <Audio name="VO 4a · leads" src={staticFile("vo/vo4a-leads.wav")} from={334} premountFor={fps} />
      <Audio name="VO 4b · quotes" src={staticFile("vo/vo4b-quotes.wav")} from={394} premountFor={fps} />
      <Audio name="VO 4c · follow-ups" src={staticFile("vo/vo4c-followups.wav")} from={454} premountFor={fps} />
      <Audio name="VO 4d · deposits" src={staticFile("vo/vo4d-deposits.wav")} from={514} premountFor={fps} />
      <Audio name="VO 5 · proof" src={staticFile("vo/vo5-proof.wav")} from={580} premountFor={fps} />
      <Audio name="VO 6a · tagline" src={staticFile("vo/vo6a-tagline.wav")} from={702} premountFor={fps} />
      <Audio name="VO 6b · CTA" src={staticFile("vo/vo6b-cta.wav")} from={792} premountFor={fps} />
    </>
  );
};
