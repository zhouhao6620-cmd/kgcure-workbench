const memberships = {
  free: { name: '免费版' },
  basic: { name: '基础版', collaboration: false, academy: false },
  plus: { name: '专家版 Plus', collaboration: true, academy: false },
  pro: { name: '专家版 Pro', collaboration: true, academy: true },
};

export const EXCLUSIVE_AGENT_REQUIREMENT = '专享 Agent 仅 Plus 和 Pro 会员可用。';
export const DAILY_TASK_BENEFIT_LABEL = '基础功能';
export const DAILY_TASK_EXAMPLES = ['循证搜索', '选题设计', '基金申报'];
export const DAILY_TASK_BENEFIT = `${DAILY_TASK_BENEFIT_LABEL}：${DAILY_TASK_EXAMPLES.join('、')}等`;

export function previewMembershipTier(value) {
  return Object.hasOwn(memberships, value) ? value : 'plus';
}

export function membershipBenefits(tier) {
  return memberships[tier];
}

export function canUseExclusiveCapability(tier) {
  return tier === 'plus' || tier === 'pro';
}

export function canUseCapability(item, tier) {
  return !item?.exclusive || canUseExclusiveCapability(tier);
}
