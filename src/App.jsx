import { useEffect, useMemo, useState } from "react";
import {
  AudioLines,
  Clipboard,
  FolderOpen,
  Guitar,
  Layers3,
  Lightbulb,
  MicVocal,
  Music4,
  RotateCcw,
  Save,
  Shuffle,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Undo2,
} from "lucide-react";
import {
  defaultGenre,
  defaultSubGenre,
  genreAlignedSuggestions,
  optionSets,
  subGenreOptions,
} from "./data/options";

const tabs = [
  { id: "main", label: "Main", icon: Music4 },
  { id: "premises", label: "Premises", icon: Lightbulb },
  { id: "vocals", label: "Vocals", icon: MicVocal },
  { id: "instruments", label: "Instruments", icon: Guitar },
  { id: "structure", label: "Structure", icon: Layers3 },
  { id: "prompt", label: "Prompt", icon: Sparkles },
];

const intensityOptions = ["Low", "Medium", "High", "Max"];

const chipFields = {
  flavor: optionSets.flavor,
  mood: optionSets.mood,
  theme: optionSets.theme,
  perspective: optionSets.perspective,
  action: optionSets.action,
  target: optionSets.target,
  vocalStyle: optionSets.vocalStyle,
  vocalDelivery: optionSets.vocalDelivery,
  vocalFx: optionSets.vocalFx,
  lead: optionSets.lead,
  rhythm: optionSets.rhythm,
  drums: optionSets.drums,
  bass: optionSets.bass,
  chords: optionSets.chords,
  texture: optionSets.texture,
  fx: optionSets.fx,
  patterns: optionSets.patterns,
  schemes: optionSets.schemes,
  build: optionSets.buildSuggestions,
};

const defaultForm = {
  genre: defaultGenre,
  subGenre: defaultSubGenre,
  flavor: "",
  mood: "",
  bpm: 118,
  theme: "",
  perspective: "",
  action: "",
  target: "",
  artistReference: "",
  songReference: "",
  vocalStyle: "",
  vocalDelivery: "",
  vocalFx: "",
  lead: "",
  rhythm: "",
  drums: "",
  bass: "",
  chords: "",
  texture: "",
  fx: "",
  patterns: "",
  schemes: "",
  build: "Intro\nVerse\nChorus\nBridge\nOutro",
};

const structureDefaults = {
  Intro: "Low",
  Verse: "Medium",
  Chorus: "High",
  Bridge: "Medium",
  Outro: "Low",
};

function Field({ label, children, helper }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {helper ? <span className="field-helper">{helper}</span> : null}
    </label>
  );
}

