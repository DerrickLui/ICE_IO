const express = require("express");
const path = require("path");

const app = express();

// IMPORTANT: Render requires using the PORT environment variable
const PORT = process.env.PORT || 3000;

/*
  Required headers for Godot 4 Web export
  Enables SharedArrayBuffer (COOP + COEP)
*/
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// Serve static files from the "src" folder
app.use(express.static(path.join(__dirname, "src")));

// Fallback to index.html (for SPA / Godot routing safety)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
