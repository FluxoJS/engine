import { cores, alinhamentos, fontes } from "./utils/padroes.js";
import { anexar, normalizar } from "./utils/interno.js";

const LARGURA_CLASS = "engine-largura";
const RESPONSIVO_STYLE_ID = "engine-responsivo-largura";

let tituloAutomaticoDefinido = false;
let tituloExplicitoDefinido = false;

/**
 * Conjunto de métodos de estilo retornado pelos criadores da Fluxo.
 * Todos os métodos devolvem o mesmo objeto, para permitir encadeamento.
 * @typedef {Object} FerramentasEngine
 * @property {HTMLElement} elemento Elemento HTML que foi criado.
 * @property {(valor: string) => FerramentasEngine} cor Aplica a cor do texto.
 * @property {(valor: string) => FerramentasEngine} fonte Aplica a fonte.
 * @property {(valor: number | string) => FerramentasEngine} tamanho Aplica o tamanho do texto.
 * @property {(ativo?: boolean) => FerramentasEngine} negrito Ativa ou desativa o negrito.
 * @property {(ativo?: boolean) => FerramentasEngine} italico Ativa ou desativa o itálico.
 * @property {(ativo?: boolean) => FerramentasEngine} sublinhado Ativa ou desativa o sublinhado.
 * @property {(ativo?: boolean) => FerramentasEngine} tachado Ativa ou desativa o texto tachado.
 * @property {() => FerramentasEngine} maiusculo Transforma o texto em letras maiúsculas.
 * @property {() => FerramentasEngine} minusculo Transforma o texto em letras minúsculas.
 * @property {() => FerramentasEngine} capitalizar Faz a primeira letra de cada palavra ficar maiúscula.
 * @property {(valor: number | string) => FerramentasEngine} espacoLetras Ajusta o espaçamento entre letras.
 * @property {(valor: number | string) => FerramentasEngine} alturaLinha Ajusta a altura da linha.
 * @property {(posicao: string) => FerramentasEngine} alinhar Alinha o conteúdo.
 * @property {(valor: string) => FerramentasEngine} fundo Aplica a cor de fundo.
 * @property {(valor: number | string) => FerramentasEngine} largura Define a largura do elemento.
 * @property {(valor: number | string) => FerramentasEngine} margem Define a margem do elemento em todos os lados.
 * @property {(valor: number | string) => FerramentasEngine} margemVertical Define a margem superior e inferior do elemento.
 * @property {(valor: number | string) => FerramentasEngine} margemHorizontal Define a margem esquerda e direita do elemento.
 * @property {(valor: number | string) => FerramentasEngine} espacamento Define o espaçamento interno do elemento em todos os lados.
 * @property {(valor: number | string) => FerramentasEngine} espacamentoVertical Define o espaçamento interno superior e inferior do elemento.
 * @property {(valor: number | string) => FerramentasEngine} espacamentoHorizontal Define o espaçamento interno esquerdo e direito do elemento.
 * @property {(valor: number | string) => FerramentasEngine} padding Alias de compatibilidade para espacamento.
 * @property {(valor: number | string) => FerramentasEngine} paddingVertical Alias de compatibilidade para espacamentoVertical.
 * @property {(valor: number | string) => FerramentasEngine} paddingHorizontal Alias de compatibilidade para espacamentoHorizontal.
 * @property {(texto: string, href: string, onde?: HTMLElement | null) => FerramentasEngine} link Cria um link clicável.
 */

const resolverAlvo = (onde) => {
  if (onde && typeof onde === 'object' && 'elemento' in onde) {
    return onde.elemento;
  }

  return onde || document.body;
};

const aplicarFonte = (alvo, valor) => {
  const nomeLimpo = normalizar(valor);
  alvo.style.fontFamily = fontes[nomeLimpo] || valor;
  return alvo;
};

const aplicarLargura = (alvo, valor) => {
  if (typeof valor === 'number') {
    alvo.style.width = valor + '%';
  } else {
    alvo.style.width = valor;
  }
  alvo.style.margin = '0 auto';
  alvo.classList.add(LARGURA_CLASS);
  return alvo;
};

const aplicarFundo = (alvo, valor) => {
  alvo.style.backgroundColor = cores[normalizar(valor)] || valor;
  return alvo;
}

const normalizarEspaco = (valor) => typeof valor === 'number' ? valor + 'px' : valor;

