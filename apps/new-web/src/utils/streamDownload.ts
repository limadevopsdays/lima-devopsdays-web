import fs from 'fs';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

export async function streamDownload(url: string, destPath: string) {
  const res = await fetch(url);

  if (!res.ok || !res.body) throw new Error(`HTTP error: ${res.status}`);

  const nodeReadable = Readable.fromWeb(res.body as any);

  await pipeline(nodeReadable, fs.createWriteStream(destPath));

  console.log('Stream download completed');
}