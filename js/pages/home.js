// pages/home.js
// Responsável por: render da home e lista de artigos com busca.

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
        <a href="/blog/post/${a.slug}" data-article="${a.slug}">${a.title}</a>
        ${a.description ? `<p class="article-description">${a.description}</p>` : ""}
      </div>
      <span>${a.date}</span>
    </li>
  `).join("")}</ul>`;
}

function renderHome() {
  currentView = "home";
  document.title = "grcodev/blog";

  document.getElementById("app").innerHTML = `
    <section class="home-intro">
      <h1 class="home-title">grcodev/blog</h1>
      <p class="home-subtitle">#blog #dev #games</p>
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