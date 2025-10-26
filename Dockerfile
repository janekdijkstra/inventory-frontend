# ---- Production Stage ----
FROM node:24-alpine AS runner

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=80

WORKDIR /app

COPY start.sh /start.sh
RUN chmod +x /start.sh

COPY .next/standalone ./
COPY .next/static ./.next/static

EXPOSE 80

ENTRYPOINT ["/start.sh"]
