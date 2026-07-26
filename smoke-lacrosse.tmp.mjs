// 袋棍球冒煙:開局→蓄力射門×5→分數/階段要動、零 console 錯誤
import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 900, height: 600 } });
const errs = [];
p.on('pageerror', (e) => errs.push('page: ' + String(e).slice(0, 150)));
p.on('console', (m) => { if (m.type() === 'error') errs.push('console: ' + m.text().slice(0, 150)); });
await p.goto('http://127.0.0.1:8097/index.html', { waitUntil: 'networkidle' });
await p.click('#startMatchButton');
await p.waitForTimeout(1200);
for (let i = 0; i < 6; i++) {
  await p.mouse.move(450, 320);
  await p.mouse.down(); await p.waitForTimeout(450); await p.mouse.up();  // 蓄力射門
  await p.waitForTimeout(4500);                                            // 球飛+換邊/AI 回合
  await p.keyboard.press('k').catch(() => {});                             // 守門回合亂按一鍵
}
const state = await p.evaluate(() => ({
  msg: (document.getElementById('statusMessage')?.textContent || '').slice(0, 60),
  body: document.body.innerText.slice(0, 400),
}));
console.log('status:', state.msg);
const m = state.body.match(/(\d+)\s*[:比-]\s*(\d+)/);
console.log('score-ish:', m ? m[0] : '(no score text)');
console.log('errors:', errs.length ? errs.slice(0, 5) : 'none');
await b.close();
process.exit(errs.length ? 1 : 0);
