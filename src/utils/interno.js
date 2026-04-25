/**
 * Normaliza um texto para comparar nomes amigáveis da Fluxo.
 *
 * A função transforma o valor em minúsculas e remove espaços e traços.
 * @param {unknown} texto Valor que será normalizado.
 * @returns {string} Texto pronto para comparação.
 */
export const normalizar = (texto) => String(texto ?? '').toLowerCase().replace(/[\s-]/g, '');

/**
 * Anexa um elemento no local informado, ou no body quando nada for passado.
 * Aceita tanto um HTMLElement quanto o objeto encadeado retornado pela Fluxo.
 * @param {HTMLElement} el Elemento que será inserido.
 * @param {HTMLElement | { elemento?: HTMLElement } | null | undefined} onde Local de destino.
 * @returns {HTMLElement} O próprio elemento anexado.
 */
export const anexar = (el, onde) => {
	const destino = onde && typeof onde === 'object' && 'elemento' in onde ? onde.elemento : onde;
	return (destino || document.body).appendChild(el);
};