const aplicarMargem = (alvo, valor) => {
  alvo.style.margin = normalizarEspaco(valor);
  return alvo;
};

const aplicarMargemVertical = (alvo, valor) => {
  const espaco = normalizarEspaco(valor);
  alvo.style.marginTop = espaco;
  alvo.style.marginBottom = espaco;
  return alvo;
};

const aplicarMargemHorizontal = (alvo, valor) => {
  const espaco = normalizarEspaco(valor);
  alvo.style.marginLeft = espaco;
  alvo.style.marginRight = espaco;
  return alvo;
};

const aplicarEspacamento = (alvo, valor) => {
  alvo.style.padding = normalizarEspaco(valor);
  return alvo;
};

const aplicarEspacamentoVertical = (alvo, valor) => {
  const espaco = normalizarEspaco(valor);
  alvo.style.paddingTop = espaco;
  alvo.style.paddingBottom = espaco;
  return alvo;
};

const aplicarEspacamentoHorizontal = (alvo, valor) => {
  const espaco = normalizarEspaco(valor);
  alvo.style.paddingLeft = espaco;
  alvo.style.paddingRight = espaco;
  return alvo;
};

const sincronizarTituloPagina = (texto, forcar = false) => {
  if (!forcar && (tituloExplicitoDefinido || tituloAutomaticoDefinido)) {
    return;
  }

  document.title = String(texto ?? '');
  if (forcar) {
    tituloExplicitoDefinido = true;
    return;
  }

  tituloAutomaticoDefinido = true;
};

const criarFerramentas = (el) => {
  /** @type {FerramentasEngine} */
  const ferramentas = {
    elemento: el,
    cor: (valor) => {
      el.style.color = cores[normalizar(valor)] || valor;
      return ferramentas;
    },
    fonte: (valor) => {
      aplicarFonte(el, valor);
      return ferramentas;
    },
    tamanho: (valor) => {
      el.style.fontSize = typeof valor === 'number' ? valor + 'px' : valor;
      return ferramentas;
    },
    negrito: (ativo = true) => {
      el.style.fontWeight = ativo ? 'bold' : 'normal';
      return ferramentas;
    },
    italico: (ativo = true) => {
      el.style.fontStyle = ativo ? 'italic' : 'normal';
      return ferramentas;
    },
    sublinhado: (ativo = true) => {
      el.style.textDecoration = ativo ? 'underline' : 'none';
      return ferramentas;
    },
    tachado: (ativo = true) => {
      el.style.textDecoration = ativo ? 'line-through' : 'none';
      return ferramentas;
    },
    maiusculo: () => {
      el.style.textTransform = 'uppercase';
      return ferramentas;
    },
    minusculo: () => {
      el.style.textTransform = 'lowercase';
      return ferramentas;
    },
    capitalizar: () => {
      el.style.textTransform = 'capitalize';
      return ferramentas;
    },
    espacoLetras: (valor) => {
      el.style.letterSpacing = typeof valor === 'number' ? valor + 'px' : valor;
      return ferramentas;
    },
    alturaLinha: (valor) => {
      el.style.lineHeight = typeof valor === 'number' ? String(valor) : valor;
      return ferramentas;
    },
    alinhar: (posicao) => {
      el.style.textAlign = alinhamentos[normalizar(posicao)] || posicao;
      return ferramentas;
    },
    fundo: (valor) => {
      aplicarFundo(el, valor);
      return ferramentas;
    },
    largura: (valor) => {
      aplicarLargura(el, valor);
      return ferramentas;
    },
    margem: (valor) => {
      aplicarMargem(el, valor);
      return ferramentas;
    },
    margemVertical: (valor) => {
      aplicarMargemVertical(el, valor);
      return ferramentas;
    },
    margemHorizontal: (valor) => {
      aplicarMargemHorizontal(el, valor);
      return ferramentas;
    },
    espacamento: (valor) => {
      aplicarEspacamento(el, valor);
      return ferramentas;
    },
    espacamentoVertical: (valor) => {
      aplicarEspacamentoVertical(el, valor);
      return ferramentas;
    },
    espacamentoHorizontal: (valor) => {
      aplicarEspacamentoHorizontal(el, valor);
      return ferramentas;
    },
  };
  return ferramentas;
};

