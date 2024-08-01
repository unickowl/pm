import { execSync } from 'child_process';
import { PackageManager } from '../types';

export function uninstall(pm: PackageManager, packages: string[]) {
  const command = {
    npm: 'npm uninstall',
    pnpm: 'pnpm remove',
    yarn: 'yarn remove',
    bun: 'bun remove',
  }[pm];

  try {
    execSync(`${command} ${packages.join(' ')}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Uninstallation failed:', error);
  }
}