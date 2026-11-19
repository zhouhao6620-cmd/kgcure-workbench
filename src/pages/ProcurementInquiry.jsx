import { useState } from 'react';
import { BriefcaseMedical, CircleCheck, GraduationCap, Hospital, Microscope, QrCode } from 'lucide-react';
import { Button, Modal } from '../design-preview/components.jsx';

const INSTITUTION_TYPES = [
  { label: '医院', icon: Hospital },
  { label: '学校', icon: GraduationCap },
  { label: '药械企业', icon: BriefcaseMedical },
  { label: '科研机构', icon: Microscope },
];
const STORAGE_KEY = 'kgcure:local-procurement-inquiries';
const ADVISOR_QR = import.meta.env.VITE_ACADEMIC_ADVISOR_QR?.trim();

export function ProcurementInquiry({ onClose }) {
  const [institutionType, setInstitutionType] = useState('');
  const [submittedHeight, setSubmittedHeight] = useState(null);
  const [error, setError] = useState('');
  const [qrFailed, setQrFailed] = useState(false);

  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const inquiry = {
      institutionType,
      institutionName: fields.get('institutionName').trim(),
      contactName: fields.get('contactName').trim(),
      contact: fields.get('contact').trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      const inquiries = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...inquiries, inquiry]));
      setSubmittedHeight(form.getBoundingClientRect().height);
    } catch {
      setError('当前浏览器无法保存本地咨询，请允许站点存储后重试。');
    }
  }

  return <Modal title="机构采购咨询" onClose={onClose}>
    {submittedHeight !== null ? <div className="procurement-result" style={{ minBlockSize: submittedHeight }}>
      <span className="procurement-success-icon"><CircleCheck size={30} strokeWidth={1.7} aria-hidden="true" /></span>
      <h3 role="status">已收到你的信息</h3>
      <p>学术顾问将在<strong>2个工作日</strong>联系您</p>
      <figure className="procurement-qr">
        {ADVISOR_QR && !qrFailed ? <img src={ADVISOR_QR} width="160" height="160" alt="学术顾问企业微信二维码" onError={() => setQrFailed(true)} />
          : <div className="procurement-qr-placeholder"><QrCode size={36} strokeWidth={1.5} aria-hidden="true" /><span>二维码待配置</span></div>}
        <figcaption>学术顾问企业微信</figcaption>
      </figure>
      <Button variant="primary" autoFocus onClick={onClose}>我知道了</Button>
    </div> : <form className="procurement-form" onSubmit={submit}>
      <fieldset className="procurement-type-field">
        <legend>机构类型</legend>
        <div className="procurement-types">
          {INSTITUTION_TYPES.map(({ label, icon: Icon }) => <label key={label}>
            <input className="sp-visually-hidden" type="radio" name="institutionType" value={label}
              required checked={institutionType === label} onChange={() => setInstitutionType(label)} />
            <Icon size={22} strokeWidth={1.65} aria-hidden="true" />
            <span>{label}</span>
          </label>)}
        </div>
      </fieldset>
      <div className="procurement-fields">
        <label className="sp-field">
          <span>机构名称</span>
          <input name="institutionName" autoComplete="organization" placeholder={`请输入${institutionType || '机构'}名称`}
            maxLength={120} pattern={'.*\\S.*'} required />
        </label>
        <label className="sp-field">
          <span>姓名</span>
          <input name="contactName" autoComplete="name" placeholder="请输入联系人姓名" maxLength={60} pattern={'.*\\S.*'} required />
        </label>
        <label className="sp-field">
          <span>联系方式</span>
          <input name="contact" placeholder="请输入手机号或微信号" maxLength={120} pattern={'.*\\S.*'} required />
        </label>
      </div>
      <div className="procurement-actions">
        {error && <p className="procurement-error" role="alert">{error}</p>}
        <Button type="submit" variant="primary">提交采购咨询</Button>
      </div>
    </form>}
  </Modal>;
}
