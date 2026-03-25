# Design System - Folio / Chatbot

Este documento descreve o System Design completo do projeto, extraído com precisão do arquivo Figma fornecido. 
Ele guia a construção da interface do projeto aplicando consistência com a marca Folio.

## 🎨 Paleta de Cores (Colors)

O sistema de cores utiliza tons neutros/cremes para backgrounds (transmitindo a sensação da folha de um livro), laranjas vibrantes para os destaques (Action) e tons de azul marinho/preto para tipografias e contrastes.

### Core (Primary & Actions)
Usado para botões, destaques, bordas ativas e componentes interativos.
- **Primary Base:** `#C9511E` a `#D46025` 
- **Primary Light (Hover):** `#F29E21` / `#FAAB9B`
- **Primary Dark:** `#B6712D`

### Backgrounds & Surfaces (Neutros)
Simulam o papel dos clássicos e o ambiente agradável de leitura.
- **Background Principal:** `#FDFCFE` (Quase branco)
- **Background Alternativo (Seções):** `#F0EDE6` / `#E8DCCC` (Creme/Bege claro)
- **Superfície dos Livros/Cards:** `#FFFFFF`

### Textos & Contrastes (Typography & UI)
Usado nos títulos e textos em geral para prover um alto contraste sem ser agressivo como o preto puro (`#000000`).
- **Texto Principal:** `#0F1828` / `#1A2535` (Azul super escuro / Grafite)
- **Texto Secundário / Descritivo:** `#303D55` 
- **Acentos Escuros / Bordas:** `#0E4E76` 

---

## ✍️ Tipografia (Typography)

As fontes transmitem elegância focada no mundo da literatura unida à modernidade e legibilidade para interfaces web.

### 1. Headings (Títulos)
**Fonte:** `Playfair Display`, serif. (Elegante, clássica e impactante).
- **Hero Title:** `72px`, Weight `500` / `700` (Ex: "Próximo livro", "Encontre seu")
- **H1 Section:** `40px`, Weight `700` (Ex: "— Bestsellers", "Navegue por gênero")
- **H2 Cards / Categorias:** `32px`, Weight `700` (Ex: "Filosofia", "Romance")
- **H3 Alternativo:** `22px`, Weight `700` (Ex: "— Explorar")

### 2. Body & UI (Textos e Interface)
**Fonte:** `DM Sans`, sans-serif. (Leitura confortável, interface clean).
- **Body Large / Preços:** `24px`, Weight `700` (Ex: "R$ 42")
- **Body Normal:** `22px`, Weight `400` / `700` (Ex: "Explorar acervo", descrições longas)
- **Body Small / Títulos menores:** `20px` a `18px`, Weight `400` / `500` (Ex: "Memórias Póstumas", "Orgulho e Preconceito")
- **Caption / Meta-textos:** `16px` a `14px`, Weight `200` a `500` (Ex: "Machado de Assis", "Editora", Menus Header).

---

## 🛠 Aplicação no Código (CSS Variables)
As variáveis a seguir foram injetadas globalmente na aplicação (em `src/styles/variables.css`) e respeitam a taxonomia do design system:

```css
:root {
  /* Colors */
  --color-primary: #D46025;
  --color-primary-hover: #F29E21;
  --color-background: #FDFCFE;
  --color-background-alt: #F0EDE6;
  --color-text-main: #0F1828;
  --color-text-muted: #303D55;

  /* Typography */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'DM Sans', sans-serif;

  /* Font Sizes */
  --text-hero: 72px;
  --text-h1: 40px;
  --text-h2: 32px;
  --text-h3: 24px;
  --text-body-large: 22px;
  --text-body: 18px;
  --text-caption: 16px;
  --text-small: 14px;
}
```
