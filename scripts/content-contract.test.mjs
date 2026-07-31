import assert from 'node:assert/strict';
import test from 'node:test';
import { validateManifest } from './prep-content.mjs';

test('accepts complete document metadata', () => {
  assert.doesNotThrow(() => validateManifest({
    sections: [{ id: 'notes' }],
    documents: {},
  }));
});

test('rejects incomplete document metadata', () => {
  assert.throws(() => validateManifest({
    sections: [{ id: 'notes' }],
    documents: {
      broken: { title: 'Missing required fields' },
    },
  }), /requires title/);
});
