// Sürümü proje kuralına göre bir adım artırır ve bağlı kayıtları günceller.
//
// KURAL (A.B.C):
//   - C her değişiklikte 1 artar (0..9).
//   - C=9 iken sonraki artışta B 1 artar, C=0 olur.
//   - B=9 iken sonraki artışta A 1 artar, B=0, C=0 olur.
//   Örnek: 1.4.7 -> 1.4.8 -> 1.4.9 -> 1.5.0 ... 1.9.9 -> 2.0.0
//
// Yaptıkları:
//   1) index.html içindeki VERS değerini artırır
//   2) firebase.json CSP hash'ini yeniler (tools/csp-hash.mjs --write)
//   3) sw.js içindeki C önbellek sürümünü artırır (v42 -> v43)
//
// Kullanım:
//   node tools/ver-bump.mjs         -> hepsini uygular
//   node tools/ver-bump.mjs --dry   -> sadece ne yapacağını yazdırır
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = path.join(root, 'index.html');
const swPath = path.join(root, 'sw.js');
const dry = process.argv.includes('--dry');

const html = fs.readFileSync(htmlPath, 'utf8');
const re = /VERS='(\d+)\.(\d+)\.(\d+)'/;
const found = html.match(new RegExp(re.source, 'g')) || [];
if (found.length !== 1) {
  console.error(`index.html içinde tam olarak bir VERS='A.B.C' olmalı (bulunan: ${found.length}).`);
  process.exit(1);
}
const m = html.match(re);

let a = Number(m[1]);
let b = Number(m[2]);
let c = Number(m[3]);
const old = `${a}.${b}.${c}`;

c += 1;
if (c > 9) {
  c = 0;
  b += 1;
  if (b > 9) {
    b = 0;
    a += 1;
  }
}
const next = `${a}.${b}.${c}`;

// sw.js önbellek sürümü (yoksa uyarı verip devam et)
const sw = fs.readFileSync(swPath, 'utf8');
const swRe = /(const C\s*=\s*')([a-z0-9-]*?)v(\d+)(')/;
const swm = sw.match(swRe);
const swOld = swm ? Number(swm[3]) : null;
const swNext = swOld === null ? null : swOld + 1;

if (dry) {
  console.log(`VERS: ${old} -> ${next}`);
  console.log(swOld === null ? 'sw.js C: (bulunamadı, atlanır)' : `sw.js C: v${swOld} -> v${swNext}`);
  process.exit(0);
}

fs.writeFileSync(htmlPath, html.replace(re, `VERS='${next}'`));
console.log(`VERS: ${old} -> ${next}`);

const csp = spawnSync(process.execPath, [path.join(root, 'tools', 'csp-hash.mjs'), '--write'], { stdio: 'inherit' });
if (csp.status !== 0) process.exit(csp.status || 1);

if (swOld === null) {
  console.warn('UYARI: sw.js içinde C sürümü bulunamadı; elle kontrol edin.');
} else {
  fs.writeFileSync(swPath, sw.replace(swRe, `$1${swm[2]}v${swNext}$4`));
  console.log(`sw.js C: v${swOld} -> v${swNext}`);
}
