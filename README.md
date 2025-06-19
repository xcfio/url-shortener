# URL Shortener

[![Code Test](https://github.com/xcfio/url-shortener/actions/workflows/test.yaml/badge.svg)](https://github.com/xcfio/url-shortener/actions/workflows/test.yaml)
[![Node.js Version](https://img.shields.io/badge/node-24.x-brightgreen.svg)](https://nodejs.org/)
[![License](https://img.shields.io/github/license/xcfio/url-shortener)](https://opensource.org/license/apache-2-0)
[![Fastify](https://img.shields.io/badge/Fastify-5.x-202020?logo=fastify)](https://www.fastify.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Package Manager](https://img.shields.io/badge/pnpm-latest-orange?logo=pnpm)](https://pnpm.io/)
[![Support on Patreon](https://img.shields.io/badge/Sponsor-Patreon-red?logo=patreon)](https://www.patreon.com/xcfio)
[![Time](https://wakatime.com/badge/user/80f5dbf4-7bff-4748-82c6-2a8a3f3ec1c0/project/cb1a189c-ab43-4c79-9445-88fbd40793d4.svg)](https://wakatime.com/badge/user/80f5dbf4-7bff-4748-82c6-2a8a3f3ec1c0/project/cb1a189c-ab43-4c79-9445-88fbd40793d4)

A simple and fast URL shortening service built with Fastify.

## Features

-   Quick URL shortening
-   Rate limiting (20 requests per minute)
-   Simple and clean UI
-   URL blacklist support

## Installation

```bash
# Install dependencies
pnpm install
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Server configuration
PORT=3000 # Optional, defaults to 3000
```

## Development

```bash
# Start development server
pnpm dev
```

## Production

```bash
# Build the project
pnpm build

# Start production server
pnpm start
```

## API Endpoints

-   `GET /` - Web interface
-   `POST /` - Create shortened URL
-   `GET /:code` - Redirect to original URL
-   `GET /status` - API health check

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for more information.
