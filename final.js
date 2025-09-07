// deface-prop-epic.js — utilería local para rol/CTF. No para atacar sitios reales.
// ✱ Uso pensado para maquetas, demos offline, y entornos de práctica.
// ✱ No incluye ni fomenta métodos de intrusión o explotación.

(() => {
  // ============================
  // CONFIG
  // ============================
  const CONFIG = {
    TITLE: "Sitio intervenido",
    SUBTITLE:
      "Escena de rol/CTF local. Utilería visual — no es real ni maliciosa.",
    IMAGE_URL:
      "https://media.discordapp.net/attachments/1406292685727207524/1413879478924480622/41e5561f1b37b4eaff225f9876eec60f.jpg?ex=68bedae0&is=68bd8960&hm=79f43799f2bfec558525b1ac6046a71f1ca14b400af07c2ca167c3e6e257b24f&=&format=webp&width=954&height=1006",
    ACCENT: "#e53935", // rojo neón
    ACCENT_2: "#29b6f6", // cian
    TEXT: "#eaeaea",
    BG: "#070709",
    MAX_WIDTH: 980,
  };

  // ============================
  // CSS (épico, con efectos)
  // ============================
  const css = /* css */ `
    :root{
      --bg:${CONFIG.BG};
      --fg:${CONFIG.TEXT};
      --acc:${CONFIG.ACCENT};
      --acc2:${CONFIG.ACCENT_2};
      --glass: rgba(0,0,0,.42);
    }
    *{box-sizing:border-box}
    html,body{height:100%;margin:0}
    body{
      background: radial-gradient(1200px 700px at 70% 10%, rgba(229,57,53,.15), transparent 45%),
                  radial-gradient(900px 600px at 30% 80%, rgba(41,182,246,.12), transparent 50%),
                  linear-gradient(180deg, #0b0d14, var(--bg));
      color:var(--fg);
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
      overflow:hidden;
    }
    .wrap{position:fixed; inset:0; display:grid; place-items:center}
    .stage{position:relative; width:min(${CONFIG.MAX_WIDTH}px, 94vw)}

    /* Matrix backdrop */
    canvas.matrix{position:fixed; inset:0; z-index:0; opacity:.22; pointer-events:none;}

    .card{
      position:relative;
      z-index:1;
      padding:28px clamp(18px,3vw,32px);
      border:1px solid rgba(255,255,255,.08);
      border-radius:18px;
      background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(0,0,0,.35));
      backdrop-filter: blur(6px) saturate(130%);
      box-shadow: 0 25px 90px rgba(0,0,0,.6), inset 0 0 0 1px rgba(255,255,255,.03);
    }

    .hud{display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:16px}
    .led{display:inline-flex; align-items:center; gap:10px; font-size:12px; letter-spacing:.12em; text-transform:uppercase; opacity:.9}
    .dot{width:10px; height:10px; border-radius:999px; background:var(--acc); box-shadow:0 0 18px var(--acc)}

    .title{
      font-size: clamp(30px, 6vw, 64px);
      text-transform: uppercase;
      letter-spacing:.10em;
      margin: 4px 0 2px;
      line-height:1.05;
      color: var(--acc);
      text-shadow: 0 0 18px color-mix(in oklab, var(--acc) 70%, transparent);
    }
    .title.glitch{ position:relative; display:inline-block }
    .title.glitch::before, .title.glitch::after{
      content: attr(data-text);
      position:absolute; inset:0; mix-blend-mode:screen; filter:blur(.4px);
    }
    .title.glitch::before{ color: var(--acc2); transform: translate(2px, -1px); clip-path: polygon(0 2%,100% 0,100% 48%,0 44%); animation: glitch1 2.2s infinite linear }
    .title.glitch::after{ color: #fff; transform: translate(-2px, 1px); clip-path: polygon(0 56%,100% 60%,100% 100%,0 98%); animation: glitch2 2.4s infinite linear }
    @keyframes glitch1{0%,100%{transform:translate(2px,-1px)}50%{transform:translate(1px,1px)}}
    @keyframes glitch2{0%,100%{transform:translate(-2px,1px)}50%{transform:translate(-1px,-2px)}}

    .sub{opacity:.9; margin:.35rem 0 1.25rem; font-size:clamp(14px,1.8vw,16px)}

    .hero{display:flex; align-items:center; gap:20px; flex-wrap:wrap}
    .pica{
      position:relative; width:160px; height:160px; border-radius:18px; overflow:hidden; flex:0 0 auto;
      box-shadow: 0 12px 40px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.06);
      background: #000;
    }
    .pica img{width:100%; height:100%; object-fit:cover; display:block; filter:contrast(1.06) saturate(1.1)}
    .pica::after{content:""; position:absolute; inset:-2px; border-radius:20px; background:
      conic-gradient(from 0deg, var(--acc), transparent 30%, var(--acc2) 60%, transparent 80%, var(--acc) 100%);
      mask: linear-gradient(#0000, #000 5%, #000 95%, #0000) content-box,
            linear-gradient(#000, #000);
      -webkit-mask-composite: xor; mask-composite: exclude;
      filter: blur(6px) saturate(130%);
      animation: spin 6s linear infinite;
      padding:2px;
    }
    @keyframes spin{to{transform:rotate(1turn)}}

    .panel{flex:1 1 280px}
    .term{
      background: #060607;
      border:1px solid rgba(255,255,255,.06);
      border-radius:14px;
      padding:14px 16px;
      height: 220px; overflow:auto; font-size:14px; line-height:1.4;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.02), inset 0 -40px 60px rgba(229,57,53,.04);
    }
    .blink{animation: blink 1s steps(2,end) infinite}
    @keyframes blink{50%{opacity:.2}}

    .actions{display:flex; flex-wrap:wrap; gap:10px; margin-top:14px}
    .btn{
      appearance:none; border:1px solid rgba(255,255,255,.08); color:#fff; background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(0,0,0,.3));
      padding:10px 14px; border-radius:12px; cursor:pointer; font-weight:600; letter-spacing:.06em; text-transform:uppercase; font-size:12px;
      transition: transform .08s ease, box-shadow .2s ease, background .2s ease;
    }
    .btn:hover{ transform: translateY(-1px); box-shadow:0 10px 24px rgba(0,0,0,.35) }

    .foot{display:flex; justify-content:space-between; align-items:center; gap:10px; margin-top:18px; opacity:.8; font-size:12px}

    /* CRT overlay */
    .crt{ position:fixed; inset:0; pointer-events:none; z-index:2; mix-blend-mode:overlay; opacity:.18; background:
      repeating-linear-gradient(180deg, rgba(255,255,255,.04) 0 1px, rgba(0,0,0,0) 1px 2px);
      animation: flick .12s infinite alternate; }
    @keyframes flick{to{opacity:.22}}

    /* Notifications toasts */
    .toast{position:fixed; right:16px; bottom:16px; z-index:3; display:grid; gap:10px}
    .toast div{padding:10px 14px; border-radius:10px; background:rgba(0,0,0,.6); border:1px solid rgba(255,255,255,.08); box-shadow:0 10px 24px rgba(0,0,0,.35)}

    /* Bloom toggle */
    .bloom .card{ filter: drop-shadow(0 0 20px color-mix(in oklab, var(--acc) 40%, transparent)) drop-shadow(0 0 60px color-mix(in oklab, var(--acc2) 40%, transparent)); }
  `;

  // ============================
  // HTML
  // ============================
  const html = /* html */ `
    <canvas class="matrix" aria-hidden="true"></canvas>
    <div class="wrap">
      <div class="stage">
        <div class="card">
          <div class="hud">
            <div class="led"><span class="dot"></span> ACCESO CONCEDIDO</div>
            <div class="led" id="hud-clock">--:--:--</div>
          </div>

          <div class="title glitch" data-text="${CONFIG.TITLE}">${CONFIG.TITLE}</div>
          <p class="sub">${CONFIG.SUBTITLE}</p>

          <div class="hero">
            <figure class="pica"><img alt="Imagen de utilería" src="${CONFIG.IMAGE_URL}" /></figure>
            <section class="panel">
              <div class="term" id="term" role="log" aria-live="polite"></div>
              <div class="actions">
                <button class="btn" id="btn-glitch">Glitch</button>
                <button class="btn" id="btn-matrix">Matrix</button>
                <button class="btn" id="btn-bloom">Bloom</button>
                <button class="btn" id="btn-image">Imagen</button>
                <button class="btn" id="btn-clear">Limpiar</button>
                <button class="btn" id="btn-help">Ayuda (?)</button>
              </div>
            </section>
          </div>

          <div class="foot">
            <span>Prop de demostración. No real.</span>
            <span>Atajos: [G]litch · [M]atrix · [B]loom · [I]magen · [H]elp</span>
          </div>
        </div>
      </div>
    </div>
    <div class="crt" aria-hidden="true"></div>
    <div class="toast" id="toast" aria-live="polite"></div>
  `;

  // ============================
  // HELPERS
  // ============================
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const toast = (msg) => {
    const wrap = $("#toast");
    const d = document.createElement("div");
    d.textContent = msg;
    wrap.appendChild(d);
    setTimeout(() => d.remove(), 2200);
  };

  // Reloj HUD
  function startClock() {
    const el = $("#hud-clock");
    const fmt = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const now = new Date();
      el.textContent = `${fmt(now.getHours())}:${fmt(now.getMinutes())}:${fmt(now.getSeconds())}`;
      requestAnimationFrame(() => setTimeout(tick, 333));
    };
    tick();
  }

  // Terminal typing
  function createTerm(el) {
    const queue = [];
    let busy = false;

    const type = (line) =>
      new Promise((res) => {
        const row = document.createElement("div");
        el.appendChild(row);
        let i = 0;
        const step = () => {
          row.innerHTML = `${line.slice(0, i)}<span class=\"blink\">█</span>`;
          if (i++ < line.length) setTimeout(step, 12 + Math.random() * 18);
          else {
            row.textContent = line;
            el.scrollTop = el.scrollHeight;
            res();
          }
        };
        step();
      });

    const push = (line) => {
      queue.push(line);
      run();
    };

    async function run() {
      if (busy) return;
      busy = true;
      while (queue.length) {
        const line = queue.shift();
        // autoscroll suave
        el.scrollTo({ top: el.scrollHeight + 200, behavior: "smooth" });
        // escribir
        // eslint-disable-next-line no-await-in-loop
        await type(line);
      }
      busy = false;
    }

    return { push };
  }

  // Mensajes de terminal
  function bootMessages() {
    const msgs = [
      "> Inicializando escena…",
      "> Cargando módulos: ui.glitch, fx.matrix, crt.overlay",
      "> Verificando integridad del recurso… OK",
      "> Estableciendo canal seguro… OK",
      "> Token: ******-****-****-****",
      "> Estado: ACCESO CONCEDIDO",
      "> Renderizando marcos…",
    ];
    msgs.forEach((m, i) => setTimeout(() => term.push(m), 350 * i));
    setTimeout(() => term.push("> Sistema listo. Diviértete. \n"), 350 * msgs.length + 150);
  }

  // Matrix rain
  function startMatrix(canvas) {
    const ctx = canvas.getContext("2d");
    const cols = Math.floor(window.innerWidth / 14);
    const drops = new Array(cols).fill(0);
    const glyphs = "アカサタナハマヤラワ0123456789$#*+=-•".split("");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "14px monospace";
      for (let i = 0; i < drops.length; i++) {
        const txt = glyphs[Math.floor(Math.random() * glyphs.length)];
        ctx.fillStyle = Math.random() < 0.005 ? CONFIG.ACCENT_2 : CONFIG.ACCENT;
        ctx.fillText(txt, i * 14, drops[i] * 16);
        drops[i]++;
        if (drops[i] * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      }
      if (!canvas.dataset.paused) requestAnimationFrame(draw);
    }
    draw();
    return {
      toggle(){
        if (canvas.dataset.paused) { delete canvas.dataset.paused; draw(); toast("Matrix ON"); }
        else { canvas.dataset.paused = "1"; toast("Matrix OFF"); }
      }
    }
  }

  // Favicon dinámico
  function setFavicon(color = CONFIG.ACCENT) {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const x = c.getContext("2d");
    x.fillStyle = "#000"; x.fillRect(0,0,64,64);
    x.strokeStyle = color; x.lineWidth = 6; x.strokeRect(8,8,48,48);
    x.font = "bold 28px monospace"; x.fillStyle = color; x.fillText(">_", 12, 40);
    const link = document.createElement("link");
    link.rel = "icon"; link.type = "image/png"; link.href = c.toDataURL();
    document.head.appendChild(link);
  }

  // ============================
  // BOOTSTRAP
  // ============================
  document.addEventListener("DOMContentLoaded", () => {
    // Style
    const s = document.createElement("style"); s.textContent = css; document.head.appendChild(s);

    // DOM
    document.body.innerHTML = html;
    document.title = "Página intervenida (utilería)";

    // Favicon
    setFavicon();

    // Clock
    startClock();

    // Matrix
    const matrix = startMatrix($("canvas.matrix"));

    // Terminal
    window.term = createTerm($("#term"));
    bootMessages();

    // Buttons
    $("#btn-glitch").addEventListener("click", () => {
      const t = $(".title");
      t.classList.toggle("glitch");
      toast(t.classList.contains("glitch") ? "Glitch ON" : "Glitch OFF");
    });
    $("#btn-matrix").addEventListener("click", () => matrix.toggle());
    $("#btn-bloom").addEventListener("click", () => {
      document.documentElement.classList.toggle("bloom");
      toast(document.documentElement.classList.contains("bloom") ? "Bloom ON" : "Bloom OFF");
    });
    $("#btn-image").addEventListener("click", () => {
      const fig = $(".pica");
      if (fig.style.display === "none") { fig.style.display = "block"; toast("Imagen ON"); }
      else { fig.style.display = "none"; toast("Imagen OFF"); }
    });
    $("#btn-clear").addEventListener("click", () => $("#term").innerHTML = "");
    $("#btn-help").addEventListener("click", () => {
      toast("Atajos en pantalla");
      term.push("> Atajos: [G]litch · [M]atrix · [B]loom · [I]magen · [H]elp");
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      const k = e.key.toLowerCase();
      if (k === "g") $("#btn-glitch").click();
      if (k === "m") $("#btn-matrix").click();
      if (k === "b") $("#btn-bloom").click();
      if (k === "i") $("#btn-image").click();
      if (k === "h") $("#btn-help").click();
    });

    // Mensajes aleatorios de ambiente
    const ambient = [
      "# sincronizando reloj NTP…",
      "# sellando escena con checksum…",
      "# trazas de render establecidas",
      "# hook de teclado activo",
      "# canal de telemetría silenciado",
      "# latencia: 7ms",
    ];
    setInterval(() => {
      const msg = ambient[Math.floor(Math.random()*ambient.length)];
      term.push(msg);
    }, 3200);
  });
})();
