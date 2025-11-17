# FusionUI Template

A modern Next.js starter template built with FusionUI components, featuring authentication, automated CI/CD, and Docker deployment.

## Features

- ⚡ **Next.js 16** with React 19
- 🎨 **FusionUI Components** - Modern UI component library
- 🔐 **NextAuth.js** - Complete authentication solution
- 🔍 **TanStack Query** - Powerful data fetching and caching
- 🐋 **Docker** - Containerized deployment
- 🚀 **CI/CD Pipeline** - Automated builds and semantic releases
- 🎯 **TypeScript** - Full type safety
- 🧹 **ESLint + Prettier** - Code quality and formatting
- 📋 **Pre-commit hooks** - Automated code quality checks

## Prerequisites

- Node.js 18+
- Yarn 4+ (managed via packageManager)
- Docker (for containerized deployment)
- pre-commit (https://pre-commit.com/#install)

## Setup

1. **Clone repo and rename origin**

   ```bash
   git remote rename origin upstream
   git remote add origin URL_TO_GITHUB_REPO
   git push origin main
   ```

1. **Install pre-commit hooks:**

   ```bash
   pre-commit install
   ```

1. **Configure environment:**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

1. **Install dependencies:**
   ```bash
   yarn install
   ```

## Development

Pull changes from upstream:

```bash
git pull upstream main
```

Start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app router pages
├── components/             # Reusable UI components
├── assets/                 # Static assets (images, icons, etc.)
└── types/                  # TypeScript type definitions
```

## Authentication

This template includes NextAuth.js for authentication with an integrated API proxy pattern that simplifies backend communication.

### How it works

The application uses an **API proxy** (see `app/api/[...slug]/route.ts`) that handles all backend authentication automatically:

- ✅ **Frontend**: Only needs NextAuth.js session management - no JWT handling required
- ✅ **API Proxy**: Validates session server-side and forwards requests to backend
- ✅ **Backend**: Receives authenticated requests without additional auth logic
- ✅ **Security**: Access tokens never exposed to frontend code

### Usage

Make API calls to `/api/*` routes which automatically proxy to your backend:

```typescript
// Frontend code - no authentication headers needed
const response = await fetch("/api/users/profile");
const data = await response.json();
```

The proxy will:

1. Check the NextAuth.js session
2. Return 403 if user is not authenticated
3. Forward the request to your backend API
4. Return the backend response

Configure your providers in the environment variables and update the auth configuration as needed.

## Deployment

### Docker

The project includes a Docker setup optimized for production:

```bash
# Build the image
docker build -t fusionui-template .

# Run the container
docker run -p 3000:80 fusionui-template
```

### CI/CD Pipeline

The GitHub Actions workflow automatically:

1. **Lints and builds** the application
2. **Runs semantic release** to determine version bumps
3. **Builds and pushes Docker images** when releases are created
4. **Supports multi-platform builds** (AMD64/ARM64)

> To publish Docker images you need to update your `.github/workflows/main.yml`

#### Required Secrets

Configure these secrets in your GitHub repository:

**Secrets:**

- `NPM_TOKEN` - Access token for private npm registry
- `REGISTRY_PASSWORD` - Docker registry password

**Variables:**

- `REGISTRY_USERNAME` - Docker registry username

## FusionUI Components

This template uses the FusionUI component library. Refer to the [FusionUI documentation](https://fusion-ui.foolsparadise.intra/) for available components and usage examples.

## Environment Variables

See `.env.example` for required environment variables:

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure tests pass and code is linted
4. Submit a pull request

Pre-commit hooks will automatically format code and run checks.

## License

This project is private and proprietary.
