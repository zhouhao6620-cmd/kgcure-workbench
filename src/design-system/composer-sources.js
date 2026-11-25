import { createContext } from 'react';

export const ComposerSources = createContext(null);

export function addComposerAttachments(current, files) {
  const next = [...current];
  for (const file of files) {
    const reference = file.reference;
    if (reference && next.some(item => item.reference?.source === reference.source &&
      item.reference?.spaceId === reference.spaceId && item.reference?.fileId === reference.fileId)) continue;
    next.push({ id: crypto.randomUUID(), name: file.name, size: file.size, ...(reference && { reference }) });
  }
  return next;
}
