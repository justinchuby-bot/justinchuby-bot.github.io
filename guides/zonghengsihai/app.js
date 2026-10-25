(()=>{'use strict';
const {episodes}=window.ZONGHENG_DATA;
const byNo=n=>episodes.find(e=>e.number===n);
const routes=[
 {name:'只先听三期',desc:'关系、人生设计与带宽：先解决眼下最有用的三个问题。',eps:[74,76,87],time:'约 11小时14分',featured:true},
 {name:'正在 Dating',desc:'从依恋机制走到边界、真实连接与高质量回应。',eps:[31,56,74,81,69],time:'约 16小时'},
 {name:'职业转型 · AI时代',desc:'设计方向，守住深度，改善流程，再给系统留下余量。',eps:[76,80,86,87,88],time:'约 18小时'},
 {name:'健康与运动',desc:'从精力和睡眠打底，再进入训练、健康寿命与食欲代谢。',eps:[13,14,25,41,71],time:'约 19小时12分'},
 {name:'人类小合集',desc:'基因、文明与地理：适合长途驾驶，也适合对照原书。',eps:[67,68,70],time:'约 11小时27分'},
 {name:'钱与长期判断',desc:'从金钱心理、思维模型，走到财富框架与能力圈。',eps:[32,54,61,75],time:'约 14小时43分'}
];
const routeGrid=document.querySelector('#routeGrid');
routes.forEach((r,i)=>{const el=document.createElement('article');el.className='route'+(r.featured?' featured':'');el.dataset.number=String(i+1).padStart(2,'0');el.innerHTML=`<p class="eyebrow">ROUTE ${String(i+1).padStart(2,'0')}</p><h3>${r.name}</h3><p>${r.desc}</p><div class="route-episodes">${r.eps.map(n=>{const e=byNo(n);return `<button class="episode-pill" data-episode="${n}">EP${n} · ${cleanTitle(e.title)}</button>`}).join('')}</div><span class="route-time">${r.time}</span>`;routeGrid.append(el)});
const chapterPicks=[
 [74,'23:14','Let Them / Let Me','关系焦虑与主动权'],[74,'2:31:50','成年友谊','朋友为什么不主动'],[81,'0:06:05','进入深度关系','从情绪价值到真正回应'],[86,'19:01','约束理论','先找真正瓶颈'],[86,'1:00:33','利特尔法则','为什么任务越多反而越慢'],[87,'59:29','大脑带宽','停止把低能量归咎于自律'],[88,'25:38','破 · 立 · 行','把输入变成行动'],[70,'0:04:49','枪炮、病菌与钢铁','按原书问题对照收听']
];
document.querySelector('#chapterPicks').innerHTML=chapterPicks.map(([ep,time,title,desc])=>`<button class="chapter-pick text-button" data-episode="${ep}"><span class="time">EP${ep} · ${time}</span><span><strong>${title}</strong><span>${desc}</span></span></button>`).join('');
const themes=[
 ['关系与心理','依恋、边界、创伤、深度回应',['关系','心理','亲密关系','依恋','爱']],
 ['职业与成长','人生设计、深度工作、效率与系统',['职业成长','职业','成长','效率','系统','人生设计','Mini MBA']],
 ['身体与健康','睡眠、精力、训练与健康寿命',['身体健康','睡眠','精力','运动','营养','健身']],
 ['金钱与决策','金钱心理、投资与思维模型',['金钱','投资','决策','风险决策','思维模型']],
 ['人类使用说明书','大脑、习惯、潜意识与行动',['人类使用说明书','大脑','习惯','行为','行动']],
 ['女性与社会','女性经验、结构、文化与文明',['女性','社会','文化','历史']],
 ['学习与输出','阅读、提问、笔记、知识管理',['学习','阅读','笔记','知识管理','输出','写作']],
 ['低能量友好','对谈、故事与较轻的进入方式',['嘉宾对谈','连接','纪录片','故事']]
];
const themeGrid=document.querySelector('#themeGrid');
themes.forEach(([name,desc,tags])=>{const count=episodes.filter(e=>e.tags_editorial.some(t=>tags.includes(t))).length;const b=document.createElement('button');b.className='theme-card';b.dataset.theme=name;b.innerHTML=`<strong>${name}</strong><span>${desc}</span><span>${count}期相关节目 →</span>`;themeGrid.append(b)});
const searchInput=document.querySelector('#searchInput'),themeSelect=document.querySelector('#themeSelect'),sortSelect=document.querySelector('#sortSelect'),list=document.querySelector('#episodeList'),countEl=document.querySelector('#resultCount'),empty=document.querySelector('#emptyState');
themes.forEach(([name])=>themeSelect.insertAdjacentHTML('beforeend',`<option value="${name}">${name}</option>`));
function cleanTitle(t){return t.replace(/^EP0?\d+[.\s]*/,'')}
function escapeHtml(s=''){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function themeTags(name){const row=themes.find(t=>t[0]===name);return row?row[2]:[]}
function timeToSeconds(t){const p=t.split(':').map(Number);return p.length===3?p[0]*3600+p[1]*60+p[2]:p[0]*60+p[1]}
function card(e){const num=e.number?`EP${String(e.number).padStart(2,'0')}`:'INTRO';const summary=e.official_summary||'官方未公开文字摘要。';const id=e.number?`ep-${e.number}`:'intro';return `<details class="episode-card" id="${id}"><summary class="episode-summary"><span class="ep-no">${num}</span><span><span class="ep-title">${escapeHtml(e.title)}</span><span class="ep-meta"><span>${e.date}</span><span>${e.duration}</span><span>${e.chapters.length}个章节</span></span></span><span class="chevron" aria-hidden="true">⌄</span></summary><div class="episode-content"><div class="tags">${e.tags_editorial.map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join('')}</div><span class="official-label">官方简介</span><div class="official-summary">${escapeHtml(summary)}</div><div class="episode-links">${e.links.apple?`<a href="${e.links.apple}" target="_blank" rel="noopener">Apple Podcasts ↗</a>`:''}${e.links.ximalaya?`<a href="${e.links.ximalaya}" target="_blank" rel="noopener">喜马拉雅 ↗</a>`:''}<button class="text-button copy-link" data-copy="${id}">复制本页链接</button></div>${e.chapters.length?`<div class="timeline"><h4>官方时间轴 · ${e.chapters.length}章</h4><ol>${e.chapters.map(c=>`<li><time datetime="PT${timeToSeconds(c.time)}S">${c.time}</time><span>${escapeHtml(c.title)}</span></li>`).join('')}</ol></div>`:`<div class="timeline"><h4>官方未公开时间轴</h4></div>`}</div></details>`}
function render(){const q=searchInput.value.trim().toLowerCase();const selected=themeSelect.value;const tags=themeTags(selected);let rows=episodes.filter(e=>{const hay=[e.title,e.official_summary,...e.tags_editorial,...e.chapters.map(c=>c.title),e.number?`ep${e.number}`:'卷首语'].join(' ').toLowerCase();const qok=!q||q.split(/\s+/).every(x=>hay.includes(x));const tok=selected==='all'||e.tags_editorial.some(t=>tags.includes(t));return qok&&tok});if(sortSelect.value==='oldest')rows.sort((a,b)=>a.date.localeCompare(b.date));else if(sortSelect.value==='duration')rows.sort((a,b)=>b.duration_seconds-a.duration_seconds);else rows.sort((a,b)=>b.date.localeCompare(a.date));list.innerHTML=rows.map(card).join('');countEl.textContent=`显示 ${rows.length} / ${episodes.length} 条`;empty.hidden=rows.length!==0;bindCopies()}
function bindCopies(){document.querySelectorAll('.copy-link').forEach(b=>b.addEventListener('click',async ev=>{ev.preventDefault();const url=`${location.origin}${location.pathname}#${b.dataset.copy}`;await navigator.clipboard.writeText(url);const old=b.textContent;b.textContent='已复制 ✓';setTimeout(()=>b.textContent=old,1500)}))}
function focusEpisode(n){searchInput.value=`EP${n}`;themeSelect.value='all';sortSelect.value='newest';render();requestAnimationFrame(()=>{const el=document.querySelector(`#ep-${n}`);if(el){el.open=true;history.replaceState(null,'',`#ep-${n}`);el.scrollIntoView({behavior:'smooth',block:'start'})}})}
document.addEventListener('click',e=>{const b=e.target.closest('[data-episode]');if(b)focusEpisode(Number(b.dataset.episode));const t=e.target.closest('[data-theme]');if(t){themeSelect.value=t.dataset.theme;searchInput.value='';render();document.querySelector('#episodes').scrollIntoView({behavior:'smooth'})}});
[searchInput,themeSelect,sortSelect].forEach(el=>el.addEventListener(el===searchInput?'input':'change',render));
document.querySelector('#clearFilters').addEventListener('click',()=>{searchInput.value='';themeSelect.value='all';sortSelect.value='newest';render()});
const params=new URLSearchParams(location.search);if(params.get('q'))searchInput.value=params.get('q');if(params.get('theme')&&themes.some(t=>t[0]===params.get('theme')))themeSelect.value=params.get('theme');render();
if(/^#ep-\d+$/.test(location.hash)){const n=Number(location.hash.slice(4));focusEpisode(n)}
})();