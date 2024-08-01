# pm - The Universal Package Manager Wrapper

![CleanShot 2024-08-01 at 16 44 49](https://github.com/user-attachments/assets/6aaee9e7-0f55-4dd5-8608-e03fe068f7b3)
![image](https://github.com/user-attachments/assets/fce014e7-8a3c-4d2b-81c4-a1e3cea657c0)

**Don't worry about which package manager to use anymore.**

As a frontend developer, hopping between projects with different package managers like `npm`, `yarn`, `pnpm`, and `bun` can be a real headache. That's where **pm** steps in—your all-in-one solution for managing packages without the fuss.

**pm** automatically detects the package manager your project uses and runs the right commands, so you don't have to keep track of each one's quirks. Just sit back, relax, and let **pm** do the heavy lifting!

## What Can pm Do for You?

- **Auto-Detects Package Manager**: No more hunting for lock files or guessing. Just type your command, and pm will figure it out.
- **Unified Commands**: Whether you want to install, add, remove, or upgrade, **pm** translates your command into the right package manager lingo.
- **Supports All Your Faves**: Compatible with `npm`, `yarn`, `pnpm`, and `bun`. Just `pmi` and let the magic happen.

## Getting Started

**Installation**:
```bash
# npm
npm install -g unickowl/pm

# yarn
yarn global add unickowl/pm

# pnpm
pnpm install -g unickowl/pm

# bun
bun install -g unickowl/pm
```

**Uninstallation**:
```bash
# npm
npm uninstall -g pm

# yarn
yarn global remove pm

# pnpm
pnpm uninstall -g pm

# bun
bun remove -g pm
```

**Basic Usage**:
```bash
pmi      # Works like `npm install`, `yarn`, etc.
pmi vue  # Installs vue with the correct pm
pmr dev  # Runs the dev script with the correct pm
```

**Scripts**:

#### `pmi`: Install packages
```bash
pmi lodash
pmi -D eslint
```

#### `pmuni`: Uninstall packages
```bash
pmuni lodash
```

#### `pmu`: Update packages
```bash
pmu lodash
```

#### `pmr`: Run scripts
```bash
pmr dev
```

#### `pmx`: Execute commands
```bash
pmx cypress open
```

#### `pma`: Show current package manager
```bash
pma

# Output: Current package manager: bun
```

> Or you could just use [ni](https://github.com/antfu-collective/ni), this is my practice one. 😅
