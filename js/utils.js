// utils.js
// Funções utilitárias reutilizáveis entre os módulos do blog.

// ─── FRONTMATTER ─────────────────────────────────────────

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const meta = {};
  match[1].split("\n").forEach((line) => {
    const i = line.indexOf(":");
    if (i === -1) return;
    const key   = line.slice(0, i).trim();
    const value = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    meta[key] = value;
  });

  return { meta, body: match[2] };
}

// ─── LOADER DE MARKDOWN ───────────────────────────────────

async function loadMarkdown(filePath) {
  try {
    const res = await fetch(filePath);
    if (!res.ok) return null;
    const raw = await res.text();
    const { meta, body } = parseFrontmatter(raw);
    const html = marked.parse(body);
    return { meta, html, body };
  } catch (err) {
    console.error("Erro ao carregar markdown:", filePath, err);
    return null;
  }
}

// ─── LOADING ─────────────────────────────────────────────

function renderLoading() {
  document.getElementById("app").innerHTML = `<p class="loading">Carregando…</p>`;
}

// ─── NAV ACTIVE ───────────────────────────────────────────

function updateNavActive() {
  document.querySelectorAll("#nav a[data-link]").forEach((el) => {
    el.classList.toggle("active", currentView === "home");
  });
}

// ─── LINKS ────────────────────────────────────────────────

function bindLinks() {
  document.querySelectorAll("[data-link]").forEach((el) => {
    el.onclick = (e) => {
      e.preventDefault();
      navigate('/');
    };
  });
}

function bindArticleLinks() {
  document.querySelectorAll("[data-article]").forEach((el) => {
    el.onclick = (e) => {
      e.preventDefault();
      navigate('/post/' + el.getAttribute("data-article"));
    };
  });
}