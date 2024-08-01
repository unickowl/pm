import { execSync } from 'child_process';
import { PackageManager } from '../types';

export function upgrade(pm: PackageManager, packages: string[]) {
  const command = {
    npm: 'npm update',
    pnpm: 'pnpm update',
    yarn: 'yarn upgrade',
    bun: 'bun update',
  }[pm];

  try {
    execSync(`${command} ${packages.join(' ')}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Upgrade failed:', error);
  }
}