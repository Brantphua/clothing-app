import { createServer } from 'node:http';
import { existsSync, readFileSync, createReadStream } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = Number(process.env.PORT || 5173);
const MODEL = 'deepseek-flash';
const API_URL = 'https://api.deepseek.com/chat/completions';
const MAX_BODY_BYTES = 14 * 1024 * 1024;
const APP_ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)));
const DEFAULT_SECRET_FILE = 'C:\\Users\\jared\\OneDrive\\Desktop\\secrets.toml.txt';

const COLOR_ALIASES = {
  ivory: ['ivory', 'white', 'cream', 'beige', 'off-white', 'off white', 'ecru'],
  navy: ['navy', 'dark blue', 'midnight blue', 'ink blue'],
  sage: ['sage', 'green', 'forest green', 'olive', 'khaki', 'mint', 'teal'],
  terracotta: ['terracotta', 'red', 'rust', 'orange', 'coral', 'burgundy', 'maroon'],
  ochre: ['ochre', 'yellow', 'mustard', 'camel', 'tan', 'brown', 'gold'],
  black: ['black', 'charcoal', 'grey', 'gray'],
  denim: ['denim', 'jeans', 'light blue', 'blue', 'sky blue'],
  rose: ['rose', 'pink', 'blush', 'mauve', 'purple', 'lavender']
};

const CATEGORY_ALIASES = {
  top: ['top', 'shirt', 't-shirt', 'tee', 'blouse', 'sweater', 'knit', 'hoodie', 'jumper', 'cardigan'],
  bottom: ['bottom', 'trousers', 'pants', 'jeans', 'shorts', 'skirt', 'culottes'],
  dress: ['dress', 'jumpsuit', 'romper'],
  outerwear: ['outerwear', 'jacket', 'coat', 'blazer', 'parka', 'trench', 'vest', 'gilet']
};

const FIT_ALIASES = {
  relaxed: ['relaxed', 'loose', 'oversized', 'baggy', 'flowy'],
  regular: ['regular', 'straight', 'classic', 'standard', 'normal'],
  tailored: ['tailored', 'fitted', 'slim', 'structured', 'close-fitting']
};

const PATTERN_ALIASES = {
  solid: ['solid', 'plain', 'none', 'minimal'],
  stripe: ['stripe', 'striped', 'stripes'],
  floral: ['floral', 'flower', '花'],
  check: ['check', 'checked', 'plaid', 'gingham', 'tartan']
};

function firstMatch(value, aliases, fallback) {
  const text = String(value || '').toLowerCase().trim();
  return Object.entries(aliases).find(([, words]) => words.some((word) => text === word || text.includes(word)))?.[0] || fallback;
}

function parseSecretValue(text) {
  const preferredKeys = ['DEEPSEEK_API_KEY', 'deep_key', 'api_key', 'apiKey'];
  for (const key of preferredKeys) {
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = text.match(new RegExp(`^\\s*(?:[\\w.-]+\\.)?${escapedKey}\\s*=\\s*(?:"([^"]+)"|'([^']+)'|([^#\\s]+))`, 'mi'));
    const value = match?.[1] || match?.[2] || match?.[3];
    if (value) return value.trim();
  }
  return '';
}

function getApiKey() {
  if (process.env.DEEPSEEK_API_KEY?.trim()) return process.env.DEEPSEEK_API_KEY.trim();
  const secretFile = process.env.WARDROBE_SECRET_FILE || DEFAULT_SECRET_FILE;
  if (!existsSync(secretFile)) return '';
  return parseSecretValue(readFileSync(secretFile, 'utf8'));
}

function jsonResponse(response, status, payload) {
  const body = JSON.stringify(payload);
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store'
  });
  response.end(body);
}

function readJson(request) {
  return new Promise((resolveBody, rejectBody) => {
    let size = 0;
    let body = '';
    request.setEncoding('utf8');
    request.on('data', (chunk) => {
      size += Buffer.byteLength(chunk);
      if (size > MAX_BODY_BYTES) {
        rejectBody(new Error('Image request is too large'));
        request.destroy();
        return;
      }
      body += chunk;
    });
    request.on('end', () => {
      try { resolveBody(JSON.parse(body)); } catch { rejectBody(new Error('Invalid JSON request')); }
    });
    request.on('error', rejectBody);
  });
}

