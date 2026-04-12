import { useMemo, useState } from "react";
import TagPill from "./TagPill";
import { buildSuggestions, normalize, uniquePush } from "../utils/helpers";

export default function MultiSelectField({ label, placeholder, pool, selected, onChange, exclude = [], selectedGenres = [], fieldKey, description, suggestionCount = 5 }) {
  const [query, setQuery] = useState("");
  const [cycleIndex, setCycleIndex] = useState(0);
  const { suggestions, relatedCount } = useMemo(() => buildSuggestions({ pool, selected, exclude, selectedGenres, fieldKey, size: suggestionCount, cycleIndex, query }), [pool, selected, exclude, selectedGenres, fieldKey, suggestionCount, cycleIndex, query]);
  const addValue = (value) => {
    if (!value?.trim()) return;
    const normalizedValue = normalize(value);
    const blocked = [...selected, ...exclude].map(normalize);
    if (blocked.includes(normalizedValue)) return;
    onChange(uniquePush(selected, value.trim()));
    setQuery("");
  };
  const handleKeyDown = (event) => { if (event.key === "Enter" || event.key === ",") { event.preventDefault(); addValue(query); } };
  return <section className="panel field-panel"><div className="panel-header compact"><div><h3>{label}</h3>{description && <p className="helper-text">{description}</p>}</div><button type="button" className="ghost-btn" onClick={() => setCycleIndex((value) => value + 1)}>Cycle</button></div><div className="input-shell"><input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={handleKeyDown} placeholder={placeholder} /><button type="button" className="primary-btn small" onClick={() => addValue(query)}>Add</button></div>{selected.length > 0 && <div className="tag-row">{selected.map((item) => <TagPill key={item} onRemove={() => onChange(selected.filter((entry) => entry !== item))} accent>{item}</TagPill>)}</div>}<div className="suggestion-meta"><span>{suggestionCount} suggestions</span><span>{relatedCount > 0 ? "1st suggestion is genre-related" : "1st suggestion is randomized"}</span></div><div className="suggestion-grid">{suggestions.map((item, index) => <button key={`${item}-${index}`} type="button" className={`suggestion-chip ${index === 0 ? "highlight" : ""}`} onClick={() => addValue(item)}>{item}</button>)}</div></section>;
}
