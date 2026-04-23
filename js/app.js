// app.js
// Orquestrador central + lógica de artigos/markdown.

// ─── CACHE E ESTADO ───────────────────────────────────────

const articleContentCache = {};
let articles = [];
let currentView = "home";

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

  document.getElementById("app").innerHTML = `
    <article class="markdown-body">
      <a href="/blog/" id="back-btn" class="back-link">← Voltar</a>
      ${data.html}
    </article>
  `;

  document.getElementById("back-btn").onclick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  if (data.meta.title) document.title = data.meta.title + " | grcodev/blog";
  updateNavActive();
  window.scrollTo(0, 0);
}

// ─── FOOTER ───────────────────────────────────────────────

function renderFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-about">
        <span class="footer-brand">Sobre</span>
        <p>Projeto desenvolvido por Guilherme Ribeiro.</p>
        <p><br>🛠️ Documentação de Projetos + JavaScript Boilerplate Kit
        <br><a href="https://grcodev.github.io/boilerplates" target="_blank" rel="noopener">→ Explorar</a></p>
      </div>
      <div class="footer-col">
        <span class="footer-col-title">Contato</span>
        <a href="mailto:topverbs@gmail.com">topverbs@gmail.com</a>
        <a href="https://github.com/grcodev" target="_blank" rel="noopener">github.com/grcodev</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© grcodev/blog</span>
      <a href="/blog/legal" id="footer-legal-link">Privacidade e Termos</a>
    </div>
  `;

  document.getElementById("footer-legal-link").onclick = (e) => {
    e.preventDefault();
    navigate('/legal');
  };
}

// ─── INIT ─────────────────────────────────────────────────

bindLinks();

loadArticles().then(() => {
  initRouter();
  renderFooter();
});