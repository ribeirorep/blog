// config.js
// Configuração central do blog. Edite aqui para personalizar.

// ─── BASE URL ─────────────────────────────────────────────

const BASE = location.hostname === '127.0.0.1' || location.hostname === 'localhost'
  ? ''
  : '/lab';

// ─── CONFIG ───────────────────────────────────────────────

const CONFIG = {
  siteName:  "grcodev/lab",
  author:    "Guilherme Ribeiro",
  email:     "topverbs@gmail.com",
  github:    "https://github.com/grcodev",
  icon:      `${BASE}/lab_icon.jpeg`,

  products: [
    {
      icon:  "🛠️",
      title: "JavaScript Boilerplate Kit + Documentação + README",
      slug:  "kitjs",
    },
    {
      icon:  "📘",
      title: "EBOOK Manual/Tutorial Completo Git & Visual Studio Code",
      slug:  "gitbook",
    },
       {
      icon:  "📕",
      title: "Aprenda a criar Livros/EBooks profissionais usando Markdown + Pandoc",
      slug:  "mdbook",
    },
  ],
};