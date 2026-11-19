import { useEffect, useState } from 'react';
import { Check, ChevronRight, Coins, Crown, Gift, Info, ReceiptText, Ticket } from 'lucide-react';
import { QuotaProgress } from "../design-system/QuotaProgress.jsx";
import { Tabs } from '../components.jsx';
import { Button, DocumentEmptyIllustration, EmptyState, Modal, Tag } from '../design-preview/components.jsx';
import { canUseExclusiveAgent, membershipBenefits } from '../content/membership.js';
import { BillingUsageAnalysis } from './BillingUsageAnalysis.jsx';
import {
  BILLING_VIEWS, MEMBERSHIP_ORDERS, POINT_RECORDS, SAMPLE_BALANCE, SAMPLE_GROUP_BALANCE, SAMPLE_QUOTA_REMAINING, SAMPLE_RESET,
  QUOTA_INVITE, POINTS_INVITE, SAMPLE_QUOTA_INVITES, SAMPLE_POINTS_INVITES,
} from './billing-usage-data.js';
import './billing-usage.css';

const number = new Intl.NumberFormat('zh-CN');
const recordTabs = [{ key: 'member', label: '会员账单' }, { key: 'points', label: '积分账单' }, { key: 'invoices', label: '发票记录' }, { key: 'cards', label: '重置记录' }];

const campaigns = {
  member: {
    title: `邀请 ${QUOTA_INVITE.required} 位好友，领取${QUOTA_INVITE.cardName}`,
    description: `已有 ${SAMPLE_QUOTA_INVITES} / ${QUOTA_INVITE.required} 位好友完成注册并开启对话。`,
    qualification: '好友通过邀请链接注册并开启对话，计为 1 位有效邀请。',
    reward: `累计 ${QUOTA_INVITE.required} 位有效邀请后，可在「重置记录」查看获赠的 1 张${QUOTA_INVITE.cardName}。`,
  },
  points: {
    title: `邀请好友，双方各得 ${POINTS_INVITE.reward} 积分`,
    description: `本周已成功邀请 ${SAMPLE_POINTS_INVITES} / ${POINTS_INVITE.weeklyLimit} 位好友。`,
    qualification: `每邀请 1 位好友通过邀请链接注册，你和好友各得 ${POINTS_INVITE.reward} 科研积分。`,
    limit: `每周最多邀请 ${POINTS_INVITE.weeklyLimit} 人。`,
  },
};

function InviteSummary({ campaign, onInvite }) {
  const { title, description } = campaigns[campaign];
  return <div className="bu-invite-summary" data-campaign={campaign}>
    <span className="bu-invite-icon"><Gift size={18} aria-hidden="true" /></span>
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
    <button type="button" className="bu-invite-action" onClick={onInvite}>
      去邀请<ChevronRight size={14} aria-hidden="true" />
    </button>
  </div>;
}

export function BillingInviteDialog({ campaign, onClose }) {
  const order = campaign === 'points' ? ['points', 'member'] : ['member', 'points'];
  return <Modal title="邀请好友" onClose={onClose}>
    <div className="bu-invite-dialog">
      <span className="bu-invite-icon"><Gift size={23} aria-hidden="true" /></span>
      <div><strong>邀请有礼</strong><p>邀请好友一起使用 KGcure，解锁科研奖励。</p></div>
    </div>
    <div className="bu-dialog-copy">
      {order.map(key => {
        const { title, description, qualification, reward, limit } = campaigns[key];
        return <p key={key}><strong>{title}</strong><br />{description}<br />{qualification}{reward || limit}</p>;
      })}
      <p>邀请链接将在账户服务接入后提供。</p>
    </div>
    <div className="sp-dialog-actions"><Button onClick={onClose}>知道了</Button></div>
  </Modal>;
}

export function MembershipRedeemDialog({ onClose }) {
  const [code, setCode] = useState('');
  const [attempted, setAttempted] = useState(false);
  return <Modal title="使用会员兑换码" onClose={onClose}>
    <form onSubmit={event => { event.preventDefault(); if (code.trim()) setAttempted(true); }}>
      <label className="sp-field">
        <span>会员兑换码</span>
        <input required value={code} onChange={event => { setCode(event.target.value); setAttempted(false); }} placeholder="输入兑换码" />
      </label>
      <p className="bu-chart-note" role="status">{attempted ? '兑换服务尚未接入，本次没有变更会员。' : '输入兑换码以开通对应会员权益。'}</p>
      <div className="sp-dialog-actions"><Button onClick={onClose}>取消</Button><Button type="submit" variant="primary" disabled={!code.trim()}>兑换</Button></div>
    </form>
  </Modal>;
}

