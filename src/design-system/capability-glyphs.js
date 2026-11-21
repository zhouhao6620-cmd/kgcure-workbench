// Shared geometry for React controls and the isolated design-review documents.
const capabilityOutline = { viewBox: '0 0 24 24', strokeWidth: 1.65 };

export const skillGlyph = {
  ...capabilityOutline,
  shapes: [
    ['path', { d: 'M12 3.5 21 8.5l-9 5-9-5 9-5Z' }],
    ['path', { d: 'm3 12 9 5 9-5m-18 3.5 9 5 9-5' }],
  ],
};

export const agentGlyph = {
  ...capabilityOutline,
  shapes: [
    ['rect', { x: 4.5, y: 7, width: 15, height: 11.5, rx: 3.5 }],
    ['path', { d: 'M12 4v3M2 11v3.5M22 11v3.5M10.3 15.2h3.4' }],
    ['circle', { cx: 12, cy: 3.6, r: 0.95, fill: 'currentColor', stroke: 'none' }],
    ['circle', { cx: 9, cy: 11.7, r: 0.95, fill: 'currentColor', stroke: 'none' }],
    ['circle', { cx: 15, cy: 11.7, r: 0.95, fill: 'currentColor', stroke: 'none' }],
  ],
};

export const pluginGlyph = {
  viewBox: '0 0 24 24',
  strokeWidth: 1.85,
  shapes: [
    ['path', { d: 'M9 3v5m6-5v5M6 8h12m-11 0v4a5 5 0 0 0 10 0V8m-5 9v4' }],
  ],
};

export const evaluationShieldGlyph = {
  ...capabilityOutline,
  strokeWidth: 1.9,
  shapes: [
    ['path', { d: 'M12 3 20 6v5.5c0 4.5-2.7 7.5-8 9.5-5.3-2-8-5-8-9.5V6l8-3Z' }],
    ['path', { d: 'm8.7 11.9 2.2 2.2 4.4-4.4' }],
  ],
};

export const evaluationAlertGlyph = {
  ...capabilityOutline,
  strokeWidth: 1.9,
  shapes: [
    ['circle', { cx: 12, cy: 12, r: 9 }],
    ['path', { d: 'M12 8v4.5m0 3.4h.01' }],
  ],
};

export const exclusiveGlyph = {
  ...capabilityOutline,
  shapes: [
    ['path', { d: 'M3.5 7.5 8 11l4-6 4 6 4.5-3.5-2 9.5h-13l-2-9.5ZM6 20h12' }],
  ],
};