function SuggestionChips({
  items,
  selectedItems = [],
  onSelect,
  onRandomize,
  lockSelections = true,
  showRandomize = true,
}) {
  const hasUnlocked = lockSelections
    ? items.some((item) => !selectedItems.includes(item))
    : items.length > 0;

  return (
    <div className="chips-wrap">
      <div className="chips">
        {items.map((item) => {
          const isSelected = lockSelections && selectedItems.includes(item);

          return (
            <button
              key={item}
              type="button"
              className={`chip ${isSelected ? "chip-selected" : ""}`}
              onClick={() => onSelect(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
      {showRandomize ? (
        <button
          type="button"
          className="chip-randomize"
          onClick={onRandomize}
          disabled={!hasUnlocked}
        >
          <Shuffle size={14} />
          Randomize
        </button>
      ) : null}
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("main");
  const [form, setForm] = useState(defaultForm);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [selectedSavedPrompt, setSelectedSavedPrompt] = useState("");
  const [loadedPrompt, setLoadedPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [structureIntensity, setStructureIntensity] = useState(structureDefaults);
  const [selectedChips, setSelectedChips] = useState({});
  const [visibleSuggestions, setVisibleSuggestions] = useState(() => {
    const initialSuggestions = {};

    for (const [fieldName, items] of Object.entries(chipFields)) {
      initialSuggestions[fieldName] = items.slice(0, 3);
    }

    return initialSuggestions;
  });

  const structureRows = useMemo(
    () =>
      form.build
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line, index) => ({
          id: `${line}-${index}`,
          label: line,
        })),
    [form.build],
  );

  const currentSubGenres = subGenreOptions[form.genre] ?? [];

  useEffect(() => {
    setStructureIntensity((current) => {
      const next = {};
      for (const section of structureRows) {
        next[section.id] = current[section.id] ?? structureDefaults[section.label] ?? "Medium";
      }
      return next;
    });
  }, [structureRows]);

  useEffect(() => {
    const locked = getSelectedItems("flavor");

    setVisibleSuggestions((current) => ({
      ...current,
      flavor: buildVisibleSuggestions("flavor", locked, current.flavor),
    }));
  }, [form.genre]);

  useEffect(() => {
    const alignedFields = Object.keys(genreAlignedSuggestions);

    setVisibleSuggestions((current) => {
      const next = { ...current };

      for (const fieldName of alignedFields) {
        next[fieldName] = buildVisibleSuggestions(
          fieldName,
          getSelectedItems(fieldName),
          current[fieldName],
        );
      }

      return next;
    });
  }, [form.genre]);

  useEffect(() => {
    if (!currentSubGenres.length) {
      return;
    }

    setForm((current) => {
      if (currentSubGenres.includes(current.subGenre)) {
        return current;
      }

      return {
        ...current,
        subGenre: currentSubGenres[0],
      };
    });
  }, [currentSubGenres]);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    if (!saved) {
      return undefined;
    }
    const timer = window.setTimeout(() => setSaved(false), 1800);
    return () => window.clearTimeout(timer);
  }, [saved]);

  const generatedPrompt = useMemo(() => {
    const buildValue = structureRows.map((section) => section.label).join(", ");
    const buildIntensityValue = structureRows
      .map((section) => `${section.label}: ${structureIntensity[section.id] || "Medium"}`)
      .join(", ");

    return [
      "Foundation",
      `Genre: ${form.genre}`,
      `Sub Genre: ${form.subGenre}`,
      `Flavor: ${form.flavor}`,
      `Mood: ${form.mood}`,
      `BPM: ${form.bpm}`,
      "",
      "Vocals",
      `Vocal Style: ${form.vocalStyle}`,
      `Vocal Delivery: ${form.vocalDelivery}`,
      `Vocal FX: ${form.vocalFx}`,
      "",
      "Instrumentation",
      `Lead: ${form.lead}`,
      `Rhythm: ${form.rhythm}`,
      `Drums: ${form.drums}`,
      `Bass: ${form.bass}`,
      `Chords: ${form.chords}`,
      `Texture: ${form.texture}`,
      `FX: ${form.fx}`,
      "",
      "Structure",
      `Build: ${buildValue}`,
      `Build Intensity: ${buildIntensityValue}`,
      `Patterns: ${form.patterns}`,
      `Schemes: ${form.schemes}`,
      `Artist References: ${form.artistReference}`,
      `Song References: ${form.songReference}`,
      "",
      "Premises",
      `Theme: ${form.theme}`,
      `Perspective: ${form.perspective}`,
      `Action: ${form.action}`,
      `Target: ${form.target}`,
    ].join("\n");
  }, [form, structureIntensity, structureRows]);

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function parseFieldItems(fieldName, value) {
    const separator = fieldName === "build" ? "\n" : ",";
    return value
      .split(separator)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function formatFieldItems(fieldName, items) {
    return fieldName === "build" ? items.join("\n") : items.join(", ");
  }

  function getRandomItems(items, count) {
    return [...items].sort(() => Math.random() - 0.5).slice(0, count);
  }

  function buildVisibleSuggestions(fieldName, lockedItems, currentVisible = []) {
    const pool = chipFields[fieldName] ?? [];

    if (fieldName === "flavor") {
      const visible = currentVisible.length ? currentVisible : pool.slice(0, 3);
      const lockedSet = new Set(lockedItems);
      const genrePool = (subGenreOptions[form.genre] ?? []).filter((item) => pool.includes(item));
      const wildcardPool = pool.filter((item) => !genrePool.includes(item));
      const nextVisible = [...visible];
      const used = new Set(lockedItems);

      function assignSlot(index, candidates) {
        if (lockedSet.has(nextVisible[index])) {
          used.add(nextVisible[index]);
          return;
        }

        const [choice] = getRandomItems(
          candidates.filter((item) => !used.has(item)),
          1,
        );

        if (choice) {
          nextVisible[index] = choice;
          used.add(choice);
        }
      }

      assignSlot(0, genrePool);
      assignSlot(1, genrePool);
      assignSlot(2, wildcardPool);

      return nextVisible;
    }

    if (genreAlignedSuggestions[fieldName]) {
      const visible = currentVisible.length ? currentVisible : pool.slice(0, 3);
      const lockedSet = new Set(lockedItems);
      const preferredPool = (genreAlignedSuggestions[fieldName][form.genre] ?? []).filter((item) =>
        pool.includes(item),
      );
      const nextVisible = [...visible];
      const used = new Set(lockedItems);

      if (!lockedSet.has(nextVisible[0])) {
        const [genreChoice] = getRandomItems(
          preferredPool.filter((item) => !used.has(item)),
          1,
        );

        if (genreChoice) {
          nextVisible[0] = genreChoice;
          used.add(genreChoice);
        }
      } else {
        used.add(nextVisible[0]);
      }

      const wildcardPool = pool.filter((item) => !used.has(item));
      const wildcardChoices = getRandomItems(wildcardPool, wildcardPool.length);
      let wildcardIndex = 0;

      for (let index = 1; index < nextVisible.length; index += 1) {
        if (lockedSet.has(nextVisible[index])) {
          used.add(nextVisible[index]);
          continue;
        }

        const nextChoice = wildcardChoices[wildcardIndex];
        wildcardIndex += 1;

        if (nextChoice) {
          nextVisible[index] = nextChoice;
          used.add(nextChoice);
        }
      }

      return nextVisible;
    }

    const visible = currentVisible.length ? currentVisible : pool.slice(0, 3);
    const lockedSet = new Set(lockedItems);
    const preserved = new Set(visible.filter((item) => lockedSet.has(item)));
    const unlockedPool = pool.filter((item) => !lockedSet.has(item) && !preserved.has(item));
    const randomized = getRandomItems(unlockedPool, unlockedPool.length);
    let randomIndex = 0;

    return visible.map((item) => {
      if (lockedSet.has(item)) {
        return item;
      }

      const nextItem = randomized[randomIndex];
      randomIndex += 1;
      return nextItem ?? item;
    });
  }

  function getSelectedItems(fieldName) {
    return selectedChips[fieldName] ?? [];
  }

  function toggleChip(fieldName, value) {
    let nextSelectedItems = [];

    setSelectedChips((current) => {
      const active = current[fieldName] ?? [];
      nextSelectedItems = active.includes(value)
        ? active.filter((item) => item !== value)
        : [...active, value];

      return {
        ...current,
        [fieldName]: nextSelectedItems,
      };
    });

    setVisibleSuggestions((current) => ({
      ...current,
      [fieldName]: current[fieldName] ?? chipFields[fieldName]?.slice(0, 3) ?? [],
    }));

    setForm((current) => {
      const currentItems = parseFieldItems(fieldName, current[fieldName]);
      const nextItems = currentItems.includes(value)
        ? currentItems.filter((item) => item !== value)
        : [...currentItems, value];

      return {
        ...current,
        [fieldName]: formatFieldItems(fieldName, nextItems),
      };
    });
  }

  function randomizeField(fieldName, items) {
    const locked = getSelectedItems(fieldName);

    setVisibleSuggestions((current) => ({
      ...current,
      [fieldName]: buildVisibleSuggestions(fieldName, locked, current[fieldName]),
    }));
  }

  function appendBuildSection(value) {
    setForm((current) => {
      const currentItems = parseFieldItems("build", current.build);
      return {
        ...current,
        build: formatFieldItems("build", [...currentItems, value]),
      };
    });
  }

  function clearBuildSections() {
    setForm((current) => ({
      ...current,
      build: "",
    }));
  }

  function undoBuildSection() {
    setForm((current) => {
      const currentItems = parseFieldItems("build", current.build);

      if (!currentItems.length) {
        return current;
      }

      return {
        ...current,
        build: formatFieldItems("build", currentItems.slice(0, -1)),
      };
    });
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  function handleSave() {
    if (!generatedPrompt.trim()) {
      return;
    }

    const name = `Prompt ${savedPrompts.length + 1}`;
    const next = [...savedPrompts, { id: name, name, value: generatedPrompt }];
    setSavedPrompts(next);
    setSelectedSavedPrompt(name);
    setLoadedPrompt(generatedPrompt);
    setSaved(true);
  }

  function handleLoad(savedId) {
    setSelectedSavedPrompt(savedId);
    const match = savedPrompts.find((prompt) => prompt.id === savedId);
    setLoadedPrompt(match ? match.value : "");
  }

  function handleDelete() {
    if (!selectedSavedPrompt) {
      return;
    }
    const next = savedPrompts.filter((prompt) => prompt.id !== selectedSavedPrompt);
    setSavedPrompts(next);
    setSelectedSavedPrompt("");
    setLoadedPrompt("");
  }

  function renderInputWithChips(label, fieldName, chips) {
    return (
      <Field label={label}>
        <input
          className="text-input"
          type="text"
          value={form[fieldName]}
          onChange={(event) => updateField(fieldName, event.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
        <SuggestionChips
          items={visibleSuggestions[fieldName] ?? chips.slice(0, 3)}
          selectedItems={getSelectedItems(fieldName)}
          onSelect={(value) => toggleChip(fieldName, value)}
          onRandomize={() => randomizeField(fieldName, chips)}
        />
      </Field>
    );
  }

  function renderMainTab() {
    return (
      <section className="panel panel-main">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Foundation</p>
            <h2>Main Direction</h2>
          </div>
          <SlidersHorizontal className="panel-icon" />
        </div>
        <div className="field-grid two-column">
          <Field label="Main Genre">
            <select
              className="text-input"
              value={form.genre}
              onChange={(event) => updateField("genre", event.target.value)}
            >
              {optionSets.genres.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Sub Genre">
              <select
                className="text-input"
                value={form.subGenre}
                onChange={(event) => updateField("subGenre", event.target.value)}
              >
                {currentSubGenres.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="field-grid">
          {renderInputWithChips("Flavor", "flavor", optionSets.flavor)}
          {renderInputWithChips("Mood", "mood", optionSets.mood)}
          <Field label="Temp">
            <div className="slider-wrap">
              <input
                className="slider"
                type="range"
                min="60"
                max="180"
                value={form.bpm}
                onChange={(event) => updateField("bpm", Number(event.target.value))}
              />
              <div className="slider-readout">
                <span>{form.bpm} BPM</span>
                <span>Tempo Focus</span>
              </div>
            </div>
          </Field>
        </div>
      </section>
    );
  }

  function renderPremisesTab() {
    return (
      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Song Seed</p>
            <h2>Premises</h2>
          </div>
          <Lightbulb className="panel-icon" />
        </div>
        <div className="field-grid two-column">
          {renderInputWithChips("Theme", "theme", optionSets.theme)}
          {renderInputWithChips("Perspective", "perspective", optionSets.perspective)}
          {renderInputWithChips("Action", "action", optionSets.action)}
          {renderInputWithChips("Target", "target", optionSets.target)}
          <Field label="Artist Reference">
            <input
              className="text-input"
              type="text"
              value={form.artistReference}
              onChange={(event) => updateField("artistReference", event.target.value)}
              placeholder="Enter artist reference"
            />
          </Field>
          <Field label="Song Reference">
            <input
              className="text-input"
              type="text"
              value={form.songReference}
              onChange={(event) => updateField("songReference", event.target.value)}
              placeholder="Enter song reference"
            />
          </Field>
        </div>
      </section>
    );
  }

  function renderVocalsTab() {
    return (
      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Performance</p>
            <h2>Vocals</h2>
          </div>
          <AudioLines className="panel-icon" />
        </div>
        <div className="field-grid">
          {renderInputWithChips("Vocal Style", "vocalStyle", optionSets.vocalStyle)}
          {renderInputWithChips("Vocal Delivery", "vocalDelivery", optionSets.vocalDelivery)}
          {renderInputWithChips("Vocal FX", "vocalFx", optionSets.vocalFx)}
        </div>
      </section>
    );
  }

  function renderInstrumentsTab() {
    return (
      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Arrangement Palette</p>
            <h2>Instruments</h2>
          </div>
          <Guitar className="panel-icon" />
        </div>
        <div className="field-grid two-column">
          {renderInputWithChips("Lead", "lead", optionSets.lead)}
          {renderInputWithChips("Rhythm", "rhythm", optionSets.rhythm)}
          {renderInputWithChips("Drums", "drums", optionSets.drums)}
          {renderInputWithChips("Bass", "bass", optionSets.bass)}
          {renderInputWithChips("Chords", "chords", optionSets.chords)}
          {renderInputWithChips("Texture", "texture", optionSets.texture)}
          {renderInputWithChips("FX", "fx", optionSets.fx)}
        </div>
      </section>
    );
  }

  function renderStructureTab() {
    return (
      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Song Map</p>
            <h2>Structure</h2>
          </div>
          <Layers3 className="panel-icon" />
        </div>
        <div className="structure-layout">
          <Field label="Build" helper="Use one section per line to shape the arrangement.">
            <textarea
              className="text-input textarea-input"
              value={form.build}
              onChange={(event) => updateField("build", event.target.value)}
              placeholder={"Intro\nVerse\nChorus\nBridge\nOutro"}
            />
            <div className="action-row">
              <button type="button" className="secondary-button" onClick={undoBuildSection}>
                <Undo2 size={16} />
                Undo
              </button>
              <button type="button" className="ghost-button" onClick={clearBuildSections}>
                <RotateCcw size={16} />
                Clear
              </button>
            </div>
            <SuggestionChips
              items={optionSets.buildSuggestions}
              onSelect={appendBuildSection}
              lockSelections={false}
              showRandomize={false}
            />
          </Field>
          <div className="field-grid">
            {renderInputWithChips("Patterns", "patterns", optionSets.patterns)}
            {renderInputWithChips("Schemes", "schemes", optionSets.schemes)}
            <div className="arrangement-editor">
              <div className="arrangement-header">
                <span>Section</span>
                <span>Intensity</span>
              </div>
              <div className="arrangement-rows">
                {structureRows.map((section, index) => (
                  <div key={section.id} className="arrangement-row">
                    <div className="arrangement-name">
                      <span className="arrangement-index">{String(index + 1).padStart(2, "0")}</span>
                      <strong>{section.label}</strong>
                    </div>
                    <select
                      className="text-input intensity-select"
                      value={structureIntensity[section.id] || "Medium"}
                      onChange={(event) =>
                        setStructureIntensity((current) => ({
                          ...current,
                          [section.id]: event.target.value,
                        }))
                      }
                    >
                      {intensityOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function renderPromptTab() {
    return (
      <div className="workspace-grid prompt-grid">
        <section className="panel prompt-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Output</p>
              <h2>Generated Prompt</h2>
            </div>
            <Sparkles className="panel-icon" />
          </div>
          <div className="prompt-output">
            <p>{generatedPrompt}</p>
          </div>
          <div className="action-row">
            <button type="button" className="primary-button" onClick={handleCopy}>
              <Clipboard size={16} />
              {copied ? "Copied" : "Copy"}
            </button>
            <button type="button" className="secondary-button" onClick={handleSave}>
              <Save size={16} />
              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </section>
        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Library</p>
              <h2>Saved Prompts</h2>
            </div>
            <FolderOpen className="panel-icon" />
          </div>
          <Field label="Saved Prompts Dropdown">
            <select
              className="text-input"
              value={selectedSavedPrompt}
              onChange={(event) => handleLoad(event.target.value)}
            >
              <option value="">Select a saved prompt</option>
              {savedPrompts.map((prompt) => (
                <option key={prompt.id} value={prompt.id}>
                  {prompt.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Loaded Prompt Display">
            <div className="loaded-panel">
              <p>{loadedPrompt || "No saved prompt loaded yet."}</p>
            </div>
          </Field>
          <div className="action-row">
            <button type="button" className="secondary-button" onClick={handleDelete}>
              <Trash2 size={16} />
              Delete
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={() => {
                setSelectedSavedPrompt("");
                setLoadedPrompt("");
              }}
            >
              Unload
            </button>
          </div>
        </section>
      </div>
    );
  }

  const activeTabConfig = tabs.find((tab) => tab.id === activeTab);
  const ActiveIcon = activeTabConfig.icon;

  return (
    <div className="app-shell">
      <div className="background-orb background-orb-left" />
      <div className="background-orb background-orb-right" />
      <header className="hero-header">
        <div className="brand-block">
          <div className="brand-mark">
            <Music4 size={20} />
          </div>
          <div>
            <p className="eyebrow">AI Music Studio</p>
            <h1>FlowMuse</h1>
          </div>
        </div>
        <div className="header-card">
          <ActiveIcon size={18} />
          <div>
            <span className="header-card-label">Active Workspace</span>
            <strong>{activeTabConfig.label}</strong>
          </div>
        </div>
      </header>

      <nav className="tab-bar" aria-label="FlowMuse sections">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              className={`tab-button ${isActive ? "tab-active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={17} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      <main className="main-content">
        {activeTab === "main" ? renderMainTab() : null}
        {activeTab === "premises" ? renderPremisesTab() : null}
        {activeTab === "vocals" ? renderVocalsTab() : null}
        {activeTab === "instruments" ? renderInstrumentsTab() : null}
        {activeTab === "structure" ? renderStructureTab() : null}
        {activeTab === "prompt" ? renderPromptTab() : null}
      </main>
    </div>
  );
}

export default App;
