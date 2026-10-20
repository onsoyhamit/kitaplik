// Tabler Icons'u uygulamanın gerçekten kullandığı simgelere indirger.
//
// Neden: ikonlar CDN'den yüklenince (ağ engeli, CDN kesintisi, çevrimdışı) buton
// simgeleri kayboluyordu. Artık CSS ve font yerelden (vendor/) gelir; font yalnız
// kullanılan simgeleri içerir (~12 KB, tam font 864 KB).
//
// Kullanım:
//   node tools/icons.mjs --build   -> CSS'i üretir, fontu kırpar (python + fonttools gerekir)
//   node tools/icons.mjs           -> yalnız CSS'i üretir, kırpılacak kod noktalarını yazar
//   node tools/icons.mjs --check   -> index.html'de kullanılan her simge CSS'te var mı denetler
//
// Font kırpma için: python -m pip install fonttools brotli
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = path.join(root, 'index.html');
const cssOut = path.join(root, 'vendor', 'tabler-icons.css');
const fontOut = path.join(root, 'vendor', 'fonts', 'tabler-icons.woff2');
const fullCssPath = path.join(root, 'vendor', 'tabler-icons.full.css');
const CDN = 'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist';
const VERSION = '3.19.0';

const args = new Set(process.argv.slice(2));
const check = args.has('--check');
const build = args.has('--build');

const html = fs.readFileSync(htmlPath, 'utf8');

// --- kullanılan simgeleri çıkar -------------------------------------------------
// 1) class="ti ti-x" gibi doğrudan kullanımlar. Şablon parçaları (ti-arrow-${...})
//    atlanır; onların gerçek değerleri (arrow-up/arrow-down) aşağıdaki dize taramasıyla gelir.
const direct = new Set();
for (const m of html.matchAll(/\bti-([a-z0-9]+(?:-[a-z0-9]+)*)/g)) {
  const after = html[m.index + m[0].length] || '';
  if (after === '-' || after === '$') continue;
  direct.add(m[1]);
}

// --- denetim modu ---------------------------------------------------------------
if (check) {
  const css = fs.existsSync(cssOut) ? fs.readFileSync(cssOut, 'utf8') : '';
  if (!css) {
    console.error('vendor/tabler-icons.css yok. Çalıştır: node tools/icons.mjs --build');
    process.exit(1);
  }
  const missing = [...direct].filter(n => !css.includes(`.ti-${n}:before`));
  if (missing.length) {
    console.error('Üretilen CSS eksik simge: ' + missing.sort().join(', '));
    console.error('Düzeltme: node tools/icons.mjs --build');
    process.exit(1);
  }
  const font = fs.existsSync(fontOut) ? fs.statSync(fontOut).size : 0;
  if (font < 1000) {
    console.error('vendor/fonts/tabler-icons.woff2 eksik/bozuk. Çalıştır: node tools/icons.mjs --build');
    process.exit(1);
  }
  console.log(`icons OK: ${direct.size} doğrudan simge, font ${font} bayt`);
  process.exit(0);
}

// --- tam CSS'i bul (gerekirse indir) --------------------------------------------
let full = '';
if (fs.existsSync(fullCssPath)) {
  full = fs.readFileSync(fullCssPath, 'utf8');
} else {
  full = await (await fetch(`${CDN}/tabler-icons.min.css`)).text();
  if (!full.includes('@font-face')) {
    console.error('Tam CSS indirilemedi.');
    process.exit(1);
  }
}

const rules = new Map();
for (const m of full.matchAll(/\.ti-([a-z0-9-]+):before\{content:"\\([0-9a-fA-F]+)"\}/g)) {
  rules.set(m[1], m[2].toLowerCase());
}
if (!rules.size) {
  console.error('Tam CSS içinde simge kuralı bulunamadı.');
  process.exit(1);
}

// 2) Simge adı olarak kullanılan düz dizeler ('books', 'layout-grid', 'arrow-up' ...).
//    Yalnız CSS'te tanımlı adlar kabul edilir; ilgisiz kelimeler elenir.
const picked = new Set([...direct].filter(n => rules.has(n)));
const unknownDynamic = [];
for (const m of html.matchAll(/'([a-z0-9]+(?:-[a-z0-9]+)*)'/g)) {
  if (rules.has(m[1])) picked.add(m[1]);
}

// 3) Şablon içinde seçilen simgeler: ti-arrow-${sdir>0?'up':'down'} -> arrow-up, arrow-down
for (const m of html.matchAll(/ti-([a-z0-9-]+)-\$\{([^}]*)\}/g)) {
  const prefix = m[1];
  for (const alt of m[2].matchAll(/'([a-z0-9-]+)'/g)) {
    const name = prefix + '-' + alt[1];
    if (rules.has(name)) picked.add(name);
    else unknownDynamic.push(name);
  }
}

const unknown = [...direct].filter(n => !rules.has(n)).sort();
const names = [...picked].sort();

// --- CSS üret ------------------------------------------------------------------
const header = `/*! Tabler Icons ${VERSION} (alt küme) - https://tabler.io - MIT License */\n`;
const face = `@font-face{font-family:"tabler-icons";font-style:normal;font-weight:400;font-display:swap;src:url("./fonts/tabler-icons.woff2") format("woff2")}\n`;
const base = `.ti{font-family:"tabler-icons" !important;speak:none;font-style:normal;font-weight:normal;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}\n`;
const body = names.map(n => `.ti-${n}:before{content:"\\${rules.get(n)}"}`).join('\n') + '\n';
const css = header + face + base + body;
fs.writeFileSync(cssOut, css);
console.log(`vendor/tabler-icons.css: ${names.length} simge, ${Buffer.byteLength(css)} bayt`);
if (unknown.length) console.warn('CSS\'te yok (atlandı): ' + unknown.join(', '));

const unicodes = names.map(n => 'U+' + rules.get(n).toUpperCase()).join(',');
console.log('unicodes: ' + unicodes);

// --- font kırpma ---------------------------------------------------------------
if (!build) {
  console.log('\nFontu kırpmak için: node tools/icons.mjs --build');
  process.exit(0);
}

let fullFont = path.join(os.tmpdir(), 'tabler-icons-full.woff2');
if (!fs.existsSync(fullFont)) {
  const res = await fetch(`${CDN}/fonts/tabler-icons.woff2`);
  if (!res.ok) {
    console.error('Tam font indirilemedi: HTTP ' + res.status);
    process.exit(1);
  }
  fs.writeFileSync(fullFont, Buffer.from(await res.arrayBuffer()));
}

fs.mkdirSync(path.dirname(fontOut), { recursive: true });
const py = process.env.PYTHON || 'python';
const r = spawnSync(py, [
  '-m', 'fontTools.subset', fullFont,
  `--unicodes=${unicodes}`,
  '--flavor=woff2',
  '--desubroutinize',
  '--no-hinting',
  '--layout-features=',
  `--output-file=${fontOut}`
], { stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' });

if (r.error || r.status !== 0) {
  console.error('Font kırpılamadı. python + fonttools kurulu mu? (python -m pip install fonttools brotli)');
  console.error((r.stderr || r.error?.message || '').trim().split('\n').slice(-4).join('\n'));
  process.exit(1);
}
const size = fs.statSync(fontOut).size;
if (size < 1000) {
  console.error('Font çıktısı çok küçük, kırpma başarısız.');
  process.exit(1);
}
console.log(`vendor/fonts/tabler-icons.woff2: ${size} bayt (tam font ${fs.statSync(fullFont).size} bayt)`);
