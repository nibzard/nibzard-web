const FIELDS = [
  { name: 'inputTokens', label: 'Input tokens / step', hint: 'Fresh prompt tokens sent each step' },
  { name: 'outputTokens', label: 'Output tokens / step', hint: 'Tokens the model generates each step' },
  { name: 'cacheReadTokens', label: 'Cached tokens / step', hint: 'Prompt tokens read from cache' },
  { name: 'steps', label: 'Steps per run', hint: 'LLM calls in one agent run' },
  { name: 'runsPerDay', label: 'Runs per day', hint: 'Agent runs across a day' },
];

export default function UsageInputs({ values, onChange, batch, onBatchChange, batchInfo }) {
  return (
    <div className="llm-calc-inputs">
      {FIELDS.map(field => (
        <div key={field.name}>
          <label className="llm-calc-label" htmlFor={`llm-${field.name}`}>{field.label}</label>
          <input
            id={`llm-${field.name}`}
            type="number"
            inputMode="numeric"
            min={field.name === 'steps' ? 1 : 0}
            step="any"
            value={values[field.name]}
            onChange={event => onChange(field.name, event.target.value)}
          />
          <p className="llm-calc-picker-hint">{field.hint}</p>
        </div>
      ))}
      <div className="llm-calc-batch">
        <input
          id="llm-batch"
          type="checkbox"
          checked={batch && batchInfo.available}
          disabled={!batchInfo.available}
          onChange={event => onBatchChange(event.target.checked)}
        />
        <label htmlFor="llm-batch">
          Batch API discount
          <span className="llm-calc-batch-hint"> {batchInfo.available ? batchInfo.label : 'not published for this model'}</span>
        </label>
      </div>
    </div>
  );
}
