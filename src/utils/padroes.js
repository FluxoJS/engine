/**
 * Nomes amigáveis de cores aceitos pela Fluxo.
 *
 * Você pode usar esses nomes nas funções cor() e fundo().
 * @type {Record<string, string>}
 */
export const cores = {
  "preto": "black", "branco": "white", "cinza": "gray", "cinzaclaro": "lightgray",
  "azul": "blue", "azulclaro": "lightblue", "azulescuro": "darkblue", "azulmarinho": "navy",
  "verde": "green", "verdeclaro": "lightgreen", "verdeescuro": "darkgreen", "verdelimao": "lime",
  "vermelho": "red", "vermelhoescuro": "darkred", "rosa": "pink", "rosachoque": "deeppink",
  "amarelo": "yellow", "ouro": "gold", "laranja": "orange", "roxo": "purple",
  "marrom": "brown", "bege": "beige", "ciano": "cyan", "transparente": "transparent"
};

/**
 * Nomes amigáveis de alinhamento aceitos pela Fluxo.
 *
 * Você pode usar esses nomes na função alinhar().
 * @type {Record<string, string>}
 */
export const alinhamentos = {
  "esquerda": "left",
  "direita": "right",
  "centro": "center",
  "centralizado": "center",
  "justificado": "justify"
};

/**
 * Nomes prontos de fonte usados pela Fluxo.
 *
 * Você pode usar esses nomes na função fonte().
 * @type {Record<string, string>}
 */
export const fontes = {
  "sistema": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  "cursiva": "'Brush Script MT', cursive",
  "maquina": "'Courier New', Courier, monospace",
  "serifa": "Georgia, serif",
  "semserifa": "Arial, sans-serif"
};