export default function TagPill({ children, onRemove, accent = false }) {
  return <span className={`tag-pill ${accent ? "accent" : ""}`}>{children}{onRemove && <button type="button" onClick={onRemove} aria-label={`Remove ${children}`}>×</button>}</span>;
}