const criarCabecalho = (nivel, texto, onde) => {
  const nivelValido = Math.min(6, Math.max(1, Number(nivel) || 1));
  sincronizarTituloPagina(texto);
  const el = document.createElement(`h${nivelValido}`);
  el.innerText = texto;
  anexar(el, onde);
  return criarFerramentas(el);
};

/**
 * Cria um título grande em forma de <h1>.
 *
 * O primeiro título ou cabeçalho criado também define o document.title,
 * a menos que o usuário tenha chamado tituloPagina() explicitamente antes.
 *
 * @param {string} texto Texto que será mostrado no título.
 * @param {HTMLElement | null} [onde] Elemento que vai receber o título. Se não informar, usa o body.
 * @returns {FerramentasEngine} Objeto com comandos para continuar estilizando o título.
 */
export const titulo = (texto, onde) => {
  return criarCabecalho(1, texto, onde);
};

/**
 * Cria um cabeçalho nativo do HTML com nível de 1 a 6.
 *
 * Use 1 para o título mais forte da página, 2 para seções e 3 a 6 para divisões menores.
 * O navegador aplica o estilo visual padrão do heading, sem tamanhos hardcoded pela Fluxo.
 * O primeiro cabeçalho criado também define o document.title, a menos que tituloPagina()
 * já tenha sido chamado explicitamente.
 *
 * @param {number} nivel Número do cabeçalho, de 1 a 6.
 * @param {string} texto Texto que será mostrado no cabeçalho.
 * @param {HTMLElement | null} [onde] Elemento que vai receber o cabeçalho. Se não informar, usa o body.
 * @returns {FerramentasEngine} Objeto com comandos para continuar estilizando o cabeçalho.
 */
export const cabecalho = (nivel, texto, onde) => criarCabecalho(Number(nivel), texto, onde);

/** Alias de {@link cabecalho}. */
export const heading = cabecalho;

/** Cabeçalho de nível 1. */
export const h1 = (texto, onde) => criarCabecalho(1, texto, onde);
/** Cabeçalho de nível 2. */
export const h2 = (texto, onde) => criarCabecalho(2, texto, onde);
/** Cabeçalho de nível 3. */
export const h3 = (texto, onde) => criarCabecalho(3, texto, onde);
/** Cabeçalho de nível 4. */
export const h4 = (texto, onde) => criarCabecalho(4, texto, onde);
/** Cabeçalho de nível 5. */
export const h5 = (texto, onde) => criarCabecalho(5, texto, onde);
/** Cabeçalho de nível 6. */
export const h6 = (texto, onde) => criarCabecalho(6, texto, onde);

/**
 * Define o título da aba do navegador de forma explícita.
 *
 * Depois de usar esta função, a EngineJS para de trocar o document.title
 * automaticamente quando novos títulos ou cabeçalhos forem criados.
 *
 * @param {string} texto Título que deve aparecer na aba do navegador.
 * @returns {string} O valor definido em document.title.
 */
export const tituloPagina = (texto) => {
  sincronizarTituloPagina(texto, true);
  return document.title;
};

/**
 * Cria um bloco de texto em forma de <p>.
 *
 * Use quando quiser escrever frases, explicações, parágrafos ou conteúdo longo.
 *
 * @param {string} conteudo Texto que será exibido na página.
 * @param {HTMLElement | null} [onde] Elemento que vai receber o texto. Se não informar, usa o body.
 * @returns {FerramentasEngine} Objeto com comandos para continuar estilizando o texto.
 */
export const texto = (conteudo, onde) => {
  const el = document.createElement('p');
  el.innerText = conteudo;
  anexar(el, onde);
  Object.assign(el.style, {
    whiteSpace: 'pre-wrap'
  });
  return criarFerramentas(el);
};

/**
 * Cria um botão clicável.
 *
 * @param {string} rotulo Texto que aparece no botão.
 * @param {() => void} [acao] Função executada quando o botão é clicado.
 * @param {HTMLElement | null} [onde] Elemento que vai receber o botão. Se não informar, usa o body.
 * @returns {FerramentasEngine} Objeto com comandos para continuar estilizando o botão.
 */
export const botao = (rotulo, acao, onde) => {
  const el = document.createElement('button');
  el.innerText = rotulo;
  el.onclick = acao;
  el.type = "button";
  anexar(el, onde);
  return criarFerramentas(el);
};

