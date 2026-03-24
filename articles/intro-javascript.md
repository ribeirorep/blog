# JavaScript: Uma Introdução

JavaScript é a linguagem de programação da web. É executada diretamente no navegador, sem instalação, sem compilação visível ao usuário — e hoje também roda no servidor, em dispositivos embarcados e em aplicações desktop. De todas as linguagens criadas nos anos 90, é a única que se tornou onipresente.

---

## Origem e história

Em 1995, a Netscape Communications domina o mercado de navegadores com o Netscape Navigator. A web é estática — páginas HTML sem interatividade, sem validação de formulários no cliente, sem nenhum comportamento dinâmico.

Brendan Eich, contratado pela Netscape, recebe a tarefa de criar uma linguagem de script para o navegador. O prazo é dez dias. O resultado é o Mocha, renomeado para LiveScript e logo depois para JavaScript — uma decisão de marketing para aproveitar a popularidade do Java da Sun Microsystems, com quem a Netscape tinha parceria. As duas linguagens não têm relação técnica.

Em 1996, a Microsoft lança o JScript, sua própria implementação para o Internet Explorer. A fragmentação começa. Páginas funcionam em um navegador e quebram em outro. Desenvolvedores passam anos lidando com incompatibilidades.

Para resolver isso, a Netscape submete o JavaScript à Ecma International, uma organização de padronização. Em 1997 nasce o ECMAScript, o padrão oficial da linguagem. JavaScript é a implementação mais conhecida desse padrão.

## A era do caos e o renascimento

Durante anos, o JavaScript é visto como uma linguagem de segunda categoria — usada para animações frívolas e popups irritantes. O desenvolvimento é lento, a padronização fragmentada, e o suporte entre navegadores é inconsistente.

Em 2005, Jesse James Garrett publica o artigo que cunha o termo Ajax — Asynchronous JavaScript and XML. A ideia de atualizar partes de uma página sem recarregar completamente não era nova, mas o artigo catalisa uma mudança de percepção. O Gmail e o Google Maps, lançados no mesmo período, demonstram o que é possível.

Em 2006, John Resig lança o jQuery. Uma biblioteca que abstrai as diferenças entre navegadores com uma API limpa. `$(selector)` vira a forma mais comum de interagir com o DOM por quase uma década.

Em 2008, o Google lança o Chrome com o V8, um engine JavaScript de alta performance baseado em compilação JIT. A velocidade de execução aumenta drasticamente. A linguagem começa a ser levada a sério.

Em 2009, Ryan Dahl cria o Node.js — JavaScript fora do navegador, rodando no servidor com o V8. O mesmo código, a mesma linguagem, no cliente e no servidor. O ecossistema explode.

Em 2015, o ECMAScript 2015 — também chamado de ES6 — é publicado. É a maior atualização da linguagem desde sua criação. Arrow functions, classes, módulos, promises, destructuring, template literals, let e const. O JavaScript moderno começa aqui.

## Conceitos fundamentais

### Tipagem dinâmica

JavaScript é dinamicamente tipado. Uma variável não tem tipo fixo — o tipo é determinado pelo valor que ela carrega em um dado momento.

```js
let valor = 42
valor = "agora sou uma string"
valor = true
```

Isso oferece flexibilidade, mas exige atenção. Erros de tipo só aparecem em tempo de execução, não em tempo de compilação. É um dos motivos pelo qual o TypeScript ganhou tanta adoção.

### Funções como valores

Em JavaScript, funções são cidadãos de primeira classe. Podem ser atribuídas a variáveis, passadas como argumentos e retornadas de outras funções.

```js
function saudacao(nome) {
  return `Olá, ${nome}`
}

const executar = (fn, argumento) => fn(argumento)
executar(saudacao, "mundo") // "Olá, mundo"
```

Esse comportamento é a base de padrões como callbacks, higher-order functions e programação funcional em JavaScript.

### Closures

Uma closure é uma função que mantém acesso às variáveis do escopo onde foi criada, mesmo depois que esse escopo encerrou.

```js
function contador() {
  let contagem = 0
  return function () {
    contagem++
    return contagem
  }
}

const incrementar = contador()
incrementar() // 1
incrementar() // 2
incrementar() // 3
```

A função retornada "fecha sobre" a variável `contagem`. Closures são usadas para encapsular estado, criar funções de fábrica e implementar o padrão de módulo.

### O Event Loop

JavaScript é single-threaded — executa uma operação por vez. O que permite lidar com operações assíncronas sem travar é o event loop.

Quando uma operação demorada é iniciada — uma requisição de rede, um timer, uma leitura de arquivo — ela é delegada ao ambiente (o navegador ou o Node.js). O JavaScript continua executando o restante do código. Quando a operação termina, seu callback é colocado na fila de eventos e executado quando a call stack estiver vazia.

Entender o event loop é entender por que código assíncrono se comporta da forma que se comporta.

### Promises e async/await

Promises representam um valor que pode estar disponível agora, no futuro ou nunca. São a base do modelo assíncrono moderno do JavaScript.

```js
fetch("https://api.exemplo.com/dados")
  .then(response => response.json())
  .then(dados => console.log(dados))
  .catch(erro => console.error(erro))
```

A sintaxe `async/await`, introduzida no ES2017, é uma camada sobre promises que permite escrever código assíncrono com aparência síncrona.

```js
async function buscarDados() {
  try {
    const response = await fetch("https://api.exemplo.com/dados")
    const dados = await response.json()
    console.log(dados)
  } catch (erro) {
    console.error(erro)
  }
}
```

### Módulos ES6

O sistema de módulos nativo permite dividir o código em arquivos com escopos isolados.

```js
// math.js
export function somar(a, b) {
  return a + b
}

// main.js
import { somar } from "./math.js"
somar(2, 3) // 5
```

Módulos são a base de qualquer projeto JavaScript com mais de um arquivo. Cada módulo tem seu próprio escopo — variáveis não vazam para o escopo global.

## O ecossistema hoje

O npm — Node Package Manager — é o maior repositório de pacotes de software do mundo. Com um comando é possível instalar bibliotecas para qualquer finalidade imaginável.

Frameworks como React, Vue e Svelte dominam o desenvolvimento de interfaces. Cada um tem suas opiniões sobre como organizar componentes, gerenciar estado e lidar com reatividade.

TypeScript, desenvolvido pela Microsoft, adiciona tipagem estática ao JavaScript. É um superset — todo JavaScript válido é TypeScript válido. O compilador aponta erros antes da execução e o editor consegue oferecer autocompletar preciso. Em projetos de médio e grande porte, virou o padrão.

---

## Referências

- [MDN — JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) — documentação completa da linguagem, com referência de todas as APIs e guias conceituais.
- [javascript.info](https://javascript.info) — tutorial moderno e completo, do básico ao avançado. Um dos melhores recursos gratuitos disponíveis.
- [ECMAScript specification](https://tc39.es/ecma262/) — o padrão oficial da linguagem, mantido pelo TC39.
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS) — série de livros gratuitos de Kyle Simpson. Cobre os mecanismos internos da linguagem com profundidade.
- [Node.js](https://nodejs.org) — runtime JavaScript fora do navegador.
- [TypeScript](https://www.typescriptlang.org) — superset tipado do JavaScript.
- [V8 — JavaScript Engine](https://v8.dev) — engine criada pelo Google, usada no Chrome e no Node.js.