# 📚 E-commerce de Livros com Chatbot IA

Um sistema moderno de e-commerce voltado para a venda de livros, integrado a um chatbot inteligente alimentado por IA (Google Gemini). 

Este projeto tem fins educacionais (MVP) focando na aplicação de Programação Orientada a Objetos (POO), arquitetura monolítica com frontend dinâmico (SPA) e backend protegido. O objetivo principal do assistente virtual é auxiliar os usuários através do esclarecimento de dúvidas relacionadas ao funcionamento do site e pedidos de suporte (FAQ).

## 🚀 Tecnologias e Arquitetura (MVP)

- **Frontend:** React (SPA)
- **Backend:** Node.js (API REST)
- **Banco de Dados:** PostgreSQL (Supabase)
- **IA:** Integração com modelo Google Gemini para chatbot contextualizado
- **Deploy planejado:** Vercel (Frontend) e Render (Backend)

## 📁 Estrutura do Repositório (Arquitetura Orientada a Objetos)

A arquitetura do projeto foi desenhada visando princípios de Programação Orientada a Objetos (SOLID e Injeção de Dependências), separando claramente as responsabilidades de cada camada.

### ⚙️ `/backend` (API REST)
- **`src/entities/`**: Classes puras de domínio que agrupam propriedades e estado (ex: `User`, `Product`).
- **`src/interfaces/`**: Contratos (interfaces) impostos aos repositórios e serviços.
- **`src/repositories/`**: Responsáveis pela camada de persistência e comunicação indireta com as instâncias do banco.
- **`src/services/`**: Guardam os casos de uso, lógica de negócio e integrações internas do sistema.
- **`src/controllers/`**: Recebem requisições HTTP dos clientes e disparam execuções dos serviços.
- **`src/infrastructure/`**: Centraliza os adapters externos (Conexão ao BD, API de IA, serviços terceiros).
- **`src/routes/`**: Fazem o roteamento dos endpoints da API para o respectivo Controller.
- **`src/middlewares/`**: Validações globais ou verificação de tokens (interceptadores).

### 🎨 `/frontend` (React SPA)
- **`src/domain/entities/`**: Classes locais focadas na representação e modelagem dos objetos da visão do usuário.
- **`src/domain/interfaces/`**: Contratos TypeScript de DTOs e formatos devidos da API.
- **`src/services/`**: Classes que englobam a comunicação externa (API requests).
- **`src/store/`**: Gerenciamento global local (States/Contexts).
- **`src/components/`**: Componentes da interface limpos e isolados da parte lógica severa.
- **`src/pages/`**: Reunião de componentes que figuram como telas acessíveis por rota.

### 📚 `/docs`
- Documentação primária do sistema, detalhamentos de fluxo, roadmap e diagramas de design.

## 🌿 Estrutura de Branches

Este repositório segue noções de Git Flow simplificado para organização:
- `main` - Código em produção / versão estável.
- `develop` - Próxima versão de lançamento, onde as funcionalidades são integradas.
- `feature/*` - Ramos para o desenvolvimento de novas funcionalidades de forma isolada (ex: `feature/setup-frontend`).

## 🤖 O Chatbot

O assistente virtual integrado é encarregado de:
- Fornecer respostas rápidas às dúvidas comuns do usuário (FAQ).
- Manter histórico das interações e conversar de modo contínuo em uma sessão.
- **Nota técnica:** O bot processa mensagens mantendo os dados da sessão utilizando um identificador unificado e um fluxo dinâmico de preenchimento de prompt em background antes da chamada à API (LLM + ferramentas).


