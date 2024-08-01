import { execSync } from 'child_process';
import { PackageManager } from '../types';

export function dlx(pm: PackageManager, args: string[]) {
  const command = {
    npm: 'npx',
    pnpm: 'pnpm dlx',
    yarn: 'yarn dlx',
    bun: 'bunx',
  }[pm];

  if (args.length === 0) {
    console.error('No package name provided');
    return;
  }
  try {
    execSync(`${command} ${args.join(' ')}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Execution failed:', error);
  }
}