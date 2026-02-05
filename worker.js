export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve index.html for root
    if (url.pathname === "/") {
      return env.ASSETS.fetch(new URL("/index.html", request.url));
    }

    // Serve static assets
    return env.ASSETS.fetch(request);
  }
};
