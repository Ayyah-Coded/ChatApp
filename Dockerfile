# syntax=docker/dockerfile:1

FROM node:22-alpine AS base

RUN corepack enable && \
  corepack prepare pnpm@11.9.0 --activate

RUN pnpm config set store-dir /pnpm/store && \
  pnpm config set fetch-retries 5 && \
  pnpm config set fetch-retry-factor 2 && \
  pnpm config set fetch-retry-mintimeout 10000 && \
  pnpm config set fetch-retry-maxtimeout 120000

WORKDIR /app


# ============================================================
# DEPENDENCIES
# ============================================================

FROM base AS deps

ARG SERVICE

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

COPY tsconfig-base.json tsconfig.json ./

COPY packages/common/package.json ./packages/common/

COPY services/auth-service/package.json ./services/auth-service/
COPY services/chat-service/package.json ./services/chat-service/
COPY services/gateway-service/package.json ./services/gateway-service/
COPY services/user-service/package.json ./services/user-service/

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install \
  --filter "${SERVICE}..." \
  --frozen-lockfile


# ============================================================
# BUILDER
# ============================================================

FROM deps AS builder

ARG SERVICE

COPY packages/common ./packages/common

COPY services/${SERVICE} ./services/${SERVICE}

RUN pnpm --filter "${SERVICE}..." build

RUN pnpm deploy \
  --legacy \
  --filter "${SERVICE}" \
  --prod \
  /prod

# ============================================================
# PRODUCTION
# ============================================================

FROM node:22-alpine AS production

RUN apk add --no-cache wget

ARG SERVICE
ARG PORT

RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nodeuser

WORKDIR /app

COPY --from=builder --chown=nodeuser:nodejs /prod/package.json ./package.json
COPY --from=builder --chown=nodeuser:nodejs /prod/node_modules ./node_modules
COPY --from=builder --chown=nodeuser:nodejs /prod/dist ./dist


USER nodeuser

ENV NODE_ENV=production

EXPOSE ${PORT}

CMD ["node", "dist/index.js"]