import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  FolderOpen,
  MoreHorizontal,
  Plus,
  Search,
  Share2,
  Trash2,
  Upload,
} from "lucide-react";
import { Btn, PageHead, Tabs } from "../components.jsx";
import { IconButton } from "../design-preview/components.jsx";

const STAGES = [
  { n: "01", title: "制定研究方案", files: 1, status: "已完成" },
  { n: "02", title: "明确研究人群与结局指标", files: 0, status: "未开始" },
  { n: "03", title: "数据提取与队列构建", files: 0, status: "未开始" },
  { n: "04", title: "数据清洗与质量控制", files: 0, status: "未开始" },
  { n: "05", title: "候选变量处理与筛选", files: 0, status: "未开始" },
  { n: "06", title: "风险预测模型构建", files: 0, status: "未开始" },
  { n: "07", title: "模型验证与性能评价", files: 0, status: "未开始" },
  { n: "08", title: "模型可视化与临床适用性评估", files: 0, status: "未开始" },
  { n: "09", title: "结果整理与统计分析", files: 0, status: "未开始" },
  { n: "10", title: "论文撰写与投稿", files: 0, status: "未开始" },
];

export function ResearchSpaceList({ onOpen, onToast }) {
  const [query, setQuery] = useState("");

  return (
    <div className="view space-view">
      <PageHead
        icon={FolderOpen}
        title="我的科研空间"
        subtitle="1 个空间　医生个人科研成果管理空间 · 成果与研究过程阶段清晰锚定"
        actions={
          <Btn kind="primary" onClick={() => onToast("新建科研空间（原型演示）")}>
            <Plus size={16} /> 新建科研空间
          </Btn>
        }
      />

      <div className="space-search">
        <Search size={16} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索科研空间" aria-label="搜索科研空间" />
      </div>

      <div className="space-grid">
        <article className="space-card">
          <div className="space-card-top">
            <span className="space-updated">更新于 2026/11/05 11:34</span>
            <span className="space-card-tools">
              <button type="button" className="icon-button small" aria-label="分享科研空间" onClick={() => onToast("分享科研空间（原型演示）")}>
                <Share2 size={16} />
              </button>
              <button type="button" className="icon-button small" aria-label="删除科研空间" onClick={() => onToast("删除科研空间（原型演示）")}>
                <Trash2 size={16} />
              </button>
            </span>
          </div>
          <span className="status-pill">进行中</span>
          <h2>神经发育障碍</h2>
          <p className="space-meta">成果 1　阶段 01 / 10</p>
          <div className="space-progress"><span style={{ width: "10%" }} /></div>
          <button type="button" className="space-enter" onClick={() => onOpen("/workspace/research-space/db79430b945744a4aa9b3676d21f5fba")}>
            进入科研空间 <ArrowRight size={14} />
          </button>
        </article>
      </div>
    </div>
  );
}

