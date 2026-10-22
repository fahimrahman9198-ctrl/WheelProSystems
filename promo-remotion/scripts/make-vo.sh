#!/usr/bin/env bash
# Regenerates the spot voiceover with the macOS "Daniel" voice (free, offline).
# Each line is trimmed, compressed and loudness-normalised to -16 LUFS into public/vo/.
# Cue frames live in src/spot/WheelProSpot.tsx; check new durations still fit their slots.
set -euo pipefail
cd "$(dirname "$0")/../public/vo"
VOICE="${VOICE:-Daniel}"
gen() {
  say -v "$VOICE" -r "$3" -o "$1.aiff" "$2"
  ffmpeg -y -loglevel error -i "$1.aiff" -af "silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,highpass=f=80,acompressor=threshold=-20dB:ratio=3:attack=5:release=80,loudnorm=I=-16:TP=-1.5" -ar 48000 -ac 1 "$1.wav"
  rm "$1.aiff"
  printf "%-16s %5.2fs  %s\n" "$1" "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$1.wav")" "$2"
}
gen vo1-hook       "Every slow reply... is a wheel job you just lost." 175
gen vo2-pain       "You're in the bay, hands full, while leads pile up in texts, DMs and voicemail." 205
gen vo3-reveal     "Meet WheelPro Systems." 165
gen vo4a-leads     "Every lead, in one inbox." 175
gen vo4b-quotes    "Quotes out in minutes." 175
gen vo4c-followups "Follow-ups that send themselves." 180
gen vo4d-deposits  "Deposits paid online." 175
gen vo5-proof      "Built only for wheel refinishers." 170
gen vo6a-tagline   "Less time on the phone. More wheels in the bay." 170
gen vo6b-cta       "Book a meeting, at wheel pro systems dot com." 178
