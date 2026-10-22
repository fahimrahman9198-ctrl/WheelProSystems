import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Switzer is the WheelPro site's UI face (local variable font), Geist Mono is for times and amounts.
loadFont({
  family: "Switzer",
  url: staticFile("fonts/switzer-variable.woff2"),
  weight: "100 900",
});

loadFont({
  family: "Geist Mono",
  url: staticFile("fonts/geist-mono-variable.woff2"),
  weight: "100 900",
});
