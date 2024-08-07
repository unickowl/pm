'use strict';

const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const child_process = require('child_process');
const path = require('path');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const inquirer__default = /*#__PURE__*/_interopDefaultCompat(inquirer);
const chalk__default = /*#__PURE__*/_interopDefaultCompat(chalk);
const path__default = /*#__PURE__*/_interopDefaultCompat(path);

function detectPackageManager() {
  if (fs.existsSync("pnpm-lock.yaml"))
    return "pnpm";
  if (fs.existsSync("yarn.lock"))
    return "yarn";
  if (fs.existsSync("package-lock.json"))
    return "npm";
  if (fs.existsSync("bun.lockb"))
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
    const answers = await inquirer__default.prompt(questions);
    return answers.packageManager;
  } catch (error) {
    console.error(chalk__default.red("Failed to select a package manager. Exiting..."));
    process.exit(1);
  }
}

function install(pm, packages, options) {
  if (!packages.length && !options.dev) {
    const dev2 = options.dev ? " -D" : "";
    const isInstallAll = !options.dev && !packages.length;
    const command2 = {
      npm: `npm install${dev2}`,
      pnpm: `pnpm add${dev2}`,
      yarn: `yarn add${dev2}`,
      bun: `bun add${dev2}`
    }[pm];
    const commandWithoutPackage = {
      npm: "npm install",
      pnpm: "pnpm install",
      yarn: "yarn",
      bun: "bun install"
    }[pm];
    try {
      child_process.execSync(isInstallAll ? commandWithoutPackage : command2, { stdio: "inherit" });
    } catch (error) {
      console.error("Installation failed:", error);
    }
    return;
  }
  const dev = options.dev ? " -D" : "";
  const command = {
    npm: `npm install${dev}`,
    pnpm: `pnpm add${dev}`,
    yarn: `yarn add${dev}`,
    bun: `bun add${dev}`
  }[pm];
  try {
    child_process.execSync(`${command} ${packages.join(" ")}`, { stdio: "inherit" });
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
    child_process.execSync(`${command} ${packages.join(" ")}`, { stdio: "inherit" });
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
    child_process.execSync(`${command} ${packages.join(" ")}`, { stdio: "inherit" });
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
    child_process.execSync(`${command} ${args.join(" ")}`, { stdio: "inherit" });
  } catch (error) {
    console.error("Execution failed:", error);
  }
}

async function runScript(pm, args) {
  const command = {
    npm: "npm run",
    pnpm: "pnpm run",
    yarn: "yarn",
    bun: "bun run"
  }[pm];
  if (!args.length) {
    try {
      const packageJsonPath = path__default.resolve(process.cwd(), "package.json");
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
      const scripts = packageJson.scripts ? Object.keys(packageJson.scripts) : [];
      if (scripts.length > 0) {
        const { selectedScript } = await inquirer__default.prompt([
          {
            type: "list",
            name: "selectedScript",
            message: "Select a script to run:",
            choices: scripts
          }
        ]);
        child_process.execSync(`${command} ${selectedScript}`, { stdio: "inherit" });
      } else {
        console.log("No scripts found in package.json");
      }
    } catch (error) {
      console.error("Failed to read package.json or execute script:", error);
    }
  } else {
    try {
      child_process.execSync(`${command} ${args.join(" ")}`, { stdio: "inherit" });
    } catch (error) {
      console.error("Script execution failed:", error);
    }
  }
}

function showAgent(pm) {
  console.log(`${chalk__default.cyan("Using package manager: ")} ${chalk__default.bgMagenta(" " + pm + " ")}`);
}

async function run(args) {
  let pm = detectPackageManager();
  if (!pm) {
    console.log(chalk__default.yellow("No package manager detected. Please select one:"));
    pm = await promptPackageManager();
  }
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

exports.run = run;
