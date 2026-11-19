import { useState } from 'react';
import { Tabs } from '../components.jsx';
import { getUsageSample, USAGE_PERIODS } from './billing-usage-data.js';

const number = new Intl.NumberFormat('zh-CN');
const percentage = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 2 });
function format(value, metric) {
  return metric === 'quota' ? `${value}%` : number.format(value);
}

function TrendChart({ timeline, metric, source }) {
  const [activeDay, setActiveDay] = useState(null);
  const values = timeline.map(row => row[metric]);
  const maximum = Math.max(1, ...values);
  const step = metric === 'quota' ? Math.max(5, Math.ceil(maximum / 20) * 5) : Math.max(100, Math.ceil(maximum / 400) * 100);
  const upper = step * 4;
  const width = 640;
  const height = 176;
  const positions = values.map((value, index) => ({
    left: index / (values.length - 1),
    top: 1 - value / upper,
  }));
  const path = positions.map(({ left, top }) => `${left * width},${top * height}`).join(' ');
  const labels = [0, Math.round((values.length - 1) / 3), Math.round((values.length - 1) * 2 / 3), values.length - 1];
  const activeIndex = timeline.findIndex(item => item.day === activeDay);
  const active = activeIndex >= 0 ? timeline[activeIndex] : null;

  return <figure className="bu-trend" data-source={source}>
    <figcaption>悬停或聚焦查看每日消耗</figcaption>
    <div className="bu-trend-grid">
      <div className="bu-y-axis" aria-hidden="true">{[4, 3, 2, 1, 0].map(multiplier =>
        <span key={multiplier}>{format(step * multiplier, metric)}</span>
      )}</div>
      <div className="bu-trend-plot">
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
          {[0, 1, 2, 3, 4].map(line => <line key={line} x1="0" x2={width} y1={line * height / 4} y2={line * height / 4} className="bu-chart-gridline" />)}
          <polygon points={`0,${height} ${path} ${width},${height}`} className="bu-chart-area" />
          <polyline points={path} className="bu-chart-line" />
        </svg>
        {timeline.map((row, index) => <div className="bu-chart-day" key={row.day}
          style={{ left: `${positions[index].left * 100}%`, top: `${positions[index].top * 100}%` }}
          onMouseEnter={() => setActiveDay(row.day)} onMouseLeave={() => setActiveDay(null)}>
          {values[index] > 0 && <button type="button" aria-label={`${row.day}，${format(values[index], metric)}${metric === 'points' ? ' 积分' : ''}`}
            onFocus={() => setActiveDay(row.day)} onBlur={() => setActiveDay(null)} onClick={() => setActiveDay(row.day)} />}
        </div>)}
        {active && <div role="status" className="bu-chart-tooltip" style={{ '--chart-day-position': `${positions[activeIndex].left * 100}%` }}>
          {active.day.slice(5).replace('-', '.')} · {format(active[metric], metric)}{metric === 'points' ? ' 积分' : ''}
        </div>}
      </div>
      <div className="bu-x-axis" aria-hidden="true">{labels.map(index => <span key={index}>{timeline[index].day.slice(5).replace('-', '.')}</span>)}</div>
    </div>
    <p className="bu-chart-note">按日汇总 · {metric === 'quota' ? '各次消耗按当时的会员周期额度折算' : '单位为科研积分'}</p>
  </figure>;
}

function getShares(rows, metric) {
  const total = rows.reduce((sum, row) => sum + row[metric], 0);
  let cumulativeShare = 0;
  return rows.map(row => {
    const previous = Math.round(cumulativeShare * 100);
    const share = total ? row[metric] / total * 100 : 0;
    cumulativeShare += share;
    const displayShare = (Math.round(cumulativeShare * 100) - previous) / 100;
    return { ...row, share, shareLabel: `${percentage.format(displayShare)}%` };
  });
}

