const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to set COOP and COEP headers for Godot 4 SharedArrayBuffer support
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname, 'src')));

// Fallback for SPA (if needed, though Godot usually handles its own routing)
app.get(/.*$/, (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
