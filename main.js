const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

// Path to dist/index.html
const indexPath = path.join(__dirname, "dist", "index.html");

const server = http.createServer((req, res) => {
  // Only serve index.html (basic setup)
  if (req.url === "/" || req.url === "/index.html") {
    fs.readFile(indexPath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 - Internal Server Error");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    // Anything else = 404
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
