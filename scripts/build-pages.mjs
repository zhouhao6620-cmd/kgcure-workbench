import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { build } from "vite";

const repository = process.argv[2];
if (!repository || !/^[a-zA-Z0-9_-][a-zA-Z0-9._-]*$/.test(repository)) {
  throw new Error("Usage: npm run build:pages -- <repository-name>");
}

const outDir = "dist/pages";
await build({ base: `/${repository}/`, build: { outDir } });

const index = join(outDir, "index.html");
const directRoutes = [
  "design-system",
  "workspace",
  "workspace/chats/new",
  "workspace/skills",
  "workspace/agents",
  "workspace/evidence-search",
  "workspace/topic-selection",
  "workspace/grant-application",
  "workspace/scientific-drawing",
  "workspace/research-space",
  "workspace/my-files",
  "workspace/membership",
  "workspace/contribute",
  "workspace/profile",
  "workspace/approvals",
];

await Promise.all([
  copyFile(index, join(outDir, "404.html")),
  writeFile(join(outDir, ".nojekyll"), ""),
  ...directRoutes.map(async (route) => {
    const directory = join(outDir, route);
    await mkdir(directory, { recursive: true });
    await copyFile(index, join(directory, "index.html"));
  }),
]);
