#!/usr/bin/env node
import { run } from '../dist/index.mjs';
run(['pma', ...process.argv.slice(2)]);