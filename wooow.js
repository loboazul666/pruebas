// deface-prop-min.js — utilería local (rol/CTF). Vibra turbia, minimal.
*{box-sizing:border-box}
html,body{height:100%;margin:0}
body{
background: radial-gradient(120% 140% at 50% 20%, var(--halo), #000 55%);
color:var(--txt);
font-family: ui-monospace, Menlo, Consolas, monospace;
letter-spacing:.02em; line-height:1.25;
overflow:hidden;
}


/* Grano / ruido sutil */
.grain{position:fixed; inset:0; pointer-events:none; opacity:.12; mix-blend-mode:soft-light;
background: repeating-conic-gradient(from 0deg, rgba(255,255,255,.07) 0 0.5deg, rgba(0,0,0,0) .5deg 1deg);
animation: jitter .8s steps(2,end) infinite;}
@keyframes jitter{to{transform:translate(.2px,.2px)}}


.wrap{position:fixed; inset:0; display:grid; place-items:center}
.card{width:min(840px,92vw); padding:28px; border:1px solid rgba(255,255,255,.06); border-radius:14px; background:rgba(0,0,0,.5); box-shadow:0 20px 60px rgba(0,0,0,.7), inset 0 0 0 1px rgba(255,255,255,.03)}


.title{font-size:clamp(26px,5vw,44px); text-transform:uppercase; color:var(--ink); letter-spacing:.08em; margin:0 0 6px; text-shadow:0 0 14px rgba(214,40,40,.25)}
.sub{opacity:.75; margin:0 0 18px; font-size:14px}


.row{display:flex; gap:18px; align-items:flex-start; flex-wrap:wrap}
.shot{position:relative; width:200px; height:230px; border-radius:10px; overflow:hidden; flex:0 0 auto; background:#050505; filter:grayscale(1) contrast(1.1);}
.shot img{width:100%; height:100%; object-fit:cover; display:block; opacity:.9}
.shot::after{content:""; position:absolute; inset:0; background:linear-gradient(180deg, transparent, rgba(214,40,40,.06)); mix-blend-mode:overlay}


.term{flex:1 1 260px; background:#050505; border:1px solid rgba(255,255,255,.06); border-radius:10px; height:240px; overflow:auto; padding:12px 14px; font-size:14px}
.blink{animation:blink 1s steps(2,end) infinite}
@keyframes blink{50%{opacity:.15}}


/* Glitch leve */
.gl{position:relative; display:inline-block}
.gl::before,.gl::after{content:attr(data-x); position:absolute; inset:0; pointer-events:none;}
.gl::before{color:#fff2; transform:translate(1px,0)}
.gl::after{color:#0ff2; transform:translate(-1px,0)}


/* Vignette cerrada al activar modo oscuro profundo */
.void .card{background:rgba(0,0,0,.65)}
`;


const html = /* html */ `
<div class="wrap">
<div class="card">
<div class="title gl" data-x=">_ acceso concedido">&_ acceso concedido</div>
<p class="sub">utilería para rol/CTF local — escena ficticia</p>
<div class="row">
<figure class="shot"><img alt="escena" src="${IMG}"></figure>
<div class="term" id="term" role="log" aria-live="polite"></div>
</div>
</div>
</div>
<div class="grain" aria-hidden="true"></div>
`;


const $ = (s, r=document) => r.querySelector(s);


function typeInto(el, line, speed=16){
return new Promise(res=>{
const row = document.createElement('div'); el.appendChild(row);
let i=0; (function step(){
row.innerHTML = line.slice(0,i)+"<span class=blink>█</span>";
if(i++ < line.length) setTimeout(step, speed + Math.random()*14);
else { row.textContent = line; el.scrollTop = el.scrollHeight; res(); }
})();
});
}


const script = [
"> enlazando canal…",
"> sellando escena… ok",
"> señal baja // ruido alto",
"> ::: silencio :::",
"> token █████-████-████",
"> ready _",
];


document.addEventListener('DOMContentLoaded', async () => {
const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
document.body.innerHTML = html;
document.title = "intervenido";


const term = $('#term');
for (let i=0; i<script.length; i++) {
/* eslint-disable no-await-in-loop */
await typeInto(term, script[i]);
}


// Toggle "más turbio" con tecla V (vignette cerrada)
document.addEventListener('keydown', (e)=>{
if (e.key.toLowerCase() === 'v') document.documentElement.classList.toggle('void');
});


// Pequeño parpadeo glitch al azar en el título
const title = document.querySelector('.title');
setInterval(()=>{
title.style.transform = `translate(${(Math.random()-.5)*1.2}px, ${(Math.random()-.5)*1.2}px)`;
title.style.textShadow = Math.random()<.2 ? '0 0 12px rgba(214,40,40,.35)' : 'none';
}, 2400);
});
})();
