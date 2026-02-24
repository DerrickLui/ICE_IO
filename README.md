# Godot Web Server (Express)

This is a simple Node.js server powered by Express, specifically configured to serve Godot 4 Web exports.

## Features
- **Godot 4 Support:** Includes mandatory `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` headers to enable `SharedArrayBuffer` support.
- **SPA Fallback:** All non-static routes fall back to `index.html` to support client-side routing.
- **Express 5 Compatible:** Uses the latest Express 5 features and path-to-regexp syntax.

## Prerequisites
- Node.js (v18 or later recommended)
- npm (installed with Node.js)

## Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Server:**
   ```bash
   npm start
   ```

3. **Access the Game:**
   Open your browser and navigate to `http://localhost:3000`.

## Configuration
The server listens on port `3000` by default. You can change this by setting the `PORT` environment variable:
```bash
PORT=8080 npm start
```

## Directory Structure
- `src/`: Contains the exported Godot game files (WASM, PCK, HTML, JS).
- `server.js`: The Express server configuration.
- `package.json`: Project dependencies and scripts.
