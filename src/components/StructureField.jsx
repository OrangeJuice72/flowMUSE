import { useMemo, useState } from "react";
import TagPill from "./TagPill";
import { moveStructure } from "../utils/helpers";

export default function StructureField({ label, pool, selected, onChange }) {
  const [history, setHistory] = useState([]);
  const counts = useMemo(() => selected.reduce((acc, item) => ({ ...acc, [item]: (acc[item] || 0) + 1 }), {}), [selected]);
  const addStructure = (option) => { setHistory((prev) => [...prev, selected]); onChange(moveStructure(selected, option)); };
  const removeStructureAtIndex = (indexToRemove) => { setHistory((prev) => [...prev, selected]); onChange(selected.filter((_, index) => index !== indexToRemove)); };
  const clearAll = () => { setHistory((prev) => [...prev, selected]); onChange([]); };
  const undo = () => { setHistory((prev) => { if (!prev.length) return prev; const copy = [...prev]; const last = copy.pop(); onChange(last); return copy; }); };
  return <section className="panel field-panel"><div className="panel-header compact"><div><h3>{label}</h3><p className="helper-text">Shows all 30 structure options. Clear and undo only affect this section.</p></div><div className="button-row"><button type="button" className="ghost-btn" onClick={clearAll}>Clear</button><button type="button" className="ghost-btn" onClick={undo}>Undo</button></div></div>{selected.length > 0 && <div className="tag-row">{selected.map((item, index) => <TagPill key={`${item}-${index}`} onRemove={() => removeStructureAtIndex(index)} accent>{item}</TagPill>)}</div>}<div className="structure-grid">{pool.map((option) => <button key={option} type="button" className={`structure-chip ${counts[option] ? "selected" : ""}`} onClick={() => addStructure(option)}>{option}{counts[option] ? ` ×${counts[option]}` : ""}</button>)}</div></section>;
}