function MembershipOverview({ remaining, tier, onPlans, onRedeem, onInvite }) {
  const hasMembership = tier !== 'free';
  const hasExclusiveAgent = canUseExclusiveAgent(tier);
  const { name, collaboration, academy } = membershipBenefits(tier);
  return <div className="bu-overview">
    <section className="bu-overview-main" aria-labelledby="bu-current-member-heading">
      <h3 id="bu-current-member-heading">当前会员</h3>
      <div className="bu-overview-value"><strong>{name}</strong></div>
      {hasMembership && <p className="bu-subtext">有效期至 <time className="bu-expiry" dateTime="2026-12-13">2026.12.13</time></p>}
      <div className="bu-overview-actions">
        <Button variant="primary" onClick={onPlans}><Crown size={16} />升级会员</Button>
        <Button onClick={onRedeem}><Ticket size={16} />使用兑换码</Button>
      </div>
      {hasMembership && <ul className="bu-benefits" aria-label="会员权益">
        <li><Check size={15} aria-hidden="true" />日常对话、科研绘图、科研 Skill</li>
        <li><Check size={15} aria-hidden="true" />{hasExclusiveAgent ? '普通 Agent、专享 Agent' : '普通 Agent'}</li>
        <li><Check size={15} aria-hidden="true" />{collaboration ? '科研空间，支持邀请成员协作' : '科研空间'}</li>
        {academy && <li><Check size={15} aria-hidden="true" />KGcure 学院课程</li>}
      </ul>}
    </section>
    <section className="bu-overview-side" aria-label="会员周额度">
      <div className="bu-quota-head">
        <h3>本周额度</h3>
        {hasMembership && <span><time dateTime={SAMPLE_RESET.dateTime}>{SAMPLE_RESET.date}</time>重置</span>}
      </div>
      {hasMembership
        ? <>
          <div className="bu-overview-value bu-quota-value"><span>剩余</span><strong>{remaining}%</strong></div>
          <QuotaProgress remaining={remaining} label="本周会员额度剩余" />
        </>
        : <p className="bu-subtext">开通会员后可使用每周额度。</p>}
      <InviteSummary campaign="member" onInvite={onInvite} />
      <section className="bu-rules" aria-labelledby="bu-member-rules-heading">
        <h3 id="bu-member-rules-heading">额度消耗与邀请活动说明</h3>
        <ul>
          <li>优先使用会员额度。额度每 7 天重置，剩余额度不结转。</li>
          <li>{campaigns.member.qualification}</li>
          <li>{campaigns.member.reward}</li>
          <li>使用{QUOTA_INVITE.cardName}可恢复本周额度，下次自动重置时间照旧。</li>
        </ul>
      </section>
    </section>
  </div>;
}

function PointsOverview({ onRecharge, onInvite, onViewRecords }) {
  return <div className="bu-overview">
    <section className="bu-overview-main" aria-labelledby="bu-personal-points-heading">
      <h3 id="bu-personal-points-heading">个人科研积分</h3>
      <div className="bu-overview-value bu-personal-points-value"><strong>{number.format(SAMPLE_BALANCE)}</strong><span>积分</span></div>
      <p className="bu-subtext">长期有效</p>
      <div className="bu-overview-actions">
        <Button variant="primary" onClick={onRecharge}><Coins size={16} />充值积分</Button>
        <Button onClick={onViewRecords}><ReceiptText size={16} aria-hidden="true" />积分账单</Button>
      </div>
      <ul className="bu-benefits" aria-label="积分消耗">
        <li><Info size={15} aria-hidden="true" />优先使用会员额度，额度不足时使用科研积分。</li>
        <li><Info size={15} aria-hidden="true" />集团赠送积分按集团规则使用。</li>
      </ul>
    </section>
    <section className="bu-overview-side" aria-labelledby="bu-group-points-heading">
      <h3 id="bu-group-points-heading">集团赠送积分</h3>
      <div className="bu-overview-value bu-quota-value"><strong>{number.format(SAMPLE_GROUP_BALANCE)}</strong><span>积分</span></div>
      <InviteSummary campaign="points" onInvite={onInvite} />
      <section className="bu-rules" aria-labelledby="bu-points-invite-heading">
        <h3 id="bu-points-invite-heading">邀请活动说明</h3>
        <ul>
          <li>{campaigns.points.qualification}</li>
          <li>{campaigns.points.limit}</li>
          <li>奖励到账后可在「积分账单」查看。</li>
        </ul>
      </section>
    </section>
  </div>;
}

