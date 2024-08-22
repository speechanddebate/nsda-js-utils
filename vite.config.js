/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		coverage: {
			reporter: ['text', 'html'],
			exclude: [
				'node_modules/',
				'dist/',
				'index.ts',
				'utilities/index.ts',
				'types/index.ts',
			],
		},
	},
});
