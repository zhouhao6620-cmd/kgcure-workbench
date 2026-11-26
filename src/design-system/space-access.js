import { useEffect, useState } from 'react';

export const spaceOwnerPreview = { id: 'local-owner', name: '周浩', avatar: '/design-preview/account-avatar.jpg' };
export const spaceMemberPreview = { id: 'demo-jiao-long', name: '焦龙', avatar: '/design-preview/members/jiao-long.png' };
export const ORIGINAL_SPACE_ID = 'db79430b945744a4aa9b3676d21f5fba';

export function spaceOwnerId(space) {
  return space.ownerId || spaceOwnerPreview.id;
}

export function addSpaceLog(space, actor, action, subject, date) {
  return { ...space, logs: [{ actor: actor.name, action, subject, date }, ...(space.logs || [])] };
}

const requestPrefix = 'kgcure-space-download-v1:';
const exampleKey = 'kgcure-approval-example-v1';
const exampleRequest = {
  id: exampleKey,
  spaceId: ORIGINAL_SPACE_ID,
  spaceName: '神经发育障碍',
  fileId: 'demo-v2-plan-md',
  fileName: '研究人群与结局指标定义.md',
  fileType: 'MD',
  requesterId: spaceMemberPreview.id,
  requesterName: spaceMemberPreview.name,
  ownerId: spaceOwnerPreview.id,
  createdAt: Date.parse('2026-11-26T11:05:00+08:00'),
};

function readExampleStatus() {
  try {
    const status = localStorage.getItem(exampleKey);
    if (status === 'approved' || status === 'rejected') return status;
  } catch {}
  return 'pending';
}

function requestKey(spaceId, fileId, requesterId) {
  return requestPrefix + JSON.stringify([spaceId, fileId, requesterId]);
}

function readRequests() {
  try {
    return Object.keys(localStorage)
      .filter(key => key.startsWith(requestPrefix))
      .flatMap(key => {
        try {
          const request = JSON.parse(localStorage.getItem(key));
          return request ? [request] : [];
        } catch { return []; }
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  } catch { return []; }
}

export function downloadRequestFor(requests, spaceId, fileId, requesterId) {
  const key = requestKey(spaceId, fileId, requesterId);
  return requests.find(request => request.id === key);
}

export function useSpaceDownloadRequests(showExample = false) {
  const [requests, setRequests] = useState(readRequests);
  const [exampleStatus, setExampleStatus] = useState(readExampleStatus);
  useEffect(() => {
    function sync(event) {
      if (event.key === null || event.key.startsWith(requestPrefix)) setRequests(readRequests());
      if (event.key === null || event.key === exampleKey) setExampleStatus(readExampleStatus());
    }
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  function submit(space, file, requester) {
    if (!space.isPrivate || requester.id === spaceOwnerId(space)) return false;
    const id = requestKey(space.id, file.id, requester.id);
    const existing = JSON.parse(localStorage.getItem(id));
    if (existing?.status === 'pending' || existing?.status === 'approved') {
      setRequests(readRequests());
      return false;
    }
    const request = {
      id, spaceId: space.id, spaceName: space.name, fileId: file.id, fileName: file.name,
      fileType: file.type, requesterId: requester.id, requesterName: requester.name,
      ownerId: spaceOwnerId(space), status: 'pending', createdAt: Date.now(),
    };
    localStorage.setItem(id, JSON.stringify(request));
    setRequests(readRequests());
    return true;
  }

  function resolve(id, status, actorId) {
    if (showExample) {
      if (id !== exampleRequest.id || actorId !== exampleRequest.ownerId || readExampleStatus() !== 'pending') {
        setExampleStatus(readExampleStatus());
        return false;
      }
      localStorage.setItem(exampleKey, status);
      setExampleStatus(status);
      return true;
    }
    const request = JSON.parse(localStorage.getItem(id));
    if (request?.status !== 'pending' || request.ownerId !== actorId) {
      setRequests(readRequests());
      return false;
    }
    localStorage.setItem(id, JSON.stringify({ ...request, status, resolvedAt: Date.now() }));
    setRequests(readRequests());
    return true;
  }

  return { requests: showExample ? [{ ...exampleRequest, status: exampleStatus }] : requests, submit, resolve };
}
