// home.js

const app = document.getElementById("app");

const articleContentCache = {};
let articles = [];

// ─── ESTADO ATUAL ─────────────────────────────────────────
// "home" | { slug: string }
let currentView = "home";

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

// ─── LOADER ──────────────────────────────────────────────

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

// ─── CARREGA LISTA DE ARTIGOS ─────────────────────────────

async function loadArticles() {
  try {
    const res = await fetch("js/articles.json");
    if (!res.ok) throw new Error("articles.json não encontrado");
    articles = await res.json();
  } catch (err) {
    console.error("Erro ao carregar articles.json:", err);
    articles = [];
  }
}

// ─── PRÉ-CARREGA CONTEÚDO DOS ARTIGOS PARA BUSCA ─────────

async function preloadArticleContents() {
  await Promise.all(
    articles.map(async (a) => {
      if (articleContentCache[a.slug] !== undefined) return;
      try {
        const res = await fetch(`articles/${a.slug}.md`);
        if (!res.ok) { articleContentCache[a.slug] = ""; return; }
        const raw = await res.text();
        const { body } = parseFrontmatter(raw);
        articleContentCache[a.slug] = body.toLowerCase();
      } catch {
        articleContentCache[a.slug] = "";
      }
    })
  );
}

// ─── RENDER HOME ─────────────────────────────────────────

function renderArticleList(filter = "") {
  const q = filter.toLowerCase().trim();

  const filtered = q
    ? articles.filter((a) => {
        const inTitle       = a.title.toLowerCase().includes(q);
        const inDescription = (a.description || "").toLowerCase().includes(q);
        const inTags        = (a.tags || []).some((t) => t.toLowerCase().includes(q));
        const inContent     = (articleContentCache[a.slug] || "").includes(q);
        return inTitle || inDescription || inTags || inContent;
      })
    : articles;

  if (filtered.length === 0) {
    return `<p class="search-empty">Nenhum artigo encontrado.</p>`;
  }

  return `<ul class="article-list">${filtered.map((a) => `
    <li>
      <div class="article-list-main">
        <a href="#" data-article="${a.slug}">${a.title}</a>
        ${a.description ? `<p class="article-description">${a.description}</p>` : ""}
      </div>
      <span>${a.date}</span>
    </li>
  `).join("")}</ul>`;
}

function renderHome() {
  currentView = "home";
  document.title = "Fyregrid";

  app.innerHTML = `
    <section class="home-intro">
      <h1 class="home-title">Fyregrid</h1>
      <p class="home-subtitle">Guias e projetos para desenvolvedores.</p>
    </section>

    <section class="articles-section">
      <h2>Artigos</h2>
      <input
        id="article-search"
        class="article-search"
        type="text"
        placeholder="🔍 Pesquisar"
        autocomplete="off"
      />
      <div id="article-list-container">
        ${renderArticleList()}
      </div>
    </section>
  `;

  document.getElementById("article-search").addEventListener("input", (e) => {
    document.getElementById("article-list-container").innerHTML =
      renderArticleList(e.target.value);
    bindArticleLinks();
  });

  bindArticleLinks();
  preloadArticleContents();
  updateNavActive();
}

// ─── RENDER ARTIGO ────────────────────────────────────────

async function openArticle(slug) {
  currentView = { slug };
  renderLoading();

  const data = await loadMarkdown(`articles/${slug}.md`);
  if (!data) {
    renderNotFound();
    return;
  }

  app.innerHTML = `
    <article class="markdown-body">
      <a href="#" id="back-btn" class="back-link">← Voltar</a>
      ${data.html}
    </article>
  `;

  document.getElementById("back-btn").onclick = (e) => {
    e.preventDefault();
    renderHome();
  };

  if (data.meta.title) document.title = data.meta.title + " | Fyregrid";
  updateNavActive();
  window.scrollTo(0, 0);
}

// ─── ESTADOS AUXILIARES ───────────────────────────────────

function renderNotFound() {
  app.innerHTML = `
    <div class="not-found">
      <p class="not-found-code">404</p>
      <p>Página não encontrada.</p>
      <a href="#" id="back-btn">← Voltar para home</a>
    </div>
  `;
  document.title = "404 | Fyregrid";
  document.getElementById("back-btn").onclick = (e) => {
    e.preventDefault();
    renderHome();
  };
}

function renderLoading() {
  app.innerHTML = `<p class="loading">Carregando…</p>`;
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
      renderHome();
    };
  });
}

function bindArticleLinks() {
  document.querySelectorAll("[data-article]").forEach((el) => {
    el.onclick = (e) => {
      e.preventDefault();
      openArticle(el.getAttribute("data-article"));
    };
  });
}

// ─── INIT ─────────────────────────────────────────────────

bindLinks();

loadArticles().then(() => {
  renderHome();
  renderFooter();
});