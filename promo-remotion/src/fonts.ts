import { loadFont } from "@remotion/fonts";
import { loadFont as loadGeistMono } from "@remotion/google-fonts/GeistMono";
import { staticFile } from "remotion";

// Switzer is the WheelPro site's UI face (local variable font), Geist Mono is for times and amounts.
loadFont({
  family: "Switzer",
  url: staticFile("fonts/switzer-variable.woff2"),
  weight: "100 900",
});

loadGeistMono("normal", { weights: ["400", "500"], subsets: ["latin"] });
