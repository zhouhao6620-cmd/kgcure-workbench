import './quota-progress.css';

export function quotaTone(remaining) {
  if (remaining >= 65) return 'green';
  if (remaining >= 40) return 'blue';
  if (remaining >= 20) return 'gold';
  if (remaining >= 10) return 'orange';
  return 'red';
}

export function QuotaProgress({ remaining, className = '', label = '周额度剩余' }) {
  return <span className={`ds-quota-progress ${className}`} data-tone={quotaTone(remaining)}
    role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={remaining}>
    <span style={{ width: `${remaining}%` }} />
  </span>;
}
