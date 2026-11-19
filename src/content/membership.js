const memberships = {
  free: { name: '免费版' },
  basic: { name: '基础版', collaboration: false, academy: false },
  plus: { name: '专家版 Plus', collaboration: true, academy: false },
  pro: { name: '专家版 Pro', collaboration: true, academy: true },
};

export const EXCLUSIVE_AGENT_REQUIREMENT = '专享 Agent 仅 Plus 和 Pro 会员可用。';

export function previewMembershipTier(value) {
  return Object.hasOwn(memberships, value) ? value : 'plus';
}

export function membershipBenefits(tier) {
  return memberships[tier];
}

export function canUseExclusiveAgent(tier) {
  return tier === 'plus' || tier === 'pro';
}

export function canUseCapability(item, tier) {
  return !item?.exclusive || canUseExclusiveAgent(tier);
}
