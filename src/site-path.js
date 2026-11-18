export const siteBase = import.meta.env.BASE_URL.replace(/\/$/, "");

export function sitePath(path) {
  return siteBase + path;
}
