"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { Lead } from "./demo-data";

// Quote requests sent from a demo's quote page are kept in this browser so the shop owner can
// send one from their phone and then find it in their demo admin. Nothing leaves the browser.

const key = (slug: string) => `wp-demo-leads-${slug}`;

/** A 320px JPEG data URL, small enough to keep a few in localStorage. */
async function thumb(file: File): Promise<string | null> {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 320 / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.7);
  } catch {
    return null;
  }
}

export async function saveToDemoAdmin(slug: string, data: FormData, photos: { file: File }[]) {
  const thumbs = (await Promise.all(photos.slice(0, 2).map((p) => thumb(p.file)))).filter((t): t is string => !!t);
  const str = (k: string) => String(data.get(k) ?? "").trim();
  const lead: Lead = {
    id: `mine-${Date.now()}`,
    name: str("name") || "You",
    source: "Website",
    vehicle: str("vehicle") || "Vehicle not given",
    wheels: Number(str("wheels")) || 1,
    size: str("size") || "Not sure",
    damage: data.getAll("damage").map(String),
    finish: str("finish") || "Not sure yet",
    reply: (["Text", "Call", "Email"].includes(str("reply")) ? str("reply") : "Text") as Lead["reply"],
    received: "Just now",
    status: "New",
    photos: thumbs,
    notes: str("notes") || undefined,
  };
  try {
    localStorage.setItem(key(slug), JSON.stringify([lead, ...parse(localStorage.getItem(key(slug)))].slice(0, 5)));
  } catch {
    // Storage full or blocked: the demo admin just won't show it.
  }
}

function parse(raw: string | null): Lead[] {
  try {
    return raw ? (JSON.parse(raw) as Lead[]) : [];
  } catch {
    return [];
  }
}

function read(slug: string) {
  try {
    return localStorage.getItem(key(slug));
  } catch {
    return null;
  }
}

const subscribe = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
};

/** This browser's demo requests for a shop. Empty on the server, filled in after hydration. */
export function useDemoLeads(slug: string): Lead[] {
  const raw = useSyncExternalStore(subscribe, () => read(slug), () => null);
  return useMemo(() => parse(raw), [raw]);
}
