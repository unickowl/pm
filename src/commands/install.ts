import { execSync } from 'child_process';
import { PackageManager, CommandOptions } from '../types';

export function install(pm: PackageManager, packages: string[], options: CommandOptions): void {
  if (!packages.length && !options.dev) {
    const dev = options.dev ? ' -D' : '';
    const isInstallAll = !options.dev && !packages.length;
    const command = {
      npm: `npm install${dev}`,
      pnpm: `pnpm add${dev}`,
      yarn: `yarn add${dev}`,
      bun: `bun add${dev}`,
    }[pm];
    const commandWithoutPackage = {
      npm: 'npm install',
      pnpm: 'pnpm install',
      yarn: 'yarn',
      bun: 'bun install',
    }[pm];

    try {
      execSync(isInstallAll ? commandWithoutPackage : command, { stdio: 'inherit' });
    } catch (error) {
      console.error('Installation failed:', error);
    }
    return;
  }

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