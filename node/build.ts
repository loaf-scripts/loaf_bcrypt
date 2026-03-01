await Bun.build({
    entrypoints: ['./src/index.ts', './src/worker.ts'],
    outdir: '../server',
    format: 'cjs',
    target: 'node',
    minify: true
})
