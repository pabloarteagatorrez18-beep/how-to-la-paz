import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the complete How To La Paz homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>How To La Paz/);
  assert.match(html, /Descubre[\s\S]*La Paz[\s\S]*como un paceño/);
  assert.match(html, /Cinco maneras de/);
  assert.match(html, /La ciudad también/);
  assert.match(html, /La Guía Insider/);
  assert.match(html, /@howtolapaz/);
});
test("includes the interactive grouped-zone map", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /MAPA EDITORIAL INTERACTIVO/);
  assert.match(html, /Explora La Paz/);
  assert.match(html, /Centro histórico/);
  assert.match(html, /Sopocachi \+ San Jorge/);
  assert.match(html, /Miraflores/);
  assert.match(html, /Zona Sur/);
  assert.match(html, /aria-pressed="true"/);
  assert.doesNotMatch(html, /google\.com\/maps|mapbox|<iframe/i);
});

test("keeps local brand and hero assets available", async () => {
  const [page] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    access(new URL("../public/how-to-la-paz.png", import.meta.url)),
    access(new URL("../public/hero-lapaz.jpg", import.meta.url)),
    access(new URL("../public/food-saltenas.jpg", import.meta.url)),
  ]);

  assert.match(page, /setActiveZoneId/);
  assert.match(page, /aria-pressed/);
  assert.match(page, /https:\/\/www\.instagram\.com\/howtolapaz\//);
});
