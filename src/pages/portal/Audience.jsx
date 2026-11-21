import { Check } from 'lucide-react';

const roles = [
  {
    id: 'student',
    name: '硕博研究生 / 医学生',
    description: '为组会、开题和毕业论文，把文献笔记和研究结果整理成稿。',
    tasks: ['文献精读与综述', '选题与开题报告', '论文撰写与润色', '科研图表制作'],
    illustration: <>
      <path d="M32 16c-6-5-15-6-24-4v34c9-2 18-1 24 4 6-5 15-6 24-4V12c-9-2-18-1-24 4v34"/>
      <path d="M4 18v33c10-2 20-1 28 4 8-5 18-6 28-4V18M15 24c4 0 8 1 11 2m-11 6c4 0 8 1 11 2m12 0c3-1 7-2 11-2"/>
      <path className="portal-role-accent" d="M43 12v14l3-2 3 2V11"/>
    </>,
  },
  {
    id: 'clinician',
    name: '临床医生',
    description: '遇到反复出现的诊疗问题，先查证据，再判断能否立项研究。',
    tasks: ['指南与循证检索', '临床科研选题', '回顾性研究设计', '临床数据分析'],
    illustration: <>
      <path d="M18 12h-3a4 4 0 0 0-4 4v10a13 13 0 0 0 26 0V16a4 4 0 0 0-4-4h-3m-12-3v6m12-6v6"/>
      <path d="M24 39v4a13 13 0 0 0 26 0v-8"/>
      <circle className="portal-role-accent" cx="50" cy="28" r="7"/>
      <circle className="portal-role-accent" cx="50" cy="28" r="2"/>
    </>,
  },
  {
    id: 'researcher',
    name: '科研人员 / 课题组',
    description: '在同一课题下归拢方案、数据和分析记录，方便接续与复核。',
    tasks: ['基金标书撰写', '研究方案设计', '方法与结果复核', '课题资料共享'],
    illustration: <>
      <path d="m26 14 10 4-8 17-10-4 8-17Zm3 1 4-8 6 3-4 8m-14 14-3 6 5 2 3-6"/>
      <path d="M35 23a16 16 0 0 1 5 30M25 46v7m-13 5h41l-4-5H16l-4 5Z"/>
      <path className="portal-role-accent" d="M14 44h23m-17 3h10"/>
    </>,
  },
  {
    id: 'institution',
    name: '医院 / 高校 / 科研机构',
    description: '为多个科室或团队统筹科研工具、研究数据和项目合作资源。',
    tasks: ['科研工具引入', '多团队空间管理', '研究数据资源对接', '科研项目合作'],
    illustration: <>
      <path d="M16 54V18h32v36M12 18l20-9 20 9H12ZM6 54V29h10m32 0h10v25M4 54h56"/>
      <path d="M22 28h3m14 0h3m-20 8h3m14 0h3M27 54V43h10v11M11 37v3m0 5v3m42-11v3m0 5v3"/>
      <path className="portal-role-accent" d="M32 24v8m-4-4h8"/>
    </>,
  },
];

export default function Audience() {
  return (
    <section id="audience" className="portal-shell portal-section" aria-labelledby="portal-audience-title">
      <header className="portal-intro">
        <h2 id="portal-audience-title"><span>精准匹配，</span><span>满足<span className="portal-audience-emphasis">不同角色</span>的科研需求</span></h2>
        <p>覆盖开题与论文写作、临床研究、课题组协作和机构科研管理。</p>
      </header>
      <div className="portal-roles">
        {roles.map(({ id, name, description, tasks, illustration }) => (
          <article key={id} data-role={id}>
            <div className="portal-role-summary">
              <svg className="portal-role-art" viewBox="0 0 64 64" aria-hidden="true">
                {illustration}
              </svg>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
            <ul role="list">
              {tasks.map((task) => (
                <li key={task}><Check aria-hidden="true"/><span>{task}</span></li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
