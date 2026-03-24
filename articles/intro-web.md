# Introdução à Programação Web

A web como conhecemos hoje é resultado de décadas de evolução técnica, decisões de design e uma filosofia de abertura que permitiu que qualquer pessoa com um navegador pudesse acessar — e eventualmente criar — conteúdo para o mundo inteiro.

Este post é um ponto de partida. Não cobre tudo, mas organiza o essencial para quem quer entender como a web funciona antes de sair escrevendo código.

---

## Como a web funciona

Quando você digita um endereço no navegador, uma série de eventos acontece em frações de segundo. O navegador consulta um servidor DNS para traduzir o domínio em um endereço IP, estabelece uma conexão com o servidor via TCP/IP, e faz uma requisição HTTP. O servidor responde com um arquivo HTML, que o navegador interpreta e renderiza como página.

Esse ciclo — requisição e resposta — é a base de tudo na web. Entender isso antes de escrever qualquer linha de código muda a forma como você pensa sobre o que está construindo.

## As três camadas do frontend

Todo projeto web frontend é composto por três tecnologias que trabalham juntas com responsabilidades distintas.

**HTML** define a estrutura e o significado do conteúdo. É uma linguagem de marcação, não de programação. Um parágrafo é um parágrafo, um título é um título, um link é um link. A escolha correta das tags — o que se chama de HTML semântico — impacta acessibilidade, SEO e manutenção.

**CSS** controla a apresentação visual. Cores, tipografia, espaçamento, layout, responsividade. O CSS moderno, com Flexbox e Grid, resolveu problemas de layout que por anos exigiram gambiarras. Hoje é uma linguagem poderosa e expressiva.

**JavaScript** adiciona comportamento. É a única linguagem de programação nativa dos navegadores. Manipula o DOM, responde a eventos do usuário, faz requisições a APIs, atualiza a página sem recarregar. É o que transforma documentos estáticos em aplicações interativas.

## O que é o DOM

DOM significa Document Object Model. É a representação do HTML em memória, organizada como uma árvore de nós. Quando o JavaScript "acessa" uma página — lê um valor, muda um estilo, adiciona um elemento — está manipulando o DOM.

Entender o DOM é entender o que acontece entre o HTML que você escreve e o que o navegador exibe.

## Ferramentas básicas

Antes de qualquer framework ou ferramenta avançada, três coisas são suficientes para começar:

Um editor de código. VSCode é o mais usado hoje, com suporte a extensões, terminal integrado e excelente suporte a JavaScript e TypeScript.

Um navegador com DevTools. Chrome e Firefox têm ferramentas de desenvolvimento robustas — inspetor de elementos, console, monitor de rede, debugger. Aprender a usar o DevTools é tão importante quanto aprender a escrever código.

Git para controle de versão. Desde o primeiro projeto, vale versionar. Git registra o histórico de mudanças, permite reverter erros e é o padrão da indústria para colaboração.

## HTTP e APIs

HTTP é o protocolo de comunicação da web. Toda requisição tem um método — GET para buscar dados, POST para enviar, PUT para atualizar, DELETE para remover — e toda resposta tem um status code. 200 significa sucesso, 404 recurso não encontrado, 500 erro no servidor.

APIs REST usam esses verbos e status codes para criar interfaces de comunicação entre sistemas. Quando um frontend busca dados de um backend, ou integra um serviço externo, está fazendo requisições HTTP para uma API.

## Hosting e deploy

Escrever código localmente é só metade do trabalho. Publicar um projeto na web envolve escolher onde hospedar, configurar um domínio e entender o processo de deploy.

Para projetos estáticos — HTML, CSS e JavaScript sem backend — serviços como Vercel, Netlify e GitHub Pages oferecem deploy gratuito conectado a um repositório Git. Cada push na branch principal atualiza o site automaticamente.

---

## Referências

- [MDN Web Docs](https://developer.mozilla.org) — documentação de referência para HTML, CSS e JavaScript. Mantida pela Mozilla, é o recurso mais completo e confiável disponível.
- [web.dev](https://web.dev) — guias e boas práticas publicados pela equipe do Chrome. Cobre performance, acessibilidade, SEO e muito mais.
- [The Odin Project](https://www.theodinproject.com) — currículo open source de desenvolvimento web, do zero ao emprego. Project-based e gratuito.
- [CS50W — Web Programming with Python and JavaScript](https://cs50.harvard.edu/web) — curso gratuito de Harvard. Cobre HTML, CSS, JavaScript, Git, SQL e Django.
- [HTTP: The Definitive Guide](https://www.oreilly.com/library/view/http-the-definitive/1565925092/) — referência completa sobre o protocolo HTTP.
- [W3C — World Wide Web Consortium](https://www.w3.org) — organização que mantém os padrões da web.