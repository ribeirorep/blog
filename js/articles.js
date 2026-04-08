// articles.js
// Responsável por: carregar articles.json, cache de conteúdo,
// parser de frontmatter, loader de markdown e render de artigo.

// BASE já declarado em router.js — não redeclarar aqui
const articleContentCache = {};
let articles = [];

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
    const res = await fetch(BASE + "/data/articles.json");
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
        const res = await fetch(BASE + `/articles/${a.slug}.md`);
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

// ─── RENDER ARTIGO ────────────────────────────────────────

async function openArticle(slug) {
  currentView = { slug };
  renderLoading();

  const data = await loadMarkdown(BASE + `/articles/${slug}.md`);
  if (!data) {
    renderNotFound();
    return;
  }

  app.innerHTML = `
    <article class="markdown-body">
      <a href="/blog/" id="back-btn" class="back-link">← Voltar</a>
      ${data.html}
    </article>
  `;

  document.getElementById("back-btn").onclick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  if (data.meta.title) document.title = data.meta.title + " | Fyregrid";
  updateNavActive();
  window.scrollTo(0, 0);
}