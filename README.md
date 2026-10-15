# Maize Research Studio frontend

React + TypeScript + Vite interface for the existing Phase 19 FastAPI research backend and the separate Phase 21 assistant.

## Start

1. Copy `.env.example` to `.env` if the service URLs differ from their defaults.
2. Run `pnpm install` (or `npm install`).
3. Run `pnpm dev` and open the local Vite URL.

The Vite development proxy sends research and assistant API requests to `http://127.0.0.1:9095`. This also avoids browser CORS requirements. Leave base URL values blank to use the proxy. Configure `VITE_API_KEY` only when `MAIZE_API_KEY` is enabled on the backend service.

The pages call the APIs directly. For a production deployment, route all `/api/v1/*`, `/health`, `/ready`, `/docs` and `/openapi.json` paths to port 9095 (or set the `VITE_*_BASE_URL` values to CORS-enabled service origins). Data visualizations only render values returned by the services; missing metrics, datasets or PCA coordinates are presented as unavailable instead of being fabricated.
