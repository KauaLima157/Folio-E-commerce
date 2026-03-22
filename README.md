# 📚 E-commerce de Livros com Chatbot IA

Um sistema moderno de e-commerce voltado para a venda de livros, integrado a um chatbot inteligente alimentado por IA (Google Gemini). 

Este projeto tem fins educacionais (MVP) focando na aplicação de Programação Orientada a Objetos (POO), arquitetura monolítica com frontend dinâmico (SPA) e backend protegido. O objetivo principal do assistente virtual é auxiliar os usuários através do esclarecimento de dúvidas relacionadas ao funcionamento do site e pedidos de suporte (FAQ).

## 🚀 Tecnologias e Arquitetura (MVP)

- **Frontend:** React (SPA)
- **Backend:** Node.js (API REST)
- **Banco de Dados:** PostgreSQL (Supabase)
- **IA:** Integração com modelo Google Gemini para chatbot contextualizado
- **Deploy planejado:** Vercel (Frontend) e Render (Backend)

## 📁 Estrutura do Repositório

- `/frontend` - Interface do usuário e lógica client-side (SPA).
- `/backend` - API RESTful (Node.js), controladores e serviços de negócio.
- `/docs` - Documentações de arquitetura, design de sistema e referências.

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

## 🛠️ Como executar localmente

*(Em breve - As instruções de instalação e scripts de execução de banco e API serão disponibilizadas conforme o desenvolvimento das camadas avancem)*

---

*Refira-se ao arquivo [System Design Document](docs/system-design-ecommerce-chatbot.md) na pasta `/docs` para visualizar a documentação técnica completa deste MVP.*
