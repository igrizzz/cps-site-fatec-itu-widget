# Widgets do Site Fatec Itu

Coleção de widgets (fragmentos de `HTML`, `CSS` e `JavaScript`) criados para embutir novas seções e funcionalidades no site institucional da **Fatec Itu**, mantido pela rede **CPS (Centro Paula Souza)**.

> **Contexto:** o código-fonte do site não podia ser alterado diretamente, então cada widget foi desenvolvido como um bloco autônomo para ser inserido por meio do editor de conteúdo do WordPress (ou ferramenta similar de edição de páginas), dentro de componentes do tipo *HTML embed* / *HTML widget*.

---

## Sumário

- [Como usar](#como-usar)
- [Widgets](#widgets)
  - [card-cursos.html](#card-cursoshtml)
  - [divisao-instagram.html](#divisao-instagramhtml)
  - [empresas-parceiras.html](#empresas-parceirashtml)
  - [overlay.html](#overlayhtml)
  - [slider.html](#sliderhtml)
  - [video.html](#videohtml)
  - [tapa-buraco.js](#tapa-buracojs)
- [Dependências e integração](#dependências-e-integração)
- [Considerações técnicas](#considerações-técnicas)
- [Licença](#licença)

---

## Como usar

1. Abra a página no editor de conteúdo do site (WordPress) onde deseja inserir o widget.
2. Adicione um bloco de **HTML customizado** ou **widget de código**.
3. Cole o conteúdo do arquivo `.html` desejado.
4. Para o script `tapa-buraco.js`, cole o código dentro de um bloco de **Script** (ou adicione-o na página inteira por meio do gerenciador de scripts do tema, para que seja executado globalmente).
5. Publicar.

> **Atenção:** cada widget depende de classes CSS e estilos próprios do tema da CPS (ex.: `cps-btn__destaque`, `cabecalho-secao`, `divisor-interna`, `cps-destaques__container`). Eles foram criados para conviver com esses estilos já existentes.

---

## Widgets

### card-cursos.html

Exibe uma grade com os **cards de cursos** da Fatec Itu. Cada card é uma imagem clicável que redireciona para a página do respectivo curso.

**Estrutura:**
- `div.cabecalho-secao` → título "Cursos" e divisor visual (reutiliza o padrão visual do site).
- `<style>` → estilos da classe `.cardCurso` (largura de 33%, hover com zoom na imagem e responsividade para mobile).
- `div.container` → contém 8 `div.cardCurso`, cada uma com `<img>` e `onclick` para a página do curso.

**Cursos listados:**
| Card | Destino |
| --- | --- |
| Análise e Desenvolvimento de Sistemas | `/cursos/analise-e-desenvolvimento-de-sistemas/` |
| Eventos | `/cursos/eventos/` |
| Gestão Empresarial | `/cursos/gestao-empresarial/` |
| Gestão Empresarial EaD | `/cursos/gestao-empresarial-ead/` |
| Gestão da Tecnologia da Informação | `/cursos/gestao-tecnologia-da-informacao/` |
| Mecatrônica Industrial | `/cursos/mecatronica-industrial/` |
| AMS Análise e Desenvolvimento de Sistemas | `/ams-analise-e-desenvolvimento-de-sistemas/` |
| AMS Processos Gerenciais | `/ams-processos-gerenciais/` |

**Comportamento:**
- Ao clicar, o usuário é redirecionado (via `window.location.href`).
- Hover: a imagem ganha sombra e um leve zoom (`scale(1.1)`).
- Imagens usam `loading="lazy"` para otimizar o carregamento.

---

### divisao-instagram.html

Cabeçalho de seção simples para separar e intitular o bloco do **Instagram** da faculdade, com link "ver mais" apontando para o perfil oficial.

**Estrutura:**
- `div.cabecalho-secao` → título "Instagram".
- Ícone `fas fa-plus-circle` + link âncora `ver mais` → `https://www.instagram.com/fatecitu/`.
- `span.divisor-interna` → divisor visual.

**Comportamento:**
- É um widget puramente estrutural: apenas renderiza título, link e separador, sem lógica de JavaScript.

---

### empresas-parceiras.html

Exibe um conjunto de **cards com logotipos de empresas parceiras**. Cada card é um link externo que abre o site do parceiro em nova aba.

**Estrutura:**
- `<style>` → classes `.card-container` (flexbox centralizado, com quebra de linha) e `.card` (largura fixa de 200px, borda, cantos arredondados e efeito de sombra no hover).
- `div.card-container` → contém os cards com `<a target="_blank" rel="noopener">` envolvendo o logo.

**Parceiros:**
| Parceiro | Site |
| --- | --- |
| Cisco | `https://www.cisco.com/c/pt_br/index.html` |
| IBM | `https://www.ibm.com/br-pt` |
| Microsoft | `https://www.microsoft.com/pt-br` |
| Senior Mega Sistemas | `https://www.mega.com.br/home/` |

**Comportamento:**
- Links abertos em nova aba (`target="_blank"`), com `rel="noopener"` como boa prática de segurança.
- Hover: sombra no card.
- Logos com `loading="lazy"`.

---

### overlay.html

Cria um **pop-up (overlay) de tela cheia**, exibido ao carregar a página, com imagem institucional de divulgação do vestibular e dois botões: "QUERO ME INSCREVER" e "FECHAR".

**Estrutura:**
- `<style>` → classes `overlay-*`:
  - `.overlay-gustaffson`: fixo, cobrindo 100% da tela, fundo preto semitransparente (`rgba(0,0,0,0.8)`), centralizado com flexbox, `z-index: 10000` (fica acima do restante da página).
  - `.overlay-image-gustaffson`: imagem limitada a 80% da largura e 90% da altura da viewport.
  - `.overlay-buttons-gustaffson`: botões lado a lado com espaçamento.
  - `#inscreverBtn-gustaffson`: verde. `#fecharBtn-gustaffson`: vermelho.
- `<div id="overlay-gustaffson">` → estrutura com imagem + botões.
- `<script>` → lógica de interação dos botões.

**Comportamento:**
- **QUERO ME INSCREVER** → `window.location.href = 'https://vestibular.fatec.sp.gov.br/'`.
- **FECHAR** → esconde o overlay (`display: none`).
- O overlay aparece automaticamente assim que a página carrega (não há atraso programado).

> **Observação:** para exibir o pop-up em todas as páginas do site, insira este código no **header/footer global** ou em um script de site inteiro, em vez de em uma página específica.

---

### slider.html

Implementa um **carrossel de slides** com legendas e botões "Saiba Mais". Os slides são alternados manualmente (setas prev/next e indicadores) e também de forma automática.

**Estrutura:**
- `<style>` → classes de slideshow:
  - `.slideshow-container` e `.mySlides`: container e slides (ocultos por padrão).
  - `.prev`/`.next`: setas de navegação nas laterais.
  - `.text` e `.slide-content`: bloco de conteúdo (título, parágrafo e botão) sobreposto à imagem de fundo do slide.
  - `.dot`: indicadores circulares.
  - `.fade`: animação de transição entre slides.
  - Media queries: ajustes de layout para telas até 950px (mobile).
- Slides: cada `div.mySlides.fade` tem imagem de fundo e conteúdo com botão `cps-btn__destaque` que navega via `parent.location` (abre na janela pai).
- `<script>` → `plusSlides()`, `currentSlide()`, `showSlides()` e `automaticSlide()` com `setInterval` de **13,5 segundos**.

**Slides atuais:**
1. Comissão Própria de Avaliação (CPA).
2. Missão, Visão e Valores.
3. Alunos premiados no IdeathON 2023.

**Comportamento:**
- Ao clicar em "Saiba Mais", `parent.location` redireciona a janela **pai** para a página do assunto (útil quando o widget é carregado dentro de um `<iframe>` ou editor embutido).
- O avanço automático segue um ciclo infinito.

---

### video.html

Renderiza um **player de vídeo em loop** como fundo da seção, com uma camada de overlay e um **slider de textos** sobrepostos.

**Estrutura:**
- `<style>`:
  - `#video-container`: container de 100% de largura e 400px de altura, com cantos arredondados e `overflow: hidden`.
  - `video`: cobre todo o container (`object-fit: cover`).
  - `.overlay`: camada com padrão de pontos e fundo azul institucional (`#0f5494`), semitransparente (`opacity: 0.3`), sobre o vídeo.
  - `.topright`/`.topleft`: posicionamento dos elementos sobre o vídeo.
  - `.custom-font`: estilo de texto com sombra.
- `video` com `autoplay muted loop` → fonte MP4 hospedada no Azure Blob Storage do CPS.
- Botão "Conheça a Fatec Itu" (`cps-btn__destaque`) no canto superior direito → `parent.location` para `/infraestrutura/`.
- Slider de textos (`.mySlides`) à esquerda, com três frases rotativas.
- `<script>` → `showSlides()` + `automaticSlider()` com `setInterval` de **12,5 segundos**.

**Frases do slider:**
1. "16 anos fazendo história em Itu"
2. "Cursos de graduação 100% GRATUITOS"
3. "Cursos presenciais e a distância"

**Comportamento:**
- Vídeo inicia automaticamente, sem som (`muted` é necessário para autoplay em navegadores modernos) e em loop.
- As frases alternam a cada 12,5 segundos com fade.
- O botão "Conheça a Fatec Itu" navega na janela pai.

---

### tapa-buraco.js

Script utilitário que **corrige imagens quebradas ou vazias** na seção de destaques do site. O nome "tapa-buraco" vem justamente da função de "tapar" o buraco deixado por fotos ausentes.

**Funcionamento:**
1. Escuta o evento `DOMContentLoaded` (aguarda o HTML estar pronto).
2. Busca o container `.cps-destaques__container`.
3. Dentro dele, seleciona todos os `.cps-destaques__items`.
4. Para cada item, localiza o elemento `<img>`.
5. Se o `src` estiver nulo ou vazio, substitui pelo placeholder:
   `https://bkpsitecpsnew.blob.core.windows.net/uploadsitecps/sites/39/2023/06/PlaceholderDestaques.png`

**Comportamento:**
- Não interfere em imagens que já possuem `src` válido.
- Executa uma única vez após o carregamento inicial do DOM.
- Se o container não existir na página, o script simplesmente não faz nada (não lança erro).

**Como aplicar:** por se referir a uma seção presente em várias páginas, o ideal é carregá-lo de forma global (por exemplo, via plugin de scripts do tema ou no `<head>`/`<footer>` do site).

---

## Dependências e integração

- **Armazenamento de mídia:** todas as imagens e o vídeo são servidos pelo **Azure Blob Storage do CPS** (`bkpsitecpsnew.blob.core.windows.net`), não sendo necessário versionar mídia neste repositório.
- **Estilos do tema:** os widgets reutilizam classes existentes do tema da CPS, como:
  - `cps-btn__destaque` (botão padrão de destaque).
  - `cabecalho-secao`, `divisor-interna` (cabeçalhos de seção).
  - `cps-destaques__container`, `cps-destaques__items` (seção de destaques, usada pelo `tapa-buraco.js`).
- **Bibliotecas externas:** `divisao-instagram.html` usa ícones do **Font Awesome** (`fas fa-plus-circle`), que já é carregado pelo tema do site.

---

## Considerações técnicas

- **Sem build/bundler:** os widgets são HTML/CSS/JS puros, prontos para colar. Não há dependências de npm, framework ou passo de compilação.
- **`parent.location` vs `window.location`:** nos widgets embutidos em iframes (slider e video), `parent.location` garante que a navegação ocorra na janela principal do site, não dentro do iframe.
- **Autoplay:** o `video.html` usa `muted` para garantir que o autoplay funcione nos navegadores modernos, que bloqueiam áudio automático.
- **`rel="noopener"`:** aplicado em todos os links externos com `target="_blank"` para evitar vulnerabilidade de *tabnabbing*.
- **Performance:** imagens de card e logos usam `loading="lazy"` para carregamento sob demanda.
- **Conflito de classes globais:** `slider.html` e `video.html` definem a classe `.mySlides`. Se ambos forem inseridos na mesma página, o JavaScript de um deles pode manipular os slides do outro. Para evitar conflitos, insira apenas um slider por página ou renomeie as classes.

---

## Licença

Este projeto é distribuído sob a **GNU General Public License v3** (GPL-3.0). Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
