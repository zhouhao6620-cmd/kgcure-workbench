const KEYWORDS = {
 '从临床疑问到高质量证据，精准循证搜索':'精准循证搜索',
 '从临床问题到创新课题，聚焦科研方向':'科研方向',
 '从立项构想到标书完善，提升申报质量':'申报质量',
 '从科研数据到专业图表，让研究成果清晰呈现':'研究成果',
 '你好，专为医生量身定制的科研工作流':'科研工作流',
 '我的科研空间':'科研空间','我的文件':'文件','个人资料':'资料','积分与套餐':'积分','会员与账单':'会员',
 '选择适合你的方案':'方案','会员套餐结算':'会员套餐','积分充值':'积分','我的审批':'审批',
 '科研 Skill':'Skill','科研 Agent':'Agent'
};
export function HighlightedTitle({children,keyword}) {
 const text=String(children),word=keyword||KEYWORDS[text];
 if(!word||!text.includes(word))return <>{text}</>;
 const at=text.indexOf(word);return <>{text.slice(0,at)}<span className="sp-title-accent">{word}</span>{text.slice(at+word.length)}</>;
}
