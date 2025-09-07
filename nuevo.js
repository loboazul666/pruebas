// deface-prop.js — Solo para utilería local (rol/CTF). No para dañar sitios reales.
(() => {
  const css = `
    :root{--bg:#0a0a0a;--fg:#e53935;--fg2:#fff}
    html,body{height:100%;margin:0}
    body{background:radial-gradient(ellipse at center,#111 0%,var(--bg) 60%);color:var(--fg2);font-family:ui-monospace,Menlo,monospace;overflow:hidden}
    .wrap{position:fixed;inset:0;display:grid;place-items:center}
    .card{width:min(900px,95vw);padding:32px;border:1px solid rgba(255,255,255,.1);border-radius:16px;background:rgba(0,0,0,.4);box-shadow:0 10px 40px rgba(0,0,0,.5)}
    .title{font-size:clamp(28px,5vw,56px);text-transform:uppercase;letter-spacing:.08em;color:var(--fg)}
    .sub{opacity:.85;margin:.5rem 0 1rem}
    .blink{animation:blink 1s steps(2,end) infinite}
    @keyframes blink{50%{opacity:.2}}
  `;
  const html = `
    <div class="wrap">
      <div class="card">
        <div class="title">Sitio intervenido</div>
        <p class="sub">Escena de <strong>rol/CTF local</strong>. No es real.</p>
        <pre>> acceso concedido_<span class="blink">█</span></pre>
      </div>
    </div>`;

  document.addEventListener('DOMContentLoaded', () => {
    alert('oli');
    const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
    document.body.innerHTML = html;
    document.title = 'Página intervenida (utilería)';
  });
})();
