import { parseMarkdown } from "../lib/markdown.js"

const posts = [
  { slug: "intro-web", title: "Introdução programação WEB" },
  { slug: "intro-javascript", title: "Introdução JavaScript" },
]

export async function render() {
  const app = document.getElementById("app")

  app.innerHTML = `
    <div class="articles-header">
      <h1>Artigos</h1>
    </div>
    <ul class="post-list">
      ${posts
        .map(
          (p) => `
        <li>
          <a href="#/articles/${p.slug}">
            <span class="post-title">${p.title}</span>
            <span class="post-slug">${p.slug}</span>
          </a>
        </li>`
        )
        .join("")}
    </ul>
    <div id="article-view"></div>
  `

  const match = location.hash.match(/#\/articles\/(.+)/)

  if (match) {
    const slug = match[1]
    loadArticle(slug)
  } else {
    document.getElementById("article-view").innerHTML =
      `<p class="article-placeholder">© Cubelog<br>Desenvolvido por Guilherme Ribeiro</p>`
  }
}

async function loadArticle(slug) {
  const container = document.getElementById("article-view")
  container.innerHTML = `<p class="loading">Loading...</p>`

  try {
    const res = await fetch(`/articles/${slug}.md`)
    if (!res.ok) throw new Error()

    const md = await res.text()
    container.innerHTML = parseMarkdown(md)
  } catch {
    container.innerHTML = `<p class="article-placeholder">Article not found.</p>`
  }
}