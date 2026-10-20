// index.html içindeki satır içi modülün CSP hash'ini hesaplar.
// Kullanım:
//   node tools/csp-hash.mjs          -> hash'i yazdırır
//   node tools/csp-hash.mjs --check  -> firebase.json ile karşılaştırır (uyuşmazsa çıkış kodu 1)
//   node tools/csp-hash.mjs --write  -> firebase.json içindeki eski hash'i yeni değerle değiştirir
//
// firebase.json'da "hosting" tek nesne ya da çok siteli dizi olabilir (kitapligim55 + kitapligim).
// --check; her hosting girdisinin güncel hash'i taşıdığını, hiçbir yerde eski/bayat hash
// kalmadığını ve çok siteli yapıda girdilerin ignore/headers bloklarının birebir aynı
// olduğunu da doğrular (CSP'nin iki sitede sürüklenmesini engeller).
import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = path.join(root, 'index.html');
const fbPath = path.join(root, 'firebase.json');

const html = fs.readFileSync(htmlPath, 'utf8');
const open = '<script type="module">';
const start = html.indexOf(open) + open.length;
if (start < open.length) {
  console.error('index.html içinde <script type="module"> bulunamadı.');
  process.exit(1);
}
const end = html.indexOf('</script>', start);
const js = html.slice(start, end);
const hash = 'sha256-' + crypto.createHash('sha256').update(Buffer.from(js, 'utf8')).digest('base64');

const mode = process.argv[2] || '';
if (mode === '--check') {
  const fb = JSON.parse(fs.readFileSync(fbPath, 'utf8'));
  const hostings = Array.isArray(fb.hosting) ? fb.hosting : fb.hosting ? [fb.hosting] : [];
  if (!hostings.length) {
    console.error('firebase.json içinde hosting tanımı bulunamadı.');
    process.exit(1);
  }
  const label = (h, i) => h.site || h.target || '#' + (i + 1);

  const seen = new Set();
  const missing = [];
  hostings.forEach((h, i) => {
    const matches = JSON.stringify(h.headers || []).match(/sha256-[A-Za-z0-9+/=]+/g) || [];
    matches.forEach(m => seen.add(m));
    if (!matches.includes(hash)) missing.push(label(h, i));
  });

  const stale = [...seen].filter(h => h !== hash);
  if (missing.length || stale.length) {
    console.error('CSP hash uyuşmuyor.');
    if (missing.length) console.error('  Güncel hash eksik: ' + missing.join(', '));
    if (stale.length) console.error('  Bayat hash bulundu: ' + stale.join(', '));
    console.error('  Beklenen: ' + hash);
    console.error('  Düzeltme: node tools/csp-hash.mjs --write');
    process.exit(1);
  }

  if (hostings.length > 1) {
    const norm = h => JSON.stringify({ ignore: h.ignore || [], headers: h.headers || [] });
    const drift = hostings.filter(h => norm(h) !== norm(hostings[0])).map(label);
    if (drift.length) {
      console.error('Çok siteli hosting girdileri farklı (ignore/headers birebir aynı olmalı).');
      console.error('  Farklı girdiler: ' + drift.join(', '));
      console.error('  Siteler: ' + hostings.map(label).join(', '));
      process.exit(1);
    }
  }

  console.log('CSP hash OK: ' + hash + ' (site: ' + hostings.map(label).join(', ') + ')');
} else if (mode === '--write') {
  const raw = fs.readFileSync(fbPath, 'utf8');
  const next = raw.replace(/sha256-[A-Za-z0-9+/=]+/g, hash);
  fs.writeFileSync(fbPath, next);
  console.log('firebase.json güncellendi: ' + hash);
} else {
  console.log(hash);
}
