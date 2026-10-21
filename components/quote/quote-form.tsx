"use client";

import { ArrowRight, Camera, Check, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { saveToDemoAdmin } from "@/lib/demo-store";
import { easeOut } from "../ui/motion";

const damages = ["Curb rash", "Scratches", "Bent", "Cracked", "Corrosion or peeling", "Just want a new colour"];
const sizes = ["Not sure", '15"', '16"', '17"', '18"', '19"', '20"', '21"', '22" or bigger'];
const finishes = ["Match the original", "Black", "Custom colour", "Not sure yet"];
const MAX_PHOTOS = 4;

const field =
  "h-[52px] w-full rounded-md border border-line-strong bg-white px-4 text-[16px] text-ink transition-[border-color,box-shadow] placeholder:text-ink-3 hover:border-ink-3 focus:border-ink focus:shadow-[0_0_0_3px_rgba(154,91,30,.18)] focus:outline-none aria-[invalid=true]:border-danger";
const select = `${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%2371717a%22 stroke-width=%221.5%22><path d=%22M4 6l4 4 4-4%22/></svg>')] bg-[right_16px_center] bg-no-repeat`;
const segment =
  "block rounded-sm py-2.5 text-center text-[15px] font-medium text-ink-2 transition-colors peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-accent";

type Photo = { id: string; file: File; url: string };

/** Phone photos are often 3–8 MB. Shrink to 1600px JPEG so four fit in one request. */
async function shrink(file: File): Promise<File> {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.82));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    // The browser can't decode it (e.g. HEIC on desktop Chrome): send the original.
    return file;
  }
}

