import { execSync } from 'child_process';
import { PackageManager, CommandOptions } from '../types';

export function install(pm: PackageManager, packages: string[], options: CommandOptions): void {
  const dev = options.dev ? ' -D' : '';
  const command = {
    npm: `npm install${dev}`,
    pnpm: `pnpm add${dev}`,
    yarn: `yarn add${dev}`,
    bun: `bun add${dev}`,
  }[pm];

  try {
    execSync(`${command} ${packages.join(' ')}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Installation failed:', error);
  }
}