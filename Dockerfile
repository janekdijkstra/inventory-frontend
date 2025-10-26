# ---- Build Stage ----
FROM node:24 AS builder

ARG NPM_TOKEN

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./
COPY .yarn ./.yarn
RUN echo "npmRegistries:\n  \"https://npm.foolsparadise.de\":\n    npmAuthToken: $NPM_TOKEN" > ~/.yarnrc.yml
RUN yarn install --immutable

COPY next.config.ts .
COPY tsconfig.json .
COPY eslint.config.mjs .
COPY .env.production .

COPY app ./app
COPY assets ./assets
COPY components ./components
COPY types ./types

RUN yarn build


# ---- Production Stage ----
FROM node:24-alpine AS runner

ENV NODE_ENV=production
ENV PORT=80

WORKDIR /app

COPY start.sh /start.sh
RUN chmod +x /start.sh

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 80

ENTRYPOINT ["/start.sh"]
