import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = resolve(root, 'content');
const outputDir = resolve(root, 'src/content/docs');
const manifestPath = resolve(root, 'content.manifest.json');

export function loadManifest() {
  return JSON.parse(readFileSync(manifestPath, 'utf8'));
}

export function validateManifest(manifest) {
  if (!Array.isArray(manifest.sections) || manifest.sections.length === 0) {
    throw new Error('content.manifest.json requires a non-empty sections array.');
  }

  const sections = new Set(manifest.sections.map((section) => section.id));
  for (const [id, doc] of Object.entries(manifest.documents ?? {})) {
    if (!doc.title || !doc.description || !doc.section || !Number.isInteger(doc.order) || typeof doc.published !== 'boolean') {
      throw new Error(`Document "${id}" requires title, description, section, integer order, and boolean published.`);
    }
    if (!sections.has(doc.section)) {
      throw new Error(`Document "${id}" references unknown section "${doc.section}".`);
    }
    if (!existsSync(resolve(sourceDir, `${id}.md`))) {
      throw new Error(`Document "${id}" is listed in the manifest but content/${id}.md is missing.`);
    }
    for (const resource of doc.resources ?? []) {
      if (!resource.label || !URL.canParse(resource.url)) {
        throw new Error(`Document "${id}" has an invalid resource entry.`);
      }
    }
  }
}

function yamlString(value) {
  return JSON.stringify(value);
}

export function prepareContent() {
  const manifest = loadManifest();
  validateManifest(manifest);
  rmSync(outputDir, { recursive: true, force: true });
  mkdirSync(outputDir, { recursive: true });

  for (const [id, doc] of Object.entries(manifest.documents)) {
    const body = readFileSync(resolve(sourceDir, `${id}.md`), 'utf8')
      .replace(/^#\s+.+\r?\n*/, '');
    const frontmatter = [
      '---',
      `title: ${yamlString(doc.title)}`,
      `description: ${yamlString(doc.description)}`,
      `section: ${yamlString(doc.section)}`,
      `order: ${doc.order}`,
      `published: ${doc.published}`,
      `resources: ${JSON.stringify(doc.resources ?? [])}`,
      '---',
      '',
    ].join('\n');
    writeFileSync(resolve(outputDir, `${id}.md`), `${frontmatter}${body}`, 'utf8');
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  prepareContent();
  console.log('Content prepared.');
}
