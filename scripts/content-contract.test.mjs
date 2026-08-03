import assert from 'node:assert/strict';
import test from 'node:test';
import { validateManifest } from './prep-content.mjs';

test('accepts complete document metadata', () => {
  assert.doesNotThrow(() => validateManifest({
    collections: [{ id: 'notes', title: 'Notes', description: 'Example notes.', order: 1 }],
    documents: {
      welcome: {
        collection: 'notes',
        title: 'Welcome',
        description: 'A valid note.',
        order: 1,
        published: true,
      },
    },
  }));
});

test('accepts default and collapsible section modes with valid site-local resources', () => {
  assert.doesNotThrow(() => validateManifest({
    collections: [
      { id: 'notes', title: 'Notes', description: 'Example notes.', order: 1 },
      { id: 'course', title: 'Course', description: 'Example course.', order: 2, sectionMode: 'collapsible' },
    ],
    documents: {
      welcome: {
        collection: 'notes', title: 'Welcome', description: 'A valid note.', order: 1, published: true,
        resources: [{ label: 'Example', url: '/knowledge-site-template/examples/utf8-example.py' }],
      },
    },
  }));
});

test('rejects missing and unsafe site-local resources', () => {
  const document = { collection: 'notes', title: 'Welcome', description: 'A valid note.', order: 1, published: true };
  const manifest = { collections: [{ id: 'notes', title: 'Notes', description: 'Example notes.', order: 1 }], documents: { welcome: document } };

  for (const url of ['/knowledge-site-template/examples/missing.py', '/knowledge-site-template/examples/%2e%2e/package.json', '/outside/examples/utf8-example.py']) {
    assert.throws(() => validateManifest({ ...manifest, documents: { welcome: { ...document, resources: [{ label: 'Broken', url }] } } }), /invalid resource/);
  }
});

test('rejects unsupported section modes', () => {
  assert.throws(() => validateManifest({
    collections: [{ id: 'notes', title: 'Notes', description: 'Example notes.', order: 1, sectionMode: 'expanded' }],
    documents: {},
  }), /invalid sectionMode/);
});

test('rejects incomplete document metadata', () => {
  assert.throws(() => validateManifest({
    collections: [{ id: 'notes', title: 'Notes', description: 'Example notes.', order: 1 }],
    documents: {
      broken: { title: 'Missing required fields' },
    },
  }), /requires collection/);
});

test('rejects documents in unknown collections', () => {
  assert.throws(() => validateManifest({
    collections: [{ id: 'notes', title: 'Notes', description: 'Example notes.', order: 1 }],
    documents: {
      welcome: {
        collection: 'missing',
        title: 'Welcome',
        description: 'A valid note.',
        order: 1,
        published: true,
      },
    },
  }), /unknown collection/);
});
