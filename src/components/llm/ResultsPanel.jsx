import { MODEL_CACHE_READ, MODEL_INPUT, MODEL_KEY, MODEL_OUTPUT, batchRate, calculateCost, formatUSD } from '../../../scripts/lib/llm-prices.mjs';

function formatTokens(tokens) {
  return new Intl.NumberFormat('en-US').format(tokens);
}

export default function ResultsPanel({ model, usage, batch, tiers, batchPrices }) {
  if (!model) return null;
  const key = model[MODEL_KEY];
  const publishedBatch = (batchPrices || {})[key] ?? null;
  const effectiveBatch = batch && (publishedBatch !== null || batchRate(model) !== null);
  const cost = calculateCost(model, usage, { batch: effectiveBatch, batchPrice: publishedBatch });
  const tierList = tiers[key];
  const cacheUnpriced = usage.cacheReadTokens > 0 && model[MODEL_CACHE_READ] === null;

  return (
    <div className="llm-calc-results" aria-live="polite">
      <div className="llm-calc-stats">
        <div className="llm-calc-stat">
          <span>Cost per run</span>
          <strong>{formatUSD(cost.perRun)}</strong>
        </div>
        <div className="llm-calc-stat">
          <span>Cost per day</span>
          <strong>{formatUSD(cost.perDay)}</strong>
        </div>
        <div className="llm-calc-stat llm-calc-stat-accent">
          <span>Cost per month (30 days)</span>
          <strong>{formatUSD(cost.perMonth)}</strong>
        </div>
      </div>
      <div className="llm-calc-breakdown">
        <div>
          <span>Input · {formatTokens(usage.inputTokens)} tokens/step at {formatUSD(model[MODEL_INPUT])}/MTok</span>
          <strong>{formatUSD(cost.lines.input * cost.steps)}</strong>
        </div>
        {usage.cacheReadTokens > 0 && (
          <div>
            <span>Cached read · {formatTokens(usage.cacheReadTokens)} tokens/step at {formatUSD(model[MODEL_CACHE_READ] ?? model[MODEL_INPUT])}/MTok</span>
            <strong>{formatUSD(cost.lines.cacheRead * cost.steps)}</strong>
          </div>
        )}
        <div>
          <span>Output · {formatTokens(usage.outputTokens)} tokens/step at {formatUSD(model[MODEL_OUTPUT])}/MTok</span>
          <strong>{formatUSD(cost.lines.output * cost.steps)}</strong>
        </div>
        <div>
          <span>Steps per run</span>
          <strong>{formatTokens(cost.steps)}</strong>
        </div>
      </div>
      {(effectiveBatch || tierList || cacheUnpriced) && (
        <ul className="llm-calc-notes">
          {effectiveBatch && (
            <li>{cost.batchSource === 'published'
              ? 'Batch estimate uses this model’s published batch price; the cache rate scales by the same ratio.'
              : `Batch estimate: list prices multiplied by the approximate ${key.slice(0, key.indexOf(':'))} batch discount.`}</li>
          )}
          {tierList && tierList.map(([start, input, output]) => (
            <li key={start}>Above {formatTokens(start)} tokens of context this model charges {formatUSD(input)} input / {formatUSD(output)} output per MTok; the estimate uses the base tier.</li>
          ))}
          {cacheUnpriced && (
            <li>No published cache-read price for this model, so cached tokens are billed at the input rate.</li>
          )}
        </ul>
      )}
    </div>
  );
}
