import { useState } from 'react';
import {
  BarChart3, Building2, Check, ClipboardCheck, ClipboardList, Ellipsis, Eye, EyeOff, FileText, FlaskConical,
  Gift, GraduationCap, Hospital, Image, LockKeyhole, Microscope, PenLine, Presentation, Search, Sigma, Upload,
} from 'lucide-react';
import { Button, IconButton } from '../design-preview/components.jsx';
import { WorkspaceSelect } from '../design-system/WorkspaceSelect.jsx';
import './personal-verification.css';

const ORGANIZATIONS = [
  ['高等院校', GraduationCap], ['医疗机构', Hospital], ['科研机构', Microscope],
  ['药械企业', FlaskConical], ['其他', Building2],
];

const ROLES = {
  硕博士: ['硕士研究生', '博士研究生'],
  临床医生: ['住院医师', '主治医师', '副主任医师', '主任医师', '科室副主任', '科室主任'],
  高校教师: ['讲师', '副教授', '教授'],
  科研人员: ['研究助理', '助理研究员', '副研究员', '研究员'],
  博士后: ['博士后研究人员'],
  企业研发人员: ['研发人员', '研发专家', '研发负责人'],
  其他: ['本科生', '其他科研身份'],
};

const NEEDS = [
  ['文献检索', Search], ['论文写作', PenLine], ['数据分析', BarChart3],
  ['科研绘图', Image], ['基金申报', FileText], ['研究方案设计', ClipboardList],
  ['Meta 分析', Sigma], ['科研汇报', Presentation], ['其他', Ellipsis],
];
const MAX_NEEDS = 6;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export function PersonalVerification({ onSubmit, onToast }) {
  const [organization, setOrganization] = useState('其他');
  const [role, setRole] = useState('');
  const [roleDetail, setRoleDetail] = useState('');
  const [needs, setNeeds] = useState([]);
  const [proofName, setProofName] = useState('');
  const [showId, setShowId] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState(null);

  function clearError(field) {
    setError(current => current?.field === field ? null : current);
  }

  function toggleNeed(need) {
    if (needs.includes(need)) setNeeds(needs.filter(value => value !== need));
    else if (needs.length < MAX_NEEDS) setNeeds([...needs, need]);
    else onToast(`最多选择 ${MAX_NEEDS} 项科研需求`);
  }

  function chooseProof(file) {
    if (!file) return;
    if (!/\.(jpe?g|png|pdf)$/i.test(file.name)) {
      setError({ field: 'proof', message: '请选择 JPG、PNG 或 PDF 文件。' });
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError({ field: 'proof', message: '文件大小不能超过 10 MB。' });
      return;
    }
    setProofName(file.name);
    clearError('proof');
  }

  function submit(event) {
    event.preventDefault();
    const { elements } = event.currentTarget;
    const institutionName = elements.institutionName.value.trim();
    const realName = elements.realName.value.trim();
    const idNumber = elements.idNumber.value.trim();

    if (!realName) {
      setError({ field: 'realName', message: '请输入真实姓名。' });
      elements.realName.focus();
      return;
    }
    if (!/^\d{17}[0-9Xx]$/.test(idNumber)) {
      setError({ field: 'idNumber', message: '请输入 18 位身份证号码。' });
      elements.idNumber.focus();
      return;
    }

    onSubmit({
      realName: Array.from(realName)[0] + '*',
      idNumber: idNumber[0] + '*'.repeat(16) + idNumber.at(-1),
      organization: [organization, institutionName].filter(Boolean).join(' · '),
      role: [role, roleDetail].filter(Boolean).join(' · '),
      needs,
    });
  }

  const fieldState = field => error?.field === field ? {
    'aria-invalid': true, 'aria-describedby': `verification-error-${field}`,
  } : {};
  const fieldError = field => error?.field === field && <small id={`verification-error-${field}`} className="verification-error" role="alert">{error.message}</small>;

  return <div className="view verification-view">
    <header className="acct-head verification-head">
      <h1>完善科研身份</h1>
      <p className="verification-reward"><Gift size={16} aria-hidden="true" />完成个人认证，即可领取1000积分</p>
    </header>

    <form className="verification-form" onSubmit={submit} noValidate autoComplete="off">
      <section className="verification-section" aria-labelledby="verification-legal">
        <div className="verification-section-heading">
          <h2 id="verification-legal">实名认证</h2>
          <span><span className="verification-required" aria-hidden="true">*</span> 姓名和身份证号必填</span>
        </div>
        <div className="verification-fields">
          <div className="sp-field verification-field">
            <input name="realName" aria-label="真实姓名" placeholder="请输入真实姓名" maxLength={50} required
              onChange={() => clearError('realName')} {...fieldState('realName')} />
            {fieldError('realName')}
          </div>
          <div className="sp-field verification-field">
            <div className="verification-id-control">
              <input name="idNumber" aria-label="身份证号码" type={showId ? 'text' : 'password'}
                placeholder="请输入身份证号码" maxLength={18} required
                onChange={() => clearError('idNumber')} {...fieldState('idNumber')} />
              <IconButton label={showId ? '隐藏身份证号码' : '显示身份证号码'} onClick={() => setShowId(value => !value)}>
                {showId ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
              </IconButton>
            </div>
            {fieldError('idNumber')}
          </div>
        </div>

        <div className="verification-proof">
          <label className="verification-proof-title" htmlFor="verification-proof">证明材料 <small className="verification-field-hint">选填</small></label>
          <label className="verification-upload" data-drag-over={dragOver}
            onDragOver={event => { event.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={event => { event.preventDefault(); setDragOver(false); chooseProof(event.dataTransfer.files[0]); }}>
            <input id="verification-proof" type="file" name="proof" className="sp-visually-hidden" aria-label="证明材料"
              accept=".jpg,.jpeg,.png,.pdf"
              aria-describedby={`verification-proof-help${proofName ? ' verification-proof-filename' : ''}${error?.field === 'proof' ? ' verification-error-proof' : ''}`}
              aria-invalid={error?.field === 'proof' || undefined}
              onChange={event => { chooseProof(event.target.files[0]); event.target.value = ''; }} />
            <span className="verification-upload-action"><Upload size={17} aria-hidden="true" />{proofName ? '更换证明文件' : '选择或拖入证明文件'}</span>
            <small id="verification-proof-help">学生证、执业证、职称或在职证明 · JPG / PNG / PDF · 不超过 10 MB</small>
            {proofName && <span id="verification-proof-filename" className="verification-file-name">{proofName}</span>}
          </label>
          {fieldError('proof')}
        </div>
        <p className="verification-privacy"><LockKeyhole size={14} aria-hidden="true" /><span>按法律法规要求，需要您完成实名认证，认证信息不会公开展示</span></p>
      </section>

      <section className="verification-section" aria-labelledby="verification-organization">
        <div className="verification-section-heading">
          <h2 id="verification-organization">请选择所属机构</h2><span>选填</span>
        </div>
        <div className="verification-organizations" role="group" aria-label="机构类型">
          {ORGANIZATIONS.map(([label, Icon]) => <button key={label} type="button" aria-pressed={organization === label}
            onClick={() => setOrganization(value => value === label ? '' : label)}>
            <Icon size={19} strokeWidth={1.65} aria-hidden="true" /><span>{label}</span>
          </button>)}
        </div>
        <div className="sp-field verification-field verification-institution">
          <input name="institutionName" aria-label="机构名称" placeholder="请输入机构全称" maxLength={80} />
        </div>
      </section>

      <section className="verification-section" aria-labelledby="verification-role">
        <div className="verification-section-heading">
          <h2 id="verification-role">你的科研身份</h2><span><span aria-hidden="true">*</span> 选填</span>
        </div>
        <div className="verification-fields">
          <WorkspaceSelect clearable label="身份类别" value={role} placeholder="请选择身份类别"
            options={Object.keys(ROLES)} onChange={value => {
              if (value === role) return;
              setRole(value);
              setRoleDetail('');
            }} />
          <WorkspaceSelect clearable label="具体身份" value={roleDetail}
            placeholder={role ? '请选择具体身份' : '请先选择身份类别'} disabled={!role}
            options={ROLES[role] ?? []} onChange={setRoleDetail} />
        </div>
      </section>

      <section className="verification-section verification-needs-section" aria-labelledby="verification-needs">
        <div className="verification-section-heading">
          <h2 id="verification-needs">描述你的主要科研需求</h2><span aria-live="polite">选填 · 已选 {needs.length} / {MAX_NEEDS}</span>
        </div>
        <div className="verification-needs" role="group" aria-labelledby="verification-needs">
          {NEEDS.map(([need, Icon]) => {
            const selected = needs.includes(need);
            const LeadingIcon = selected ? Check : Icon;
            return <button key={need} type="button" aria-pressed={selected} onClick={() => toggleNeed(need)}>
              <LeadingIcon size={16} strokeWidth={selected ? 2.2 : 1.7} aria-hidden="true" />
              {need}
            </button>;
          })}
        </div>
      </section>

      <div className="verification-actions">
        <p>本地演示，请使用虚构资料。身份证原文和证明文件仅在当前表单中处理。</p>
        <Button variant="primary" type="submit"><ClipboardCheck size={16} aria-hidden="true" />确认信息，提交认证</Button>
      </div>
    </form>
  </div>;
}
