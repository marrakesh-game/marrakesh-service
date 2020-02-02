FROM node:12 AS build

COPY tsconfig.json \
  jest.config.js \
  .eslintignore \
  .eslintrc \
  /home/node/

COPY package.json \
  package-lock.json \
  /home/node/

RUN chown -R node:node /home/node/

USER node
# hadolint ignore=DL3003
RUN cd /home/node && \
    npm ci

COPY src/ /home/node/src/
COPY test/ /home/node/test/

# hadolint ignore=DL3003
RUN cd /home/node/ && \
    npm run test && \
    npm run build && \
    npm prune

FROM node:12-buster-slim
USER node
ENV NODE_ENV=production

COPY --from=build /home/node/dist /home/node/app
COPY --from=build /home/node/node_modules /home/node/node_modules

ARG NAME=n/a
ARG CREATED=n/a
ARG TITLE=n/a
ARG SOURCE=n/a
ARG REVISION=n/a

ENV VERSION=${REVISION}

LABEL org.opencontainers.image.authors="David Schmitz / @Koenighotze"
LABEL org.opencontainers.image.name="${NAME}"
LABEL org.opencontainers.image.created="${CREATED}"
LABEL org.opencontainers.image.title="${TITLE}"
LABEL org.opencontainers.image.source="${SOURCE}"
LABEL org.opencontainers.image.revision="${REVISION}"

ENTRYPOINT [ "node" ]
CMD [ "/home/node/app/server.js" ]

