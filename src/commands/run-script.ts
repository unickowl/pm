import { execSync } from 'child_process';
import type { PackageManager } from '../types';
import { readFileSync } from 'fs';
import path from 'path';
import inquirer from 'inquirer';

export async function runScript(pm: PackageManager, args: string[]) {
  const command = {
    npm: 'npm run',
    pnpm: 'pnpm run',
    yarn: 'yarn',
    bun: 'bun run',
  }[pm];

  // If the user inputs only 'pr', list the available scripts
  if (!args.length) {
    try {
      const packageJsonPath = path.resolve(process.cwd(), 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

      // Get the scripts from package.json
      const scripts = packageJson.scripts ? Object.keys(packageJson.scripts) : [];

      // Prompt user to select a script
      if (scripts.length > 0) {
        const { selectedScript } = await inquirer.prompt([
          {
            type: 'list',
            name: 'selectedScript',
            message: 'Select a script to run:',
            choices: scripts,
          },
        ]);

        // Run the selected script
        execSync(`${command} ${selectedScript}`, { stdio: 'inherit' });
      } else {
        console.log('No scripts found in package.json');
      }
    } catch (error) {
      console.error('Failed to read package.json or execute script:', error);
    }
  } else {
    // If a script is specified, run it
    try {
      execSync(`${command} ${args.join(' ')}`, { stdio: 'inherit' });
    } catch (error) {
      console.error('Script execution failed:', error);
    }
  }
}
