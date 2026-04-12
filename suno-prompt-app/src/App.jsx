import { useMemo, useState } from "react";
import MultiSelectField from "./components/MultiSelectField";
import StructureField from "./components/StructureField";
import PromptCard from "./components/PromptCard";
import { mainGenres } from "./data/mainGenres";
import { flavorGenres } from "./data/flavorGenres";
import { songStructures } from "./data/songStructures";
import { themes } from "./data/themes";
import { instruments } from "./data/instruments";
import { vocals } from "./data/vocals";
import { vocalEffects } from "./data/vocalEffects";
import { atmospheres } from "./data/atmospheres";
import { moods } from "./data/moods";
import { rhymeStructures } from "./data/rhymeStructures";
import { literaryDevices } from "./data/literaryDevices";
import { allusions } from "./data/allusions";
import { copyToClipboard, joinOrFallback } from "./utils/helpers";

const INITIAL_STATE = { genres: [], flavorGenres: [], structure: [], themes: [], instruments: [], vocals: [], vocalEffects: [], atmospheres: [], moods: [], rhymeStructures: [], literaryDevices: [], allusions: [] };

export default function App() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [copiedKey, setCopiedKey] = useState("");
  const updateField = (field) => (value) => setForm((prev) => ({ ...prev, [field]: value }));

  const lyricPrompt = useMemo(() => `You are writing SUNO-ready lyrics. Create original lyrics that feel complete, vivid, and performance-ready.

Core direction:
- Main genres: ${joinOrFallback(form.genres)}
- Flavor genres: ${joinOrFallback(form.flavorGenres)}
- Song structure: ${joinOrFallback(form.structure)}
- Theme focus: ${joinOrFallback(form.themes)}
- Mood / emotions: ${joinOrFallback(form.moods)}
- Atmosphere: ${joinOrFallback(form.atmospheres)}
- Vocal approach: ${joinOrFallback(form.vocals)}
- Vocal effects to imply in phrasing or ad-libs: ${joinOrFallback(form.vocalEffects)}
- Rhyme structure: ${joinOrFallback(form.rhymeStructures)}
- Literary devices: ${joinOrFallback(form.literaryDevices)}
- Allusions / references: ${joinOrFallback(form.allusions)}

Write with these rules:
- Keep the lyrics coherent, memorable, and singable.
- Make the selected themes and moods obvious in the imagery and word choice.
- Use the selected rhyme structures and literary devices naturally, not mechanically.
- Use allusions as tasteful references only when they support the story.
- Match the pacing and section energy to the chosen song structure.
- Keep lines concise enough for melody.
- Avoid clichés unless they are intentionally flipped or subverted.
- Include section labels when helpful.
- Do not explain the choices. Output lyrics only.`, [form]);

  const stylePrompt = useMemo(() => `Create a SUNO style prompt for the sound and production of a song.

Sound blueprint:
Main genres: ${joinOrFallback(form.genres)}
Flavor genres: ${joinOrFallback(form.flavorGenres)}
Song structure: ${joinOrFallback(form.structure)}
Theme focus: ${joinOrFallback(form.themes)}
Instrumentation: ${joinOrFallback(form.instruments)}
Vocals: ${joinOrFallback(form.vocals)}
Vocal effects: ${joinOrFallback(form.vocalEffects)}
Atmosphere: ${joinOrFallback(form.atmospheres)}
Mood: ${joinOrFallback(form.moods)}

Prompt goals:
- Describe the sonic identity clearly and compactly.
- Mention production texture, groove, arrangement, dynamics, and emotional tone.
- Let the selected instruments shape the arrangement.
- Make the vocal tone and vocal effects feel intentional.
- Use genre and flavor genre combinations in a way that feels commercially or artistically believable.
- Keep it concise enough to paste into SUNO as a style / sound prompt.

Return a single polished style prompt paragraph only.`, [form]);

  const handleCopy = async (key, value) => { await copyToClipboard(value); setCopiedKey(key); window.setTimeout(() => setCopiedKey(""), 1800); };

  return <div className="app-shell"><div className="hero panel"><div><p className="eyebrow">React Project Folder Prompt Builder</p><h1>SUNO Lyrics + Style Prompt Builder</h1><p className="hero-copy">Build two copy-ready prompts inside one workflow: one for lyrics and one for sound design. Every editable pool lives in its own data file for easy maintenance.</p></div><div className="palette-card" aria-label="Color palette"><div className="palette-swatch large navy">#1D164A</div><div className="palette-swatch large gold">#FF9A21</div><div className="palette-swatch large orange">#FC6622</div><div className="palette-mini-row"><div className="palette-swatch mini purple">#5029AA</div><div className="palette-swatch mini blue">#1F6FC9</div></div></div></div><div className="layout"><div className="form-column"><MultiSelectField label="Main Genre" placeholder="Add one or more main genres" pool={mainGenres} selected={form.genres} onChange={updateField("genres")} selectedGenres={form.genres} fieldKey="flavor" description="Pool: 50. First suggestion stays genre-related whenever possible." /><MultiSelectField label="Flavor Genre" placeholder="Add flavor genres" pool={flavorGenres} selected={form.flavorGenres} onChange={updateField("flavorGenres")} exclude={form.genres} selectedGenres={form.genres} fieldKey="flavor" description="Pool: 75. Excludes anything already chosen as a main genre." /><StructureField label="Song Structure" pool={songStructures} selected={form.structure} onChange={updateField("structure")} /><MultiSelectField label="Theme" placeholder="Add themes" pool={themes} selected={form.themes} onChange={updateField("themes")} selectedGenres={form.genres} fieldKey="theme" description="Pool: 200." /><MultiSelectField label="Instruments" placeholder="Add instruments" pool={instruments} selected={form.instruments} onChange={updateField("instruments")} selectedGenres={form.genres} fieldKey="instrument" description="Pool: 500." /><MultiSelectField label="Vocals" placeholder="Add vocal types" pool={vocals} selected={form.vocals} onChange={updateField("vocals")} selectedGenres={form.genres} fieldKey="vocals" description="Pool: 10." /><MultiSelectField label="Vocal Effects" placeholder="Add vocal effects" pool={vocalEffects} selected={form.vocalEffects} onChange={updateField("vocalEffects")} selectedGenres={form.genres} fieldKey="vocalEffect" description="Pool: 50." /><MultiSelectField label="Atmosphere" placeholder="Add atmospheres" pool={atmospheres} selected={form.atmospheres} onChange={updateField("atmospheres")} selectedGenres={form.genres} fieldKey="atmosphere" description="Pool: 75." /><MultiSelectField label="Mood" placeholder="Add moods and emotions" pool={moods} selected={form.moods} onChange={updateField("moods")} selectedGenres={form.genres} fieldKey="mood" description="Pool: 100." /><MultiSelectField label="Rhyme Structure" placeholder="Add rhyme structures" pool={rhymeStructures} selected={form.rhymeStructures} onChange={updateField("rhymeStructures")} selectedGenres={form.genres} fieldKey="theme" description="Pool: 20." /><MultiSelectField label="Literary Devices" placeholder="Add literary devices" pool={literaryDevices} selected={form.literaryDevices} onChange={updateField("literaryDevices")} selectedGenres={form.genres} fieldKey="theme" description="Pool: 75." /><MultiSelectField label="Allusion" placeholder="Add references and allusions" pool={allusions} selected={form.allusions} onChange={updateField("allusions")} selectedGenres={form.genres} fieldKey="theme" description="Pool: 150. Includes Disney, movie, celebrity, cartoon, gaming, internet, and more." /></div><div className="output-column"><PromptCard title="Lyrics Guidance Prompt" content={lyricPrompt} onCopy={() => handleCopy("lyrics", lyricPrompt)} copied={copiedKey === "lyrics"} /><PromptCard title="Style / Sound Prompt" content={stylePrompt} onCopy={() => handleCopy("style", stylePrompt)} copied={copiedKey === "style"} /></div></div></div>;
}
