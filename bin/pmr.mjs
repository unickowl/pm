#!/usr/bin/env node
import { run } from '../dist/index.mjs';
run(['pmr', ...process.argv.slice(2)]);