export function ResearchSpaceDetail({ onBack, onTask, onToast }) {
  const [stage, setStage] = useState("01");
  const [fileTab, setFileTab] = useState("files");
  const [filter, setFilter] = useState("进行中");
  const current = STAGES.find((item) => item.n === stage) || STAGES[0];

  return (
    <div className="view detail-view">
      <div className="detail-topbar">
        <button type="button" className="back-link" onClick={onBack}>
          ← 返回我的科研空间
        </button>
        <div className="detail-actions">
          <IconButton label="分享当前页面" onClick={() => onToast("分享（原型演示）")}>
            <Share2 size={18} aria-hidden="true"/>
          </IconButton>
          <Btn kind="primary" size="sm" onClick={onTask}>
            发起科研任务
          </Btn>
        </div>
      </div>

      <section className="space-hero-card">
        <div className="space-hero-main">
          <span className="space-updated">更新于 2026/11/05 11:34</span>
          <h1>神经发育障碍</h1>
          <p className="space-goal"><span>研究目标</span>制作风险预测模型</p>
        </div>
        <button type="button" className="text-danger" onClick={() => onToast("删除科研空间（原型演示）")}>
          删除科研空间
        </button>
      </section>

      <section className="panel files-panel">
        <div className="panel-head">
          <div>
            <h2>科研空间共享文件</h2>
            <p>管理本科研空间的输入材料，并保留上传、删除、下载和审批记录。</p>
          </div>
          <div className="panel-actions">
            <Btn kind="secondary" size="sm" onClick={() => onToast("上传本地文件（原型演示）")}>
              <Upload size={14} /> 上传本地文件
            </Btn>
            <Btn kind="secondary" size="sm" onClick={() => onToast("从我的文件添加（原型演示）")}>
              <FolderOpen size={14} /> 从我的文件添加
            </Btn>
          </div>
        </div>
        <Tabs
          className="inline-tabs"
          items={[{ key: "files", label: "已上传文件（0）" }, { key: "logs", label: "操作记录" }]}
          value={fileTab}
          onChange={setFileTab}
        />
        {fileTab === "files" ? (
          <div className="empty-inline">暂无输入文件，可上传本地文件或从“我的文件”添加。</div>
        ) : (
          <div className="empty-inline">暂无操作记录。</div>
        )}
      </section>

      <section className="panel stage-panel">
        <div className="panel-head">
          <div>
            <h2>研究过程与阶段 <span className="section-count">10 阶段</span></h2>
            <p>AI 依据临床科研方法学规划，点击阶段可查看推荐工作流与一键发起协作</p>
          </div>
          <Btn kind="secondary" size="sm" onClick={() => onToast("修改流程（原型演示）")}>修改流程</Btn>
        </div>
        <div className="stage-grid">
          {STAGES.map((item) => (
            <button
              key={item.n}
              type="button"
              className={"stage-card" + (stage === item.n ? " is-active" : "")}
              onClick={() => setStage(item.n)}
            >
              <span className="stage-top">
                <span className="stage-n">{item.n}</span>
                <span className="stage-files">{item.files} 文件</span>
              </span>
              <span className="stage-title">{item.title}</span>
              <span className={"stage-status " + (item.status === "已完成" ? "is-done" : "")}>
                {item.status === "已完成" ? <CheckCircle2 size={12} /> : null}
                {item.status}
              </span>
            </button>
          ))}
        </div>
        <div className="stage-foot">
          <span className="stage-foot-label">当前选中阶段：{current.title}</span>
          <div className="stage-legend">
            {["进行中", "已完成", "未开始"].map((item) => (
              <button key={item} type="button" className={"legend-item" + (filter === item ? " is-active" : "")} onClick={() => setFilter(item)}>
                <span className={"legend-dot " + (item === "已完成" ? "done" : item === "进行中" ? "doing" : "")} />
                {item}
              </button>
            ))}
          </div>
          <Btn kind="secondary" size="sm" onClick={() => onToast("查看推荐工作流（原型演示）")}>
            查看「{current.title}」推荐工作流
          </Btn>
        </div>
      </section>

      <section className="panel result-panel">
        <div className="panel-head">
          <div>
            <h2>研究成果 <span className="section-count">1 项成果 · 全部 1 项</span></h2>
          </div>
          <button type="button" className="check-all" onClick={() => onToast("全选（原型演示）")}>
            <span className="checkbox" /> 全选
          </button>
        </div>
        <div className="result-table">
          <div className="result-row">
            <span className="file-badge md">M</span>
            <div className="result-name">
              <span>ASD遗传学选题报告.md</span>
              <span className="result-meta">所属阶段：制定研究方案 · 2026/09/20 10:45 · 18.3 KB</span>
            </div>
            <span className="file-kind">MD</span>
            <button type="button" className="text-link" onClick={() => onToast("查看来源对话（原型演示）")}>查看来源对话</button>
            <button type="button" className="icon-button small" aria-label="更多操作" onClick={() => onToast("更多操作（原型演示）")}>
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
        <p className="result-total">共 1 项成果</p>
      </section>

      <span className="sr-only"><FileText size={1} /></span>
    </div>
  );
}

