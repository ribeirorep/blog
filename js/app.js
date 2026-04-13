// app.js
// Orquestrador central: inicialização, footer e links globais.

// ─── FOOTER ───────────────────────────────────────────────

function renderFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-about">
        <span class="footer-brand">Sobre</span>
        <p>Projeto desenvolvido por Guilherme Ribeiro.</p>
        <p>↓ Para acessar conteúdo exclusivo: documentos, códigos e projetos
        <br><a href="https://svault.pages.dev" target="_blank" rel="noopener">🔐 Skill Vault</a></p>
      </div>

      <div class="footer-col">
        <span class="footer-col-title">Contato</span>
        <a href="mailto:topverbs@gmail.com">topverbs@gmail.com</a>
        <a href="https://fyregrid.github.io/bio" target="_blank" rel="noopener">fyregrid.github.io/bio</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© Fyregrid</span>
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