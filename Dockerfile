FROM node:12 AS build

WORKDIR /home/node

COPY tsconfig.json \
  jest.config.js \
  .eslintignore \
  .eslintrc \
  ./

COPY package.json \
  package-lock.json \
  ./

RUN chown -R node:node .

USER node

RUN npm ci

COPY src/ src/
COPY test/ test/

RUN npm run test && \
    npm run build && \
    npm prune

FROM node:12-buster-slim
USER node
ENV NODE_ENV=production

WORKDIR /home/node
COPY --from=build /home/node/dist ./app
COPY --from=build /home/node/node_modules ./node_modules

ARG NAME=n/a
ARG CREATED=n/a
ARG TITLE=n/a
ARG SOURCE=n/a
ARG REVISION=n/a

LABEL org.opencontainers.image.authors="David Schmitz / @Koenighotze"
LABEL org.opencontainers.image.name="${NAME}"
LABEL org.opencontainers.image.created="${CREATED}"
LABEL org.opencontainers.image.title="${TITLE}"
LABEL org.opencontainers.image.source="${SOURCE}"
LABEL org.opencontainers.image.revision="${REVISION}"

CMD ["node", "./app/server.js"]

