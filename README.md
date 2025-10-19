# 🔗 Link Shortener API

Uma API para encurtar URLs. Utiliza Node.js, TypeScript, Fastify, Prisma, Docker.

## 📌 Features

- Encurtamento de URLs com redirecionamento
- Autenticação baseada em JWT (RS256)
- Banco de dados com Prisma ORM
- Arquitetura escalável com uso de cluster (Node.js)
- Configuração via Docker e Docker Compose
- Testes automatizados com Vitest
- Linting e formatação com ESLint + Husky

## 🚀 Tecnologias Utilizadas

- **Node.js** + **TypeScript**
- **Fastify** (servidor HTTP)
- **Prisma** (ORM)
- **Vitest** (testes unitários e E2E)
- **Docker** + **Docker Compose**
- **JWT RS256** (autenticação segura)
- **Husky** + **Lint-Staged** (hooks de commit)
- **Cluster** (escalabilidade vertical)

## 🔧 Scripts

```bash
# Desenvolvimento
npm run dev

# Desenvolvimento com cluster
npm run dev:cluster

# Build de produção
npm run build

# Start de produção (compilado)
npm run start

# Lint + Fix
npm run lint

# Testes
npm run test         # Testes unitários
npm run test:e2e     # Testes end-to-end
```

## 📦 Variáveis de Ambiente

Configure um arquivo `.env` com as seguintes variáveis:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...
JWT_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----\n...
DOMAIN=https://encurtador.com
```

## 🐳 Docker

```bash
# Subir ambiente de desenvolvimento
npm run docker:dev
```

## 🧪 Testes

Executar todos os testes:

```bash
npm run test
```

Cobertura de testes:

```bash
npm run test:cov
```

Testes e2e:

```bash
npm run test:e2e
```

## 🌐 Endpoint Base

A API estará disponível em:

👉 `https://api.encurtador.com`

## ✅ Checklist de Funcionalidades

### ✔️ Implementado (v0.0.1)

- [x] Encurtamento de URLs
- [x] Redirecionamento a partir do slug
- [x] Autenticação com JWT RS256
- [x] Escalabilidade vertical com cluster
- [x] Prisma + Migrations
- [x] Docker + Docker Compose

### 🛠️ A Fazer

#### 🔜 v0.0.2

- [x] Testes unitários e e2e com Vitest
- [x] ESLint + Husky + Lint-Staged
- [ ] Pipeline com GitHub Actions (CI/CD)
- [ ] Instrumentação de observabilidade:
  - [ ] Logs estruturados
  - [ ] Métricas
  - [ ] Rastreamento (Tracing)

#### 🔜 v0.0.3

- [ ] Aplicação Web e Mobile (CapacitorJS com Svelte)

#### Futuro

- [ ] Suporte à escalabilidade horizontal (Kubernetes, Redis para rate limit, etc)
- [ ] Rate limiting
- [ ] Custom domains por usuário
- [ ] Estatísticas por link
