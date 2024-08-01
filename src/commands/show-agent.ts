import chalk from 'chalk';
import { PackageManager } from '../types';

export function showAgent(pm: PackageManager): void {
  console.log(chalk.cyan(`Current package manager: ${pm}`));
}