function UsageSummary({ data, shares, children }) {
  const leading = shares.reduce((largest, row) => row.share > (largest?.share ?? 0) ? row : largest, null);
  let position = 0;
  const slices = shares.filter(row => row.share > 0);
  const gradient = slices.map(row => {
    const start = position;
    position += row.share;
    const gap = Math.min(0.4, row.share / 4);
    return `transparent ${start}% ${start + gap}%, var(--bu-type-${row.key}) ${start + gap}% ${position - gap}%, transparent ${position - gap}% ${position}%`;
  }).join(', ');

  return <section className="bu-usage-summary" aria-labelledby="bu-summary-title">
    <div className="bu-summary-grid">
      {children}
      <div className="bu-share-panel"><h3 id="bu-summary-title">类型占比</h3>
      <figure className="bu-donut-figure">
        <div className="bu-donut" role="img"
          aria-label={shares.map(row => `${row.label} ${row.shareLabel}`).join('，') || '暂无消耗'}
          style={leading ? { background: slices.length === 1 ? `var(--bu-type-${slices[0].key})` : `conic-gradient(${gradient})` } : undefined}>
          <div aria-hidden="true"><strong>{leading ? leading.shareLabel : '—'}</strong><span>{leading?.label ?? '暂无消耗'}</span></div>
        </div>
        <figcaption>{shares.map(row => <p key={row.key} data-usage-type={row.key}><i className="bu-type-dot" />{row.label}<strong>{row.shareLabel}</strong></p>)}</figcaption>
      </figure></div>
    </div>
    <h3 className="bu-summary-table-heading">按类型汇总</h3>
      <div className="bu-table-scroll" role="region" aria-label="按类型汇总表" tabIndex={0}>
        <table className="bu-table bu-summary-table">
          <thead><tr><th scope="col">使用类型</th><th scope="col">扣减记录数</th><th scope="col">会员额度消耗</th><th scope="col">科研积分消耗</th></tr></thead>
          <tbody>
            {data.byType.map(row => <tr key={row.key} data-usage-type={row.key}>
              <th scope="row"><span className="bu-type-label"><i className="bu-type-dot" />{row.label}</span><small>{row.description}</small></th>
              <td>{row.count} 条</td><td>{row.quota}%</td><td>{number.format(row.points)} 积分</td>
            </tr>)}
          </tbody>
          <tfoot><tr><th scope="row">合计</th><td>{data.count} 条</td><td>{data.quota}%</td><td>{number.format(data.points)} 积分</td></tr></tfoot>
        </table>
      </div>
  </section>;
}

export function BillingUsageAnalysis({ source, hasMembership }) {
  const [period, setPeriod] = useState('本月');
  const data = getUsageSample(period, 'all', hasMembership);
  const metric = source === 'member' ? 'quota' : 'points';
  const shares = getShares(data.byType, metric);
  const metrics = [
    { label: '会员额度累计消耗', value: `${data.quota}%`, hint: '按扣减当时的周额度折算后累计', tone: 'quota' },
    { label: '科研积分消耗', value: number.format(data.points), unit: '积分', hint: '统计用于科研任务的积分扣减', tone: 'points' },
    { label: '扣减记录数', value: data.count, unit: '条', hint: '会员额度和科研积分分别计数', tone: 'records' },
    { label: '活跃天数', value: data.activeDays, unit: '天', hint: '所选时段内有使用的天数', tone: 'days' },
  ];

  return <section className="bu-section bu-analysis" aria-labelledby="bu-analysis-title">
    <div className="bu-analysis-filters">
      <div className="bu-summary-heading">
        <h2 id="bu-analysis-title">用量明细</h2>
        <span className="bu-date-range">{data.start.replaceAll('-', '.')} — {data.end.replaceAll('-', '.')}</span>
      </div>
      <div className="bu-periods">
        <Tabs className="sp-sort bu-period-tabs" items={USAGE_PERIODS} value={period} onChange={setPeriod} ariaLabel="统计时段" />
      </div>
    </div>
    <dl className="bu-metrics" aria-live="polite">{metrics.map(({ label, value, unit, hint, tone }) =>
      <div key={tone} data-tone={tone}>
        <dt><i />{label}</dt>
        <dd className="bu-metric-value"><strong>{value}</strong>{unit && <span>{unit}</span>}</dd>
        <dd className="bu-metric-hint">{hint}</dd>
      </div>
    )}</dl>
    <UsageSummary data={data} shares={shares}>
      <div className="bu-trend-panel">
        <div className="bu-trend-heading"><h3>消耗趋势</h3><span>{source === 'member' ? '会员额度' : '科研积分'}</span></div>
        <TrendChart key={`${period}-${source}`} timeline={data.timeline} metric={metric} source={source} />
      </div>
    </UsageSummary>
    <footer className="bu-analysis-notes">
      <h3>统计说明</h3>
      <ul>
        <li>会员额度按扣减当时的周额度占比累计，跨周期可能超过 100%。扣减记录按会员额度和科研积分分别计数。</li>
        <li>科研积分消耗只统计任务扣减。充值、邀请奖励和逐笔扣减可在「账单记录 → 积分账单」查看。</li>
      </ul>
    </footer>
  </section>;
}