const normalizarItensLista = (itens) => {
  if (Array.isArray(itens)) {
    return itens;
  }

  if (typeof itens === 'string') {
    // Permite escrever lista em bloco de texto com uma linha por item.
    return itens
      .split(/\r?\n/)
      .map((item) => item.replace(/^\s*[-*]\s*/, '').trim())
      .filter((item) => item.length > 0);
  }

  return [itens];
};

const criarLista = (itens, onde, ordenada = false) => {
  const el = document.createElement(ordenada ? 'ol' : 'ul');
  const valores = normalizarItensLista(itens);

  valores.forEach((item) => {
    const li = document.createElement('li');
    li.innerText = String(item ?? '');
    el.appendChild(li);
  });

  anexar(el, onde);
  return criarFerramentas(el);
};

/**
 * Cria um link clicável em forma de <a>.
 *
 * Use para montar índices, atalhos de navegação ou links comuns para outras páginas.
 *
 * @param {string} texto Texto visível do link.
 * @param {string} href Destino do link, como "#secao" ou "https://exemplo.com".
 * @param {HTMLElement | null} [onde] Elemento que vai receber o link. Se não informar, usa o body.
 * @returns {FerramentasEngine} Objeto com comandos para continuar estilizando o link.
 */
export const link = (texto, href, onde) => {
  const el = document.createElement('a');
  el.innerText = texto;
  el.href = href;
  el.style.display = 'inline-block';
  el.style.textDecoration = 'underline';
  el.style.cursor = 'pointer';
  anexar(el, onde);
  return criarFerramentas(el);
};

/**
 * Cria uma lista com marcadores.
 *
 * A função aceita um array com itens ou um texto com uma linha por item.
 *
 * @param {Array<string | number | boolean | null | undefined> | string | number | boolean | null | undefined} itens Conteúdo da lista.
 * @param {HTMLElement | null} [onde] Elemento que vai receber a lista. Se não informar, usa o body.
 * @returns {FerramentasEngine} Objeto com comandos para continuar estilizando a lista.
 */
export const lista = (itens, onde) => criarLista(itens, onde, false);

/**
 * Cria uma lista numerada.
 *
 * A função aceita um array com itens ou um texto com uma linha por item.
 *
 * @param {Array<string | number | boolean | null | undefined> | string | number | boolean | null | undefined} itens Conteúdo da lista.
 * @param {HTMLElement | null} [onde] Elemento que vai receber a lista. Se não informar, usa o body.
 * @returns {FerramentasEngine} Objeto com comandos para continuar estilizando a lista.
 */
export const listaOrdenada = (itens, onde) => criarLista(itens, onde, true);

/**
 * Cria um container horizontal para organizar elementos lado a lado.
 *
 * @param {HTMLElement | null} [onde] Elemento que vai receber o container. Se não informar, usa o body.
 * @returns {FerramentasEngine} Objeto com comandos para continuar estilizando o container.
 */
export const linha = (onde) => {
  const el = document.createElement('div');
  Object.assign(el.style, {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '10px 0'
  });
  anexar(el, onde);
  return criarFerramentas(el);
};

/**
 * Define a largura de um elemento ou da página inteira.
 *
 * Se receber um número, a largura é tratada como porcentagem.
 * Se receber uma string, o valor é usado como CSS puro, por exemplo "420px" ou "32rem".
 *
 * @param {number | string} valor Largura desejada.
 * @param {HTMLElement | null} [onde] Elemento que vai receber a largura. Se não informar, usa o body.
 * @returns {FerramentasEngine} Objeto com comandos para continuar estilizando o elemento.
 */
export const largura = (valor, onde) => {
  const alvo = resolverAlvo(onde);
  aplicarLargura(alvo, valor);
  return criarFerramentas(alvo);
};

/**
 * Define a fonte de um elemento ou da página inteira.
 *
 * Você pode usar um nome pronto da Fluxo, como "sistema" ou "maquina",
 * ou passar qualquer valor válido de CSS para font-family.
 *
 * @param {string} valor Fonte desejada.
 * @param {HTMLElement | null} [onde] Elemento que vai receber a fonte. Se não informar, usa o body.
 * @returns {FerramentasEngine} Objeto com comandos para continuar estilizando o elemento.
 */
export const fonte = (valor, onde) => {
  const alvo = resolverAlvo(onde);
  aplicarFonte(alvo, valor);
  return criarFerramentas(alvo);
};

