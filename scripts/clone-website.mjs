#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

function printHelp() {
  console.log(`
Usage:
  npm run clone-website -- <url> --component=<name>

Examples:
  npm run clone-website -- https://www.meshy.ai --component=generation-form
  npm run clone-website -- https://www.maxel.ai
`);
}

function parseArgs(argv) {
  const values = {
    url: "",
    component: "",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg) continue;

    if (arg === "--help" || arg === "-h") {
      return { ...values, help: true };
    }

    if (arg.startsWith("--component=")) {
      values.component = arg.slice("--component=".length).trim();
      continue;
    }

    if (arg === "--component") {
      values.component = (argv[i + 1] ?? "").trim();
      i += 1;
      continue;
    }

    if (!values.url && /^https?:\/\//i.test(arg)) {
      values.url = arg.trim();
    }
  }

  return { ...values, help: false };
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/^www\./, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripTags(input) {
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchAll(html, regex) {
  const out = [];
  let m;
  while ((m = regex.exec(html)) !== null) {
    out.push(m);
  }
  return out;
}

function extractFormHints(html) {
  const textareas = matchAll(
    html,
    /<textarea\b([^>]*)>([\s\S]*?)<\/textarea>/gi,
  ).map((m, idx) => {
    const attrs = m[1] ?? "";
    const placeholder = /placeholder=(?:"([^"]*)"|'([^']*)')/i.exec(attrs);
    return {
      index: idx,
      placeholder: placeholder?.[1] ?? placeholder?.[2] ?? "",
      attrs: attrs.trim(),
    };
  });

  const selects = matchAll(html, /<select\b([^>]*)>([\s\S]*?)<\/select>/gi).map(
    (m, idx) => {
      const attrs = m[1] ?? "";
      const body = m[2] ?? "";
      const options = matchAll(body, /<option\b[^>]*>([\s\S]*?)<\/option>/gi).map(
        (opt) => stripTags(opt[1] ?? ""),
      );
      return {
        index: idx,
        attrs: attrs.trim(),
        options,
      };
    },
  );

  const buttons = matchAll(
    html,
    /<(button|a)\b([^>]*)>([\s\S]*?)<\/\1>/gi,
  )
    .map((m, idx) => {
      const text = stripTags(m[3] ?? "");
      if (!text) return null;
      return {
        index: idx,
        tag: (m[1] ?? "").toLowerCase(),
        text,
        attrs: (m[2] ?? "").trim(),
      };
    })
    .filter(Boolean)
    .slice(0, 80);

  const loadingSignals = [
    "loading",
    "generating",
    "processing",
    "spinner",
    "progress",
    "retry",
  ].filter((token) => html.toLowerCase().includes(token));

  return {
    textareas,
    selects,
    buttons,
    loadingSignals,
  };
}

async function fetchHtmlWithCurl(urlString) {
  const { stdout } = await execFileAsync(
    "curl",
    [
      "-L",
      "--fail",
      "--silent",
      "--show-error",
      "--max-time",
      "45",
      "-A",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "-H",
      "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "-H",
      "Accept-Language: en-US,en;q=0.9,ru;q=0.8",
      urlString,
    ],
    { windowsHide: true },
  );
  return stdout;
}

async function fetchHtmlWithPowerShell(urlString) {
  // NOTE: PowerShell here-strings require the opening token to be the LAST
  // characters on the line, and the content must start on the next line.
  const ps = [
    "$ProgressPreference='SilentlyContinue'",
    "$u = @'",
    urlString.replace(/'/g, "''"),
    "'@",
    "Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 45 | Select-Object -ExpandProperty Content",
  ].join("\n");

  const { stdout } = await execFileAsync(
    "powershell.exe",
    ["-NoProfile", "-NonInteractive", "-Command", ps],
    { windowsHide: true, maxBuffer: 50 * 1024 * 1024 },
  );

  return stdout;
}

async function fetchHtml(urlString) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45_000);

  try {
    const response = await fetch(urlString, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9,ru;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    return await response.text();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error ?? "unknown error");

    try {
      return await fetchHtmlWithCurl(urlString);
    } catch (curlError) {
      const curlMessage =
        curlError instanceof Error ? curlError.message : String(curlError);

      try {
        return await fetchHtmlWithPowerShell(urlString);
      } catch (psError) {
        const psMessage =
          psError instanceof Error ? psError.message : String(psError);
        throw new Error(
          `Fetch failed.\n- node fetch: ${message}\n- curl fallback: ${curlMessage}\n- powershell fallback: ${psMessage}\n\nTips:\n- Try again on a stable network/VPN\n- Some sites block automated requests; open the URL in a browser and copy HTML manually into raw.html`,
        );
      }
    }
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  const parsed = parseArgs(process.argv.slice(2));
  if (parsed.help) {
    printHelp();
    return;
  }

  if (!parsed.url) {
    console.error("Missing URL. Example: npm run clone-website -- https://www.meshy.ai --component=generation-form");
    process.exit(1);
  }

  const url = new URL(parsed.url);
  const siteSlug = slugify(url.hostname);
  const componentSlug = slugify(parsed.component || "full-page");
  const outputDir = path.join(
    process.cwd(),
    "docs",
    "research",
    "components",
    siteSlug,
    componentSlug,
  );

  console.log(`Fetching ${url.toString()} ...`);
  const html = await fetchHtml(url.toString());
  const titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  const title = stripTags(titleMatch?.[1] ?? "");

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(path.join(outputDir, "raw.html"), html, "utf8");

  const metadata = {
    sourceUrl: url.toString(),
    clonedAt: new Date().toISOString(),
    site: siteSlug,
    component: componentSlug,
    title,
  };
  await fs.writeFile(
    path.join(outputDir, "metadata.json"),
    JSON.stringify(metadata, null, 2),
    "utf8",
  );

  const extracted = extractFormHints(html);
  await fs.writeFile(
    path.join(outputDir, "extracted.json"),
    JSON.stringify(extracted, null, 2),
    "utf8",
  );

  const notes = [
    "# Clone Notes",
    "",
    `- Source: ${url.toString()}`,
    `- Target folder: ${outputDir}`,
    `- Title: ${title || "N/A"}`,
    "",
    "## Quick Signals",
    `- Textareas found: ${extracted.textareas.length}`,
    `- Selects found: ${extracted.selects.length}`,
    `- Buttons/links sampled: ${extracted.buttons.length}`,
    `- Loading tokens found: ${extracted.loadingSignals.join(", ") || "none"}`,
    "",
    "## Next Step",
    "- Use extracted.json to adapt UI into Next.js + shadcn components.",
    "",
  ].join("\n");
  await fs.writeFile(path.join(outputDir, "notes.md"), notes, "utf8");

  console.log(`Done. Files saved to:\n${outputDir}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});

