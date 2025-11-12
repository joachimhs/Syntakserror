import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Change the adapter to node
		adapter: adapter(),
		alias: {
			$components: 'src/lib/components',
			$stores: 'src/lib/stores'
		}
	}
};

export default config;