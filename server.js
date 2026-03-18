const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

/*
  Required headers for Godot 4 Web export
  Enables SharedArrayBuffer (COOP + COEP)
  Mandatory for multi-threaded exports to run in the browser.
*/
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname, 'src')));

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
