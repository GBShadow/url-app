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

## 🌐 Endpoint Base

A API estará disponível em:

👉 `https://url-app-ef0a.onrender.com`

Documentação Swagger neste link:

👉 `https://url-app-ef0a.onrender.com/docs`

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

## 📦 Gerar Private e Public key

### Comandos no Linux

#### Private Key

openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048

#### Public Key

openssl rsa -pubout -in private_key.pem -out public_key.pem

### Base64 para colocar no arquivo env

cat private_key.pem | base64 | tr -d '\n' > private_key.txt
cat public_key.pem | base64 | tr -d '\n' > public_key.txt

### Remover os arquivos gerados

rm private_key.pem public_key.pem private_key.txt public_key.txt

## 📦 Variáveis de Ambiente

Configure um arquivo `.env` com as seguintes variáveis:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_PRIVATE_KEY=-----PRIVATE-----\n...
JWT_PUBLIC_KEY=-----PUBLIC-----\n...
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
- [x] Pipeline com GitHub Actions (CI/CD)

#### 🔜 v0.0.3

- [ ] Aplicação Web e Mobile (CapacitorJS com Svelte)

#### Futuro

- [ ] Suporte à escalabilidade horizontal (Kubernetes, Redis para rate limit, etc)
- [ ] Rate limiting
- [ ] Custom domains por usuário
- [ ] Estatísticas por link
