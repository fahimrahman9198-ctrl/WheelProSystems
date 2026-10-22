import "./fonts";
import { Composition, Folder } from "remotion";
import { EndCard } from "./scenes/EndCard";
import { Milestone } from "./scenes/Milestone";
import { Opening } from "./scenes/Opening";
import { Recap } from "./scenes/Recap";
import { Step } from "./scenes/Step";
import { WheelProJob } from "./WheelProJob";
import { SpotEnd } from "./spot/SpotEnd";
import { SpotFan } from "./spot/SpotFan";
import { SpotHook } from "./spot/SpotHook";
import { SpotPain } from "./spot/SpotPain";
import { SpotReveal } from "./spot/SpotReveal";
import { WheelProSpot } from "./spot/WheelProSpot";
import { PitchAdmin } from "./pitch/PitchAdmin";
import { PitchBurst } from "./pitch/PitchBurst";
import { PitchClose } from "./pitch/PitchClose";
import { PitchHook } from "./pitch/PitchHook";
import { PitchWebsite } from "./pitch/PitchWebsite";
import { ShopPitch, shopPitchSchema } from "./pitch/ShopPitch";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Scenes">
        <Composition
          id="Opening"
          component={Opening}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={105}
          defaultProps={{ title: "One wheel job.", subtitle: "Lead to paid, in one system." }}
        />
        <Composition
          id="Step-Lead"
          component={Step}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={120}
          defaultProps={{
            time: "08:14",
            label: "NEW LEAD",
            headline: "Jordan sends photos.",
            headlineSize: 150,
            screen: "leads",
            focusX: 560,
            focusY: 414,
            targetX: 420,
            targetY: 414,
            zoom: 1.32,
            clickAt: 56,
            clickSound: "https://remotion.media/mouse-click.wav",
            toast: "Auto-reply sent · 08:14",
            toastTone: "accent",
            toastPosition: "top",
          }}
        />
        <Composition
          id="Step-Paid"
          component={Step}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={135}
          defaultProps={{
            time: "APR 24",
            label: "INVOICE",
            headline: "Paid online. $879.",
            headlineSize: 150,
            screen: "invoice",
            focusX: 760,
            focusY: 700,
            targetX: 820,
            targetY: 761,
            zoom: 1.3,
            clickAt: 58,
            clickSound: "https://remotion.media/mouse-click.wav",
            toast: "Payment received · $879.00",
            toastTone: "success",
            toastPosition: "top",
          }}
        />
        <Composition
          id="Recap"
          component={Recap}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={165}
          defaultProps={{ headline: "One job. One system.", footer: "No sticky notes. No phone tag." }}
        />
        <Composition
          id="EndCard"
          component={EndCard}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={222}
          defaultProps={{ cta: "Book a meeting", url: "wheelprosystems.com" }}
        />
      </Folder>
      <Folder name="Elements">
        <Composition
          id="Milestone"
          component={Milestone}
          width={400}
          height={240}
          fps={30}
          durationInFrames={30}
          defaultProps={{ label: "Paid", time: "$879.00", done: true }}
        />
      </Folder>
      <Composition
        id="WheelProJob"
        component={WheelProJob}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={900}
      />
      <Folder name="Spot-Scenes">
        <Composition
          id="SpotHook"
          component={SpotHook}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={105}
          defaultProps={{ lineOne: "Every slow reply", lineTwo: "is a wheel job you just lost." }}
        />
        <Composition id="SpotPain" component={SpotPain} width={1920} height={1080} fps={30} durationInFrames={165} />
        <Composition id="SpotReveal" component={SpotReveal} width={1920} height={1080} fps={30} durationInFrames={60} />
        <Composition id="SpotFan" component={SpotFan} width={1920} height={1080} fps={30} durationInFrames={120} />
        <Composition
          id="SpotEnd"
          component={SpotEnd}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={210}
          defaultProps={{ cta: "Book a meeting", url: "wheelprosystems.com" }}
        />
      </Folder>
      <Composition
        id="WheelProSpot"
        component={WheelProSpot}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={900}
      />
      <Folder name="Pitch-Scenes">
        <Composition id="PitchHook" component={PitchHook} width={1920} height={1080} fps={30} durationInFrames={150} defaultProps={{ shopName: "London Wheel Repair" }} />
        <Composition
          id="PitchWebsite"
          component={PitchWebsite}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={270}
          defaultProps={{ shopName: "London Wheel Repair", siteShot: "pitch/london-wheel-repair-site.png" }}
        />
        <Composition id="PitchBurst" component={PitchBurst} width={1920} height={1080} fps={30} durationInFrames={120} />
        <Composition
          id="PitchAdmin"
          component={PitchAdmin}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={690}
          defaultProps={{
            shopName: "London Wheel Repair",
            tax: "HST",
            leadsShot: "pitch/london-wheel-repair-leads.png",
            invoiceShot: "pitch/london-wheel-repair-quote.png",
            payShot: "pitch/london-wheel-repair-pay.png",
            paidShot: "pitch/london-wheel-repair-paid.png",
          }}
        />
        <Composition
          id="PitchClose"
          component={PitchClose}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={210}
          defaultProps={{ shopName: "London Wheel Repair", pageUrl: "wheelprosystems.com/demo/london-wheel-repair", cta: "Book a 20-minute walkthrough" }}
        />
      </Folder>
      <Composition
        id="ShopPitch"
        component={ShopPitch}
        schema={shopPitchSchema}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={1440}
        defaultProps={{
          shopName: "London Wheel Repair",
          city: "London",
          tax: "HST",
          pageUrl: "wheelprosystems.com/demo/london-wheel-repair",
          demoShots: "pitch/london-wheel-repair",
        }}
      />
    </>
  );
};
