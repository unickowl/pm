import { detectPackageManager } from './utils/detect';
import { promptPackageManager } from './utils/prompt';
import { install } from './commands/install';
import { uninstall } from './commands/uninstall';
import { upgrade } from './commands/upgrade';
import { dlx } from './commands/dlx';
import { runScript } from './commands/run-script';
import { showAgent } from './commands/show-agent';
import { PackageManager } from './types';
import chalk from 'chalk';

export async function run(args: string[]): Promise<void> {
  let pm = detectPackageManager();
  if (!pm) {
    console.log(chalk.yellow('No package manager detected. Please select one:'));
    pm = await promptPackageManager();
  }

  const command = args[0];
  const restArgs = args.slice(1);

  await executeCommand(pm, command, restArgs);
}

async function executeCommand(pm: PackageManager, command: string, args: string[]): Promise<void> {
  switch (command) {
    case 'pmi':
      install(pm, args, { dev: args.includes('-D') || args.includes('--save-dev') });
      break;
    case 'pmuni':
      uninstall(pm, args);
      break;
    case 'pmu':
      upgrade(pm, args);
      break;
    case 'pmx':
      dlx(pm, args);
      break;
    case 'pmr':
      await runScript(pm, args);
      break;
    case 'pma':
      showAgent(pm);
      break;
    default:
      console.error('Unknown command');
  }
}