function BillingRecords({ view, onChange, hasMembership, onToast, resetUsed, onUseReset }) {
  const isMember = view === 'member';
  const rows = isMember ? (hasMembership ? MEMBERSHIP_ORDERS : []) : POINT_RECORDS;
  const headings = isMember ? ['时间', '订单项目', '实付金额', '状态'] : ['时间', '积分变动项目', '变动积分', '实付金额'];
  return <section className="bu-section bu-records" id="billing-records" aria-labelledby="bu-records-title">
    <div className="bu-section-head">
      <h2 id="bu-records-title" tabIndex={-1}>账单记录</h2>
    </div>
    <Tabs className="ds-detail-tabs bu-record-tabs" items={recordTabs} value={view} onChange={onChange} ariaLabel="账单类别" />
    {view === 'cards' ? <section aria-label={QUOTA_INVITE.cardName}>
      <div className="bu-table-scroll" role="region" aria-label="重置记录表" tabIndex={0}>
        <table className="bu-table bu-ledger">
          <thead><tr>{['时间', '项目', '来源', '状态'].map(heading => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
          <tbody>{[
            { date: '2026.11.12 14:20', source: '邀请好友', used: resetUsed },
            { date: '2026.11.06 09:30', source: '系统赠送', used: true },
          ].map(record => <tr key={record.date}>
            <td>{record.date}</td><th scope="row">{QUOTA_INVITE.cardName}</th><td>{record.source}</td>
            <td>{record.used ? <Tag tone="green">已重置</Tag> : <Button small disabled={!hasMembership} onClick={onUseReset}>使用</Button>}</td>
          </tr>)}</tbody>
        </table>
      </div>
      {!hasMembership && <p className="bu-chart-note">开通会员后可使用{QUOTA_INVITE.cardName}。</p>}
    </section> : view === 'invoices' ? <EmptyState icon={DocumentEmptyIllustration} description="订单的发票申请记录会在这里显示。"
      action={<Button onClick={() => onToast('发票服务尚未接入')}>申请发票</Button>}>暂无发票申请</EmptyState>
      : rows.length ? <div className="bu-table-scroll" role="region" aria-label={isMember ? '会员账单' : '积分账单'} tabIndex={0}>
      <table className="bu-table bu-ledger">
        <thead><tr>{headings.map(heading => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
        <tbody>{rows.map(row => <tr key={row.time}>
          <td>{row.time}</td><th scope="row">{row.subject}</th>
          {isMember ? <><td>{row.payment}</td><td><Tag tone={row.status === '已兑换' ? 'blue' : 'green'}>{row.status}</Tag></td></>
            : <><td className={row.delta > 0 ? 'bu-credit' : 'bu-debit'}>{row.delta > 0 ? '+' : ''}{number.format(row.delta)}</td><td>{row.payment}</td></>}
        </tr>)}</tbody>
      </table>
    </div> : <EmptyState icon={DocumentEmptyIllustration} description="购买或兑换会员后，账单会显示在这里。">暂无会员账单</EmptyState>}
  </section>;
}

export function BillingUsage({ view, tier, resetUsed, onUseReset, showRecords, onViewChange, onPlans, onRecharge, onToast }) {
  const hasMembership = tier !== 'free';
  const [records, setRecords] = useState(null);
  const [dialog, setDialog] = useState(null);
  const recordView = records?.overview === view ? records.value : view;
  const closeDialog = () => setDialog(null);

  function openPointsRecords() {
    setRecords({ overview: view, value: 'points' });
    document.getElementById('bu-records-title')?.focus({ preventScroll: true });
    document.getElementById('billing-records')?.scrollIntoView({ block: 'start' });
  }

  useEffect(() => {
    if (!showRecords) return;
    const frame = requestAnimationFrame(() => document.getElementById('billing-records')?.scrollIntoView({ block: 'start' }));
    return () => cancelAnimationFrame(frame);
  }, [showRecords]);

  return <div className="view acct-view account-flat bu-page">
    <header className="acct-head bu-page-heading"><h1>账单与用量</h1><Tag>示例数据</Tag></header>
    <div className="bu-view-bar">
      <Tabs className="ds-detail-tabs bu-view-tabs" items={BILLING_VIEWS} value={view} ariaLabel="权益视图" onChange={next => {
        if (next === view) return;
        setRecords(null);
        onViewChange(next);
      }} />
    </div>
    {view === 'member'
      ? <MembershipOverview remaining={resetUsed ? 100 : SAMPLE_QUOTA_REMAINING} tier={tier} onPlans={onPlans} onRedeem={() => setDialog('redeem')} onInvite={() => setDialog('member')} />
      : <PointsOverview onRecharge={onRecharge} onInvite={() => setDialog('points')} onViewRecords={openPointsRecords} />}
    <BillingRecords resetUsed={resetUsed} onUseReset={onUseReset} view={recordView} onChange={value => setRecords({ overview: view, value })} hasMembership={hasMembership} onToast={onToast} />
    <BillingUsageAnalysis source={view} hasMembership={hasMembership} />
    {(dialog === 'member' || dialog === 'points') && <BillingInviteDialog campaign={dialog} onClose={closeDialog} />}
    {dialog === 'redeem' && <MembershipRedeemDialog onClose={closeDialog} />}
  </div>;
}
