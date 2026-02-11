import { execSync } from 'child_process';
import { cpSync, mkdirSync, copyFileSync } from 'fs';

const modules = [
  { dir: 'spa-mod3-relisit',   out: 'mod3' },
  { dir: 'spa-mod4-facebook',  out: 'mod4' },
  { dir: 'spa-mod5-creativos', out: 'mod5' },
  { dir: 'spa-mod6-campanas',  out: 'mod6' },
  { dir: 'spa-mod7-dropi',     out: 'mod7' },
];

// Clean output
mkdirSync('dist', { recursive: true });

// Copy root landing page
copyFileSync('index.html', 'dist/index.html');
console.log('✓ Landing page copied');

for (const mod of modules) {
  console.log(`\n⏳ Building ${mod.dir}...`);
  execSync('npm install --legacy-peer-deps', { cwd: mod.dir, stdio: 'inherit' });
  execSync('npx vite build --base=/' + mod.out + '/', { cwd: mod.dir, stdio: 'inherit' });
  cpSync(`${mod.dir}/dist`, `dist/${mod.out}`, { recursive: true });
  console.log(`✓ ${mod.dir} → dist/${mod.out}`);
}

console.log('\n🎉 Build complete!');
