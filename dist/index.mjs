import { existsSync, readFileSync } from 'fs';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { execSync } from 'child_process';
import path from 'path';

function detectPackageManager() {
  if (existsSync("pnpm-lock.yaml"))
    return "pnpm";
  if (existsSync("yarn.lock"))
    return "yarn";
  if (existsSync("package-lock.json"))
    return "npm";
  if (existsSync("bun.lockb"))
    return "bun";
  return null;
}

async function promptPackageManager() {
  const questions = [
    {
      type: "list",
      name: "packageManager",
      message: "Select a package manager:",
      choices: ["npm", "pnpm", "yarn", "bun"]
    }
  ];
  try {
    const answers = await inquirer.prompt(questions);
    return answers.packageManager;
  } catch (error) {
    console.error(chalk.red("Failed to select a package manager. Exiting..."));
    process.exit(1);
  }
}

function install(pm, packages, options) {
  const dev = options.dev ? " -D" : "";
  const command = {
    npm: `npm install${dev}`,
    pnpm: `pnpm add${dev}`,
    yarn: `yarn add${dev}`,
    bun: `bun add${dev}`
  }[pm];
  try {
    execSync(`${command} ${packages.join(" ")}`, { stdio: "inherit" });
  } catch (error) {
    console.error("Installation failed:", error);
  }
}

function uninstall(pm, packages) {
  const command = {
    npm: "npm uninstall",
    pnpm: "pnpm remove",
    yarn: "yarn remove",
    bun: "bun remove"
  }[pm];
  try {
    execSync(`${command} ${packages.join(" ")}`, { stdio: "inherit" });
  } catch (error) {
    console.error("Uninstallation failed:", error);
  }
}

function upgrade(pm, packages) {
  const command = {
    npm: "npm update",
    pnpm: "pnpm update",
    yarn: "yarn upgrade",
    bun: "bun update"
  }[pm];
  try {
    execSync(`${command} ${packages.join(" ")}`, { stdio: "inherit" });
  } catch (error) {
    console.error("Upgrade failed:", error);
  }
}

function dlx(pm, args) {
  const command = {
    npm: "npx",
    pnpm: "pnpm dlx",
    yarn: "yarn dlx",
    bun: "bunx"
  }[pm];
  if (args.length === 0) {
    console.error("No package name provided");
    return;
  }
  try {
    execSync(`${command} ${args.join(" ")}`, { stdio: "inherit" });
  } catch (error) {
    console.error("Execution failed:", error);
  }
}

async function runScript(pm, args) {
  const command = {
    npm: "npm run",
    pnpm: "pnpm",
    yarn: "yarn",
    bun: "bun run"
  }[pm];
  if (!args.length) {
    try {
      const packageJsonPath = path.resolve(process.cwd(), "package.json");
      const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
      const scripts = packageJson.scripts ? Object.keys(packageJson.scripts) : [];
      if (scripts.length > 0) {
        const { selectedScript } = await inquirer.prompt([
          {
            type: "list",
            name: "selectedScript",
            message: "Select a script to run:",
            choices: scripts
          }
        ]);
        execSync(`${command} ${selectedScript}`, { stdio: "inherit" });
      } else {
        console.log("No scripts found in package.json");
      }
    } catch (error) {
      console.error("Failed to read package.json or execute script:", error);
    }
  } else {
    try {
      execSync(`${command} ${args.join(" ")}`, { stdio: "inherit" });
    } catch (error) {
      console.error("Script execution failed:", error);
    }
  }
}

function showAgent(pm) {
  console.log(chalk.cyan(`Current package manager: ${pm}`));
}

async function run(args) {
  let pm = detectPackageManager();
  if (!pm) {
    console.log(chalk.yellow("No package manager detected. Please select one:"));
    pm = await promptPackageManager();
  }
  console.log(chalk.green(`Using package manager: ${pm}`));
  const command = args[0];
  const restArgs = args.slice(1);
  await executeCommand(pm, command, restArgs);
}
async function executeCommand(pm, command, args) {
  switch (command) {
    case "pmi":
      install(pm, args, { dev: args.includes("-D") || args.includes("--save-dev") });
      break;
    case "pmuni":
      uninstall(pm, args);
      break;
    case "pmu":
      upgrade(pm, args);
      break;
    case "pmx":
      dlx(pm, args);
      break;
    case "pmr":
      await runScript(pm, args);
      break;
    case "pma":
      showAgent(pm);
      break;
    default:
      console.error("Unknown command");
  }
}

export { run };
