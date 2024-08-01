import inquirer from 'inquirer';
import chalk from 'chalk';
import { PackageManager } from '../types';

export async function promptPackageManager(): Promise<PackageManager> {
  const questions = [
    {
      type: 'list',
      name: 'packageManager',
      message: 'Select a package manager:',
      choices: ['npm', 'pnpm', 'yarn', 'bun'],
    },
  ];

  try {
    const answers = await inquirer.prompt(questions);
    return answers.packageManager as PackageManager;
  } catch (error) {
    console.error(chalk.red('Failed to select a package manager. Exiting...'));
    process.exit(1);
  }
}
