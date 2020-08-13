const { execSync } = require('child_process')
const { dependencies, devDependencies } = require('./package.json')

function buildRenderer() {
  console.log('\x1B[32m[vite] building...\x1B[0m')
  execSync('vite build src/renderer --base ./ --outDir build')
}

function buildMain() {
  console.log('\x1B[32m[esbuild] bundling...\x1B[0m')
  const external = Object.keys(dependencies)
    .concat(Object.keys(devDependencies))
    .map(item => `--external:${item}`)
    .join(' ')
  execSync(
    'esbuild src/main/index.js --bundle --minify --outfile=build/main.js --target=chrome83 --platform=node ' +
      external
  )
  console.log('- Bundling for production...\n')
}

function build() {
  buildRenderer()
  buildMain()
  console.log('\x1B[32m[electron-builder] packaging...\x1B[0m')
}

build()
