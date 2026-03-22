# 🧠 System Design Document — E-commerce com Chatbot IA

> **Documento de planejamento técnico completo** para um sistema de e-commerce com chatbot integrado.  
> Antes de escrever qualquer linha de código, responda as perguntas de cada camada.

---

## Índice

1. [Problema e Objetivo do Sistema](#1-problema-e-objetivo-do-sistema)
2. [Escopo do MVP](#2-escopo-do-mvp)
3. [Requisitos Funcionais](#3-requisitos-funcionais)
4. [Requisitos Não Funcionais](#4-requisitos-não-funcionais)
5. [Arquitetura do Sistema](#5-arquitetura-do-sistema)
6. [Modelagem de Dados](#6-modelagem-de-dados)
7. [Banco de Dados](#7-banco-de-dados)
8. [Integração com IA](#8-integração-com-ia)
9. [Fluxo de Mensagens do Chatbot](#9-fluxo-de-mensagens-do-chatbot)
10. [Segurança](#10-segurança)
11. [Observabilidade](#11-observabilidade)
12. [Design do Sistema Visual](#12-design-do-sistema-visual)
13. [Experiência do Usuário (UX)](#13-experiência-do-usuário-ux)
14. [Limitações do Sistema](#14-limitações-do-sistema)
15. [Deploy e Infraestrutura](#15-deploy-e-infraestrutura)
16. [Evolução Futura](#16-evolução-futura)

---

## 1. Problema e Objetivo do Sistema

> Antes de projetar qualquer sistema, entenda **o que ele precisa resolver**.

| # | Pergunta |
|---|----------|
| 1 | Qual é o objetivo principal do sistema? |
É um e-commerce de livros com chatbot integrado com IA. o projelo é um trabalho da faculdade que também servirá de aprendizado. a ideia é utilizar POO e um chatbot inteligente que, nesse caso, irá auxiliar o usuário na compra de livros, respondendo dúvidas acerca dos produtos ou sobre o funcionamento do site.
| 2 | Quem são os usuários do sistema? |
Os usuários do sistema são clientes que desejam comprar livros.
| 3 | Qual problema o chatbot resolve dentro do e-commerce? |
O chatbot resolve o problema de dúvidas sobre produtos e funcionamento do site.
| 4 | O chatbot é apenas suporte ou também recomenda produtos? |
O chatbot é apenas suporte.
| 5 | O usuário precisa estar logado para usar o chatbot? |
O usuário precisa estar logado para usar o chatbot.
| 6 | O chatbot deve responder apenas sobre produtos ou também sobre pedidos? |
O chatbot deve responder apenas sobre produtos. talvez, se algum dia o projeto for extendido, há a possibilidade de transformar o chatbot em um verdadeiro assistente pessoal, guidando o usuário em toda a jornada de compra.
| 7 | O sistema será usado por uma única loja ou várias lojas? |
A ideia é criar algo "único", então, por enquanto, apenas uma loja. mas, no futuro, há a possibilidade de transformar o sistema em uma plataforma para várias lojas.
| 8 | O projeto será apenas um MVP educacional ou pretende evoluir depois? |
O projeto será apenas um MVP educacional, mas com a possibilidade de evoluir para algo maior.

---

## 2. Escopo do MVP

> Defina o que **entra** e o que **não entra** no MVP.

| # | Pergunta |
|---|----------|
| 1 | Quais funcionalidades mínimas o e-commerce terá? *(listar produtos, ver produto, carrinho, pedido)* |
Ver produtos(página própria), carrinho, pedido, checkout. 
| 2 | O sistema terá autenticação de usuários? |
Sim, o usuário precisará estar logado para usar o sistema.
| 3 | Haverá integração com pagamento? |
Talvez, mas não é uma prioridade.
| 4 | O chatbot deve conseguir responder sobre produtos, recomendar produtos e consultar pedidos? |
O chatbot deve conseguir responder sobre como usar o site(FAQ)
| 5 | O chatbot precisa manter histórico de conversa? |
Sim, o chatbot precisa manter histórico de conversa.
| 6 | O chatbot será visível em todas as páginas ou apenas em algumas? |
O chatbot será visível em todas as páginas.

---

## 3. Requisitos Funcionais

> O que o sistema **deve fazer**.

### 🛍️ Catálogo

| # | Pergunta |
|---|----------|
| 1 | O usuário pode ver todos os produtos? |
Sim, o usuário pode ver todos os produtos.
| 2 | O usuário pode buscar produtos? |
não
| 3 | O usuário pode filtrar produtos? |
não 

### 🛒 Carrinho

| # | Pergunta |
|---|----------|
| 4 | O usuário pode adicionar produto ao carrinho? |
Sim, o usuário pode adicionar produto ao carrinho.
| 5 | O usuário pode remover produtos do carrinho? |
Sim, o usuário pode remover produtos do carrinho.

### 📦 Pedido

| # | Pergunta |
|---|----------|
| 6 | O usuário pode finalizar um pedido? |
Sim, o usuário pode finalizar um pedido.
| 7 | O sistema salva histórico de pedidos? |
Sim, o sistema salva histórico de pedidos.

### 🤖 Chatbot

| # | Pergunta |
|---|----------|
| 8 | O chatbot pode responder dúvidas sobre produtos? |
não, ao menos por enquanto
| 9 | O chatbot pode mostrar produtos? |
não, ao menos por enquanto
| 10 | O chatbot pode informar status do pedido? |
Não, o chatbot não pode informar status do pedido.



---

## 4. Requisitos Não Funcionais

> Requisitos de **qualidade** do sistema.

| # | Pergunta |
|---|----------|
| 1 | Quantos usuários simultâneos o sistema precisa suportar? |
Não sei, mas não deve ser muito, já que é um projeto de faculdade.
| 2 | O tempo de resposta do chatbot precisa ser rápido? |
Sim, o chatbot precisa ser rápido.
| 3 | O sistema precisa ser escalável? |
Não, o sistema não precisa ser escalável.
| 4 | O sistema precisa ser altamente disponível? |
Não, o sistema não precisa ser altamente disponível.
| 5 | Existe preocupação com custo de API de IA? |
Sim, o custo da API de IA é uma preocupação, embora eu utilizarei uma que tem um limite de requisições gratuitas alto(gemini).
| 6 | O sistema precisa armazenar logs das conversas? |
não agora 
| 7 | O sistema precisa proteger dados do usuário? |
Sim, o sistema precisa proteger dados do usuário.

> 💡 **Para um MVP educacional, normalmente:**
> - **Escala:** baixa
> - **Disponibilidade:** média
> - **Performance:** razoável

---

## 5. Arquitetura do Sistema

> A **estrutura técnica** do sistema.

| # | Pergunta |
|---|----------|
| 1 | O sistema será monolítico ou microserviços? |
O sistema será monolítico, visto que é um projeto de faculdade e não há necessidade de microserviços.(daria mais trabalho do que o necessário)
| 2 | O chatbot será um módulo ou um serviço separado? |
O chatbot será um módulo do sistema.
| 3 | O backend terá camadas bem definidas? |
Sim, o backend terá camadas bem definidas.
| 4 | O frontend será uma SPA? |
Sim, o frontend será uma SPA.
| 5 | A comunicação será via REST ou WebSocket? |
Sim, a comunicação será via REST.

### Diagrama de Arquitetura Geral:

```
┌─────────────┐        ┌──────────────┐        ┌──────────────┐
│   Frontend  │ ──────▶│   Backend    │ ──────▶│  Banco de │
│  React SPA  │        │  Node.js API │        │    Dados │
└─────────────┘        └──────┬───────┘        └──────────────┘
                              │
                              ▼
                       ┌──────────────┐
                       │  AI Provider │
                       │ (OpenAI/etc) │
                       └──────────────┘
```

---

## 6. Modelagem de Dados

> As **entidades** do sistema e seus relacionamentos.

| # | Pergunta |
|---|----------|
| 1 | Quais são as entidades principais do sistema? |
User, Address, Product, Order, OrderItem e ChatMessage. O Carrinho ficará na memória e URL do front-end.
| 2 | Quais atributos cada entidade terá? |
A entidade User terá nome e telefone. Address abrigará os campos locais. Product terá arrays de strings para autores e gêneros. OrderItem guardará um snapshot do produto no momento da compra.
| 3 | Como os relacionamentos funcionarão? |
1:N para User -> Address, User -> Order, Order -> OrderItem e User -> ChatMessage.
| 4 | O histórico de chat será salvo? |
Sim. Numa mesma tabela relacionando a sessão, o usuário logado e, caso aja, o ID do produto recomendado pela IA.
| 5 | A sessão de conversa terá um identificador? |
Sim, utilizaremos um session_id gerado no front-end para agrupar as mensagens na mesma conversa, sem precisar de uma tabela de controle de sessão à parte.

### Entidades principais:

```
User
 ├── id
 ├── name
 ├── email
 ├── password_hash
 ├── phone
 └── created_at

Address
 ├── id
 ├── user_id
 ├── street
 ├── number
 ├── complement
 ├── neighborhood
 ├── city
 ├── state
 ├── zip_code
 └── is_default

Product
 ├── id
 ├── seller_id
 ├── title
 ├── description
 ├── authors (Array/String)
 ├── genres (Array/String)
 ├── price
 ├── stock
 └── is_active

Order
 ├── id
 ├── user_id
 ├── address_identifier
 ├── total_price
 ├── status (PENDENTE, PAGO, ENVIADO, CANCELADO)
 └── created_at

OrderItem
 ├── id
 ├── order_id
 ├── product_id
 ├── product_name_snapshot
 ├── product_price_snapshot
 ├── quantity
 └── subtotal

ChatMessage
 ├── id
 ├── user_id
 ├── session_id
 ├── role (user | assistant)
 ├── content
 ├── recommended_product_id
 └── created_at
```

### Relacionamentos:

```
User ──── 1:N ──── Addresses
User ──── 1:N ──── Orders
Order ─── 1:N ──── OrderItems
Seller ── 1:N ──── Products
User ──── 1:N ──── ChatMessages (por sessão)

* Cart viverá no Client Side (Session/LocalStorage).
```

---

## 7. Banco de Dados

| # | Pergunta |
|---|----------|
| 1 | Qual banco de dados será usado? |
PostgreSQL
| 2 | Os dados são mais relacionais ou documentos? |
Relacionais
| 3 | O catálogo de produtos terá muitas variações? |
Não
| 4 | O histórico de chat será armazenado? |
Sim
| 5 | O banco precisa suportar busca textual? |
Sim

---

## 8. Integração com IA

> Parte **essencial** para o projeto.

| # | Pergunta |
|---|----------|
| 1 | Qual provedor de IA será usado? *(OpenAI, Anthropic, Gemini…)* |
Gemini
| 2 | O chatbot usará apenas LLM direto ou LLM + ferramentas (tools/functions)? |
LLM + ferramentas
| 3 | O chatbot pode acessar dados do banco? |
Sim
| 4 | O chatbot deve usar contexto de conversa? |
Sim
| 5 | O chatbot deve usar prompt fixo ou dinâmico? |
o chatbot usará um prompt fixo, mas com contexto dinâmico.prompt + regras + histórico + dados do usuário

---

## 9. Fluxo de Mensagens do Chatbot

| # | Pergunta |
|---|----------|
| 1 | Como a mensagem do usuário chega ao backend? |
O usuário digita uma mensagem no front-end, que é enviada para o backend via REST.
| 2 | Como o backend processa essa mensagem? |
O backend recebe a mensagem, busca o contexto do usuário e envia para a IA.
| 3 | Como a IA recebe contexto? |
A IA recebe o contexto do usuário e envia para o backend.
| 4 | Como a resposta é gerada? |
A IA gera a resposta e envia para o backend.
| 5 | O sistema salva a conversa antes ou depois da resposta? |
depois da resposta(caso não haja erro)

### Fluxo típico:

```
Usuário digita mensagem
        │
        ▼
  Frontend (React)
        │  POST /chat
        ▼
  Chat Controller
        │
        ▼
  Chat Service ──── busca contexto do banco ────▶ DB
        │
        ▼
  AI Provider (ex: OpenAI)
        │  gera resposta
        ▼
  Salva mensagem no banco ──────────────────────▶ DB
        │
        ▼
  Retorna resposta ao frontend
        │
        ▼
  Exibe mensagem no chat
```

---

## 10. Segurança

| # | Pergunta |
|---|----------|
| 1 | O chatbot pode ser usado sem login? |
não
| 2 | Como evitar spam no chat? |
limitar o número de mensagens por usuário por minuto
| 3 | Como evitar prompt injection? |
validar as entradas do usuário(utilizar regras que limitem o prompt)
| 4 | O sistema valida entradas do usuário? |
sim
| 5 | O sistema limita chamadas à API de IA? *(rate limiting)* |
sim, utilizando um contador de mensagens por usuário por minuto

---

## 11. Observabilidade

> Mesmo em um MVP, é bom pensar nisso.

| # | Pergunta |
|---|----------|
| 1 | O sistema terá logs? |
sim, utilizando o pino e quero adicionar logs com nível de severidade
| 2 | O sistema registra erros do chatbot? |
sim, porém somente como log
| 3 | O sistema registra conversas? |
sim, porém com um certo limite(apagar de tempos em tempos)
| 4 | O sistema mede tempo de resposta da IA? |
talvez, não é uma prioridade no momento

---

## 12. Design do Sistema Visual

> O design visual define **como o sistema é percebido e usado**. Um bom design system garante consistência e escalabilidade na interface.

---

### 12.1 Identidade Visual

A identidade adotada será a da **"Biblioteca Universitária"**, transmitindo um ar de organização, segurança e inteligência. Utilizaremos tons profundos de azul e notas quentes de terracota.

| Elemento | Decisão a tomar |
|----------|----------------|
| **Paleta de cores** | Primária: Azul Marinho. Secundária: Terracota (botões de ação/comprar). Fundo: Frio (Cinza super claro). |
| **Tipografia** | Fonte de títulos e leitura de página: `Lora` (Serifa limpa e clássica). Fonte de IA e interface (chat, botões): `Roboto` ou `Open Sans` (Sem Serifa). |
| **Espaçamento** | Grid base de 8px (margins e paddings bem arejados). |
| **Bordas e raios** | Moderado (arredondamento sutil de 4px a 8px). |
| **Sombras** | Sombras sutis, apenas para evidenciar o widget de chat e modais. |
| **Iconografia** | Preferência para opções sólidas/outline claras (ex: Lucide React). |

#### Tokens de design (Biblioteca Universitária):

```css
/* Cores */
--color-primary: #2B4C7E;         /* Azul marinho profundo, passa foco e segurança */
--color-primary-hover: #1D3A63;
--color-secondary: #CD7B4C;       /* Terracota, destaque para botões de conversão e notificações */
--color-secondary-hover: #BA6637;
--color-background: #FAFAFA;      /* Fundo da aplicação */
--color-surface: #FFFFFF;         /* Fundo de cards de livros e modais */
--color-text: #1F2937;            /* Cinza Escuro, melhor que preto puro para leitura */
--color-text-muted: #6B7280;
--color-error: #EF4444;
--color-success: #22C55E;

/* Tipografia */
--font-heading: 'Lora', serif;          /* Títulos de módulos e páginas */
--font-base: 'Roboto', sans-serif;      /* Textos da UI geral e do chatbot */
--text-sm: 0.875rem;
--text-md: 1rem;
--text-lg: 1.25rem;
--text-xl: 1.5rem;

/* Espaçamento */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
```

---

### 12.2 Componentes da Interface

Mapeie os componentes visuais que o sistema precisa:

#### Componentes Globais

| Componente | Descrição |
|-----------|-----------|
| `Navbar` | Navegação principal com logo, links, busca rápida e ícone do carrinho |
| `Footer` | Links institucionais, redes sociais |
| `Button` | Variantes: primary, secondary, ghost, danger |
| `Input` | Campos de texto, busca, senhas, com estados de erro e foco |
| `Badge` | Contagem no carrinho, status do pedido (PAGO, ENVIADO, etc.) |
| `Toast / Notification` | Feedback de ações (produto adicionado, erro, login com sucesso, etc.) |
| `Modal` | Confirmação de ações, detalhes expandidos, modais de login/registro |
| `Loader / Spinner / Skeleton` | Estados de carregamento de produtos, telas e respostas do chatbot |
| `Pagination` | Controle de paginação para listas longas (histórico ou catálogo) |

#### Componentes de Autenticação e Usuário

| Componente | Descrição |
|-----------|-----------|
| `LoginForm` | Formulário de login (email, senha) |
| `RegisterForm` | Formulário de cadastro com dados do usuário e telefone |
| `AddressFormModal` | Modal ou formulário para adicionar/editar múltiplos endereços de entrega |
| `OrderHistoryCard` | Card mostrando o resumo de um pedido passado (status, data, valor) |

#### Componentes de Catálogo

| Componente | Descrição |
|-----------|-----------|
| `ProductCard` | Imagem, título, autores, preço, e botão de adicionar ao carrinho |
| `ProductGrid` | Grid responsivo organizando os `ProductCard` |
| `ProductDetail` | Página completa do produto com descrição longa, gêneros e painel de compra |
| `FilterSidebar` | Filtros por categoria/gêneros, preço e disponibilidade |
| `SearchBar` | Campo de busca dedicado com autocomplete/sugestões na Navbar |

#### Componentes do Carrinho e Checkout

| Componente | Descrição |
|-----------|-----------|
| `CartDrawer` | Painel lateral deslizante com itens do carrinho (do LocalStorage) |
| `CartItem` | Produto no carrinho com controle de quantidade (+/-) e botão de remoção |
| `OrderSummary` | Call-out mostrando o subtotal, frete estimado e total geral do pedido |
| `CheckoutSteps` | Indicador visual de progresso (Carrinho -> Endereço -> Pagamento) |
| `AddressSelector` | Radio buttons ou cards para escolher qual endereço salvo usar na compra |

#### Componentes do Chatbot

| Componente | Descrição |
|-----------|-----------|
| `ChatWidget` | Widget flutuante no canto inferior direito (botão de abrir/fechar) |
| `ChatWindow` | Janela de conversa com scroll e histórico da sessão |
| `ChatMessage` | Balão de mensagem diferenciado (usuário vs assistente), com timestamp |
| `ChatInput` | Campo de digitação com botão de enviar (desabilita enquanto bot digita) |
| `QuickReplies` | Pílulas (chips) de sugestões de perguntas clicáveis |
| `ProductCardInline` | Card ultra-compacto de produto, renderizado diretamente *dentro* do balão do bot quando há um `recommended_product_id` |
| `TypingIndicator` | Animação sutil de "..." indicando que a IA está respondendo |

---

### 12.3 Layout e Estrutura de Páginas

Defina o layout de cada tela principal:

#### Página Inicial (Home)
```
┌────────────────────────────────────┐
│            NAVBAR                  │
├────────────────────────────────────┤
│         HERO / BANNER              │
├────────────────────────────────────┤
│   PRODUTOS EM DESTAQUE (grid)      │
├────────────────────────────────────┤
│            FOOTER                  │
└────────────────────────────────────┘
                         ╔═══════════╗
                         ║ CHATWIDGET║  ← flutuante
                         ╚═══════════╝
```

#### Página de Catálogo
```
┌────────────────────────────────────┐
│            NAVBAR + SEARCH         │
├──────────┬─────────────────────────┤
│ FILTROS  │   PRODUCT GRID          │
│          │   [Card][Card][Card]    │
│          │   [Card][Card][Card]    │
│          │   [Card][Card][Card]    │
├──────────┴─────────────────────────┤
│            PAGINATION              │
└────────────────────────────────────┘
```

#### Janela do Chatbot
```
┌──────────────────────┐
│  🤖 Assistente       │  ← Header com nome e status
├──────────────────────┤
│  [Mensagem bot]      │
│         [Msg usuário]│
│  [Mensagem bot]      │
│  ┌────────────────┐  │
│  │ 🛍 Produto X   │  │  ← Card inline
│  │ R$ 99,90 [+]  │  │
│  └────────────────┘  │
│  [Sugestão rápida 1] │
│  [Sugestão rápida 2] │
├──────────────────────┤
│  Digite sua mensagem │  ← Input + Enviar
└──────────────────────┘
```

---

### 12.4 Responsividade

| Breakpoint | Largura | Comportamento |
|-----------|---------|--------------|
| Mobile | `< 640px` | 1 coluna no grid, navbar colapsada, chatbot em tela cheia |
| Tablet | `640px – 1024px` | 2 colunas, filtros em modal |
| Desktop | `> 1024px` | 3–4 colunas, filtros na sidebar, chatbot flutuante |

---

### 12.5 Hierarquia Visual e UX Writing

| Princípio | Aplicação no sistema |
|----------|---------------------|
| **Hierarquia de títulos** | `H1` para nome da página, `H2` para seções, `H3` para nome do produto |
| **Contraste suficiente** | Mínimo WCAG AA (4.5:1 para texto, 3:1 para UI) |
| **Feedback imediato** | Toast ao adicionar produto, loader ao enviar mensagem |
| **Microcopy** | Labels claros nos botões: *"Adicionar ao carrinho"* > *"Comprar"* |
| **Estados vazios** | Mensagem amigável quando o carrinho está vazio ou busca sem resultado |
| **Estados de erro** | Mensagem de erro visível e orientada à ação: *"Tente novamente"* |

---

### 12.6 Acessibilidade (a11y)

| # | Ponto de atenção |
|---|-----------------|
| 1 | Todos os botões têm `aria-label` descritivo? |
| 2 | O chatbot é navegável por teclado? |
| 3 | As cores respeitam contraste mínimo WCAG? |
| 4 | Imagens de produtos têm `alt` descritivo? |
| 5 | Modais prendem o foco corretamente? *(focus trap)* |
| 6 | O sistema funciona sem JavaScript para conteúdo estático? |

---

### 12.7 Ferramentas Recomendadas para Design

| Etapa | Ferramenta |
|-------|-----------|
| Wireframe e protótipo | Figma, Excalidraw |
| Design system / tokens | Figma + Storybook |
| Componentes React | Tailwind CSS + shadcn/ui ou Radix UI |
| Ícones | Lucide React, Heroicons |
| Fontes | Google Fonts (Inter, Poppins, etc.) |
| Teste de acessibilidade | axe DevTools, Lighthouse |

---

## 13. Experiência do Usuário (UX)

| # | Pergunta |
|---|----------|
| 1 | O chatbot será um widget flutuante? |
| 2 | O chat mostra histórico de mensagens? |
| 3 | O bot mostra sugestões rápidas? |
| 4 | O usuário pode clicar em produtos sugeridos pelo bot? |

---

## 14. Limitações do Sistema

| # | Pergunta |
|---|----------|
| 1 | O chatbot pode cometer erros? |
Sim. Caso ele cometa erros, ele deve se desculpar e tentar novamente
| 2 | Como lidar com perguntas que ele não sabe responder? |
Ele deve se desculpar e sugerir que o usuário entre em contato com o suporte humano
| 3 | O chatbot deve encaminhar para suporte humano? |
Não
sim, porém ele deve apenas sugerir que o usuário entre em contato com o suporte humano em casos muito específicos
---

## 15. Deploy e Infraestrutura

| # | Pergunta |
|---|----------|
| 1 | Onde o backend será hospedado? *(Railway, Render, AWS…)* |
Render (plano gratuito Free Web Service).
| 2 | Onde o banco ficará? *(Supabase, PlanetScale, Atlas…)* |
Supabase (oferece PostgreSQL robusto no Free Tier).
| 3 | O frontend será hospedado separadamente? *(Vercel, Netlify…)* |
Vercel (plano Hobby, gratuito e otimizado para front-end).
| 4 | Como serão armazenadas as variáveis de ambiente? |
Nas configurações de ambiente das próprias plataformas (Render e Vercel), sem expor chaves no repositório.
| 5 | O sistema terá CI/CD? |
Sim, os deploys serão automáticos a cada push na branch principal (integração nativa do repositório com Vercel e Render).

---

## 16. Evolução Futura

> Mesmo sendo MVP, pense no futuro.

| # | Pergunta |
|---|----------|
| 1 | O sistema poderá suportar múltiplas lojas? |
sim, porém não no MVP
| 2 | O chatbot poderá aprender com as conversas? |
talvez
| 3 | O sistema poderá integrar com WhatsApp? |
sim, porém não no MVP
| 4 | O chatbot poderá usar embeddings e RAG? |
sim, porém não no MVP

---

## ✅ Estrutura Final do Plano Técnico

Após responder todas as perguntas acima, seu documento de design estará estruturado assim:

```
1. Objetivo do sistema
2. Escopo do MVP
3. Requisitos funcionais
4. Requisitos não funcionais
5. Arquitetura do sistema
6. Modelagem de dados
7. Integração com IA
8. Fluxo do chatbot
9. Design do sistema visual
   ├── Identidade visual (tokens)
   ├── Componentes
   ├── Layout de páginas
   ├── Responsividade
   └── Acessibilidade
10. Segurança
11. Infraestrutura
12. Evoluções futuras
```