function extractJson(text) {
  const cleaned = String(text || '').replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('DeepSeek returned no JSON');
  return JSON.parse(cleaned.slice(start, end + 1));
}

function normalizeResult(result) {
  const name = String(result.name || result.item_name || 'Clothing item').trim().slice(0, 80) || 'Clothing item';
  const category = firstMatch(result.category, CATEGORY_ALIASES, 'top');
  const color = firstMatch(result.color, COLOR_ALIASES, 'ivory');
  const fit = firstMatch(result.fit, FIT_ALIASES, 'regular');
  const pattern = firstMatch(result.pattern, PATTERN_ALIASES, 'solid');
  const confidenceNumber = Number(result.confidence);
  const confidence = Number.isFinite(confidenceNumber) ? Math.max(0, Math.min(1, confidenceNumber)) : 0.6;
  return { name, category, color, fit, pattern, confidence, notes: String(result.notes || '').trim().slice(0, 180) };
}

async function analyzeClothing(request, response) {
  const apiKey = getApiKey();
  if (!apiKey) return jsonResponse(response, 500, { error: 'DeepSeek API key is not configured for this local server.' });

  const payload = await readJson(request);
  const imageData = String(payload.imageData || '');
  if (!/^data:image\/(?:jpeg|png|gif|webp);base64,[A-Za-z0-9+/=]+$/i.test(imageData)) {
    return jsonResponse(response, 400, { error: 'Please provide a JPEG, PNG, GIF, or WebP image.' });
  }

  const deepseekResponse = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: MODEL,
      stream: false,
      thinking: { type: 'disabled' },
      max_tokens: 260,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Analyze this single clothing item. Return only valid JSON with exactly these keys: name, category, color, fit, pattern, confidence, notes. category must be one of top, bottom, dress, outerwear. color should be a simple dominant color. fit must be relaxed, regular, or tailored. pattern must be solid, stripe, floral, or check. confidence must be a number from 0 to 1. notes should be a short uncertainty note or empty string. Do not identify the person or infer sensitive personal traits.'
          },
          { type: 'image_url', image_url: { url: imageData, detail: 'low' } }
        ]
      }]
    })
  });

  const deepseekBody = await deepseekResponse.json().catch(() => ({}));
  if (!deepseekResponse.ok) {
    const message = deepseekBody?.error?.message || `DeepSeek request failed (${deepseekResponse.status})`;
    return jsonResponse(response, 502, { error: message });
  }

  try {
    const content = deepseekBody?.choices?.[0]?.message?.content;
    return jsonResponse(response, 200, normalizeResult(extractJson(content)));
  } catch (error) {
    return jsonResponse(response, 502, { error: error.message || 'DeepSeek returned an unreadable result.' });
  }
}

function serveStatic(request, response) {
  const requestPath = decodeURIComponent((request.url || '/').split('?')[0]);
  const relativePath = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, '');
  const filePath = normalize(join(APP_ROOT, relativePath));
  if (!filePath.startsWith(APP_ROOT)) return jsonResponse(response, 403, { error: 'Forbidden' });
  const contentTypes = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif', '.md': 'text/plain; charset=utf-8' };
  if (!existsSync(filePath)) return jsonResponse(response, 404, { error: 'Not found' });
  response.writeHead(200, { 'Content-Type': contentTypes[extname(filePath).toLowerCase()] || 'application/octet-stream' });
  createReadStream(filePath).pipe(response);
}

const server = createServer(async (request, response) => {
  try {
    if (request.method === 'GET' && request.url?.startsWith('/api/status')) {
      return jsonResponse(response, 200, { available: Boolean(getApiKey()), model: MODEL });
    }
    if (request.method === 'POST' && request.url === '/api/analyze-clothing') return await analyzeClothing(request, response);
    if (request.method === 'GET') return serveStatic(request, response);
    return jsonResponse(response, 405, { error: 'Method not allowed' });
  } catch (error) {
    if (!response.headersSent) jsonResponse(response, 500, { error: error.message || 'Unexpected local server error.' });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Cloth & Form running at http://127.0.0.1:${PORT}`);
  console.log(`DeepSeek model: ${MODEL}; key configured: ${Boolean(getApiKey())}`);
});
