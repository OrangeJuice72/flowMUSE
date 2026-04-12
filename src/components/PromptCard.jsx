export default function PromptCard({ title, content, onCopy, copied }) {
  return <section className="panel prompt-card"><div className="panel-header"><div><p className="eyebrow">Generated Prompt</p><h3>{title}</h3></div><button type="button" className="primary-btn" onClick={onCopy}>{copied ? "Copied!" : "Copy"}</button></div><textarea className="prompt-output" value={content} readOnly /></section>;
}
