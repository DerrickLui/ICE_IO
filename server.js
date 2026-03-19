const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

/*
  Required headers for Godot 4 Web export
  Enables SharedArrayBuffer (COOP + COEP)
  Mandatory for multi-threaded exports and AudioWorklets to run in the browser.
*/
app.use(express.static(path.join(__dirname, 'src'), {
    setHeaders: (res, filePath) => {
        // Enforce SharedArrayBuffer via COOP and COEP
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

        // Explicitly set correct Content-Type for Godot payload
        if (filePath.endsWith('.pck')) {
            res.setHeader('Content-Type', 'application/octet-stream');
        } else if (filePath.endsWith('.wasm')) {
            res.setHeader('Content-Type', 'application/wasm');
        } else if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
            // AudioWorklets on Render can have caching issues that block sound creation
            if (filePath.includes('audio') || filePath.includes('worklet')) {
                res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            }
        }
    }
}));

// Fallback to index.html (for SPA / Godot routing safety)
// Uses middleware to bypass path-to-regexp wildcard syntax changes in Express 5
app.use((req, res, next) => {
    if (req.method === 'GET' && req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'src', 'index.html'));
    } else {
        next();
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
