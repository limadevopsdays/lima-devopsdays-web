FROM node:20-alpine

# Install git, bash, shadow, util-linux for VS Code Remote compatibility
RUN apk add --no-cache git bash shadow util-linux \
    && npm install -g pnpm@9

# Create non-root user
RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup

WORKDIR /workspace

USER nodeuser

EXPOSE 3000
