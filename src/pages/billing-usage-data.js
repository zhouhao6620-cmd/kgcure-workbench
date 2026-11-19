export const BILLING_VIEWS = [
  { key: 'member', label: '会员权益' },
  { key: 'points', label: '科研积分' },
];

export const USAGE_TYPES = [
  { key: 'chat', label: '对话', description: '通过对话发起的使用' },
  { key: 'skill', label: '科研 Skill', description: '通过科研 Skill 发起的使用' },
  { key: 'agent', label: '科研 Agent', description: '通过科研 Agent 发起的使用' },
  { key: 'other', label: '其他', description: '未归入以上类型的使用' },
];

export const USAGE_PERIODS = ['近 7 天', '近 30 天', '本月'];
export const USAGE_SOURCES = [
  { key: 'member', label: '会员额度' },
  { key: 'points', label: '科研积分' },
];

export const SAMPLE_BALANCE = 5900;
export const SAMPLE_GROUP_BALANCE = 2400;
export const QUOTA_INVITE = { required: 3, cardName: '周重置卡' };
export const POINTS_INVITE = { reward: 500, weeklyLimit: 10 };
export const SAMPLE_QUOTA_INVITES = 2;
export const SAMPLE_POINTS_INVITES = 2;
export const SAMPLE_QUOTA_REMAINING = 38;
export const SAMPLE_RESET = {
  dateTime: '2026-11-20T10:00:00+08:00',
  date: '11/20 10:00',
};

// Local demonstration data. Membership consumption is already expressed as
// a share of its applicable cycle, so the view never receives internal units.
const USAGE_SAMPLE = [
  { day: '2026-10-23', type: 'chat', quota: 16, points: 0, count: 2 },
  { day: '2026-11-03', type: 'chat', quota: 17, points: 0, count: 2 },
  { day: '2026-11-05', type: 'skill', quota: 23, points: 820, count: 4 },
  { day: '2026-11-10', type: 'agent', quota: 32, points: 530, count: 5 },
  { day: '2026-11-12', type: 'other', quota: 10, points: 490, count: 3 },
  { day: '2026-11-14', type: 'chat', quota: 16, points: 0, count: 2 },
  { day: '2026-11-16', type: 'skill', quota: 21, points: 0, count: 4 },
  { day: '2026-11-17', type: 'agent', quota: 13, points: 0, count: 3 },
  { day: '2026-11-19', type: 'skill', quota: 12, points: 0, count: 3 },
];

export const MEMBERSHIP_ORDERS = [
  { time: '2026.11.13 10:00', subject: '专家版 Plus · 1 个月', payment: '¥299.00', status: '已支付' },
  { time: '2026.10.13 10:00', subject: '基础版 · 1 个月', payment: '¥79.00', status: '已支付' },
  { time: '2026.09.13 10:00', subject: '基础版 · 兑换码开通', payment: '—', status: '已兑换' },
];

export const POINT_RECORDS = [
  { time: '2026.11.16 14:18', subject: '充值积分', delta: 5000, payment: '¥50.00' },
  { time: '2026.11.18 19:20', subject: '邀请奖励', delta: POINTS_INVITE.reward, payment: '—' },
  { time: '2026.11.16 10:20', subject: '邀请奖励', delta: POINTS_INVITE.reward, payment: '—' },
  ...USAGE_SAMPLE.filter(row => row.points > 0).map(row => ({
    time: row.day.replaceAll('-', '.') + ' 18:00',
    subject: (USAGE_TYPES.find(type => type.key === row.type)?.label ?? '') + ' · 用量扣减',
    delta: -row.points,
    payment: '—',
  })),
].sort((a, b) => b.time.localeCompare(a.time));

const periodEnd = '2026-11-19';
const periodStarts = {
  '近 7 天': '2026-11-13',
  '近 30 天': '2026-10-21',
  '本月': '2026-11-01',
};
const dayMs = 86_400_000;

export function getUsageSample(period, type, hasMembership) {
  const start = periodStarts[period];
  const selected = USAGE_SAMPLE.filter(row =>
    row.day >= start && row.day <= periodEnd && (type === 'all' || row.type === type) && (hasMembership || row.points > 0)
  );
  const days = [];
  for (let date = Date.parse(start); date <= Date.parse(periodEnd); date += dayMs) {
    days.push(new Date(date).toISOString().slice(0, 10));
  }

  const summary = (rows) => ({
    quota: hasMembership ? rows.reduce((sum, row) => sum + row.quota, 0) : 0,
    points: rows.reduce((sum, row) => sum + row.points, 0),
    count: rows.reduce((sum, row) => sum + row.count, 0),
  });

  const byType = USAGE_TYPES.filter(item => type === 'all' || item.key === type)
    .map(item => ({ ...item, ...summary(selected.filter(row => row.type === item.key)) }));

  return {
    start,
    end: periodEnd,
    ...summary(selected),
    activeDays: new Set(selected.map(row => row.day)).size,
    byType,
    timeline: days.map(day => ({ day, ...summary(selected.filter(row => row.day === day)) })),
  };
}
