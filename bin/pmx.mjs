#!/usr/bin/env node
import { run } from '../dist/index.mjs';
run(['pmx', ...process.argv.slice(2)]);