import fs from 'node:fs';
for (const f of process.argv.slice(2)) {
  const c = fs.readFileSync(f, 'utf8');
  const text = c
    .replace(/<[^>]*>/g, '\n')
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s && !/^[{}()<>/;,.]+$/.test(s) && !s.startsWith('import') && !s.startsWith('export') && !s.startsWith('return') && s !== "'use client';");
  console.log(`\n===== ${f} =====`);
  console.log([...new Set(text)].join('\n'));
}
