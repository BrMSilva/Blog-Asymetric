Visão Geral

O Blog Asymmetric é uma aplicação full-stack responsável por gerar, armazenar e exibir artigos automaticamente, utilizando inteligência artificial para criação de conteúdo.

O sistema é dividido em frontend, backend e infraestrutura, todos desacoplados, containerizados e preparados para execução em ambiente cloud (AWS)

Objetivos do Sistema
Gerar automaticamente 1 novo artigo por dia
Garantir pelo menos 3 artigos disponíveis inicialmente
Expor artigos via API REST
Oferecer uma interface web responsiva para leitura
Executar todo o sistema em contêineres Docker
Demonstrar um fluxo realista de deploy em nuvem

Usuário
  ↓
Navegador Web
  ↓
Frontend (React - Docker)
  ↓ HTTP
Backend (Node.js - Docker)
  ↓
SQLite
  ↓
API externa de IA (OpenAI / Hugging Face)

Frontend

Tecnologias

React+vite
React Router
TailwindCSS
Fetch API

Responsabilidades
Listar artigos disponíveis
Navegar para visualização detalhada de um artigo
Renderizar artigo principal com sidebar de artigos relacionados
Manter experiência responsiva e fluida

| Componente        | Responsabilidade      |
| ----------------- | --------------------- |
| `Home`            | Lista artigos         |
| `ArticlePage`     | Exibe artigo completo |
| `ArticleCard`     | Card reutilizável     |
| `Header / Footer` | Layout                |


Decisões Arquiteturais

SPA para melhor UX
Nenhuma lógica de negócio no frontend
Comunicação exclusiva via HTTP com backend
Conteúdo tratado como dado imutável

Backend

Tecnologias
Node.js
Express
SQLite
node-cron
Docker

Responsabilidades
Expor API REST
Gerenciar persistência de dados
Integrar com APIs de IA
Agendar geração automática de artigos
Garantir unicidade de conteúdo

API REST

| Método | Endpoint       | Descrição         |
| ------ | -------------- | ----------------- |
| GET    | `/posts`       | Lista artigos     |
| GET    | `/posts/:slug` | Artigo específico |
| DELETE | `/posts/:id`   | Remove artigo     |

Justificativa

Interface simples
Facilmente extensível
Separação clara de responsabilidade

Banco de Dados

Tecnologia
SQLite

Estrutura da Tabela posts

| Campo      | Tipo        |
| ---------- | ----------- |
| id         | INTEGER     |
| title      | TEXT        |
| slug       | TEXT UNIQUE |
| content    | TEXT        |
| created_at | DATETIME    |

Justificativa

Simplicidade
Baixa complexidade operacional
Adequado ao escopo do projeto

Dockerização
Containers

Frontend: build React + servidor web
Backend: Node.js + API + scheduler

/backend
  └── Dockerfile
/frontend
  └── Dockerfile
docker-compose.yml

Observações

Docker Compose utilizado apenas para desenvolvimento local
Containers isolados por responsabilidade

Infraestrutura AWS

Serviços Utilizados

EC2: hospeda containers
ECR: repositório de imagens Docker
CodeBuild: pipeline de build

Fluxo de Deploy

Push para GitHub

CodeBuild:

Clona repositório
Build das imagens Docker
Push para ECR

EC2:

Pull das imagens
Execução manual ou automatizada dos containers

Segurança

Variáveis sensíveis via .env
.env não versionado
IAM Role no EC2 para acesso ao ECR
Nenhuma credencial hardcoded

Observabilidade

Logs no console do backend
Logs acessíveis via Docker
Erros tratados e logados

Escalabilidade e Evolução

O sistema pode evoluir facilmente para:
Banco gerenciado (RDS)
Cache (Redis)
Autenticação
ECS / Kubernetes
Observabilidade (CloudWatch, Prometheus)
CI/CD totalmente automatizado

Considerações Finais

A arquitetura prioriza:
Clareza
Simplicidade
Separação de responsabilidades
Facilidade de manutenção
Realismo de ambiente produtivo
Este projeto demonstra um fluxo completo de desenvolvimento, automação e deploy, alinhado com práticas modernas de engenharia de software.

Decisões Técnicas Relevantes

| Decisão   | Justificativa     |
| --------- | ----------------- |
| SQLite    | Simplicidade      |
| Docker    | Portabilidade     |
| EC2       | Controle total    |
| node-cron | Automação simples |
| SPA       | Melhor UX         |

Status: Arquitetura pronta para produção e avaliação técnica.




