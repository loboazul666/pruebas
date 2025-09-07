// deface-prop-horror.js — utilería local (rol/CTF). Escena turbia/terrorífica.
// No para dañar sitios reales.

(() => {
  const IMG = "7973a4f1-fdaf-4e3b-b409-3b27ac2bcc5a.png"; // imagen subida por el user

  const css = /* css */ `
    :root{--bg:#000;--blood:#b30000;--fog:#111;--txt:#e0e0e0}
    html,body{height:100%;margin:0}
    body{
      background:radial-gradient(circle at center,var(--fog),#000 70%);
      color:var(--txt);
      font-family: ui-monospace, Menlo, monospace;
      overflow:hidden;
      cursor: crosshair;
    }
    .wrap{position:fixed;inset:0;display:grid;place-items:center;z-index:1}
    .card{width:min(860px,95vw);padding:26px;border:1px solid rgba(255,255,255,.05);border-radius:10px;background:rgba(0,0,0,.7);box-shadow:0 0 40px #000,0 0 120px rgba(179,0,0,.25)}
    .title{font-size:clamp(28px,5vw,52px);text-transform:uppercase;color:var(--blood);letter-spacing:.1em;margin:0 0 8px;text-shadow:0 0 14px rgba(179,0,0,.45)}
    .sub{opacity:.7;margin:0 0 18px;font-size:14px}
    .row{display:flex;gap:18px;flex-wrap:wrap;align-items:flex-start}
    .shot{flex:0 0 auto;position:relative;width:240px;height:280px;border-radius:8px;overflow:hidden;box-shadow:0 0 30px rgba(179,0,0,.4)}
    .shot img{width:100%;height:100%;object-fit:cover;display:block;filter:contrast(1.1) saturate(.9) grayscale(.4)}
    .shot::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(179,0,0,.2));mix-blend-mode:multiply}
    .term{flex:1 1 260px;background:#050505;border:1px solid rgba(255,255,255,.06);border-radius:8px;height:280px;overflow:auto;padding:12px 14px;font-size:14px;line-height:1.4;color:#cfcfcf;box-shadow:inset 0 0 40px rgba(179,0,0,.2)}
    .blink{animation:blink 1s steps(2,end) infinite}
    @keyframes blink{50%{opacity:.15}}
    /* ruido */
    .grain{position:fixed;inset:0;pointer-events:none;opacity:.1;mix-blend-mode:overlay;background:repeating-linear-gradient(0deg,rgba(255,255,255,.04) 0 1px,transparent 1px 2px);animation:grain 1s steps(2,end) infinite}
    @keyframes grain{to{transform:translate(.3px,.3px)}}
    /* parpadeo */
    .flicker{animation:flick 2.5s infinite}
    @keyframes flick{0%,19%,21%,100%{opacity:1}20%,22%,30%,40%,60%,80%{opacity:.4}}
  `;

  const html = /* html */ `
    <div class="wrap">
      <div class="card">
        <div class="title flicker">acceso concedido</div>
        <p class="sub">prop de rol/CTF — atmósfera turbia</p>
        <div class="row">
          <figure class="shot"><img src="${IMG}" alt="imagen turbia"></figure>
          <div class="term" id="term"></div>
        </div>
      </div>
    </div>
    <div class="grain"></div>
  `;

  const $ = (s,r=document)=>r.querySelector(s);

  function typeInto(el,line,speed=18){
    return new Promise(res=>{
      const row=document.createElement('div'); el.appendChild(row);
      let i=0; (function step(){
        row.innerHTML=line.slice(0,i)+"<span class=blink>█</span>";
        if(i++<line.length) setTimeout(step,speed+Math.random()*20);
        else{row.textContent=line;el.scrollTop=el.scrollHeight;res();}
      })();
    });
  }

  const script=[
    "> conexión establecida",
    "> sujeto encontrado",
    "> ██████████",
    "> error en memoria // sangre detectada",
    "> ejecutando ritual…",
    "> ::: visiones :::",
    "> canal sellado _"
  ];

  document.addEventListener('DOMContentLoaded',async()=>{
    const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    document.body.innerHTML=html;document.title="intervenido (turbio)";
    const term=$('#term');
    for(let i=0;i<script.length;i++){await typeInto(term,script[i]);}
    // Susto: glitch en título al azar
    const title=$('.title');
    setInterval(()=>{
      title.style.transform=`translate(${(Math.random()-.5)*2}px,${(Math.random()-.5)*2}px)`;
      title.style.textShadow=Math.random()<.5?'0 0 12px rgba(179,0,0,.6)':'none';
    },2000);
  });
})();
