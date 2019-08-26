import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';

export default {
	input: 'demo/main.js',
	output: [
		{
			sourcemap: true,
			format: 'iife',
			name: 'app',
			file: 'demo/bundle.js'
		}
	],
	plugins: [
		svelte({
			dev: true,
		}),
		resolve(),
		commonjs(),
		livereload('demo'),
	],
	watch: {
		clearScreen: false
	}
};
