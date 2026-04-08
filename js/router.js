// router.js

const BASE = location.hostname === '127.0.0.1' || location.hostname === 'localhost'
  ? ''
  : '/blog';

// ─── NAVIGATE ────────────────────────────────────────────

function navigate(path, { replace = false } = {}) {
  if (replace) {
    history.replaceState({}, '', BASE + path);
  } else {
    history.pushState({}, '', BASE + path);
  }
  resolveRoute(path);
}

// ─── RESOLVE ROUTE ────────────────────────────────────────

function resolveRoute(path) {
  if (!path || path === '' || path === '/index.html') path = '/';
  if (!path.startsWith('/')) path = '/' + path;
  if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1);

  if (path === '/') {
    renderHome();
    return;
  }

  if (path.startsWith('/post/')) {
    const slug = path.slice('/post/'.length);
    if (slug) {
      openArticle(slug);
      return;
    }
  }

  if (path === '/legal') {
    showLegal();
    return;
  }

  renderNotFound();
}

// ─── EXTRAI PATH DA URL ATUAL ─────────────────────────────

function currentPath() {
  let path = location.pathname;
  if (BASE && path.startsWith(BASE + '/')) {
    path = path.slice(BASE.length);
  } else if (BASE && path === BASE) {
    path = '/';
  }
  // Trata acesso direto ao index.html
  if (path === '/index.html') path = '/';
  return path || '/';
}

// ─── INIT ─────────────────────────────────────────────────

function initRouter() {
  const params = new URLSearchParams(location.search);
  const redirectPath = params.get('path');

  if (redirectPath) {
    navigate(redirectPath, { replace: true });
  } else {
    resolveRoute(currentPath());
  }

  window.addEventListener('popstate', () => {
    resolveRoute(currentPath());
  });
}