# Fluxo Engine

Fluxo: API simples em portugues para montar e estilizar paginas web com JavaScript encadeavel.

## Instalacao

```bash
npm install @fluxojs/engine
```

## Uso rapido

```js
import {
  titulo,
  texto,
  botao,
  modo,
  responsivo,
  largura,
  fonte,
  fundo
} from "@fluxojs/engine";

modo("claro");
responsivo();
largura(72);
fonte("serifa");
fundo("bege");

titulo("Minha pagina").alinhar("centro").cor("azul marinho");
texto("Criada com Fluxo.").tamanho(18);
botao("Clique", () => alert("Funcionou"));
```

## API principal

- `titulo(texto, onde?)`
- `cabecalho(nivel, texto, onde?)`
- `h1(...)` ate `h6(...)`
- `texto(conteudo, onde?)`
- `botao(rotulo, acao?, onde?)`
- `link(texto, href, onde?)`
- `lista(itens, onde?)`
- `listaOrdenada(itens, onde?)`
- `linha(onde?)`
- `largura(valor, onde?)`
- `fonte(valor, onde?)`
- `fundo(valor, onde?)`
- `margem(valor, onde?)`
- `margemVertical(valor, onde?)`
- `margemHorizontal(valor, onde?)`
- `espacamento(valor, onde?)`
- `espacamentoVertical(valor, onde?)`
- `espacamentoHorizontal(valor, onde?)`
- `modo(tipo)`
- `responsivo()`

## Estrutura do pacote

- `index.js`: entrypoint publico do pacote
- `engine.js`: API principal
- `interno.js`: utilitarios internos
- `padroes.js`: mapas de cores, alinhamentos e fontes

## Licenca

&copy; 2026 Lucas Gabriel (lucmsilva). Sobre [LICENSE](BSD-3-Clause).
