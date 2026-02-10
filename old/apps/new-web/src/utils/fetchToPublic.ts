import { mkdir, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

export const fetchToPublic = async (url: string) => {
  if (!url) return null;

  const absoluteUrl = url.startsWith("http") ? url : `https:${url}`;
  const response = await fetch(absoluteUrl);
  if (!response.ok) throw new Error(`Failed to fetch asset: ${absoluteUrl}`);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);


  const urlObj = new URL(absoluteUrl);
  const filename = basename(urlObj.pathname);
  const publicDir = join(process.cwd(), "public/remote");
  await mkdir(publicDir, { recursive: true });
  const filePath = join(publicDir, filename);
  await writeFile(filePath, buffer);

  return `/remote/${filename}`;
}
