FROM node:16-alpine AS base
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Front
FROM base AS front-build
COPY ./src/public ./

# Back
FROM base AS back-build
COPY ./src ./
RUN npm install
RUN npm run build

FROM base AS release
COPY --from=front-build /usr/app/ ./public
COPY --from=back-build /usr/app/dist ./
COPY ./src/package.json ./
COPY ./src/package-lock.json ./
RUN npm ci --only=production

ENV NODE_ENV=production
ENV STATIC_FILES_PATH=./public
ENV API_MOCK=false
ENV CORS_ORIGIN=false

ENTRYPOINT ["node", "index"]
