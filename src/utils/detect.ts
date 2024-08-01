import { existsSync } from 'fs';
import { PackageManager } from '../types';

export function detectPackageManager(): PackageManager | null {
  if (existsSync('pnpm-lock.yaml')) return 'pnpm';
  if (existsSync('yarn.lock')) return 'yarn';
  if (existsSync('package-lock.json')) return 'npm';
  if (existsSync('bun.lockb')) return 'bun';
  return null;
}