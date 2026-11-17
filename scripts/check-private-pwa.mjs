import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const readText = async (path) => readFile(new URL(path, root), "utf8");
const readBytes = async (path) => readFile(new URL(path, root));

function pngDimensions(buffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(buffer.subarray(0, 8).compare(signature), 0, "Le fichier doit être un PNG valide.");
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

const manifest = JSON.parse(await readText("public/yaji-move-gestion.webmanifest"));
assert.equal(manifest.name, "YAJI MOVE Gestion");
assert.equal(manifest.display, "standalone");
assert.equal(manifest.scope, "/");
assert.ok(String(manifest.start_url).startsWith("/"));

const icons = new Map(manifest.icons.map((icon) => [icon.src, icon]));
for (const [src, size, purpose] of [
  ["/yaji-gestion-192.png", 192, "any"],
  ["/yaji-gestion-512.png", 512, "any"],
  ["/yaji-gestion-512-maskable.png", 512, "maskable"],
]) {
  const icon = icons.get(src);
  assert.ok(icon, `Icône manquante dans le manifeste : ${src}`);
  assert.equal(icon.type, "image/png");
  assert.ok(String(icon.purpose).includes(purpose));
  const bytes = await readBytes(`public${src}`);
  const dimensions = pngDimensions(bytes);
  assert.deepEqual(dimensions, { width: size, height: size }, `Dimensions incorrectes pour ${src}`);
}

const privatePage = await readText("app/page.tsx");
assert.match(privatePage, /manifest:\s*["']\/yaji-move-gestion\.webmanifest\?v=3["']/);
assert.match(privatePage, /PrivatePwa/);
assert.match(privatePage, /appleWebApp/);
assert.match(privatePage, /statusBarStyle:\s*["']black-translucent["']/);
assert.match(privatePage, /viewportFit:\s*["']cover["']/);
assert.match(privatePage, /private-ios\.css/);
assert.match(privatePage, /mobile-native\.css/);

const rootLayout = await readText("app/layout.tsx");
assert.doesNotMatch(rootLayout, /mobile-native\.css|private-ios\.css/);

const boutiqueLayout = await readText("app/boutique/layout.tsx");
assert.doesNotMatch(boutiqueLayout, /yaji-move-gestion\.webmanifest/);
assert.match(boutiqueLayout, /storefront-modern\.css/);

const worker = await readText("public/private-sw.js");
assert.match(worker, /addEventListener\(["']push["']/);
assert.match(worker, /addEventListener\(["']fetch["']/);
assert.doesNotMatch(worker, /caches\.open|cache\.put|caches\.match/);
assert.match(worker, /requestUrl\.pathname === "\/boutique"/);
assert.match(worker, /event\.request\.mode === "navigate"/);
assert.match(worker, /cache:\s*"no-store"/);

const pwaClient = await readText("app/private-pwa.tsx");
assert.match(pwaClient, /navigator\.standalone|standalone/);
assert.match(pwaClient, /MacIntel/);
assert.match(pwaClient, /Installer sur iPhone/);
assert.match(pwaClient, /private-sw\.js\?v=5/);
assert.match(pwaClient, /YajiMoveAndroid\\\//);
assert.match(pwaClient, /YajiMoveNative/);
assert.match(pwaClient, /requestNotificationPermission/);
assert.match(pwaClient, /openNotificationSettings/);
assert.match(pwaClient, /notifyNewOrder/);
assert.match(pwaClient, /Mise à jour Android 2\.5 requise/);
assert.match(pwaClient, /Activer les notifications/);
assert.match(pwaClient, /PANEL_VISIBLE_MS\s*=\s*30_000/);
assert.match(pwaClient, /APP_REFRESH_MS\s*=\s*15_000/);
assert.match(pwaClient, /\/api\/platform\/live/);
assert.doesNotMatch(pwaClient, /\/api\/data\?live=/);
assert.match(pwaClient, /setInterval\([^]*APP_REFRESH_MS/);
assert.doesNotMatch(pwaClient, /window\.location\.reload\(\)/);
assert.match(pwaClient, /yaji-move-live-refresh/);
assert.match(pwaClient, /data-mj-app-settings-host|mjAppSettingsHost/);
assert.match(pwaClient, /Application & notifications/);
assert.match(pwaClient, /Ouvrir le panneau/);
assert.match(pwaClient, /syncExistingSubscription/);
assert.match(pwaClient, /Panneau maintenu ouvert/);

const pwaCss = await readText("app/private-pwa.css");
assert.match(pwaCss, /private-pwa-temporary\s*\{/);
assert.match(pwaCss, /position:\s*fixed/);
assert.match(pwaCss, /app-notification-settings/);
assert.match(pwaCss, /private-pwa-pill\s*\{\s*display:\s*none/i);

const fluidCss = await readText("app/mobile-native.css");
assert.match(fluidCss, /pointer:\s*coarse/);
assert.match(fluidCss, /hover:\s*none/);
assert.match(fluidCss, /repeat\(auto-fit/);
assert.match(fluidCss, /clamp\(190px,\s*18vw,\s*248px\)/);
assert.match(fluidCss, /z-index:\s*4000\s*!important/);
assert.match(fluidCss, /100dvh/);
assert.match(fluidCss, /safe-area-inset-bottom/);
assert.match(fluidCss, /-webkit-overflow-scrolling:\s*touch/);
assert.match(fluidCss, /modal-actions[\s\S]*flex-wrap:\s*wrap/);

const storefrontResponsive = await readText("app/boutique/storefront-modern.css");
assert.match(storefrontResponsive, /100dvh/);
assert.match(storefrontResponsive, /safe-area-inset-bottom/);
assert.match(storefrontResponsive, /pointer:\s*coarse/);
assert.match(storefrontResponsive, /:is\(input, select, textarea\) \{ font-size: 16px; \}/);
assert.match(storefrontResponsive, /storefront-v3-grid\.catalogue \{ grid-template-columns: repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
assert.match(storefrontResponsive, /storefront-v3-overlay \{ touch-action:\s*pan-y/);


console.log("Responsive validation (private iPhone/Android/tablet + public storefront + Android 2.5): OK");
