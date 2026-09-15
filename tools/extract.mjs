import fs from 'node:fs';
import path from 'node:path';
import { html2jsx } from './html2jsx.mjs';

// node tools/extract.mjs <srcHtml> <startLine> <endLine> <outFile> <CompName> [--client]
const [src, s, e, out, name, ...flags] = process.argv.slice(2);
const isClient = flags.includes('--client');
const lines = fs.readFileSync(src, 'utf8').split('\n');
const frag = lines.slice(Number(s) - 1, Number(e)).join('\n');
const jsx = html2jsx(frag);
const usesLink = /<Link\b/.test(jsx);
const header = [
  isClient ? "'use client';" : null,
  usesLink ? "import Link from 'next/link';" : null,
].filter(Boolean).join('\n');
const body = `${header}${header ? '\n\n' : ''}export default function ${name}() {\n  return (\n    <>\n${jsx.split('\n').map(l => '      ' + l).join('\n')}\n    </>\n  );\n}\n`;
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, body);
console.log(`${out}  (${jsx.split('\n').length} dòng JSX, Link=${usesLink})`);
