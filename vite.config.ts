import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		allowedHosts: ['dev.syntakserror.no', 'syntaxerror.no'] // Allows my.host.com and all subdomains of example.com
	}
});
