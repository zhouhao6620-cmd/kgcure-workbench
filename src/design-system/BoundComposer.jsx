import { useState } from 'react';
import { Composer } from '../design-preview/components.jsx';
import { addComposerAttachments } from './composer-sources.js';
import { BUSINESS_SKILLS, BUSINESS_AGENTS } from '../content/catalog.js';
export function BoundComposer({value,onChange,onSubmit,onToast,chat=false,placeholder,inputLabel,showCapabilities=true,showSpace=true,configuration,initialAbility=null,initialModel='pro',initialAttachments=[],initialSpace=null,initialFolder=null,model:externalModel,onModelChange,onNavigate,onRequireCapability}) {
 const [model,setModel]=useState(initialModel),[ability,setAbility]=useState(initialAbility),[destination,setDestination]=useState({space:initialSpace,folderId:initialFolder}),[attachments,setAttachments]=useState(initialAttachments);
 const selectedModel=externalModel ? (/image/i.test(externalModel)?'image':/flash/i.test(externalModel)?'flash':'pro') : model;
 function selectAbility(item) {
   if (onRequireCapability?.(item) !== false) setAbility(item);
 }
 function send() {
   if (!value.trim() && !attachments.length) return;
   if (onSubmit?.({text:value,ability,space:destination.space,attachments,model:selectedModel,
     ...(destination.folderId && {origin:{folderId:destination.folderId}})}) !== false) setAttachments([]);
 }
 return <Composer chat={chat} draft={value} onDraft={onChange} model={selectedModel} onModel={id=>{setModel(id);onModelChange?.('Shuyu '+id[0].toUpperCase()+id.slice(1));}} ability={ability} onAbility={selectAbility} space={destination.space} spaceFolder={destination.folderId} skills={BUSINESS_SKILLS} agents={BUSINESS_AGENTS} onSpace={(space,folderId)=>setDestination({space,folderId})} attachments={attachments} onAttach={files=>{if(!files.length)return;setAttachments(current=>addComposerAttachments(current,files));if(!files[0].reference)onToast?.('已添加本地附件名称，未上传文件');}} onRemove={id=>setAttachments(a=>a.filter(f=>f.id!==id))} onSend={send} onViewAll={kind=>onNavigate?.('/workspace/'+(kind==='skill'?'skills':'agents'))} onNewSpace={()=>{onNavigate?.('/workspace/research-space');onToast?.('请在科研空间页面创建空间');}} placeholder={placeholder} inputLabel={inputLabel} showCapabilities={showCapabilities} showSpace={showSpace} configuration={configuration}/>;
}