/**
 * Define a cor de fundo de um elemento ou da página inteira.
 *
 * Você pode usar um nome pronto da Fluxo, como "bege" ou "cinza claro",
 * ou passar qualquer valor válido de CSS para background-color.
 *
 * @param {string} valor Cor de fundo desejada.
 * @param {HTMLElement | null} [onde] Elemento que vai receber a cor de fundo. Se não informar, usa o body.
 * @returns {FerramentasEngine} Objeto com comandos para continuar estilizando o elemento.
 */
export const fundo = (valor, onde) => {
  const alvo = resolverAlvo(onde);
  aplicarFundo(alvo, valor);
  return criarFerramentas(alvo);
};

/**
 * Define a margem de um elemento ou da página inteira em todos os lados.
 *
 * Se receber um número, o valor é convertido para pixels.
 * Se receber uma string, o valor é usado como CSS puro, por exemplo "1rem" ou "8%".
 *
 * @param {number | string} valor Margem desejada.
 * @param {HTMLElement | null} [onde] Elemento que vai receber a margem. Se não informar, usa o body.
 * @returns {FerramentasEngine} Objeto com comandos para continuar estilizando o elemento.
 */
export const margem = (valor, onde) => {
  const alvo = resolverAlvo(onde);
  aplicarMargem(alvo, valor);
  return criarFerramentas(alvo);
};

/**
 * Define a margem vertical (topo e base) de um elemento ou da página inteira.
 *
 * Se receber um número, o valor é convertido para pixels.
 * Se receber uma string, o valor é usado como CSS puro, por exemplo "1rem" ou "8%".
 *
 * @param {number | string} valor Margem vertical desejada.
 * @param {HTMLElement | null} [onde] Elemento que vai receber a margem. Se não informar, usa o body.
 * @returns {FerramentasEngine} Objeto com comandos para continuar estilizando o elemento.
 */
export const margemVertical = (valor, onde) => {
  const alvo = resolverAlvo(onde);
  aplicarMargemVertical(alvo, valor);
  return criarFerramentas(alvo);
};

/**
 * Define a margem horizontal (esquerda e direita) de um elemento ou da página inteira.
 *
 * Se receber um número, o valor é convertido para pixels.
 * Se receber uma string, o valor é usado como CSS puro, por exemplo "1rem" ou "8%".
 *
 * @param {number | string} valor Margem horizontal desejada.
 * @param {HTMLElement | null} [onde] Elemento que vai receber a margem. Se não informar, usa o body.
 * @returns {FerramentasEngine} Objeto com comandos para continuar estilizando o elemento.
 */
export const margemHorizontal = (valor, onde) => {
  const alvo = resolverAlvo(onde);
  aplicarMargemHorizontal(alvo, valor);
  return criarFerramentas(alvo);
};

/**
 * Define o espaçamento interno de um elemento ou da página inteira em todos os lados.
 *
 * Se receber um número, o valor é convertido para pixels.
 * Se receber uma string, o valor é usado como CSS puro, por exemplo "1rem" ou "8%".
 *
 * @param {number | string} valor Espaçamento interno desejado.
 * @param {HTMLElement | null} [onde] Elemento que vai receber o espaçamento. Se não informar, usa o body.
 * @returns {FerramentasEngine} Objeto com comandos para continuar estilizando o elemento.
 */
export const espacamento = (valor, onde) => {
  const alvo = resolverAlvo(onde);
  aplicarEspacamento(alvo, valor);
  return criarFerramentas(alvo);
};

/**
 * Define o espaçamento interno vertical (topo e base) de um elemento ou da página inteira.
 *
 * Se receber um número, o valor é convertido para pixels.
 * Se receber uma string, o valor é usado como CSS puro, por exemplo "1rem" ou "8%".
 *
 * @param {number | string} valor Espaçamento interno vertical desejado.
 * @param {HTMLElement | null} [onde] Elemento que vai receber o espaçamento. Se não informar, usa o body.
 * @returns {FerramentasEngine} Objeto com comandos para continuar estilizando o elemento.
 */
export const espacamentoVertical = (valor, onde) => {
  const alvo = resolverAlvo(onde);
  aplicarEspacamentoVertical(alvo, valor);
  return criarFerramentas(alvo);
};

