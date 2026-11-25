import { useId, useState } from 'react';
import { FileText, Folder, FolderOpen, LibraryBig, Search, Upload } from 'lucide-react';
import { WorkspaceSelect } from './WorkspaceSelect.jsx';

const sources = [
  { id: 'local', label: '本地上传', Icon: Upload },
  { id: 'library', label: '我的文件库', Icon: LibraryBig },
  { id: 'space', label: '我的科研空间', Icon: Folder },
];

export function AttachmentSourceMenu({ style, onLocal, onBrowse }) {
  return <div className="sp-popover sp-space-picker sp-attachment-picker" style={style} role="menu" aria-label="选择附件来源">
    <div className="sp-space-directory-caption">选择附件来源</div>
    <div className="sp-space-directory-list">
      {sources.map(({ id, label, Icon }) =>
        <button type="button" role="menuitem" className="sp-space-directory-option" key={id}
          onClick={() => id === 'local' ? onLocal() : onBrowse(id)}>
          <Icon size={17} strokeWidth={1.7} aria-hidden="true"/><span>{label}</span>
        </button>)}
    </div>
  </div>;
}

export function AttachmentFileList({ source, library, spaces, filesBySpace, onSelect }) {
  const [spaceId, setSpaceId] = useState('');
  const [folderId, setFolderId] = useState('');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(-1);
  const listId = useId();
  const space = spaces.find(item => item.id === spaceId);
  const files = source === 'library' ? library : (space ? [space] : spaces).flatMap(item =>
    (filesBySpace[item.id] || []).filter(file => !folderId || file.folderId === folderId)
      .map(file => ({ ...file, spaceId: item.id })));
  const term = query.trim().toLowerCase();
  const results = files.filter(file => file.name.toLowerCase().includes(term));

  function choose(file) {
    onSelect({
      name: file.name, size: file.size,
      reference: { source, fileId: file.id, ...(file.spaceId && { spaceId: file.spaceId, folderId: file.folderId || null }) },
    });
  }

  function navigateResults(event) {
    if (!results.length) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      const next = active === -1 ? (step === 1 ? 0 : results.length - 1) : (active + step + results.length) % results.length;
      setActive(next);
      document.getElementById(listId + '-' + next)?.scrollIntoView({ block: 'nearest' });
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      choose(results[active < 0 ? 0 : active]);
    }
  }

  return <div className="sp-history-search sp-attachment-search-dialog">
    <label className="sp-search-field">
      <Search size={18} aria-hidden="true"/>
      <input type="search" role="combobox" aria-label="搜索附件" aria-expanded="true" aria-controls={listId}
        aria-activedescendant={active >= 0 ? listId + '-' + active : undefined}
        value={query} placeholder="搜索文件名称…" onChange={event => { setQuery(event.target.value); setActive(-1); }}
        onKeyDown={navigateResults}/>
    </label>
    {source === 'space' && spaces.length > 0 && <div className="sp-attachment-directory-filters">
      <WorkspaceSelect label="选择科研空间" icon={Folder} value={spaceId}
        options={[{ value: '', label: '全部科研空间' }, ...spaces.map(item => ({ value: item.id, label: item.name }))]}
        onChange={id => { setSpaceId(id); setFolderId(''); setActive(-1); }}/>
      {Boolean(space?.folders?.length) && <WorkspaceSelect label="选择项目文件夹" icon={FolderOpen} value={folderId}
        options={[{ value: '', label: '全部项目文件夹' }, ...space.folders.map(item => ({ value: item.id, label: item.name }))]}
        onChange={id => { setFolderId(id); setActive(-1); }}/>}
    </div>}
    <span className="sp-search-caption">{term ? '搜索结果' : '可选文件'}</span>
    <div className="sp-attachment-file-results" role="listbox" aria-label="文件结果" id={listId}>
      {results.map((file, index) =>
        <button type="button" role="option" aria-selected={index === active} id={listId + '-' + index}
          className={'sp-search-result' + (index === active ? ' is-active' : '')} key={(file.spaceId || '') + ':' + file.id}
          title={file.name} onClick={() => choose(file)}>
          <FileText size={18} strokeWidth={1.7} aria-hidden="true"/><span>{file.name}</span>
        </button>)}
      {!results.length && <p className="sp-search-empty">{term ? '没有匹配的文件' : '当前暂无可选文件'}</p>}
    </div>
  </div>;
}
