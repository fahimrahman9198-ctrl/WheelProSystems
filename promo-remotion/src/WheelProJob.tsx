import { Audio } from "@remotion/media";
import { linearTiming, springTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { useVideoConfig } from "remotion";
import { EndCard } from "./scenes/EndCard";
import { LightLeakOverlay } from "./scenes/LightLeakOverlay";
import { Opening } from "./scenes/Opening";
import { Recap } from "./scenes/Recap";
import { Step } from "./scenes/Step";

// 30s: one real job, start to paid.
// Scenes 105+120+120+120+135+165+222 = 987, minus 4 slides × 18 and one 15-frame fade = 900.
// Cuts land at 87 (Lead), 189 (Quote), 291 (Follow-up), 393 (Paid), 513 (Recap), 678 (End card).
export const WheelProJob = () => {
  const { fps } = useVideoConfig();

  return (
    <>
      <TransitionSeries name="Job timeline">
        <TransitionSeries.Sequence name="Opening" durationInFrames={105} premountFor={fps}>
          <Opening title="One wheel job." subtitle="Lead to paid, in one system." />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 18 })}
        />
        <TransitionSeries.Sequence name="Lead" durationInFrames={120} premountFor={fps}>
          <Step
            time="08:14"
            label="NEW LEAD"
            headline="Jordan sends photos."
            headlineSize={150}
            screen="leads"
            focusX={560}
            focusY={414}
            targetX={420}
            targetY={414}
            zoom={1.32}
            clickAt={56}
            clickSound="https://remotion.media/mouse-click.wav"
            toast="Auto-reply sent · 08:14"
            toastTone="accent"
            toastPosition="top"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 18 })}
        />
        <TransitionSeries.Sequence name="Quote" durationInFrames={120} premountFor={fps}>
          <Step
            time="08:20"
            label="QUOTE"
            headline="Quoted by 8:20."
            headlineSize={150}
            screen="quote"
            focusX={960}
            focusY={240}
            targetX={1117}
            targetY={175}
            zoom={1.3}
            clickAt={56}
            clickSound="https://remotion.media/mouse-click.wav"
            toast="Quote sent to Jordan · $1,029"
            toastTone="accent"
            toastPosition="bottom"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 18 })}
        />
        <TransitionSeries.Sequence name="Follow-up" durationInFrames={120} premountFor={fps}>
          <Step
            time="DAY 1"
            label="FOLLOW-UP"
            headline="Follow-up? Automatic."
            headlineSize={150}
            screen="email"
            focusX={560}
            focusY={347}
            targetX={654}
            targetY={347}
            zoom={1.4}
            clickAt={56}
            clickSound="https://remotion.media/switch.wav"
            toast="Reminder scheduled · day 1 & 3"
            toastTone="accent"
            toastPosition="top"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: 18 })}
        />
        <TransitionSeries.Sequence name="Paid" durationInFrames={135} premountFor={fps}>
          <Step
            time="APR 24"
            label="INVOICE"
            headline="Paid online. $879."
            headlineSize={150}
            screen="invoice"
            focusX={760}
            focusY={700}
            targetX={820}
            targetY={761}
            zoom={1.3}
            clickAt={58}
            clickSound="https://remotion.media/mouse-click.wav"
            toast="Payment received · $879.00"
            toastTone="success"
            toastPosition="top"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />
        <TransitionSeries.Sequence name="Recap" durationInFrames={165} premountFor={fps}>
          <Recap headline="One job. One system." footer="No sticky notes. No phone tag." />
        </TransitionSeries.Sequence>
        <TransitionSeries.Overlay durationInFrames={30} premountFor={fps}>
          <LightLeakOverlay />
        </TransitionSeries.Overlay>
        <TransitionSeries.Sequence name="End card" durationInFrames={222} premountFor={fps}>
          <EndCard cta="Book a meeting" url="wheelprosystems.com" />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Audio name="Whoosh into Lead" src="https://remotion.media/whoosh.wav" from={81} volume={0.3} premountFor={fps} />
      <Audio name="Whoosh into Quote" src="https://remotion.media/whoosh.wav" from={183} volume={0.25} premountFor={fps} />
      <Audio name="Whoosh into Follow-up" src="https://remotion.media/whoosh.wav" from={285} volume={0.25} premountFor={fps} />
      <Audio name="Whoosh into Paid" src="https://remotion.media/whoosh.wav" from={387} volume={0.25} premountFor={fps} />
      <Audio name="Page turn into Recap" src="https://remotion.media/page-turn.wav" from={510} volume={0.4} premountFor={fps} />
    </>
  );
};