/**
 * Define o espaçamento interno horizontal (esquerda e direita) de um elemento ou da página inteira.
 *
 * Se receber um número, o valor é convertido para pixels.
 * Se receber uma string, o valor é usado como CSS puro, por exemplo "1rem" ou "8%".
 *
 * @param {number | string} valor Espaçamento interno horizontal desejado.
 * @param {HTMLElement | null} [onde] Elemento que vai receber o espaçamento. Se não informar, usa o body.
 * @returns {FerramentasEngine} Objeto com comandos para continuar estilizando o elemento.
 */
export const espacamentoHorizontal = (valor, onde) => {
  const alvo = resolverAlvo(onde);
  aplicarEspacamentoHorizontal(alvo, valor);
  return criarFerramentas(alvo);
};

const obterOuCriarMeta = (nome, conteudoInicial) => {
  let meta = document.querySelector(`meta[name="${nome}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = nome;
    if (conteudoInicial !== undefined) {
      meta.content = conteudoInicial;
    }
    document.head.appendChild(meta);
  }
  return meta;
};

export const modo = (tipo) => {
  const valor = normalizar(tipo);
  const esquema = valor === 'escuro' ? 'dark' : 'light';

  const meta = obterOuCriarMeta("color-scheme");
  meta.content = esquema;
};

/**
 * Ativa a configuração básica para deixar a página boa em celular.
 *
 * Esta função adiciona a meta viewport e ajusta larguras criadas pela Fluxo
 * para não ficarem apertadas em telas pequenas.
 */
export const responsivo = () => {
  obterOuCriarMeta("viewport", "width=device-width, initial-scale=1.0");

  if (!document.getElementById(RESPONSIVO_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = RESPONSIVO_STYLE_ID;
    style.innerHTML = `
@media (max-width: 768px) {
  .${LARGURA_CLASS} {
    width: auto !important;
    max-width: 100% !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}
`;
    document.head.appendChild(style);
  }
};

/** Alias de {@link responsivo}. */
export const configurarCelular = responsivo;
/** Alias de {@link responsivo}. */
export const modoCelular = responsivo;
/** Alias de {@link modo}. */
export const definirModo = modo;
/** Alias de {@link modo}. */
export const tema = modo;
/** Alias de {@link titulo}. */
export const criarTitulo = titulo;
/** Alias de {@link tituloPagina}. */
export const definirTituloPagina = tituloPagina;
/** Alias de {@link tituloPagina}. */
export const nomePagina = tituloPagina;
/** Alias de {@link tituloPagina}. */
export const tituloDocumento = tituloPagina;
/** Alias de {@link texto}. */
export const escreva = texto;
/** Alias de {@link texto}. */
export const mostrarTexto = texto;
/** Alias de {@link botao}. */
export const criarBotao = botao;
/** Alias de {@link lista}. */
export const listar = lista;
/** Alias de {@link listaOrdenada}. */
export const listarOrdenado = listaOrdenada;
/** Alias de {@link link}. */
export const criarLink = link;
/** Alias de {@link link}. */
export const hiperlink = link;
/** Alias de {@link link}. */
export const ancora = link;
/** Alias de {@link link}. */
export const indice = link;
/** Alias de {@link link}. */
export const linkExterno = link;
/** Alias de {@link linha}. */
export const agruparHorizontal = linha;
/** Alias de {@link linha}. */
export const ladoALado = linha;
/** Alias de {@link largura}. */
export const definirLargura = largura;
/** Alias de {@link fonte}. */
export const definirFonte = fonte;
/** Alias de {@link margem}. */
export const definirMargem = margem;
/** Alias de {@link margemVertical}. */
export const definirMargemVertical = margemVertical;
/** Alias de {@link margemHorizontal}. */
export const definirMargemHorizontal = margemHorizontal;
/** Alias de {@link espacamento}. */
export const definirEspacamento = espacamento;
/** Alias de {@link espacamentoVertical}. */
export const definirEspacamentoVertical = espacamentoVertical;
/** Alias de {@link espacamentoHorizontal}. */
export const definirEspacamentoHorizontal = espacamentoHorizontal;
/** Alias de {@link espacamentoVertical}. */
export const definirPaddingVertical = espacamentoVertical;
/** Alias de {@link espacamentoVertical}. */
export const definirPaddingHorizontal = espacamentoHorizontal;
/** Alias de {@link espacamentoVertical}. */
export const paddingVertical = espacamentoVertical;
/** Alias de {@link espacamentoHorizontal}. */
export const paddingHorizontal = espacamentoHorizontal;