export function QuoteForm({ slug, shopName, mobile }: { slug: string; shopName: string; mobile: boolean }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: boolean; contact?: boolean; photos?: string }>({});
  const [sent, setSent] = useState<{ first: string; reply: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();

  // Free the preview images when the page goes away.
  const photosRef = useRef(photos);
  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);
  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  async function addPhotos(list: FileList | null) {
    if (!list) return;
    const room = MAX_PHOTOS - photos.length;
    const picked = [...list].filter((f) => f.type.startsWith("image/") || /\.hei[cf]$/i.test(f.name)).slice(0, room);
    const small = await Promise.all(picked.map(shrink));
    const tooBig = small.some((f) => f.size > 4 * 1024 * 1024);
    const ok = small.filter((f) => f.size <= 4 * 1024 * 1024);
    setPhotos((cur) => [...cur, ...ok.map((file) => ({ id: crypto.randomUUID(), file, url: URL.createObjectURL(file) }))]);
    setErrors((e) => ({
      ...e,
      photos: tooBig ? "One photo was too large to send. Try a screenshot of it instead." : list.length > room ? `Up to ${MAX_PHOTOS} photos.` : undefined,
    }));
    if (fileRef.current) fileRef.current.value = "";
  }

  function removePhoto(id: string) {
    setPhotos((cur) => {
      const p = cur.find((x) => x.id === id);
      if (p) URL.revokeObjectURL(p.url);
      return cur.filter((x) => x.id !== id);
    });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const next = { name: !name, contact: !phone && !/^\S+@\S+\.\S+$/.test(email) };
    setErrors((cur) => ({ ...cur, ...next }));
    if (next.name || next.contact) {
      form.querySelector<HTMLInputElement>(next.name ? "#q-name" : "#q-phone")?.focus();
      return;
    }

    data.set("slug", slug);
    data.delete("photos");
    photos.forEach((p) => data.append("photos", p.file, p.file.name));

    setStatus("sending");
    try {
      const res = await fetch("/api/quote", { method: "POST", body: data });
      if (!res.ok) throw new Error();
      await saveToDemoAdmin(slug, data, photos);
      setSent({ first: name.split(/\s+/)[0], reply: String(data.get("reply") ?? "Text") });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    photos.forEach((p) => URL.revokeObjectURL(p.url));
    setPhotos([]);
    setSent(null);
    setStatus("idle");
  }

  if (status === "done" && sent) {
    const how = { Text: "text you", Call: "call you", Email: "email you" }[sent.reply] ?? "get back to you";
    return (
      <motion.div
        role="status"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="flex min-h-[520px] flex-col justify-center rounded-lg bg-subtle p-8 md:p-10"
      >
        <span className="mb-5 grid size-12 place-items-center rounded-md bg-success-soft text-success">
          <Check size={24} strokeWidth={2.2} />
        </span>
        <h2 className="t-h2">Sent. Thanks, {sent.first}.</h2>
        <p className="mt-3 max-w-[42ch] text-[16px] text-ink-2">
          {shopName} has your {photos.length ? "photos and details" : "details"} and will {how} with a price.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Link
            href={`/demo/${slug}/admin?view=leads&lead=latest`}
            className="inline-flex h-11 items-center gap-2 rounded-md bg-ink px-5 text-[15px] font-medium text-white hover:bg-[#27272a]"
          >
            See it in your admin <ArrowRight size={17} strokeWidth={1.75} />
          </Link>
          <button type="button" onClick={reset} className="text-[15px] font-medium text-ink underline decoration-line-strong underline-offset-[0.3em] hover:decoration-ink">
            Send another wheel
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-7 rounded-lg bg-subtle p-5 sm:p-6 md:p-8">
      {/* Photos */}
      <fieldset className="grid gap-3">
        <legend className="t-label mb-1 text-ink-3">Photos of the wheel</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {photos.map((p) => (
            <div key={p.id} className="relative aspect-square overflow-hidden rounded-md border border-line bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
              <img src={p.url} alt="" className="size-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(p.id)}
                aria-label="Remove photo"
                className="absolute top-1.5 right-1.5 grid size-7 place-items-center rounded-sm bg-ink/80 text-white hover:bg-ink"
              >
                <X size={15} strokeWidth={2} />
              </button>
            </div>
          ))}
          {photos.length < MAX_PHOTOS && (
            <label
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-line-strong bg-white text-center text-ink-2 transition-colors hover:border-ink focus-within:border-ink ${photos.length ? "aspect-square" : "col-span-2 py-9 sm:col-span-4"}`}
            >
              <span className="grid size-10 place-items-center rounded-sm bg-accent-soft text-accent">
                <Camera size={20} strokeWidth={1.75} />
              </span>
              <span className="text-[15px] font-medium text-ink">{photos.length ? "Add more" : "Add photos"}</span>
              {!photos.length && <span className="px-4 text-[14px] text-ink-3">One of the whole wheel, one close-up of the damage</span>}
              <input ref={fileRef} type="file" name="photos" accept="image/*" multiple className="sr-only" onChange={(e) => addPhotos(e.target.files)} />
            </label>
          )}
        </div>
        {errors.photos && <p className="text-[14px] text-danger">{errors.photos}</p>}
      </fieldset>

      {/* Damage */}
      <fieldset className="grid gap-3">
        <legend className="t-label mb-1 text-ink-3">What’s wrong?</legend>
        <div className="flex flex-wrap gap-2">
          {damages.map((d) => (
            <label key={d} className="relative cursor-pointer">
              <input type="checkbox" name="damage" value={d} className="peer sr-only" />
              <span className="inline-flex h-10 items-center rounded-md border border-line-strong bg-white px-3.5 text-[15px] font-medium text-ink-2 transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-accent hover:border-ink-3">
                {d}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Wheels */}
      <div className="grid gap-5 sm:grid-cols-2">
        <fieldset className="grid gap-2">
          <legend className="t-label mb-2 text-ink-3">How many wheels?</legend>
          <div className="grid grid-cols-4 rounded-md border border-line-strong bg-white p-1">
            {["1", "2", "3", "4"].map((v, i) => (
              <label key={v} className="relative cursor-pointer">
                <input type="radio" name="wheels" value={v} defaultChecked={i === 0} className="peer sr-only" />
                <span className={segment}>{v}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-2">
          <label htmlFor="q-size" className="t-label text-ink-3">Wheel size</label>
          <select id="q-size" name="size" className={select}>
            {sizes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="q-finish" className="t-label text-ink-3">Finish you want</label>
          <select id="q-finish" name="finish" className={select}>
            {finishes.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <label htmlFor="q-vehicle" className="t-label text-ink-3">Vehicle</label>
          <input id="q-vehicle" name="vehicle" placeholder="e.g. 2019 Audi A4" className={field} />
        </div>
      </div>

      {mobile && (
        <div className="grid gap-2">
          <label htmlFor="q-area" className="t-label text-ink-3">Where’s the car?</label>
          <input id="q-area" name="area" placeholder="Neighbourhood or postal code" autoComplete="postal-code" className={field} />
        </div>
      )}

      {/* Contact */}
      <div className="grid gap-5 border-t border-line-strong/60 pt-7">
        <div className="grid gap-2">
          <label htmlFor="q-name" className="t-label text-ink-3">Your name</label>
          <input id="q-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby="q-name-err" className={field} />
          {errors.name && <p id="q-name-err" className="text-[14px] text-danger">Add your name so they know who to reply to.</p>}
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="q-phone" className="t-label text-ink-3">Phone</label>
            <input id="q-phone" name="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.contact} aria-describedby="q-contact-err" className={field} />
          </div>
          <div className="grid gap-2">
            <label htmlFor="q-email" className="t-label text-ink-3">Email</label>
            <input id="q-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.contact} aria-describedby="q-contact-err" className={field} />
          </div>
        </div>
        {errors.contact && <p id="q-contact-err" className="-mt-2 text-[14px] text-danger">Add a phone number or an email so they can send your price.</p>}

        <fieldset className="grid gap-2">
          <legend className="t-label mb-2 text-ink-3">Best way to reach you</legend>
          <div className="grid grid-cols-3 rounded-md border border-line-strong bg-white p-1">
            {["Text", "Call", "Email"].map((v, i) => (
              <label key={v} className="relative cursor-pointer">
                <input type="radio" name="reply" value={v} defaultChecked={i === 0} className="peer sr-only" />
                <span className={segment}>{v}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-2">
          <label htmlFor="q-notes" className="t-label text-ink-3">Anything else? (optional)</label>
          <textarea id="q-notes" name="notes" rows={3} className={`${field} h-auto py-3`} placeholder="e.g. Only the front left, need it before Friday" />
        </div>

        {/* Honeypot: hidden from people, bots fill it in. */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      </div>

      <div className="grid gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex h-[56px] items-center justify-center gap-2 rounded-md bg-ink text-[16px] font-medium text-white transition-[background,transform] hover:bg-[#27272a] active:scale-[0.98] disabled:cursor-progress disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Sending…
            </>
          ) : (
            <>
              Send for a quote <ArrowRight size={18} strokeWidth={1.75} className="transition-transform group-hover:translate-x-[3px]" />
            </>
          )}
        </button>
        {status === "error" && (
          <p role="alert" className="text-center text-[14px] text-danger">That didn’t send. Check your connection and try again.</p>
        )}
        <p className="text-center text-[13px] text-ink-3">
          Demo: requests go to WheelPro Systems and appear in this demo’s admin.
        </p>
      </div>
    </form>
  );
}
